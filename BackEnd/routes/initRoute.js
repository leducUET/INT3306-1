const express = require("express");
const router = express.Router();

router.post("/create-user", async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    placeManagement,
    gender,
    roleId,
  } = req.body;
});

module.exports = router;
