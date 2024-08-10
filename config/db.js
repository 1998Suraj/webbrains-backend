const mongoose = require("mongoose");
const Credentials = require("./credentials");

const connectDB = async () => {
  try {
    await mongoose.connect(Credentials.MONGOURL);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;