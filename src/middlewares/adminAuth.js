// src/middlewares/adminAuth.js
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// Middleware to protect routes (admin only)
exports.protect = catchAsync(async (req, res, next) => {
  // 1. Get token from headers
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2. Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3. Check if the admin still exists
  const currentAdmin = await Admin.findById(decoded.id).select("+role");
  if (!currentAdmin) {
    return next(
      new AppError(
        "The admin belonging to this token does no longer exist.",
        401
      )
    );
  }
  // 4. Grant access to the protected route
  req.admin = currentAdmin;
  next();
});

// Middleware to restrict access to specific roles (like super admin)
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.admin.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};
