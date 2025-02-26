const { db } = require("../config/firebase");
const moviesCollection = db.collection('movies');
const Movies = require('../models/Movies');
// Lấy tất cả Movie
const getAllMovies = async (req, res) => {
  try {
    const snapshot = await moviesCollection.get(); // Truy vấn đúng
    const movies = snapshot.docs.map(doc => Movies.fromFirestore(doc)); // Sử dụng đúng phương thức
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy movie theo ID
const getMoviesById = async (req, res) => {
  try {
    const doc = await moviesCollection.doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: "Movies not found" });
    }
    res.json(Movies.fromFirestore(doc));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm Movie mới
const addMovies = async (req, res) => {
  try {
    const {imgUrl, name, description, urlTrailer, duration, id_author, listCate, listActor, listCharacter } = req.body;
    const docRef = moviesCollection.doc();
    const movies = new Movies(docRef.id, imgUrl, name, description, urlTrailer, duration, id_author, listCate, listActor, listCharacter );
    await docRef.set(movies.toFirestore());
    res.status(201).json({ message: "Movies added", movies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật Movie
const updateMovies = async (req, res) => {
  try {
    const {imgUrl, name, description, urlTrailer, duration, id_author, listCate, listActor, listCharacter } = req.body;
    await moviesCollection.doc(req.params.id).update({ imgUrl, name, description, urlTrailer, duration, id_author, listCate, listActor, listCharacter });
    res.json({ message: "Movies updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa Movie
const deleteMovies = async (req, res) => {
  try {
    await moviesCollection.doc(req.params.id).delete();
    res.json({ message: "Movies deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllMovies,
  getMoviesById,
  addMovies,
  updateMovies,
  deleteMovies,
};