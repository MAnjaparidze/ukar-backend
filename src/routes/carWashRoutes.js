// src/routes/carWashRoutes.js
const express = require("express");
const carWashController = require("../controllers/carWashController");
const adminAuth = require("../middlewares/adminAuth");

const router = express.Router();

// Public routes
router
  .route("/")
  .get(carWashController.getAllCarWashes)
  .post(
    adminAuth.protect,
    carWashController.uploadCarWashImages,
    carWashController.createCarWash
  ); // Only admin or owner should be allowed (add middleware later)

router
  .route("/:id")
  .get(carWashController.getCarWash)
  .patch(carWashController.updateCarWash)
  .delete(adminAuth.protect, carWashController.deleteCarWash); // Only owner or admin can delete (add middleware later)

module.exports = router;
