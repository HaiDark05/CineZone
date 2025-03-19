const { db } = require("../config/firebase");
const regionssCollection = db.collection('regions');
const Regions = require('../models/Regions');
// Lấy tất cả region
const getAllRegions = async (req, res) => {
  try {
    const snapshot = await regionssCollection.get(); // Truy vấn đúng
    const regions = snapshot.docs.map(doc => Regions.fromFirestore(doc)); // Sử dụng đúng phương thức
    res.json(regions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy region theo ID
const getRegionsById = async (req, res) => {
  try {
    const doc = await regionssCollection.doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: "Region not found" });
    }
    res.json(Regions.fromFirestore(doc));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm region mới
const addRegions = async (req, res) => {
  try {
    const {imgUrl, name, description} = req.body;
    const docRef = regionssCollection.doc();
    const regions = new Regions(docRef.id, imgUrl, name, description);
    await docRef.set(regions.toFirestore());
    res.status(201).json({ message: "Region added", regions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật cinema
const updateRegions = async (req, res) => {
  try {
    const {imgUrl, name, description} = req.body;
    await regionssCollection.doc(req.params.id).update({ imgUrl, name, description });
    res.json({ message: "Region updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa Cinema
const deleteRegions = async (req, res) => {
  try {
    await regionssCollection.doc(req.params.id).delete();
    res.json({ message: "Region deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllRegions,
  getRegionsById,
  addRegions,
  updateRegions,
  deleteRegions,
};