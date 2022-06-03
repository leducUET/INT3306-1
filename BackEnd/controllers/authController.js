const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authService = require("../services/authService");
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
          roleId: data.user.roleId,
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
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res) => {};

module.exports = {
  loginUser,
  getMe,
};
