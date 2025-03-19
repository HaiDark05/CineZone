const express = require("express");
const {
    getAllRegions,
  getRegionsById,
  addRegions,
  updateRegions,
  deleteRegions,
} = require("../controllers/regionsController");

const router = express.Router();

router.get("/", getAllRegions);
router.get("/:id", getRegionsById);
router.post("/", addRegions);
router.put("/:id", updateRegions);
router.delete("/:id", deleteRegions);

module.exports = router;