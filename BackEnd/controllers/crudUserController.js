const {
  getAllUsersAsycn,
  createUserAsync,
  editUserAsync,
  deleteUserAsync,
} = require("../services/crudUserService");
// hepler funtion.

// @desc    Get all user have any role
// @route   GET /api/admin/get-users
// @access  Private
const getAllUsers = async (req, res) => {
  const { role } = req.query;
  const users = await getAllUsersAsycn(role);
  res.status(200).json({
    success: true,
    message: `All ${role}`,
    users,
  });
};

// @desc    create a user have any role
// @route   POST /api/users/create-user
// @access  Private
const createUser = async (req, res) => {
  const { email, firstName, lastName, placeManagement, gender } = req.body;
  const { role } = req.query;
  if (!email || !firstName || !lastName || !placeManagement || !gender) {
    res.status(500).json({
      success: false,
      message: "Missing parameter",
    });
  } else {
    const data = await createUserAsync(
      email,
      firstName,
      lastName,
      placeManagement,
      gender,
      role
    );
    if (data.success) {
      res.status(200).json({
        success: true,
        message: data.message,
        user: data.user,
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
const deleteUser = async (req, res) => {
  const userId = req.params._id;
  if (!userId) {
    res.status(500).json({
      success: false,
      message: "Missing parameter",
    });
  } else {
    const data = await deleteUserAsync(userId);
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

// @desc    edit a user
// @route   PUT /api/users/edit-user
// @access  Private
const editUser = async (req, res) => {
  const { email, firstName, lastName, placeManagement, gender, editPassword } =
    req.body;
  if (!email || !firstName || !lastName || !placeManagement || !gender) {
    res.status(500).json({
      success: false,
      message: "Missing parameter",
    });
  } else {
    const data = await editUserAsync(
      email,
      firstName,
      lastName,
      placeManagement,
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
  getAllUsers,
  createUser,
  editUser,
  deleteUser,
};
