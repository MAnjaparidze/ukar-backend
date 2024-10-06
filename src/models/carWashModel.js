// src/model/carWashModel.js
const mongoose = require("mongoose");

const { Owner, ownerSchema } = require("./ownerModel");
const Employee = require("./employeeModel");

const serviceQualities = {
  eco: {
    type: Number,
    required: true,
  },
  standard: {
    type: Number,
    required: true,
  },
  premium: {
    type: Number,
    required: true,
  },
};

const serviceTypes = {
  inner: serviceQualities,
  outer: serviceQualities,
  both: serviceQualities,
};

const carWashSchema = new mongoose.Schema({
  images: [
    {
      type: String,
      required: [true, "Images are Required"],
    },
  ],
  legalName: {
    type: String,
    required: true,
  },
  voen: {
    type: Number,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
    select: false,
  },
  hasPosTerminal: {
    type: Boolean,
    default: false,
  },
  hasCashRegister: {
    type: Boolean,
    default: false,
  },
  location: {
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
    streetName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  employees: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    default: [],
  },
  services: {
    sedan: serviceTypes,
    cuv: serviceTypes,
    suv: serviceTypes,
    van: serviceTypes,
  },
  rating: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CarWash = mongoose.model("CarWash", carWashSchema);

module.exports = CarWash;
