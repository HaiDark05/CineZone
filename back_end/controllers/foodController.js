const { db } = require("../config/firebase");
const foodCollection = db.collection('food');
const Food = require('../models/Food');
// Lấy tất cả food
const getAllFood = async (req, res) => {
  try {
    const snapshot = await foodCollection.get(); // Truy vấn đúng
    const food = snapshot.docs.map(doc => Food.fromFirestore(doc)); // Sử dụng đúng phương thức
    res.json(food);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy Food theo ID
const getFoodById = async (req, res) => {
  try {
    const doc = await foodCollection.doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.json(Food.fromFirestore(doc));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm Food mới
const addFood = async (req, res) => {
  try {
    const {imgUrl, name, price, discount, id_cinema } = req.body;
    const docRef = foodCollection.doc();
    const food = new Food(docRef.id, imgUrl, name, price, discount, id_cinema);
    await docRef.set(food.toFirestore());
    res.status(201).json({ message: "Food added", food });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật Food
const updateFood = async (req, res) => {
  try {
    const {imgUrl, name, price, discount, id_cinema } = req.body;
    await foodCollection.doc(req.params.id).update({ imgUrl, name, price, discount, id_cinema });
    res.json({ message: "Food updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa Food
const deleteFood = async (req, res) => {
  try {
    await foodCollection.doc(req.params.id).delete();
    res.json({ message: "Food deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllFood,
  getFoodById,
  addFood,
  updateFood,
  deleteFood,
};