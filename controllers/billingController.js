const Billing = require("../models/Billings");

// Add a new billing entry
exports.addBilling = async (req, res) => {
  const { customerName, setupBoxNumber, date, amt, deposit, takenBy } = req.body;

  try {
    if (!customerName || !setupBoxNumber || !date || !amt || !deposit || !takenBy) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    const billing = await Billing.create({
      customerName,
      setupBoxNumber,
      date,
      amt,
      deposit,
      takenBy,
    });

    res.status(201).json(billing);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all billings within a date range
exports.getBillingsByDateRange = async (req, res) => {
  let { startDate, endDate } = req.query;

  try {
    // If startDate and endDate are not provided, set them to the 1st and last date of the current month
    if (!startDate || !endDate) {
      const today = new Date();
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);  // 1st day of the current month
      const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of the current month

      startDate = firstDay.toISOString();
      endDate = lastDay.toISOString();
    }

    // Ensure the date values are valid
    if (isNaN(new Date(startDate)) || isNaN(new Date(endDate))) {
      return res.status(400).json({ message: "Invalid date format." });
    }

    const billings = await Billing.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    });

    res.status(200).json(billings);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// delete billing 
exports.deleteBilling = async (req, res) => {
  try {
    const billing = await Billing.findByIdAndDelete(req.params.id);
    if (!billing) {
      return res.status(404).json({ message: "Billing not found" });
    }
    res.status(200).json({ message: "Billing deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}
