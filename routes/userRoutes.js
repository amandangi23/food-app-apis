const express = require("express");
const router = express.Router();
const {
  getUserController,
  updateUserController,
  updateUserPasswordController,
  resetUserPasswordController,
  deleteUserController,
} = require("../controllers/userController");
const validateToken = require("../middleware/authMiddleware");

// routes
// GET USER || GET
router.get("/getUser", validateToken, getUserController);

// UPDATE USER || PUT
router.put("/updateUser", validateToken, updateUserController);

// UPDATE PASSWORD || PUT
router.post("/updatePassword", validateToken, updateUserPasswordController);

// RESET PASSWORD || POST
router.post("/resetPassword", validateToken, resetUserPasswordController);

// DELETE USER || DELETE
router.delete("/deleteUser/:id", validateToken, deleteUserController);

// exports
module.exports = router;
