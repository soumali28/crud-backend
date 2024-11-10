const Customer = require("../models/Customer");

// Add a new customer
exports.addCustomer = async (req, res) => {
  const {
    setupBoxNo,
    firstName,
    lastName,
    email,
    mobileNo,
    companyName,
    address,
    landmark,
    city,
    pincode,
    zone,
    servicePlan,
    amt,
    remarks,
    credit,
    deposit,
    takenBy,
    isActive,
  } = req.body;

  try {
    if (!setupBoxNo) {
      return res.status(400).json({ message: "SetupBoxNo is required." });
    }
    const existingCustomer = await Customer.findOne({ setupBoxNo });
    if (existingCustomer) {
      return res.status(400).json({ message: "Customer with this Setupbox No already exists." });
    }

    // Create new customer
    const customer = await Customer.create({
      setupBoxNo,
      firstName,
      lastName,
      email,
      mobileNo,
      companyName,
      address,
      landmark,
      city,
      pincode,
      zone,
      servicePlan,
      amt,
      remarks,
      credit,
      deposit,
      takenBy: deposit === "cash" ? takenBy : undefined, // takenBy is only required if deposit is cash
      isActive,
    });

    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
