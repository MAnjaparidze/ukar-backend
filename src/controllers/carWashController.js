// src/controllers/carWashController.js
const CarWash = require("../models/carWashModel");

const multer = require("multer");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // You can change this when you switch to S3
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `carwash-${Date.now()}.${ext}`);
  },
});

// Multer filter to allow only images
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadCarWashImages = upload.array("images", 5);

// Get all car washes (with filters)
exports.getAllCarWashes = catchAsync(async (req, res, next) => {
  const carWashes = await CarWash.find();
  res.status(200).json({
    status: "success",
    results: carWashes.length,
    data: {
      carWashes,
    },
  });
});

// Get a single car wash by ID
exports.getCarWash = catchAsync(async (req, res, next) => {
  const carWash = await CarWash.findById(req.params.id);
  if (!carWash) {
    return next(new AppError("No car wash found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      carWash,
    },
  });
});

// Create a new car wash
exports.createCarWash = catchAsync(async (req, res, next) => {
  try {
    const { images, owner, contact, location, services, ...rest } = req.body;

    console.log("Test", rest);
    const imagesArr = req.files.map((file) => file.path);

    const objToSave = {
      imagesArr,
      owner: JSON.parse(owner),
      contact: JSON.parse(contact),
      location: JSON.parse(location),
      services: JSON.parse(services),
      ...rest,
    };
    const newCarWash = await CarWash.create(objToSave);

    console.log(newCarWash);

    res.status(201).json({
      status: "success",
      data: {
        carWash: newCarWash,
      },
    });
  } catch (err) {
    // next(new AppError(err, 500));
    console.log(err);
  }
});

// Update an existing car wash
exports.updateCarWash = catchAsync(async (req, res, next) => {
  const updatedCarWash = await CarWash.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedCarWash) {
    return next(new AppError("No car wash found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      carWash: updatedCarWash,
    },
  });
});

// Delete a car wash
exports.deleteCarWash = catchAsync(async (req, res, next) => {
  const carWash = await CarWash.findByIdAndDelete(req.params.id);

  if (!carWash) {
    return next(new AppError("No car wash found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
