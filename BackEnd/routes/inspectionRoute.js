const express = require("express");
const { createInspection } = require("../controllers/inspectionController");

const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/get-inspections", verifyToken, getInspections);
router.post("/create-inspection", verifyToken, createInspection);
router.put("/edit-inspection", verifyToken, editINspection);
router.delete("/delete-inspection/:_id", verifyToken, deleteINspection);

module.exports = router;
