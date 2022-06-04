const express = require("express");
const {
  getAllModerator,
  createModerator,
  editModerator,
  deleteModerator,
} = require("../controllers/adminController");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/get-moderators", verifyToken, getAllModerator);
router.post("/create-moderator", verifyToken, createModerator);
router.put("/edit-moderator", verifyToken, editModerator);
router.delete("/delete-moderator/:_id", verifyToken, deleteModerator);

module.exports = router;
