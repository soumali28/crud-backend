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
  const { startDate, endDate } = req.query;

  try {
    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Start date and end date are required." });
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
