const express = require("express");
const {
  createRestaurantController,
  getAllRestaurantsController,
  getRestauantByIdController,
  deleteRastaurantController,
} = require("../controllers/restaurantController");
const validateToken = require("../middleware/authMiddleware");
const router = express.Router();

// routes
// CREATE RESTAURANT || POST
router.post("/create", validateToken, createRestaurantController);

// GET ALL RESTAURANT || GET
router.get("/getAll", getAllRestaurantsController);

// GET RESTAURANT BY ID || GET
router.get("/:id", getRestauantByIdController);

// DELETE RESTAURANT || DELETE
router.delete("/delete/:id", validateToken, deleteRastaurantController);

// export
module.exports = router;
