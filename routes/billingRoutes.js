const express = require("express");
const { addBilling, getBillingsByDateRange, deleteBilling, getBillingById } = require("../controllers/billingController");
const router = express.Router();

router.post("/add", addBilling);
router.get("/find/:id", getBillingById);
router.delete("/delete/:id", deleteBilling);
router.get("/filter", getBillingsByDateRange);

module.exports = router;
