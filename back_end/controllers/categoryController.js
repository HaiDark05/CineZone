const { db } = require("../config/firebase");
const categoriesCollection = db.collection('categories');
const Category = require('../models/Category');
// Lấy tất cả categories
const getAllCategories = async (req, res) => {
  try {
    const snapshot = await categoriesCollection.get(); // Truy vấn đúng
    const categories = snapshot.docs.map(doc => Category.fromFirestore(doc)); // Sử dụng đúng phương thức
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy category theo ID
const getCategoryById = async (req, res) => {
  try {
    const doc = await categoriesCollection.doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(Category.fromFirestore(doc));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm category mới
const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const docRef = categoriesCollection.doc();
    const category = new Category(docRef.id, name, description);
    await docRef.set(category.toFirestore());
    res.status(201).json({ message: "Category added", category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật category
const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    await categoriesCollection.doc(req.params.id).update({ name, description });
    res.json({ message: "Category updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa category
const deleteCategory = async (req, res) => {
  try {
    await categoriesCollection.doc(req.params.id).delete();
    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
};