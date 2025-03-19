const express = require("express");
const {
    getAllRooms,
    getRoomsById,
    addRooms,
    updateRoom,
    deleteRoom,
} = require("../controllers/roomsController");

const router = express.Router();

router.get("/", getAllRooms);
router.get("/:id", getRoomsById);
router.post("/", addRooms);
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);

module.exports = router;