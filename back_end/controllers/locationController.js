const { db } = require("../config/firebase");
const locationCollection = db.collection('location');
const Location = require('../models/Location');
// Lấy tất cả location
const getAllLocation = async (req, res) => {
  try {
    const snapshot = await locationCollection.get(); // Truy vấn đúng
    const location = snapshot.docs.map(doc => Location.fromFirestore(doc)); // Sử dụng đúng phương thức
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy location theo ID
const getLocationById = async (req, res) => {
  try {
    const doc = await locationCollection.doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.json(Location.fromFirestore(doc));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm Location mới
const addLocation = async (req, res) => {
  try {
    const {imgUrl, name, description } = req.body;
    const docRef = locationCollection.doc();
    const location = new Location(docRef.id, imgUrl, name, description);
    await docRef.set(location.toFirestore());
    res.status(201).json({ message: "Location added", location });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật location
const updateLocation = async (req, res) => {
  try {
    const {imgUrl, name, description } = req.body;
    await locationCollection.doc(req.params.id).update({ imgUrl, name, description });
    res.json({ message: "Location updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa location
const deleteLocation = async (req, res) => {
  try {
    await locationCollection.doc(req.params.id).delete();
    res.json({ message: "Location deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllLocation,
  getLocationById,
  addLocation,
  updateLocation,
  deleteLocation,
};