const express = require("express");
const {
    getAllMovies,
    getMoviesById,
    addMovies,
    updateMovies,
    deleteMovies,
} = require("../controllers/moviesController");

const router = express.Router();

router.get("/", getAllMovies);
router.get("/:id", getMoviesById);
router.post("/", addMovies);
router.put("/:id", updateMovies);
router.delete("/:id", deleteMovies);

module.exports = router;