const { db } = require("../config/firebase");
const typeChairsCollection = db.collection('typeChairs');
const TypeChairs = require('../models/TypeChairs');
// Lấy tất cả TypeChairs
const getAllTypeChairs = async (req, res) => {
  try {
    const snapshot = await typeChairsCollection.get(); // Truy vấn đúng
    const typeChairs = snapshot.docs.map(doc => TypeChairs.fromFirestore(doc)); // Sử dụng đúng phương thức
    res.json(typeChairs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy TypeChairs theo ID
const getTypeChairsById = async (req, res) => {
  try {
    const doc = await typeChairsCollection.doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: "TypeChairs not found" });
    }
    res.json(TypeChairs.fromFirestore(doc));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm TypeChairs mới
const addTypeChairs = async (req, res) => {
  try {
    const {imgUrl, name, price } = req.body;
    const docRef = typeChairsCollection.doc();
    const typeChairs = new TypeChairs(docRef.id, imgUrl, name, price);
    await docRef.set(typeChairs.toFirestore());
    res.status(201).json({ message: "TypeChairs added", typeChairs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật TypeChairs
const updateTypeChairs = async (req, res) => {
  try {
    const {imgUrl, name, price } = req.body;
    await typeChairsCollection.doc(req.params.id).update({ imgUrl, name, price });
    res.json({ message: "TypeChairs updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa TypeChairs
const deleteTypeChairs = async (req, res) => {
  try {
    await typeChairsCollection.doc(req.params.id).delete();
    res.json({ message: "TypeChairs deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTypeChairs,
  getTypeChairsById,
  addTypeChairs,
  updateTypeChairs,
  deleteTypeChairs,
};