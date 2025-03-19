class TypeChairs {
    constructor(id, imgUrl, name, price) {
      this.id = id;
      this.imgUrl = imgUrl;
      this.name = name;
      this.price = price;
    }
  
    toFirestore() {
      return {
        imgUrl: this.imgUrl,
        name: this.name,
        price: this.price,
      };
    }
  
    static fromFirestore(doc) {
      const data = doc.data();
      return new TypeChairs(doc.id, data.imgUrl, data.name, data.price);
    }
  }
 module.exports =  TypeChairs;