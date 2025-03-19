class Chairs {
    constructor(id,name, id_typeChair) {
      this.id = id;
      this.name = name;
      this.id_typeChair = id_typeChair;
    }
  
    toFirestore() {
      return {
        name: this.name,
        id_typeChair: this.id_typeChair,
      };
    }
  
    static fromFirestore(doc) {
      const data = doc.data();
      return new Chairs(doc.id, data.name, data.id_typeChair);
    }
  }
 module.exports =  Chairs;