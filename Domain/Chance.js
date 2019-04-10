module.exports = class Chance {
    constructor(garden, availableSlots, totalCandidates, equalPointsCandidates, percentChance) {
        this.Garden = garden;
        this.AvailableSlots = availableSlots;
        this.TotalCandidates = totalCandidates;
        this.EqualPointsCandidates = equalPointsCandidates;
        this.PercentChance = percentChance;
    }
}
