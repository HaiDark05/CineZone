const express = require("express");
const {
    getAllLocation,
    getLocationById,
    addLocation,
    updateLocation,
    deleteLocation,
} = require("../controllers/locationController");

const router = express.Router();

router.get("/", getAllLocation);
router.get("/:id", getLocationById);
router.post("/", addLocation);
router.put("/:id", updateLocation);
router.delete("/:id", deleteLocation);

module.exports = router;