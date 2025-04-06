/**
 * Error handling middleware
 */
const logger = require('../utils/logger');

/**
 * Custom error handler to standardize error objects
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log the error for debugging
  logger.error(`${err.name || 'Error'}: ${err.message} (${req.method} ${req.originalUrl})`);
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = new Error(message);
    error.statusCode = 400;
  }
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = new Error(`Duplicate value for ${field}`);
    error.statusCode = 400;
  }
  
  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    error = new Error(`Resource not found with id of ${err.value}`);
    error.statusCode = 404;
  }
  
  // JSON parsing error
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    error = new Error('Invalid JSON');
    error.statusCode = 400;
  }
  
  // Default response
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

module.exports = errorHandler; 