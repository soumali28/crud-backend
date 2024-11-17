const express = require("express");
const {
  addZone,
  updateZone,
  deleteZone,
  getAllZones
} = require("../controllers/zoneController");
const router = express.Router();

router.get("/all", getAllZones);
router.post("/add", addZone);
router.delete("/delete/:id", deleteZone);
router.post("/update/:id", updateZone);

module.exports = router;
