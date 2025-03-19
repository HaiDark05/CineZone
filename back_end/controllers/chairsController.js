const { db } = require("../config/firebase");
const chairsCollection = db.collection('chairs');
const Chairs = require('../models/Chairs');
// Lấy tất cả actors
const getAllChairs = async (req, res) => {
  try {
    const snapshot = await chairsCollection.get(); // Truy vấn đúng
    const chairs = snapshot.docs.map(doc => Chairs.fromFirestore(doc)); // Sử dụng đúng phương thức
    res.json(chairs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy actor theo ID
const getChairsById = async (req, res) => {
  try {
    const doc = await chairsCollection.doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: "Chairs not found" });
    }
    res.json(Chairs.fromFirestore(doc));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm actor mới
const addChairs = async (req, res) => {
  try {
    const {name, id_typeChair } = req.body;
    const docRef = chairsCollection.doc();
    const chairs = new Chairs(docRef.id, name, id_typeChair);
    await docRef.set(chairs.toFirestore());
    res.status(201).json({ message: "Chair added", chairs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật actor
const updateChairs = async (req, res) => {
  try {
    const {name, id_typeChair } = req.body;
    await chairsCollection.doc(req.params.id).update({name, id_typeChair });
    res.json({ message: "Chairs updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa actor
const deleteChairs = async (req, res) => {
  try {
    await chairsCollection.doc(req.params.id).delete();
    res.json({ message: "Chairs deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllChairs,
  getChairsById,
  addChairs,
  updateChairs,
  deleteChairs,
};