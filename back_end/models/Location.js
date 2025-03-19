class Location {
    constructor(id, name, description, id_region) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.id_region = id_region;
    }
  
    toFirestore() {
      return {
        name: this.name,
        description: this.description,
        id_region: this.id_region,
      };
    }
  
    static fromFirestore(doc) {
      const data = doc.data();
      return new Location(doc.id, data.name, data.description, data.id_region);
    }
  }
 module.exports =  Location;