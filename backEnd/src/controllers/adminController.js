const User = require("../models/userModel");
const Profile = require("../models/profileModel");

exports.addAdmin = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const isExisted = await User.exists({ email });

    if (isExisted) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists. Please use a different email.",
      });
    }

    const user = await User.create({ email, password, role: "admin" });

    if (user?._id) {
      let useId = user._id;

      const profile = await Profile.create({ name, user: useId });

      if (profile?._id) {
        await User.findByIdAndUpdate(useId, { profile: profile._id });

        res.status(200).json({
          success: true,
          message: "Admin registered successfully",
        });
      } else {
        await User.findByIdAndDelete(useId);
        res.status(400).json({
          success: false,
          message: "Profile creation failed, admin deleted",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Admin registration failed",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await User.find({ role: "admin" }, { password: 0 }).populate(
      "profile"
    );
    res.status(200).json({
      success: true,
      message: "User get success",
      data: result,
    });
  } catch (err) {
    console.log("Error");
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await User.findById(id, { password: 0 }).populate("profile");
    res.status(200).json({
      success: true,
      message: "admin get success",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      error: err.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, email } = req.body;

    const result = await User.findByIdAndUpdate(
      req.params.id,
      { email },
      { new: true }
    );

    const profileResult = await Profile.findByIdAndUpdate(
      result?.profile,
      { name },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      error: err.message,
    });
  }
};

exports.destroy = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    await Profile.findByIdAndDelete(result.profile);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      error: err.message,
    });
  }
};
