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
    const accounts = new Accounts(docRef.id, id_role, imgUrl, user_name, email, pass_word, phone, gender);
    
    // Lưu vào Firestore
    await docRef.set(accounts.toFirestore());

    // Tạo token chứa userId
    const token = jwt.sign({ userId: docRef.id, email }, SECRET_KEY, { expiresIn: "7d" });

    // Lưu token vào cookie
    res.cookie("authToken", token, {
      httpOnly: true, // Bảo mật, không thể truy cập từ JS trên trình duyệt
      secure: true,   // Chỉ gửi qua HTTPS
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    });

    // Trả về tài khoản vừa tạo
    res.status(201).json({ message: "Account added", account: accounts, token });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInforAccount = async (req, res) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ message: "No auth token found." });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const doc = await accountsCollection.doc(decoded.userId).get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Account not found" });
    }

    const account = Accounts.fromFirestore(doc);
    res.status(200).json({ account });

  } catch (error) {
    res.status(401).json({ message: "Invalid token", error: error.message });
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
  getInforAccount,
  updateAccount,
  deleteAccount,
};