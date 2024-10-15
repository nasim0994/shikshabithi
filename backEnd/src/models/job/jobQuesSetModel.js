const mongoose = require("mongoose");

const jobQuesSetModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    institute: {
      type: mongoose.Types.ObjectId,
      ref: "Institute",
      required: true,
    },
  },
  { timestamps: false }
);

const JobQuesSet = mongoose.model("JobQuesSet", jobQuesSetModelSchema);

module.exports = JobQuesSet;
