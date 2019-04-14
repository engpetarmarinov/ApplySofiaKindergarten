module.exports = class Kid {
    constructor(id, year, points, regionName, socialCriteria, bonusForGarden) {
        this.Id = id;
        this.Year = year;
        this.Points = points;
        this.RegionName = regionName;
        this.SocialCriteria = socialCriteria;
        this.Bonus = bonusForGarden;
    }
    toString() {
        return '(' + this.Id + ', ' + this.Year + ', ' + this.Points + ')';
    }
}
