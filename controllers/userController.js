const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

// GET USER INFO
const getUserController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.userId });
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    user.password = undefined;
    return res.status(200).send({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in user get api",
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.userId });
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    // update
    const { username, address, phone } = req.body;
    if (username) user.username = username;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    // save
    const updatedUser = await user.save();
    return res.status(200).send({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      seccess: false,
      message: "Error in user update api",
    });
  }
};

const updateUserPasswordController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.userId });
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    // update password
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(401).send({
        success: false,
        message: "Please provide old and new password",
      });
    }
    const comparePassword = await bcrypt.compare(oldPassword, user.password);
    if (!comparePassword) {
      return res.status(401).send({
        success: false,
        message: "Old password is incorrect",
      });
    }
    // hashed password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in user password update api",
    });
  }
};

const resetUserPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    const user = await userModel.findOne({ email });
    if (req.body.userId !== user.id) {
      return res.status(401).send({
        success: false,
        message: "Your are not allowed to reset other users password",
      });
    }
    if (user.answer !== answer) {
      return res.status(401).send({
        success: false,
        message: "Your answer is incorrect",
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in reset password api",
    });
  }
};

const deleteUserController = async (req, res) => {
  try {
    if (req.body.userId !== req.params.id) {
      return res.status(401).send({
        success: false,
        message: "Your are not allowed to delete other users account",
      });
    }
    await userModel.findByIdAndDelete({ _id: req.params.id });
    return res.status(200).send({
      success: true,
      message: "User user account deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in delete user api",
    });
  }
};

// exports
module.exports = {
  getUserController,
  updateUserController,
  updateUserPasswordController,
  resetUserPasswordController,
  deleteUserController,
};
