const express = require("express");
const {
    getAllChairs,
    getChairsById,
    addChairs,
    updateChairs,
    deleteChairs,
} = require("../controllers/chairsController");

const router = express.Router();

router.get("/", getAllChairs);
router.get("/:id", getChairsById);
router.post("/", addChairs);
router.put("/:id", updateChairs);
router.delete("/:id", deleteChairs);

module.exports = router;