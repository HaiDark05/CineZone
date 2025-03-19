const { db } = require("../config/firebase");
const movieScreensCollection = db.collection('movieScreens');
const MovieScreens = require('../models/MovieScreens');

const getAllMovieScreens = async (req, res) => {
  try {
    const snapshot = await movieScreensCollection.get(); // Truy vấn đúng
    const movieScreens = snapshot.docs.map(doc => MovieScreens.fromFirestore(doc)); // Sử dụng đúng phương thức
    res.json(movieScreens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getMovieScreensById = async (req, res) => {
  try {
    const doc = await movieScreensCollection.doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: "MovieScreens not found" });
    }
    res.json(MovieScreens.fromFirestore(doc));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const addMovieScreens = async (req, res) => {
  try {
    const {id_movie, id_room, releast_day, screening_time, ratio } = req.body;
    const docRef = movieScreensCollection.doc();
    const movieScreens = new MovieScreens(docRef.id, id_movie, id_room, releast_day, screening_time, ratio);
    await docRef.set(MovieScreens.toFirestore());
    res.status(201).json({ message: "MovieScreens added", movieScreens });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateMovieScreens = async (req, res) => {
  try {
    const {id_movie, id_room, releast_day, screening_time, ratio } = req.body;
    await movieScreensCollection.doc(req.params.id).update({ id_movie, id_room, releast_day, screening_time, ratio });
    res.json({ message: "MovieScreens updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteMovieScreens = async (req, res) => {
  try {
    await movieScreensCollection.doc(req.params.id).delete();
    res.json({ message: "MovieScreens deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllMovieScreens,
  getMovieScreensById,
  addMovieScreens,
  updateMovieScreens,
  deleteMovieScreens,
};