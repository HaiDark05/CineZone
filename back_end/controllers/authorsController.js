const { db } = require("../config/firebase");
const authorsCollection = db.collection('authors');
const Authors = require('../models/Authors');
// Lấy tất cả authors
const getAllAuthors = async (req, res) => {
  try {
    const snapshot = await authorsCollection.get(); // Truy vấn đúng
    const authors = snapshot.docs.map(doc => Authors.fromFirestore(doc)); // Sử dụng đúng phương thức
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy author theo ID
const getAuthorsById = async (req, res) => {
  try {
    const doc = await authorsCollection.doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.json(Authors.fromFirestore(doc));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm author mới
const addAuthors = async (req, res) => {
  try {
    const { name, description } = req.body;
    const docRef = authorsCollection.doc();
    const authors = new Authors(docRef.id, name, description);
    await docRef.set(authors.toFirestore());
    res.status(201).json({ message: "Author added", authors });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật author
const updateAuthors = async (req, res) => {
  try {
    const { name, description } = req.body;
    await authorsCollection.doc(req.params.id).update({ name, description });
    res.json({ message: "Authors updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa author
const deleteAuthors = async (req, res) => {
  try {
    await authorsCollection.doc(req.params.id).delete();
    res.json({ message: "Authors deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllAuthors,
  getAuthorsById,
  addAuthors,
  updateAuthors,
  deleteAuthors,
};