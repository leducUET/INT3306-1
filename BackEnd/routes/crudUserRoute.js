const express = require("express");
const {
  getAllUsers,
  createUser,
  editUser,
  deleteUser,
} = require("../controllers/crudUserController");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/get-users", verifyToken, getAllUsers);
router.post("/create-user", verifyToken, createUser);
router.put("/edit-user", verifyToken, editUser);
router.delete("/delete-user/:_id", verifyToken, deleteUser);

module.exports = router;
