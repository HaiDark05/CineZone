class Authors {
    constructor(id, name, description) {
      this.id = id;
      this.name = name;
      this.description = description;
    }
  
    toFirestore() {
      return {
        name: this.name,
        description: this.description,
      };
    }
  
    static fromFirestore(doc) {
      const data = doc.data();
      return new Authors(doc.id, data.name, data.description);
    }
  }
 module.exports =  Authors;