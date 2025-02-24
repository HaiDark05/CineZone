const { db } = require("../config/firebase");
const charactersCollection = db.collection('characters');
const Characters = require('../models/Characters');
// Lấy tất cả characters
const getAllCharacters = async (req, res) => {
  try {
    const snapshot = await charactersCollection.get(); // Truy vấn đúng
    const characters = snapshot.docs.map(doc => Characters.fromFirestore(doc)); // Sử dụng đúng phương thức
    res.json(characters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy character theo ID
const getCharactersById = async (req, res) => {
  try {
    const doc = await charactersCollection.doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: "Characters not found" });
    }
    res.json(Characters.fromFirestore(doc));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm character mới
const addCharacters = async (req, res) => {
  try {
    const {imgUrl, name, description } = req.body;
    const docRef = charactersCollection.doc();
    const characters = new Characters(docRef.id, imgUrl, name, description);
    await docRef.set(characters.toFirestore());
    res.status(201).json({ message: "Character added", characters });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật character
const updateCharacters = async (req, res) => {
  try {
    const {imgUrl, name, description } = req.body;
    await charactersCollection.doc(req.params.id).update({ imgUrl, name, description });
    res.json({ message: "Characters updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa character
const deleteCharacters = async (req, res) => {
  try {
    await charactersCollection.doc(req.params.id).delete();
    res.json({ message: "Character deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCharacters,
  getCharactersById,
  addCharacters,
  updateCharacters,
  deleteCharacters,
};