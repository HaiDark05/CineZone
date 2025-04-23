const express = require("express");
const {
  getAllAccount,
  getAccountById,
  addAccount,
  getInforAccount,
  updateAccount,
  deleteAccount,
} = require("../controllers/accountsController");

const router = express.Router();

router.get("/", getAllAccount);
router.get("/:id", getAccountById);
router.post("/", addAccount);
router.put("/:id", updateAccount);
router.delete("/:id", deleteAccount);

module.exports = router;