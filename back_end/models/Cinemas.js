class Cinemas {
    constructor(id, imgUrl, name, address, id_location, id_region) {
      this.id = id;
      this.imgUrl = imgUrl
      this.name = name;
      this.address = address;
      this.id_location = id_location;
      this.id_region = id_region;
    }
  
    toFirestore() {
      return {
        imgUrl: this.imgUrl,
        name: this.name,
        address: this.address,
        id_location : this.id_location,
        id_region : this.id_region,
      };
    }
  
    static fromFirestore(doc) {
      const data = doc.data();
      return new Cinemas(doc.id, data.imgUrl, data.name, data.address, data.id_location, data.id_region);
    }
  }
 module.exports =  Cinemas;