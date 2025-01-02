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
    // Validate setupBoxNo
    if (!setupBoxNo) {
      return res.status(400).json({ message: "SetupBoxNo is required." });
    }

    // Check if customer already exists
    const existingCustomer = await Customer.findOne({ setupBoxNo });
    if (existingCustomer) {
      return res
        .status(400)
        .json({ message: "Customer with this SetupBoxNo already exists." });
    }

    // Validate Zone ID
    const existingZone = await Zone.findById(zone);
    if (!existingZone) {
      return res
        .status(400)
        .json({ message: "Invalid Zone ID. Zone does not exist." });
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
      zone, // Reference to the Zone schema
      servicePlan,
      amt,
      remarks,
      credit,
      deposit,
      takenBy: deposit === "cash" ? takenBy : undefined, // Only required if deposit is cash
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

//Update Customer by ID
exports.updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(updatedCustomer);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//Delete customer by ID
exports.deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//Filter customer by STB, name, status, zone
exports.filterCustomers = async (req, res) => {
  try {
    const { setupBoxNo, name, status, zone, mobileNo } = req.body;
    const query = {};

    if (setupBoxNo) {
      query.setupBoxNo = new RegExp(setupBoxNo, "i");
    }
    if (name) {
      const nameParts = name.split(" ");
      if (nameParts.length === 1) {
        query.$or = [
          { firstName: new RegExp(nameParts[0], "i") },
          { lastName: new RegExp(nameParts[0], "i") },
        ];
      } else {
        query.firstName = new RegExp(nameParts[0], "i");
        query.lastName = new RegExp(nameParts.slice(1).join(" "), "i");
      }
    }
    if (status) {
      query.status = status;
    }
    if (zone) {
      query.zone = zone;
    }
    if (mobileNo) {
      query.mobileNo = new RegExp(mobileNo, "i");
    }
    const customers = await Customer.find(query);
    res.status(200).json(customers);
  } catch (error) {
    console.error("Error filtering customers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
