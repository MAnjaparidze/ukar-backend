// src/controllers/ownerController.js
const Owner = require("../models/ownerModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// TODO: Tokens can be made global
// Utility function to sign a token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Send token in response
const createSendToken = (owner, statusCode, res) => {
  const token = signToken(owner._id);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      owner,
    },
  });
};

exports.sendOTP = catchAsync(async (req, res, next) => {
  const { phone } = req.body;
  console.log(phone);

  if (!phone) {
    return next(new AppError("Please provide phone number!", 400));
  }

  const owner = await Owner.findOne({ phone });
  if (!owner) {
    return next(
      new AppError("Owner with this phone number does not exist", 404)
    );
  }

  // TODO: Create OTP

  // TODO: Save OTP

  // TODO: Send OTP
});

// Owner login
exports.login = catchAsync(async (req, res, next) => {
  const { phone, otp } = req.body;
  console.log(phone, otp);
  if (!phone) {
    return next(new AppError("Please provide phone number!", 400));
  }

  // Check if owner exists and password is correct
  const owner = await Owner.findOne({ phone }).select("+otp");
  if (!owner || !(await Owner.correctPassword(otp, owner.otp))) {
    return next(new AppError("Incorrect Phone or OTP", 401));
  }

  // If everything is ok, send token to client
  createSendToken(owner, 200, res);
});

// Create a new owner
exports.createOwner = catchAsync(async (req, res, next) => {
  const { username, password, role } = req.body;

  const newOwner = await Owner.create({
    username,
    password,
    role,
  });

  res.status(201).json({
    status: "success",
    data: {
      owner: newOwner,
    },
  });
});

// Get all owners (restricted to super owners)
exports.getAllOwners = catchAsync(async (req, res, next) => {
  const owners = await Owner.find();
  res.status(200).json({
    status: "success",
    results: owners.length,
    data: {
      owners,
    },
  });
});
