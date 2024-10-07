// src/models/ownerModel.js
const mongoose = require("mongoose");

// CREATE EMPLOYEE SCHEMA

const ownerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  pID: {
    type: String,
    required: true,
  },
  contact_phone: {
    type: Number,
  },
  balance: {
    type: Number,
    default: 0,
    select: false,
  },
  // TODO: Create Cards Object
  cards: {
    type: [],
    default: [],
    select: false,
  },
  // TODO: Create transaction Object
  transaction_history: {
    type: [],
    default: [],
    select: false,
  },
  // TODO: Create iban Object
  ibans: {
    type: [],
    default: [],
    select: false,
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
    select: false,
  },
});

ownerSchema.virtual("fullName").get(function () {
  return `${this.name} ${this.surname}`;
});

const Owner = mongoose.model("Owner", ownerSchema);

module.exports = ownerSchema;
module.exports = Owner;
