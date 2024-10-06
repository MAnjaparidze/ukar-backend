// src/routes/adminRoutes.js
const express = require("express");
const adminController = require("../controllers/adminController");
const adminAuth = require("../middlewares/adminAuth");
const router = express.Router();

// Public route (for logging in)
router.post("/login", adminController.login);

// Private routes (should be protected with admin authentication)
router
  .route("/")
  .get(adminAuth.protect, adminController.getAllAdmins) // Only accessible to authenticated admins
  .post(
    adminAuth.protect,
    adminAuth.restrictTo("superadmin"),
    adminController.createAdmin
  ); // Add restrictions here for super admins

module.exports = router;
