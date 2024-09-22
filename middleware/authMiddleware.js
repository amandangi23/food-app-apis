const JWT = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
          return res.status(401).send({
            success: false,
            message: "Token is not valid",
          });
        }
        req.body.userId = decode.id;
        next();
      });
    } else {
      return res.status(401).send({
        success: false,
        message: "Token is not provided",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Please Provide Auth Token",
      error,
    });
  }
};

// export
module.exports = validateToken;
