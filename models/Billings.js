// models/Billing.js
const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  setupBoxNumber: { type: String, required: true },
  date: { type: Date, required: true },
  amt: { type: Number, required: true },
  deposit: { type: String, enum: ["CASH", "ONLINE"], required: true },
  takenBy: { type: String, required: true },
});

module.exports = mongoose.model("Billing", billingSchema);
