const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    package: {
      package: {
        type: mongoose.Types.ObjectId,
        ref: "Package",
      },
      expires: {
        type: Date,
      },
      status: {
        type: String,
        default: "pending",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      default: "google",
    },
    otp: {
      type: Number,
    },
    otpExpires: {
      type: Date,
    },
    profile: {
      type: mongoose.Types.ObjectId,
      ref: "Profile",
    },
    downloadhandnotes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
