const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const GetContent = require('./GetContent');
const Kid = require('../Domain/Kid');
const Chance = require('../Domain/Chance');
const KindergartensRepository = require('../Repositories/KindergartensRepository');

function groupBy(collection, property) {
    var i = 0, val, index,
        values = [], result = [];
    for (; i < collection.length; i++) {
        val = collection[i][property];
        index = values.indexOf(val);
        if (index < 0) {
            values.push(val);
            result[val] = [];
        }
        result[val].push(collection[i]);
    }
    return result;
}

function calculateChance(garden, availableSlots, kidPointsForGroup, candidates) {
    let groupedCandidates = groupBy(candidates, 'Points');

    let numberOfCandidatesEqualPoints = 0;
    if (groupedCandidates[kidPointsForGroup]) {
        numberOfCandidatesEqualPoints = groupedCandidates[kidPointsForGroup].length;
    }

    let numberOfCandidatesAhead = 0;
    groupedCandidates.forEach((candidatesGroup, points) => {
        if (kidPointsForGroup >= points) return;

        numberOfCandidatesAhead += candidatesGroup.length;
    });
    let percentChance = (!numberOfCandidatesAhead && !numberOfCandidatesEqualPoints)
        ? 100
        : ((availableSlots - numberOfCandidatesAhead) / numberOfCandidatesEqualPoints * 100);

    return new Chance(garden, availableSlots, candidates.length, numberOfCandidatesEqualPoints, numberOfCandidatesAhead, (Math.round(percentChance * 100) / 100), kidPointsForGroup);
}

class KindergartensService {

    GetKindergartensByRegion(region) {
        return KindergartensRepository().GetKindergartensByRegionName(region.Name);
    }

    GetChances(kid, garden) {
        return new Promise((resolve, reject) => {

            let numberOtherGroups = 0;

            let tableHeader = kid.SocialCriteria ? 'Списък чакащи по социални критерии за' : 'Списък чакащи по общи критерии за';

            garden.Groups.forEach(function (group) {
                if (kid.Year == group.Year) {

                    let kidPointsForGroup = kid.Points;

                    if (kid.Bonus && kid.Bonus.GardenId == garden.Id) {
                        kidPointsForGroup += kid.Bonus.Points
                    }

                    debug('Fetch from ' + group.Url + ' for ' + garden.Name + ' group ' + group.Year);
                    GetContent(group.Url).then(function (content) {

                        let dom = new JSDOM(content);

                        dom.window.document.querySelectorAll('.page_title').forEach((element) => {                           

                            if (element.innerHTML.startsWith(tableHeader)) {

                                let freeSlotsRegex = /[0-9]+/;

                                //Available Slots in the group
                                let availableSlotsMatch = element.innerHTML.match(freeSlotsRegex);

                                if (!availableSlotsMatch) {
                                    return;
                                }

                                //element is the title of the talbe
                                let candidates = [];
                                if (element.nextSibling && element.nextSibling.nodeName == 'TABLE') {

                                    //let talbe = new JSDOM('<table>' + element.nextSibling.innerHTML + '</table>');
                                    element.nextSibling.querySelectorAll('tr').forEach((tr, index) => {
                                        if (index == 0) return; //skip header tr

                                        let tds = tr.getElementsByTagName('td');

                                        let id = tds[0].innerHTML;
                                        let points = parseInt(tds[2].innerHTML);

                                        candidates.push(new Kid(id, group.Year, points, ''));
                                    });
                                }

                                resolve(calculateChance(garden, availableSlotsMatch[0], kidPointsForGroup, candidates));                                
                            }
                        });
                    }).catch((err) => {
                        reject(err);
                    });
                } else {
                    numberOtherGroups++;
                    if (garden.Groups.length == numberOtherGroups) {
                        //no suitable groups
                        resolve(false);
                    }
                }
            });
        });
    }
}

module.exports = KindergartensService;
