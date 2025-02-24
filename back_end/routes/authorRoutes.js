const express = require("express");
const {
    getAllAuthors,
    getAuthorsById,
    addAuthors,
    updateAuthors,
    deleteAuthors,
} = require("../controllers/authorsController");

const router = express.Router();

router.get("/", getAllAuthors);
router.get("/:id", getAuthorsById);
router.post("/", addAuthors);
router.put("/:id", updateAuthors);
router.delete("/:id", deleteAuthors);

module.exports = router;