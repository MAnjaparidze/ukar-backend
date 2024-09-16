// src/routes/userRoutes.js
const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

// Public routes (for now)
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser); // For registration

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser); // Only admin can delete

module.exports = router;
