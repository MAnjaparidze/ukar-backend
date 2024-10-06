// src/routes/adminRoutes.js
const express = require("express");
const ownerController = require("../controllers/ownerController");
const adminAuth = require("../middlewares/adminAuth");
const router = express.Router();

// Public route (for logging in)
router.post("/login", ownerController.login);

// Private routes (should be protected with admin authentication)
router
  .route("/")
  .get(adminAuth.protect, ownerController.getAllOwners) // Only accessible to authenticated admins
  .post(
    adminAuth.protect,
    adminAuth.restrictTo("admin", "superadmin"),
    ownerController.createOwner
  ); // Add restrictions here for super admins

module.exports = router;
