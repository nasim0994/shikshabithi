const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        error: "You are not logged in",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findOne({ email: decoded.email });

    req.user = {
      _id: user?._id,
      email: user?.email,
      password: user?.password,
      role: user?.role,
    };
    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      error,
    });
  }
};
