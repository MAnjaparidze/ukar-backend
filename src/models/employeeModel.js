// src/models/ownerModel.js
const mongoose = require("mongoose");

// CREATE EMPLOYEE SCHEMA

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["administrator", "washer"],
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
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

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
