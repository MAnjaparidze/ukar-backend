// src/models/adminModel.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "An admin must have a username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "An admin must have a password"],
    minlength: 8,
    select: false, // Don't return the password by default in queries
  },
  role: {
    type: String,
    enum: ["admin", "super-admin"],
    default: "admin",
    select: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
  otp: {
    type: String,
    default: "0000",
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash the password before saving
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only run if password is modified
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Instance method to check if password is correct
adminSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
