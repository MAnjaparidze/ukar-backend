const mongoose = require("mongoose");

const carWashSchema = new mongoose.Schema({
  images: [
    {
      type: String,
      required: true,
    },
  ],
  legal_name: {
    type: String,
    required: true,
  },
  voen: {
    type: Number,
    required: true,
  },
  owner: {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    pID: {
      type: String,
      required: true,
    },
    uID: {
      type: String,
    },
  },
  contact: {
    mobile: {
      type: String,
    },
    email: {
      type: String,
    },
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
  },
  rating: {
    type: Number,
    required: true,
  },
  services: {
    inner: {
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
    },
    outer: {
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
    },
    both: {
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
    },
  },
});

const CarWash = mongoose.model("CarWash", carWashSchema);

module.exports.CarWash = CarWash;
