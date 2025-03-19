const { db } = require("../config/firebase");
const cinemasCollection = db.collection('cinemas');
const Cinemas = require('../models/Cinemas');
// Lấy tất cả cinemas
const getAllCinemas = async (req, res) => {
  try {
    const snapshot = await cinemasCollection.get(); // Truy vấn đúng
    const cinemas = snapshot.docs.map(doc => Cinemas.fromFirestore(doc)); // Sử dụng đúng phương thức
    res.json(cinemas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy cinema theo ID
const getCinemasById = async (req, res) => {
  try {
    const doc = await cinemasCollection.doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: "Cinemas not found" });
    }
    res.json(Cinemas.fromFirestore(doc));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm cinema mới
const addCinemas = async (req, res) => {
  try {
    const {imgUrl, name, address, id_location, id_region } = req.body;
    const docRef = cinemasCollection.doc();
    const cinemas = new Cinemas(docRef.id, imgUrl, name, address, id_location, id_region);
    await docRef.set(cinemas.toFirestore());
    res.status(201).json({ message: "Cinema added", cinemas });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật cinema
const updateCinemas = async (req, res) => {
  try {
    const {imgUrl, name, address, id_location, id_region } = req.body;
    await cinemasCollection.doc(req.params.id).update({ imgUrl, name, address, id_location, id_region });
    res.json({ message: "Cinema updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa Cinema
const deleteCinemas = async (req, res) => {
  try {
    await cinemasCollection.doc(req.params.id).delete();
    res.json({ message: "Cinema deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCinemas,
  getCinemasById,
  addCinemas,
  updateCinemas,
  deleteCinemas,
};