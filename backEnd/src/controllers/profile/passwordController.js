const User = require("../../models/userModel");
const bcrypt = require("bcrypt");

exports.update = async (req, res) => {
  try {
    let { oldPassword, newPassword } = req.body;
    let user = req.user;

    // Check user exist
    let userResult = await User.findOne({ email: user?.email });

    if (!userResult?._id) {
      return res.status(202).json({
        success: false,
        message: "user not found!",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, userResult?.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Password is incorrect!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const newPass = await bcrypt.hash(newPassword, salt);

    // update
    let result = await User.findByIdAndUpdate(
      profile,
      { password: newPass },
      {
        new: false,
      }
    );

    if (result?._id) {
      res.status(200).json({
        success: true,
        message: "Password update success",
        data: result,
      });
    } else {
      res.status(202).json({
        success: false,
        message: "Password update fail!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
