module.exports = class Chance {
    constructor(garden, availableSlots, totalCandidates, equalPointsCandidates, aheadCandidates, percentChance) {
        this.Garden = garden;
        this.AvailableSlots = availableSlots;
        this.TotalCandidates = totalCandidates;
        this.EqualPointsCandidates = equalPointsCandidates;
        this.AheadCandidates = aheadCandidates;
        this.PercentChance = percentChance;
    }
}
