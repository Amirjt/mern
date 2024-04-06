const mongoose = require("mongoose");
require("dotenv").config();

const connectToDb = () => {
  if (mongoose.connections[0].readyState) {
    return false;
  } else {
    return mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => console.log("Connected to Mongo"))
      .catch((err) =>
        console.log("There is an error while connecting to Mongo" + err)
      );
  }
};

module.exports = connectToDb;
