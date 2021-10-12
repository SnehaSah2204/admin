class Community{
    constructor(id,photo,author,name,description,admin,ischatable,ispostable,member,official){
        this.id = id;
        this.photo = photo;
        this.author = author;
        this.name = name;
        this.description = description;
        this.admin= admin;
        this.ischatable= ischatable;
        this.ispostable = ispostable;
        this.member = member;
        this.official = official;
    }
}


module.exports = Community;