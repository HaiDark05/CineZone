const { db } = require("../config/firebase");
const bookingsCollection = db.collection('bookings');
const Bookings = require('../models/Bookings');
// Lấy tất cả SubScreens
const getAllBookings = async (req, res) => {
  try {
    const snapshot = await bookingsCollection.get(); // Truy vấn đúng
    const bookings = snapshot.docs.map(doc => Bookings.fromFirestore(doc)); // Sử dụng đúng phương thức
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy SubScreens theo ID
const getBookingsById = async (req, res) => {
  try {
    const doc = await bookingsCollection.doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: "Bookings not found" });
    }
    
    res.json(Bookings.fromFirestore(doc));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm SubScreens mới
const addBookings = async (req, res) => {
  try {
    const {id_account, id_screen, id_room, booking_date, list_chair, bill, total, totalFood, totalChair, time } = req.body;
    const docRef = bookingsCollection.doc();
    const bookings = new Bookings(docRef.id, id_account, id_screen, id_room, booking_date, list_chair, bill, total, totalFood, totalChair, time);
    await docRef.set(bookings.toFirestore());
    res.status(201).json({ message: "Bookings added", bookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật SubScreens
const updateBookings = async (req, res) => {
  try {
    const {id_account, id_screen, id_room, booking_date, list_chair, bill, total, totalFood, totalChair, time} = req.body;
    await bookingsCollection.doc(req.params.id).update({ id_account, id_screen, id_room, booking_date, list_chair, bill, total, totalFood, totalChair, time });
    res.json({ message: "Bookings updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa SubScreens
const deleteBookings = async (req, res) => {
  try {
    await bookingsCollection.doc(req.params.id).delete();
    res.json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllBookings,
  getBookingsById,
  addBookings,
  updateBookings,
  deleteBookings,
};