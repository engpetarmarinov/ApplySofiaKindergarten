module.exports = class Kindergarten {
    
    constructor(id, name) {
        this.Id = id;
        this.Name = name;
        this.Groups = [];
    }
    
    AddGroup(group) {
        this.Groups.push(group);

        return this;
    }
}
