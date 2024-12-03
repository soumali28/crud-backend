const express = require("express");
const { addBilling, getBillingsByDateRange, deleteBilling } = require("../controllers/billingController");
const router = express.Router();

router.post("/add", addBilling);
router.delete("/delete/:id", deleteBilling);
router.get("/filter", getBillingsByDateRange);

module.exports = router;
