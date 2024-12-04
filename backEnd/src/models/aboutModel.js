const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

const About = mongoose.model("About", AboutSchema);

module.exports = About;
