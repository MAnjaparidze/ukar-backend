// Global Error Handling Middleware
const globalErrorHandler = (err, req, res, next) => {
  // Set default values if they are not provided
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  // Send response
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    // Stack trace should only be shown in development mode
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = globalErrorHandler;
