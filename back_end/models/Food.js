class Food {
    constructor(id, imgUrl, name, price, discount, id_cinema) {
      this.id = id;
      this.imgUrl = imgUrl
      this.name = name;
      this.price = price;
      this.discount = discount;
      this.id_cinema = id_cinema;
    }
  
    toFirestore() {
      return {
        imgUrl: this.imgUrl,
        name: this.name,
        price: this.price,
        discount: this.discount,
        id_cinema: this.id_cinema,
      };
    }
  
    static fromFirestore(doc) {
      const data = doc.data();
      return new Food(doc.id, data.imgUrl, data.name, data.price, data.discount, data.id_cinema);
    }
  }
 module.exports =  Food;