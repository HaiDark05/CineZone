const express = require("express");
const {
    getAllTypeChairs,
    getTypeChairsById,
    addTypeChairs,
    updateTypeChairs,
    deleteTypeChairs,
} = require("../controllers/typeChairsController");

const router = express.Router();

router.get("/", getAllTypeChairs);
router.get("/:id", getTypeChairsById);
router.post("/", addTypeChairs);
router.put("/:id", updateTypeChairs);
router.delete("/:id", deleteTypeChairs);

module.exports = router;