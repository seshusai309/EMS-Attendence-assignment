const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connection successfull");
  } catch (error) {
    console.log("connection failed", error.message);
    process.exit(1);
  }
};

module.exports = db;
