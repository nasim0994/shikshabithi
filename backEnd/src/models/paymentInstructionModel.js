const mongoose = require("mongoose");

const paymentInstructionSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

const PaymentInstruction = mongoose.model(
  "PaymentInstruction",
  paymentInstructionSchema
);

module.exports = PaymentInstruction;
