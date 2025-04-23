const express = require("express");
const {
  getAllBookings,
  getBookingsById,
  addBookings,
  updateBookings,
  deleteBookings,
} = require("../controllers/bookingsController");

const router = express.Router();

router.get("/", getAllBookings);
router.get("/:id", getBookingsById);
router.post("/", addBookings);
router.put("/:id", updateBookings);
router.delete("/:id", deleteBookings);

module.exports = router;