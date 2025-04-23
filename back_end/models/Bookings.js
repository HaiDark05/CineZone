class Bookings {
    constructor(id, id_account, id_screen, id_room, booking_date, list_chair, bill, total, totalFood, totalChair, time) {
      this.id = id;
      this.id_account = id_account;
      this.id_screen = id_screen;
      this.id_room = id_room;
      this.booking_date = booking_date;
      this.list_chair = list_chair;
      this.bill = bill;
      this.total = total;
      this.totalFood = totalFood;
      this.totalChair = totalChair;
      this.time = time;
    }
  
    toFirestore() {
      return {
        id_account: this.id_account,
        id_screen: this.id_screen,
        id_room: this.id_room,
        booking_date: this.booking_date,
        list_chair: this.list_chair,
        bill: this.bill,
        total: this.total,
        totalFood: this.totalFood,
        totalChair: this.totalChair,
        time: this.time,
      };
    }
  
    static fromFirestore(doc) {
      const data = doc.data();
      return new Bookings(doc.id, data.id_account, data.id_screen, data.id_room, data.booking_date, data.list_chair, data.bill, data.total, data.totalFood, data.totalChair, data.time);
    }
  }
 module.exports =  Bookings;