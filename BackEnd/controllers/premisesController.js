// @desc    Get all premises in any district
// @route   GET /api/admin/get-premises

const {
  createPremieseAsync,
  getAllPremisesAsycn,
  editPremisesAsync,
  deletePremisesAsync,
} = require("../services/premisesService");

// @access  Private
const getAllPremises = async (req, res) => {
  const { district } = req.query;

  const data = await getAllPremisesAsycn(district);
  res.status(200).json({
    success: true,
    message: `All premises in ${district}`,
    premises: data.premises,
  });
};

const createPremises = async (req, res) => {
  const { name, phoneNumber, type, wards, district } = req.body;
  if (!name || !phoneNumber || !type || !wards || !district) {
    res.status(500).json({
      success: false,
      message: "Missing parameter",
    });
  } else {
    const data = await createPremieseAsync(
      name,
      phoneNumber,
      type,
      wards,
      district
    );
    if (data.success) {
      res.status(200).json({
        success: true,
        message: data.message,
        premises: data.premises,
      });
    } else {
      res.status(400).json({
        success: false,
        message: data.message,
      });
    }
  }
};

const editPremises = async (req, res) => {
  const { name, phoneNumber, type, wards, district } = req.body;
  if (!name || !phoneNumber || !type || !wards || !district) {
    res.status(500).json({
      success: false,
      message: "Missing parameter",
    });
  } else {
    const data = await editPremisesAsync(
      name,
      phoneNumber,
      type,
      wards,
      district
    );
    if (data.success) {
      res.status(200).json({
        success: true,
        message: data.message,
        premises: data.premises,
      });
    } else {
      res.status(400).json({
        success: false,
        message: data.message,
      });
    }
  }
};

const deletePremises = async (req, res) => {
  const premisesId = req.params._id;
  if (!premisesId) {
    res.status(500).json({
      success: false,
      message: "Missing parameter",
    });
  } else {
    const data = await deletePremisesAsync(premisesId);
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
  getAllPremises,
  createPremises,
  editPremises,
  deletePremises,
};
