const express = require("express");
const validateToken = require("../middleware/authMiddleware");
const {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("../controllers/categoryController");
const router = express.Router();

// routes
// CREATE CATEGORY || POST
router.post("/create", validateToken, createCategoryController);

// GET ALL CATEGORY || GET
router.get("/getAll", getAllCategoryController);

// UPDATE CATEGORY || PUT
router.put("/update/:id", validateToken, updateCategoryController);

// DELETE CATEGORY || DELETE
router.delete("/delete/:id", validateToken, deleteCategoryController);

// export
module.exports = router;
