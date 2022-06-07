// hepler funtion.

const { createInspectionAsync } = require("../services/inspectionService");

// @desc    create a user have any role
// @route   POST /api/users/create-user
// @access  Private
const createInspection = async (req, res) => {
  const { startDate, endDate, sampled } = req.body;
  const { premisesId } = req.query;
  if (!startDate || !endDate || !sampled) {
    res.status(500).json({
      success: false,
      message: "Missing parameter",
    });
  } else {
    const data = await createInspectionAsync(
      startDate,
      endDate,
      sampled,
      premisesId
    );
    if (data.success) {
      res.status(200).json({
        success: true,
        message: data.message,
        inspection: data.inspection,
      });
    } else {
      res.status(400).json({
        success: false,
        message: data.message,
      });
    }
  }
};

module.exports = { createInspection };
