class MovieScreens {
    constructor(id, id_movie, id_room, id_cinema, id_location, id_region, release_date, showtime, ratio) {
      this.id = id;
      this.id_movie = id_movie;
      this.id_room = id_room;
      this.id_cinema = id_cinema;
      this.id_location = id_location;
      this.id_region = id_region;
      this.release_date = release_date;
      this.showtime = showtime;
      this.ratio = ratio;
    }
  
    toFirestore() {
      return {
        id_movie: this.id_movie,
        id_room: this.id_room,
        id_cinema: this.id_cinema,
        id_location: this.id_location,
        id_region: this.id_region,
        release_date: this.release_date,
        showtime: this.showtime,
        ratio: this.ratio,       
      };
    }
  
    static fromFirestore(doc) {
      const data = doc.data();
      return new MovieScreens(doc.id, data.id_movie, data.id_room, data.id_cinema, data.id_location, data.id_region, data.release_date, data.showtime, data.ratio);
    }
  }
 module.exports =  MovieScreens;