const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
// controller functions //
// REGISTER;
const registerController = async (req, res) => {
  try {
    const { username, email, password, phone, address, answer } = req.body;
    // validation
    if (!username || !email || !password || !phone || !address || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please provide all required fields",
      });
    }
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(500).send({
        success: false,
        message: "Email already registered please login",
      });
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create new user
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    });
    return res.status(201).send({
      success: true,
      message: "registered successfully please login",
    });
  } catch (error) {
    console.log(error);
    res.status(500).sent({
      success: false,
      message: "error in register api",
      error,
    });
  }
};

// LOGIN;
const loginContoller = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).send({
        success: false,
        message: "Please provide both email and password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      user.password = undefined;
      return res.status(200).send({
        token,
        success: true,
        message: "Login successful",
        user,
      });
    } else {
      return res.status(401).send({
        success: false,
        message: "email or password do not match",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in login API ",
    });
  }
};

// export
module.exports = { registerController, loginContoller };
