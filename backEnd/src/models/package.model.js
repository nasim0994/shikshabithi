const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    feature: {
      freeModeltest: { type: String, required: true },
      paidModeltest: { type: String, required: true },
      paidModeltestVendor: { type: String, required: true },
      onDemandtest: { type: String, required: true },
      downloadHandNote: { type: String, required: true },
      askQuestion: { type: String, required: true },
      pageView: { type: String, required: true },
    },
  },
  {
    timestamps: false,
  }
);

const Package = mongoose.model("Package", packageSchema);

module.exports = Package;
