const categoryModel = require("../models/categoryModel.js");

// CATEGORY CONTROLLERS

// CREATE CATEGORY CONTROLLER
const createCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    // validation
    if (!title) {
      return res.status(400).send({
        success: false,
        message: "Please provide title",
      });
    }
    const newCategory = new categoryModel({ title, imageUrl });
    await newCategory.save();
    return res.status(201).send({
      success: true,
      message: "Category created successfully",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error creating category api",
      error,
    });
  }
};

// GET ALL CATEGORY CONTROLLER
const getAllCategoryController = async (req, res) => {
  try {
    const categorys = await categoryModel.find();
    if (!categorys) {
      return res.status(404).send({
        success: false,
        message: "No categories found",
      });
    }
    return res.status(200).send({
      success: true,
      totalCount: categorys.length,
      data: categorys,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error getting all categories api",
      error,
    });
  }
};

// UPDATE CATEGORY CONTROLLER
const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(500).send({
        success: false,
        message: "Failed to update category",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Category updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error updating category api",
      error,
    });
  }
};

// DELETE CATEGORY CONTROLLER
const deleteCategoryController = async (req, res) => {
  try {
    const categoryId = req.params.id;
    if (!categoryId) {
      return res.status(400).send({
        success: false,
        message: "Category id is required",
      });
    }
    await categoryModel.findByIdAndDelete(categoryId);
    return res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in delete category api",
      error,
    });
  }
};

// export
module.exports = {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
