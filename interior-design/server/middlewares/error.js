const ErrorResponse = require('../utils/errorResponse');
const logger = require('../utils/logger');

/**
 * Error handler middleware
 * Handles all errors and formats them appropriately for API responses
 */
const errorHandler = (err, req, res, next) => {
  // Log the error for debugging
  logger.error(
    `Error: ${err.message} \nStack: ${err.stack} \nRequest path: ${req.path}`
  );

  // Copy the error to avoid modifying the original
  let error = { ...err };
  error.message = err.message;

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = new ErrorResponse('Invalid token. Please log in again.', 401);
  }

  if (err.name === 'TokenExpiredError') {
    error = new ErrorResponse('Token expired. Please log in again.', 401);
  }

  // File upload error
  if (err.code === 'LIMIT_FILE_SIZE') {
    error = new ErrorResponse('File size limit exceeded', 400);
  }

  // Handle response
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

module.exports = errorHandler; 