const express = require("express");
const router = express.Router();
const {
  registerController,
  loginContoller,
} = require("../controllers/authController");

// register || POST
router.post("/register", registerController);

// login || POST
router.post("/login", loginContoller);

// exports
module.exports = router;
