class MovieScreens {
    constructor(id, id_movie, id_room, releast_day, screening_time, ratio) {
      this.id = id;
      this.id_movie = id_movie;
      this.id_room = id_room;
      this.releast_day = releast_day;
      this.screening_time = screening_time;
      this.ratio = ratio;
    }
  
    toFirestore() {
      return {
        id_movie: this.id_movie,
        id_room: this.id_room,
        releast_day: this.releast_day,
        screening_time: this.screening_time,
        ratio: this.ratio,       
      };
    }
  
    static fromFirestore(doc) {
      const data = doc.data();
      return new MovieScreens(doc.id, data.id_movie, data.id_room, data.releast_day, data.screening_time, data.ratio);
    }
  }
 module.exports =  MovieScreens;