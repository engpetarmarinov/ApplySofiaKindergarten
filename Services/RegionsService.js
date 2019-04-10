const KindergartensService = require('./KindergartensService')
const Region = require('../Domain/Region')

let regions = {};

let kindergartensService = new KindergartensService();

let vazrajdane = new Region('Възраждане');
vazrajdane.SetKindergartens(kindergartensService.GetKindergartensByRegion(vazrajdane));
regions[vazrajdane.Name] = vazrajdane;


class RegionsService {

    GetRegionByName(name) {
        return this.GetRegions()[name];
    }

    GetRegions() {
        return regions;
    }

    CalcChances(region, kid) {

        return Promise.all(
            region.Kindergartens.map(function (garden) {
                return kindergartensService.GetChances(kid, garden);
            })
        );
    }
}

module.exports = RegionsService;
