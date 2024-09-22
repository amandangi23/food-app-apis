const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

// CREATE FOOD CONTROLLER
const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;
    if (!title || !description || !price || !restaurant) {
      return res.status(401).send({
        success: false,
        message: "Please provide all required fields",
      });
    }
    const newFood = new foodModel({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    });
    await newFood.save();
    return res.status(201).send({
      success: true,
      message: "New Food item created successfully",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create food api",
    });
  }
};

// GET ALL FOOD CONTROLLER
const getAllFoodController = async (req, res) => {
  try {
    const foods = await foodModel.find();
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: "No food items found",
      });
    }
    return res.status(200).send({
      success: true,
      totalFood: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get all food api",
      error,
    });
  }
};

// GET SINGLE FOOD CONTROLLER
const getSingleFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(400).send({
        success: false,
        message: "Please provide food id",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food item found with given id",
      });
    }
    return res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in get single food api",
    });
  }
};

// GET FOOD BY RESTAURANT CONTROLLER
const getFoodByRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(400).send({
        success: false,
        message: "Please provide restaurant id",
      });
    }
    const foods = await foodModel.find({ restaurant: restaurantId });
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: "No food item found with given restaurant id",
      });
    }
    return res.status(200).send({
      success: true,
      totalCount: foods.length,
      foods,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in get food by restaurant api",
    });
  }
};

// UPDATE FOOD CONTROLLER
const updateFoodByIdController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(401).send({
        success: false,
        message: "Please provide food id",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food item found with given id",
      });
    }
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;
    const updatedFood = await foodModel.findByIdAndUpdate(
      foodId,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailable,
        restaurant,
        rating,
      },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Food item updated successfully",
      updatedFood,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in update food api",
      error,
    });
  }
};

// DELETE FOOD CONTROLLER
const deleteFoodByIdController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(401).send({
        success: false,
        message: "Please provide food id",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food item found with given id",
      });
    }
    await foodModel.findByIdAndDelete(foodId);
    return res.status(200).send({
      success: true,
      message: "Food item deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in delete food api",
      error,
    });
  }
};

// PLACE ORDER FOOD API
const placeFoodOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      return res.status(401).send({
        success: false,
        message: "Please provide cart and payment details",
      });
    }
    // calculate price
    let totalPrice = 0;
    cart.map((item) => {
      totalPrice += item.price * item.quantity;
    });
    const newOrder = new orderModel({
      foods: cart,
      payment: totalPrice,
      buyer: req.body.userId,
    });
    await newOrder.save();
    return res.status(200).send({
      success: true,
      message: "Food order placed successfully",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in place food order api",
      error,
    });
  }
};

// CHANGE ORDER STATUS //
const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(401).send({
        success: false,
        message: "Please provide order id",
      });
    }
    const { status } = req.body;
    if (!status) {
      return res.status(401).send({
        success: false,
        message: "Please provide status",
      });
    }
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Order status updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in order status change api",
      error,
    });
  }
};

// export
module.exports = {
  createFoodController,
  getAllFoodController,
  getSingleFoodController,
  getFoodByRestaurantController,
  updateFoodByIdController,
  deleteFoodByIdController,
  placeFoodOrderController,
  orderStatusController,
};
