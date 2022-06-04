const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authService = require("../services/authService");
const { use } = require("../routes/authRoute");
require("dotenv").config();

// hepler funtion.
// Generate JWT.
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(500).json({
      success: false,
      message: "Missing username and/or password.",
    });
  } else {
    const data = await authService.handleUserLogin(email, password);
    if (data.success) {
      res.status(200).json({
        success: true,
        message: "Login successfully.",
        user: {
          email: data.user.email,
          role: data.user.role,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          gender: data.user.gender,
          token: generateToken(data.user.id),
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: `Incorrect username or password.`,
        user: {},
      });
    }
  }
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  const userId = req.userId;
  const data = await authService.handleInfoUser(userId);
  if (data.success) {
    res.status(200).json({
      success: data.success,
      message: `Info user id ${userId}`,
      user: data.user,
    });
  } else {
    res.status(400).json({
      success: false,
      message: `Not found user id ${userId}`,
    });
  }
};

module.exports = {
  loginUser,
  getMe,
};
