// src/models/ownerModel.js
const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
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
  },
  // TODO: Create Cards Object
  cards: {
    type: [],
    default: [],
  },
  // TODO: Create transaction Object
  transaction_history: {
    type: [],
    default: [],
  },
  // TODO: Create iban Object
  ibans: {
    type: [],
    default: [],
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  otp: {
    type: Number,
  },
});

const Owner = mongoose.model("Owner", ownerSchema);

module.exports = Owner;
