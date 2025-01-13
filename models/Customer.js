const mongoose = require("mongoose");

const customerSchema = mongoose.Schema(
  {
    setupBoxNo: {
      type: String,
      required: true,
    },
    oldSetupBoxId:{
      type: String
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    mobileNo: {
      type: [String],
      required: true,
    },
    companyName: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    zone: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Zone", 
      required: true,
    },
    servicePlan: {
      type: String,
      required: true,
    },
    amt: {
      type: Number,
      required: true,
    },
    remarks: {
      type: String,
      required: false,
    },
    credit: {
      type: Number,
      default: 0,
    },
    billings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Billing",
      },
    ],
    deposit: {
      type: String, // can be "cash" or "online"
    },
    takenBy: {
      type: String, // only required if deposit is "cash"
      required: function () {
        return this.deposit === "cash";
      },
    },
    isActive: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
