class Location {
    constructor(id, imgUrl, name, description) {
      this.id = id;
      this.imgUrl = imgUrl
      this.name = name;
      this.description = description;
    }
  
    toFirestore() {
      return {
        imgUrl: this.imgUrl,
        name: this.name,
        description: this.description,
      };
    }
  
    static fromFirestore(doc) {
      const data = doc.data();
      return new Location(doc.id, data.imgUrl, data.name, data.description);
    }
  }
 module.exports =  Location;