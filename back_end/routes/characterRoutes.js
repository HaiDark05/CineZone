const express = require("express");
const {
    getAllCharacters,
    getCharactersById,
    addCharacters,
    updateCharacters,
    deleteCharacters,
} = require("../controllers/charactersController");

const router = express.Router();

router.get("/", getAllCharacters);
router.get("/:id", getCharactersById);
router.post("/", addCharacters);
router.put("/:id", updateCharacters);
router.delete("/:id", deleteCharacters);

module.exports = router;