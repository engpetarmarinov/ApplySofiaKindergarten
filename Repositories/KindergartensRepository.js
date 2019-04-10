const Garden = require('../Domain/Kindergarten');
const Group = require('../Domain/Group');

let GardebsDb = {
    'Възраждане': [
        new Garden(50, 'ДГ №50 Зайчето Куики')
            .AddGroup(new Group(2017, 'https://kg.sofia.bg/isodz/stat-rating/waiting/3646'))
            .AddGroup(new Group(2018, 'https://kg.sofia.bg/isodz/stat-rating/waiting/4109')),
        new Garden(81, 'ДГ №81 Лилия')
            .AddGroup(new Group(2017, 'https://kg.sofia.bg/isodz/stat-rating/waiting/3665')),
        new Garden(119, 'ДГ №119 Детска планета - сграда 2')
            .AddGroup(new Group(2017, 'https://kg.sofia.bg/isodz/stat-rating/waiting/4572')),
        new Garden(120, 'ДГ №120 Детство под липите')
            .AddGroup(new Group(2017, 'https://kg.sofia.bg/isodz/stat-rating/waiting/3521'))
            .AddGroup(new Group(2018, 'https://kg.sofia.bg/isodz/stat-rating/waiting/4235')),
        new Garden(1, 'ДГ №1 (с яслени групи)')
            .AddGroup(new Group(2017, 'https://kg.sofia.bg/isodz/stat-rating/waiting/4616'))
    ]
}

module.exports = function KindergartensRepository() {
    return {
        GetKindergartensByRegionName: function (regionName) {
            return GardebsDb[regionName] ? GardebsDb[regionName] : [];
        }
    }    
};
