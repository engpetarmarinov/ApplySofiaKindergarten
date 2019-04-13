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

class KindergartensService {

    GetKindergartensByRegion(region) {
        return KindergartensRepository().GetKindergartensByRegionName(region.Name);
    }

    GetChances(kid, garden) {
        return new Promise((resolve, reject) => {
            garden.Groups.forEach(function (group) {
                if (kid.Year == group.Year) {

                    debug('Fetch from ' + group.Url + ' for ' + garden.Name + ' group ' + group.Year);
                    GetContent(group.Url).then(function (content) {

                        let dom = new JSDOM(content);

                        dom.window.document.querySelectorAll('.page_title').forEach((element) => {
                            if (element.innerHTML.startsWith('Списък чакащи по общи критерии за')) {

                                let freeSlotsRegex = /[0-9]+/;

                                //Available Slots in the group
                                let availableSlotsMatch = element.innerHTML.match(freeSlotsRegex);

                                if (!availableSlotsMatch) {
                                    return;
                                }

                                let availableSlots = availableSlotsMatch[0]

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

                                let groupedCandidates = groupBy(candidates, 'Points');

                                let numberOfCandidatesEqualPoints = 0;
                                if (groupedCandidates[kid.Points]) {
                                    numberOfCandidatesEqualPoints = groupedCandidates[kid.Points].length;
                                }

                                let numberOfCandidatesAhead = 0;
                                groupedCandidates.forEach((candidatesGroup, points) => {
                                    if (kid.Points >= points) return;

                                    numberOfCandidatesAhead += candidatesGroup.length;
                                });
                                let percentChance = (availableSlots - numberOfCandidatesAhead) / numberOfCandidatesEqualPoints * 100;

                                resolve(new Chance(garden, availableSlots, candidates.length, numberOfCandidatesEqualPoints, numberOfCandidatesAhead, (Math.round(percentChance * 100) / 100)));
                            }
                        });
                    }).catch((err) => {
                        reject(err);
                    });
                }
            });
        });
    }
}

module.exports = KindergartensService;
