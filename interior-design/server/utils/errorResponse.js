/**
 * Custom Error Response Class
 * Extends Error to add statusCode and other metadata for API responses
 */
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    
    // This captures the stack trace, preserving proper stack context
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorResponse; 