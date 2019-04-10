module.exports = class Kid {
    constructor(id, year, points, regionName) {
        this.Id = id;
        this.Year = year;
        this.Points = points;
        this.RegionName = regionName;
    }
    toString() {
        return '(' + this.Id + ', ' + this.Year + ', ' + this.Points + ')';
    }
}
