const mongoose = require("mongoose");

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

  // TODO: We need Administrator & Washer Roles

  // TODO: The owner should be created right away
  // TODO: Owner with login by OTP
  owner: {
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
      // Fin Code
      type: String,
      required: true,
    },
    contact_phone: {
      type: Number,
    },
    // TODO: Think about this logic via Transactions POV
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
    // TODO: The balance will be filled via Terminals as well

    // TODO: In future users will be paying via cards as well
    // TODO: Create IBAN Object
    hasPosTerminal: {
      type: Boolean,
      default: false,
    },
    hasCashRegister: {
      type: Boolean,
      default: false,
    },
    ibans: {
      type: [
        {
          bankName: {
            type: String,
            required: true,
          },
          iban: {
            type: String,
            required: true,
          },
        },
      ],
      default: [],
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
    description: {
      type: String,
      required: true,
    },
  },
  employee: {
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
      enum: ["administrator", "washman"],
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  services: {
    // Sedan, CUV, SUV, Van
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
  rating: {
    type: Number,
  },
});

const CarWash = mongoose.model("CarWash", carWashSchema);

module.exports = CarWash;
