const express = require("express");
const app = express();
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const connectDb = require("./config/connectDb");
const dotenv = require("dotenv").config();

// DB connection
connectDb();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/restaurant", require("./routes/restaurantRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoutes"));
app.use("/api/v1/food", require("./routes/foodRoutes"));

app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to Food Api Server App</h1>");
});

//PORT
const PORT = process.env.PORT || 8000;

// server port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.white.bgMagenta);
});
