// src/app.js
const express = require("express");
const morgan = require("morgan"); // For logging requests
const cors = require("cors");

const carWashRoutes = require("./routes/carWashRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

const globalErrorHandler = require("./middlewares/errorHandler");
const AppError = require("./utils/AppError");

const app = express();

// Middleware for parsing incoming JSON requests
app.use(express.json());

// Use CORS to allow cross-origin requests (important for mobile apps)
app.use(cors());

// Logging in development mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// API Routes
app.use("/api/v1/car-washes", carWashRoutes); // Car wash related routes
app.use("/api/v1/users", userRoutes); // User (Driver, Washer, Owner) routes
app.use("/api/v1/admins", adminRoutes); // Admin (Admin, Super-Admin) routes

// Catch-all route for undefined endpoints
app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
