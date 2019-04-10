'use strict';

global.debug = function (obj) {
    console.log(obj);
}

const Kid = require('./Domain/Kid');
const RegionsService = require('./Services/RegionsService');
const regionsService = new RegionsService();

let myKid = new Kid('ППМ', 2017, 12, 'Възраждане');

let myKidsRegion = regionsService.GetRegionByName(myKid.RegionName);

function print(obj, color) {
    if (color) {
        console.log('\x1b[' + color + 'm%s\x1b[0m', obj);
    }
    else {
        console.log(obj);
    }
}

regionsService.CalcChances(myKidsRegion, myKid).then((chances) => {
    chances.forEach((chance) => {
        print('\n');
        print('Available slots for  ' + chance.Garden.Name + ' - ' + chance.AvailableSlots);
        print('There are total of  ' + chance.TotalCandidates + ' candidates.');
        print('There are ' + chance.EqualPointsCandidates + ' candidates with ' + myKid.Points + ' points');
        print(myKid.Id + ' has ' + chance.PercentChance + '% for ' + chance.Garden.Name, 32);
    });
});
