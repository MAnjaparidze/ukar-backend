// src/model/carWashModel.js
const mongoose = require("mongoose");

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
  legal_name: {
    type: String,
    required: true,
  },
  voen: {
    type: Number,
  },
  owner: ownerSchema,
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
    street_name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  employees: {
    type: [
      {
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
      },
    ],
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
});

const CarWash = mongoose.model("CarWash", carWashSchema);

module.exports = CarWash;
