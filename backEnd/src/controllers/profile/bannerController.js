const fs = require("fs");
const Model = require("../../models/profileModel");
const User = require("../../models/userModel");

exports.update = async (req, res) => {
  let image = req?.file?.filename;
  try {
    if (!image) {
      return res.status(202).json({
        success: false,
        message: "Image is requerd",
      });
    }

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
      { banner: image },
      {
        new: true,
      }
    );

    if (result?._id) {
      fs.unlink(`./uploads/user/banner/${profileResult?.banner}`, (err) => {
        if (err) {
          console.error(err);
        }
      });

      res.status(200).json({
        success: true,
        message: "Image update success",
        data: result,
      });
    } else {
      res.status(202).json({
        success: false,
        message: "Image update fail!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });

    fs.unlink(`./uploads/user/banner/${image}`, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
};
