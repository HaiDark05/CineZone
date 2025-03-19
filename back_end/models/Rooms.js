class Room {
    constructor(id, name, rows, cols, list_chair, id_cinema, id_location, id_region) {
      this.id = id;
      this.name = name;
      this.rows = rows;
      this.cols = cols;
      this.list_chair = list_chair;     
      this.id_cinema = id_cinema;
      this.id_location = id_location;
      this.id_region = id_region;
    }
  
    toFirestore() {
      return {
        name: this.name,
        rows: this.rows,
        cols: this.cols,
        list_chair: this.list_chair,
        id_cinema: this.id_cinema,
        id_location: this.id_location,
        id_region: this.id_region,
      };
    }
  
    static fromFirestore(doc) {
      const data = doc.data();
      return new Room(doc.id, data.name, data.rows, data.cols, data.list_chair, data.id_cinema, data.id_location, data.id_region);
    }
  }
 module.exports =  Room;