const express = require("express");
const {
  createCertificate,
  getAllCertificates,
  editCertificate,
  deleteCertificate,
} = require("../controllers/certificateController");

const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/create-certificate", verifyToken, createCertificate);
router.get("/get-certificates", verifyToken, getAllCertificates);
router.put("/edit-certificate", verifyToken, editCertificate);
router.delete("/delete-certificate/:_id", verifyToken, deleteCertificate);

module.exports = router;
