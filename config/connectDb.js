const mongoose = require("mongoose");
const colors = require("colors");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      `Database Connection Established ${connect.connection.host} | ${connect.connection.name}`
        .white.bgBlue
    );
  } catch (error) {
    console.log("Db Error: ", error.bgRed);
  }
};

module.exports = connectDb;
