const express = require("express");
const { addBilling, getBillingsByDateRange } = require("../controllers/billingController");
const router = express.Router();

router.post("/add", addBilling);
router.get("/filter", getBillingsByDateRange);

module.exports = router;
