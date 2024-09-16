// server.js
const http = require("http");
const app = require("./src/app"); // Import the Express app
require("dotenv").config(); // Load environment variables

// Connect to Database
const connectDB = require("./src/config/db"); // Database connection
connectDB();

const PORT = process.env.PORT || 3001;

// Create HTTP server and listen on a specific port
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection! Shutting down...");
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception! Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

// Gracefully handle shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully.");
  server.close(() => {
    console.log("Process terminated!");
  });
});
