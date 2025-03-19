const { db } = require("../config/firebase");
const roomsCollection = db.collection('rooms');
const Room = require('../models/Rooms');
// Lấy tất cả cinemas
const getAllRooms = async (req, res) => {
  try {
    const snapshot = await roomsCollection.get(); // Truy vấn đúng
    const rooms = snapshot.docs.map(doc => Room.fromFirestore(doc)); // Sử dụng đúng phương thức
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy cinema theo ID
const getRoomsById = async (req, res) => {
  try {
    const doc = await roomsCollection.doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: "Rooms not found" });
    }
    res.json(Room.fromFirestore(doc));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm cinema mới
const addRooms = async (req, res) => {
  try {
    const {name, rows, cols, list_chair, id_cinema, id_location, id_region } = req.body;
    const docRef = roomsCollection.doc();
    const rooms = new Room(docRef.id, name, rows, cols, list_chair, id_cinema, id_location, id_region);
    await docRef.set(rooms.toFirestore());
    res.status(201).json({ message: "Room added", rooms });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật cinema
const updateRoom = async (req, res) => {
  try {
    const {name, rows, cols, list_chair, id_cinema, id_location, id_region} = req.body;
    await roomsCollection.doc(req.params.id).update({ name, rows, cols, list_chair, id_cinema, id_location, id_region });
    res.json({ message: "Room updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa Cinema
const deleteRoom = async (req, res) => {
  try {
    await roomsCollection.doc(req.params.id).delete();
    res.json({ message: "Room deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllRooms,
  getRoomsById,
  addRooms,
  updateRoom,
  deleteRoom,
};