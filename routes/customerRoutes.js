const express = require("express");
const { addCustomer, getAllCustomers, getCustomerById } = require("../controllers/customerController");
const router = express.Router();

router.post("/add", addCustomer);

router.get("/all", getAllCustomers);

router.get("/:id", getCustomerById);

module.exports = router;
