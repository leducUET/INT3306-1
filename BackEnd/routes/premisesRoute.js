const express = require("express");
const {
  getAllPremises,
  createPremises,
  editPremises,
  deletePremises,
} = require("../controllers/premisesController");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");

router.post("/create-premises", verifyToken, createPremises);
router.get("/get-premises", verifyToken, getAllPremises);
router.put("/edit-premises", verifyToken, editPremises);
router.delete("/delete-premises/:_id", verifyToken, deletePremises);

module.exports = router;
