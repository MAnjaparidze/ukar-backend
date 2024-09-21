// src/controllers/adminController.js
const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcryptjs");

// Utility function to sign a token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Send token in response
const createSendToken = (admin, statusCode, res) => {
  const token = signToken(admin._id);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      admin,
    },
  });
};

// Admin login
exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);
  // Check if username and password exist
  if (!username || !password) {
    return next(new AppError("Please provide username and password!", 400));
  }

  // Check if admin exists and password is correct
  const admin = await Admin.findOne({ username }).select("+password");
  if (!admin || !(await admin.correctPassword(password, admin.password))) {
    return next(new AppError("Incorrect username or password", 401));
  }

  // If everything is ok, send token to client
  createSendToken(admin, 200, res);
});

// Create a new admin
exports.createAdmin = catchAsync(async (req, res, next) => {
  const { username, password, role } = req.body;

  const newAdmin = await Admin.create({
    username,
    password,
    role,
  });

  res.status(201).json({
    status: "success",
    data: {
      admin: newAdmin,
    },
  });
});

// Get all admins (restricted to super admins)
exports.getAllAdmins = catchAsync(async (req, res, next) => {
  const admins = await Admin.find();
  res.status(200).json({
    status: "success",
    results: admins.length,
    data: {
      admins,
    },
  });
});
