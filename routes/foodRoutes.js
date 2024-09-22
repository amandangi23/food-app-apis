const express = require("express");
const adminMiddleware = require("../middleware/adminMiddleware");
const validateToken = require("../middleware/authMiddleware");
const {
  createFoodController,
  getAllFoodController,
  getSingleFoodController,
  getFoodByRestaurantController,
  updateFoodByIdController,
  deleteFoodByIdController,
  placeFoodOrderController,
  orderStatusController,
} = require("../controllers/foodController");

const router = express.Router();

// routes
// CREATE FOOD || POST
router.post("/create", validateToken, createFoodController);

// GET ALL FOOD || GET
router.get("/get/getAll", getAllFoodController);

// GET SINGLE FOOD || GET
router.get("/get/:id", getSingleFoodController);

// GET SINGLE FOOD || GET
router.get("/get/restaurant/:id", getFoodByRestaurantController);

// UPDATE SINGLE FOOD || PUT
router.put("/update/:id", validateToken, updateFoodByIdController);

// DELETE SINGLE FOOD || DELETE
router.delete("/delete/:id", deleteFoodByIdController);

// PLACE FOOD ORDER ROUTES //
// routes
router.post("/placeorder", validateToken, placeFoodOrderController);

// ORDER STATUS //
router.post(
  "/orderstatus/:id",
  validateToken,
  adminMiddleware,
  orderStatusController
);

// export
module.exports = router;
