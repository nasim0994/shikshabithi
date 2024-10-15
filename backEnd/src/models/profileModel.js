const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    image: {
      type: String,
    },
    banner: {
      type: String,
    },
    address: {
      type: String,
    },
    bio: {
      type: String,
    },
    profession: {
      type: String,
    },
    educationLevel: {
      type: String,
    },
    institute: {
      type: String,
    },
    organization: {
      type: String,
    },
    website: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    youtube: {
      type: String,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: false }
);

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
