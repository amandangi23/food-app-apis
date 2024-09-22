const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.body.userId);
    if (user.usertype !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Only admin can change the status",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "unauthorized access",
      error,
    });
  }
};
