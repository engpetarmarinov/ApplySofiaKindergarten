let _Kindergartens = [];

module.exports = class Region {
    constructor(name) {
        this.Name = name;
    }

    get Kindergartens() { return _Kindergartens };

    SetKindergartens(Kindergartens) {
        _Kindergartens = Kindergartens;
    }
}
