const express = require("express");
const {
  getAllMovieScreens,
  getMovieScreensById,
  addMovieScreens,
  updateMovieScreens,
  deleteMovieScreens,
} = require("../controllers/movieScreensController");

const router = express.Router();

router.get("/", getAllMovieScreens);
router.get("/:id", getMovieScreensById);
router.post("/", addMovieScreens);
router.put("/:id", updateMovieScreens);
router.delete("/:id", deleteMovieScreens);

module.exports = router;