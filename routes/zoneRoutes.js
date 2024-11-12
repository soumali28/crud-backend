const express = require("express");
const { addZone, updateZone, deleteZone } = require("../controllers/zoneController");
const router = express.Router();

router.post("/add", addZone);

router.get("/delete/:id", deleteZone);

router.get("/update/:id", updateZone);

module.exports = router;
