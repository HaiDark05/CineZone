const { db } = require("../config/firebase");
const accountsCollection = db.collection('accounts');
const Accounts = require('../models/Accounts');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY || "fallback_secret";
const getAllAccount = async (req, res) => {
  try {
    const snapshot = await accountsCollection.get(); // Truy vấn đúng
    const accounts = snapshot.docs.map(doc => Accounts.fromFirestore(doc)); // Sử dụng đúng phương thức
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getAccountById = async (req, res) => {
  try {
    const doc = await accountsCollection.doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: "Account not found" });
    }
    res.json(Accounts.fromFirestore(doc));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const addAccount = async (req, res) => {
  try {
    const { id_role, imgUrl, user_name, email, pass_word, phone, gender } = req.body;
    const docRef = accountsCollection.doc();
    const account = new Accounts(docRef.id, id_role, imgUrl, user_name, email, pass_word, phone, gender);
    
    // Lưu vào Firestore
    await docRef.set(account.toFirestore());

    // Trả về tài khoản vừa tạo
    res.status(201).json({ message: "Account added", account: account });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAccount = async (req, res) => {
  try {
    const {id_role, imgUrl, user_name, email, pass_word, phone, gender } = req.body;
    await accountsCollection.doc(req.params.id).update({ id_role, imgUrl, user_name, email, pass_word, phone, gender });
    res.json({ message: "Account updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteAccount = async (req, res) => {
  try {
    await accountsCollection.doc(req.params.id).delete();
    res.json({ message: "Account deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllAccount,
  getAccountById,
  addAccount,
  updateAccount,
  deleteAccount,
};