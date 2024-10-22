const fs = require("fs");
const bcrypt = require("bcrypt");
const { createJsonWebToken } = require("../utils/jsonWebToken");
const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const { emailSend, verifyEmailSend } = require("../utils/emailSend");
const jwt = require("jsonwebtoken");
const frontendURL = process.env.FRONTEND_URL;

// exports.registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const user = await User.create({ email, password });

//     if (user?._id) {
//       let useId = user._id;

//       const profile = await Profile.create({ name, user: useId });

//       if (profile?._id) {
//         await User.findByIdAndUpdate(useId, { profile: profile._id });

//         res.status(200).json({
//           success: true,
//           message: "Register Success",
//         });
//       } else {
//         await User.findByIdAndDelete(useId);
//         res.status(400).json({
//           success: false,
//           message: "Profile creation failed, user deleted",
//         });
//       }
//     }
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

exports.getAll = async (req, res) => {
  try {
    const result = await User.find({});
    console.log("User",result);
    res.status(200).json({
      success: true,
      message: "User get success",
      data: result,
    });
  } catch (err) {
    console.log("Error")
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.processRegister = async (req, res) => {
  try {
    const newUser = req.body;
    const isExisted = await User.exists({ email: newUser.email });

    if (isExisted) {
      return res.status(400).json({
        success: false,
        message: "User already exist. please login",
      });
    }

    const userMail = newUser.email;
    const userName = newUser.name;
    const token = createJsonWebToken(newUser, "10m");

    verifyEmailSend(userMail, token, userName);

    res.send({
      success:
        "Verification email sent to your email. Please check your inbox.",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Token not found",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "unable to verify user",
      });
    }

    let { name, email, password } = decoded;

    const isExisted = await User.exists({ email: decoded.email });
    if (isExisted) {
      return res.status(400).json({
        success: false,
        message: "User already exist. please login",
      });
    }

    const user = await User.create({ email, password });

    if (user?._id) {
      let useId = user._id;

      const profile = await Profile.create({ name, user: useId });

      if (profile?._id) {
        await User.findByIdAndUpdate(useId, { profile: profile._id });

        res.redirect(`${frontendURL}/login`);
      } else {
        await User.findByIdAndDelete(useId);
        res.status(400).json({
          success: false,
          message: "Profile creation failed, user deleted",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 2. Load User
    const user = await User.findOne({ email: email }).populate("profile");

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "User not found",
      });
    }

    // 3. Match Password
    const isMatch = await bcrypt.compare(password, user?.password);

    if (!isMatch) {
      return res.status(404).json({
        success: false,
        error: "Email or password is incorrect",
      });
    }

    // 5. generate token
    let accessToken = "";
    if (user?.role === "admin") {
      accessToken = createJsonWebToken({ email, password }, "12h");
    } else {
      accessToken = createJsonWebToken({ email, password }, "7d");
    }

    res.status(200).json({
      success: true,
      message: "Login Success",
      token: accessToken,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).populate(
      "profile"
    );
    if (user) {
      res.status(200).json({
        success: true,
        data: user,
      });
    } else {
      res.status(404).json({
        success: false,
        error: "user not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.send({ error: "User not found" });
    }

    const token = createJsonWebToken({ email }, "10m");

    // Send OTP via email
    emailSend(email, token);

    res.send({
      success: "OTP sent to your email. Please check your inbox.",
    });
  } catch (err) {
    res.send({
      error: `OTP SEND FAILED ${err.message}`,
    });
  }
};

exports.recoverPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  console.log(token);

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: "unable to verify user",
    });
  }

  let { email } = decoded;

  const user = await User.findOne({ email });
  if (!user) {
    return res.send({ error: "User not found" });
  }

  user.password = newPassword;
  await user.save();

  res.send({ success: "Password reset successfully" });
};



//---------------------------------
// add admin user and profile table

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

