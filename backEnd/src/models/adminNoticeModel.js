const mongoose = require("mongoose");

const adminNoticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

adminNoticeSchema.pre("save", async function (next) {
  if (this.isActive) {
    await mongoose
      .model("AdminNotice")
      .updateMany({ _id: { $ne: this._id } }, { $set: { isActive: false } });
  }
  next();
});

const AdminNotice = mongoose.model("AdminNotice", adminNoticeSchema);

module.exports = AdminNotice;
