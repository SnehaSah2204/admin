class Basket{
    constructor(id,photo,stocks,name,description,author,tags){
        this.id = id;
        this.photo = photo;
        this.stocks = stocks;
        this.name = name;
        this.description = description;
        this.author= author;
        this.tags= tags;
    }
}


module.exports = Basket;