const express = require("express");
const { addPlan, updatePlan, deletePlan } = require("../controllers/planController");
const router = express.Router();

router.post("/add", addPlan);

router.get("/delete/:id", deletePlan);

router.get("/update/:id", updatePlan);

module.exports = router;
