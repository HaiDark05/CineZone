class Movies {
    constructor(id, imgUrl, name, description, urlTrailer, duration, id_author, listCate, listActor, listCharacter) {
      this.id = id;
      this.imgUrl = imgUrl
      this.name = name;
      this.description = description;
      this.urlTrailer = urlTrailer;
      this.duration = duration;
      this.id_author = id_author;
      this.listCate = listCate;
      this.listActor = listActor;
      this.listCharacter = listCharacter;
    }
  
    toFirestore() {
      return {
        imgUrl: this.imgUrl,
        name: this.name,
        description: this.description,
        urlTrailer: this.urlTrailer,
        duration: this.duration,
        id_author: this.id_author,
        listCate: this.listCate,
        listActor: this.listActor,
        listCharacter: this.listCharacter,
      };
    }
  
    static fromFirestore(doc) {
      const data = doc.data();
      return new Movies(doc.id, data.imgUrl, data.name, data.description, data.urlTrailer, data.duration, data.id_author, data.listCate, data.listActor, data.listCharacter);
    }
  }
 module.exports =  Movies;