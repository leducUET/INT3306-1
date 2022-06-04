const {
  getAllModeratorAsycn,
  createModeratorAsync,
  editModeratorAsync,
  deleteModeratorAsync,
} = require("../services/adminService");
// hepler funtion.

// @desc    Get all moderators
// @route   GET /api/admin/get-moderators
// @access  Private - admin
const getAllModerator = async (req, res) => {
  const moderators = await getAllModeratorAsycn();
  res.status(200).json({
    success: true,
    message: "All moderators.",
    moderators,
  });
};

// @desc    create a moderator
// @route   POST /api/admin/create-moderator
// @access  Private - admin
const createModerator = async (req, res) => {
  const { email, firstName, lastName, gender } = req.body;
  if (!email || !firstName || !lastName || !gender) {
    res.status(500).json({
      success: false,
      message: "Missing parameter",
    });
  } else {
    const data = await createModeratorAsync(email, firstName, lastName, gender);
    if (data.success) {
      res.status(200).json({
        success: true,
        message: data.message,
        moderator: data.moderator,
      });
    } else {
      res.status(400).json({
        success: false,
        message: data.message,
      });
    }
  }
};

// @desc    delete a moderator
// @route   PUT /api/admin/delete-moderator
// @access  Private - admin
const deleteModerator = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(500).json({
      success: false,
      message: "Missing parameter",
    });
  } else {
    const data = await deleteModeratorAsync(email);
    if (data.success) {
      res.status(200).json({
        success: true,
        message: data.message,
      });
    } else {
      res.status(400).json({
        success: false,
        message: data.message,
      });
    }
  }
};

// @desc    edit a moderator
// @route   PUT /api/admin/edit-moderator
// @access  Private - admin
const editModerator = async (req, res) => {
  const { email, firstName, lastName, gender, editPassword } = req.body;
  if (!email || !firstName || !lastName || !gender) {
    res.status(500).json({
      success: false,
      message: "Missing parameter",
    });
  } else {
    const data = await editModeratorAsync(
      email,
      firstName,
      lastName,
      gender,
      editPassword
    );
    if (data.success) {
      res.status(200).json({
        success: true,
        message: data.message,
      });
    } else {
      res.status(400).json({
        success: false,
        message: data.message,
      });
    }
  }
};

module.exports = {
  getAllModerator,
  createModerator,
  editModerator,
  deleteModerator,
};
