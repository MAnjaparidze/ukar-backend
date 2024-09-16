// src/config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.UKAR_BACKEND_DB_URL);

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
