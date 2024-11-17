const express = require("express");
const { getAllPlans, addPlan, updatePlan, deletePlan } = require("../controllers/planController");
const router = express.Router();

router.get("/all", getAllPlans);
router.post("/add", addPlan);
router.delete("/delete/:id", deletePlan);
router.post("/update/:id", updatePlan);

module.exports = router;
