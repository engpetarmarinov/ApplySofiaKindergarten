'use strict';

global.debug = function (obj) {
    console.log(obj);
}

const Kid = require('./Domain/Kid');
const Bonus = require('./Domain/Bonus');
const RegionsService = require('./Services/RegionsService');
const regionsService = new RegionsService();

function print(obj, color) {
    if (color) {
        console.log('\x1b[' + color + 'm%s\x1b[0m', obj);
    }
    else {
        console.log(obj);
    }
}

function printChance(kid, chance) {
    print('\n');
    if (kid.SocialCriteria) {
        print('Results for kids with social criteria', 32);
    }
    print('Available slots for ' + chance.Garden.Name + ' - ' + chance.AvailableSlots + ' for ' + kid.Year + ' year.');
    print('There are total of ' + chance.TotalCandidates + ' candidates.');
    print('There are ' + chance.AheadCandidates + ' candidates with more than ' + chance.Points + '.');
    print('There are ' + chance.EqualPointsCandidates + ' candidates with ' + chance.Points + ' points.');
    print(kid.Id + ' has ' + chance.PercentChance + '% for ' + chance.Garden.Name + '.', 32);
}

const noSocialCriteria = false;

//Pamela for 2017
let pamela = new Kid('ППМ', 2017, 12, 'Възраждане', noSocialCriteria);

let pamelaRegion = regionsService.GetRegionByName(pamela.RegionName);

regionsService.CalcChances(pamelaRegion, pamela).then((chances) => {
    chances.sort((chanceOne, chanceSec) => {
        return chanceOne.PercentChance < chanceSec.PercentChance ? 1 : -1;
    }).forEach((chance) => {
        printChance(pamela, chance);
    });
});

//Example of Deo for 2017 and bonus +1 point for having a brother in kindergarten ДГ №50 Зайчето Куики
let deo2017 = new Kid('ДАЯ', 2017, 12, 'Възраждане', noSocialCriteria, new Bonus(50, 1));

let deoRegion2017 = regionsService.GetRegionByName(deo2017.RegionName);

regionsService.CalcChances(deoRegion2017, deo2017).then((chances) => {
    chances.sort((chanceOne, chanceSec) => {
        return chanceOne.PercentChance < chanceSec.PercentChance ? 1 : -1;
    }).forEach((chance) => {
        printChance(deo2017, chance);
    });
});

//Example of Deo for 2018
let deo2018 = new Kid('ДАЯ', 2018, 12, 'Възраждане', noSocialCriteria, new Bonus(50, 1));

let deoRegion2018 = regionsService.GetRegionByName(deo2018.RegionName);

regionsService.CalcChances(deoRegion2018, deo2018).then((chances) => {
    chances.sort((chanceOne, chanceSec) => {
        return chanceOne.PercentChance < chanceSec.PercentChance ? 1 : -1;
    }).forEach((chance) => {
        if (!chance) return;

        printChance(deo2018, chance);
    });
});


//Example of Pamela for 2018 and Social Criteria
let socialCriteria = true;
let pamela2018Social = new Kid('ППМ', 2018, 16, 'Възраждане', socialCriteria);

let pamelaRegion2018Social = regionsService.GetRegionByName(pamela2018Social.RegionName);

regionsService.CalcChances(pamelaRegion2018Social, pamela2018Social).then((chances) => {
    chances.sort((chanceOne, chanceSec) => {
        return chanceOne.PercentChance < chanceSec.PercentChance ? 1 : -1;
    }).forEach((chance) => {
        if (!chance) return;

        printChance(pamela2018Social, chance);
    });
});
