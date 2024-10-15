const mongoose = require("mongoose");

const founderSpeechSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    speech: {
      type: String,
      required: true,
    },
    facebook: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
    instagram: { type: String },
  },
  {
    timestamps: false,
  }
);

const FounderSpeech = mongoose.model("FounderSpeech", founderSpeechSchema);

module.exports = FounderSpeech;
