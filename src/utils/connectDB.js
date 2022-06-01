const mongoose = require("mongoose");
const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI_DEV)
    .then(() => {
      console.log("Database is connected");
    })
    .catch((err) => {
      console.log({ database_error: err });
    });
};

module.exports = connectDB;
