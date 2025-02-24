const express = require("express");
const {
    getAllActors,
    getActorsById,
    addActors,
    updateActors,
    deleteActors,
} = require("../controllers/actorsController");

const router = express.Router();

router.get("/", getAllActors);
router.get("/:id", getActorsById);
router.post("/", addActors);
router.put("/:id", updateActors);
router.delete("/:id", deleteActors);

module.exports = router;