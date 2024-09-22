const restaurantModel = require("../models/restaurantModel");

// CREATE RESTAURANT CONTROLLER
const createRestaurantController = async (req, res) => {
  try {
    const {
      name,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      code,
      coords,
    } = req.body;
    // validation
    if ((!name, !coords)) {
      return res.status(400).send({
        success: false,
        message: "Name and coordinates are required",
      });
    }
    const newRestaurant = new restaurantModel({
      name,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      code,
      coords,
    });
    await newRestaurant.save();
    return res.status(201).send({
      success: true,
      message: "Restaurant created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in creating restaurant",
    });
  }
};

// GET ALL RESTAURANTS CONTROLLER
const getAllRestaurantsController = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find();
    if (!restaurants) {
      return res.status(404).send({
        success: false,
        message: "No restaurants found",
      });
    }
    return res.status(200).send({
      success: true,
      totalCount: restaurants.length,
      data: restaurants,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting all restaurants",
      error,
    });
  }
};

// GET RESTAURANT BY ID CONTROLLER
const getRestauantByIdController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(400).send({
        success: false,
        message: "Please provide a restaurant id",
      });
    }
    const restaurant = await restaurantModel.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant not found",
      });
    }
    return res.status(200).send({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get restauant by id api",
      error,
    });
  }
};

// DELETE RESTAURANT CONTROLLER
const deleteRastaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(400).send({
        success: false,
        message: "Please provide a restaurant id",
      });
    }
    await restaurantModel.findByIdAndDelete(restaurantId);
    return res.status(200).send({
      success: true,
      message: "Restaurant deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in delete rastaurant api",
      error,
    });
  }
};

module.exports = {
  createRestaurantController,
  getAllRestaurantsController,
  getRestauantByIdController,
  deleteRastaurantController,
};
