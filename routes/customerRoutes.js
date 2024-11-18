const express = require("express");
const {
  addCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  filterCustomers,
} = require("../controllers/customerController");
const router = express.Router();

router.post("/add", addCustomer);
router.post("/update/:id", updateCustomer);
router.delete("/delete/:id", deleteCustomer);
router.get("/all", getAllCustomers);
router.get("/:id", getCustomerById);
router.post("/filterCustomers", filterCustomers);

module.exports = router;
