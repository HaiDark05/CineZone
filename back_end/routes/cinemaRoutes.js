const express = require("express");
const {
    getAllCinemas,
    getCinemasById,
    addCinemas,
    updateCinemas,
    deleteCinemas,
} = require("../controllers/cinemasController");

const router = express.Router();

router.get("/", getAllCinemas);
router.get("/:id", getCinemasById);
router.post("/", addCinemas);
router.put("/:id", updateCinemas);
router.delete("/:id", deleteCinemas);

module.exports = router;