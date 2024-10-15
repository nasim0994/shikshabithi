const Model = require("../../models/profileModel");
const User = require("../../models/userModel");

exports.update = async (req, res) => {
  try {
    let data = req?.body;

    let user = req.user;

    // Check user exist
    let userResult = await User.findOne({ email: user?.email });

    if (!userResult?._id) {
      return res.status(202).json({
        success: false,
        message: "user not found!",
      });
    }

    let profile = userResult.profile;

    // Check profile exist
    let profileResult = await Model.findById(profile);

    if (!profileResult?._id) {
      return res.status(202).json({
        success: false,
        message: "profile not found!",
      });
    }

    // update
    let result = await Model.findByIdAndUpdate(
      profile,
      { ...data },
      {
        new: true,
      }
    );

    if (result?._id) {
      res.status(200).json({
        success: true,
        message: "Profile info update success",
        data: result,
      });
    } else {
      res.status(202).json({
        success: false,
        message: "Profile info update fail!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
