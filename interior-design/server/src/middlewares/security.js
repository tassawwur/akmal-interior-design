const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const config = require('../config/config');

/**
 * Enhanced security middleware configuration
 * Combines multiple security middlewares into a single setup
 * @param {Object} app - Express app
 */
const setupSecurity = (app) => {
  // Set security headers with helmet
  const cspOptions = config.NODE_ENV === 'production' && config.HELMET_CONTENT_SECURITY_POLICY ? {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://www.google-analytics.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com", "https://www.google-analytics.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      connectSrc: ["'self'", "https://www.google-analytics.com"],
    }
  } : false;

  app.use(helmet({
    contentSecurityPolicy: cspOptions,
    crossOriginEmbedderPolicy: false
  }));

  // Prevent XSS attacks
  app.use(xss());

  // Sanitize data to prevent NoSQL injection
  app.use(mongoSanitize());

  // Prevent HTTP Parameter Pollution attacks
  app.use(hpp({
    whitelist: [
      'category',
      'tags',
      'sort'
    ]
  }));

  // Rate limiting
  const limiter = rateLimit({
    windowMs: parseInt(config.RATE_LIMIT_WINDOW || '15', 10) * 60 * 1000, // Default: 15 minutes
    max: parseInt(config.RATE_LIMIT_MAX || '100', 10), // Default: 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      error: 'Too many requests from this IP, please try again later'
    }
  });

  // Apply rate limiting to all API routes
  app.use('/api', limiter);

  // API-specific limiters
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // 20 requests per windowMs
    message: {
      success: false,
      error: 'Too many authentication attempts, please try again later'
    }
  });

  // Apply stricter limits to auth-related endpoints
  app.use('/api/auth/login', authLimiter);
  app.use('/api/auth/register', authLimiter);
  app.use('/api/auth/forgot-password', authLimiter);
  app.use('/api/auth/reset-password', authLimiter);

  return app;
};

module.exports = setupSecurity; 