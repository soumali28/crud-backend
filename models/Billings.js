// models/Billing.js
const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  setupBoxNumber: { type: String, required: true },
  date: { type: Date, required: true },
  amt: { type: Number, required: true },
  deposit: { type: String, enum: ["CASH", "ONLINE"], required: true },
  takenBy: { type: String, required: true },
  note:{type: String},
});

module.exports = mongoose.model("Billing", billingSchema);
