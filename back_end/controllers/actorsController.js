const { db } = require("../config/firebase");
const actorsCollection = db.collection('actors');
const Actors = require('../models/Actors');
// Lấy tất cả actors
const getAllActors = async (req, res) => {
  try {
    const snapshot = await actorsCollection.get(); // Truy vấn đúng
    const actors = snapshot.docs.map(doc => Actors.fromFirestore(doc)); // Sử dụng đúng phương thức
    res.json(actors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy actor theo ID
const getActorsById = async (req, res) => {
  try {
    const doc = await actorsCollection.doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: "Actors not found" });
    }
    res.json(Actors.fromFirestore(doc));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm actor mới
const addActors = async (req, res) => {
  try {
    const {imgUrl, name, description } = req.body;
    const docRef = actorsCollection.doc();
    const actors = new Actors(docRef.id, imgUrl, name, description);
    await docRef.set(actors.toFirestore());
    res.status(201).json({ message: "Actor added", actors });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật actor
const updateActors = async (req, res) => {
  try {
    const {imgUrl, name, description } = req.body;
    await actorsCollection.doc(req.params.id).update({ imgUrl, name, description });
    res.json({ message: "Actors updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa actor
const deleteActors = async (req, res) => {
  try {
    await actorsCollection.doc(req.params.id).delete();
    res.json({ message: "Actors deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllActors,
  getActorsById,
  addActors,
  updateActors,
  deleteActors,
};