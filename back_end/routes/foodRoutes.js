const express = require("express");
const {
    getAllFood,
    getFoodById,
    addFood,
    updateFood,
    deleteFood,
} = require("../controllers/foodController");

const router = express.Router();

router.get("/", getAllFood);
router.get("/:id", getFoodById);
router.post("/", addFood);
router.put("/:id", updateFood);
router.delete("/:id", deleteFood);

module.exports = router;