const mongoose = require('mongoose');
const config = require('./config');
const logger = require('../utils/logger');

/**
 * Connect to MongoDB
 * Handles connection to database with retry logic and proper error handling
 */
const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from environment variables
    // Removed deprecated options: useNewUrlParser and useUnifiedTopology
    const conn = await mongoose.connect(config.MONGO_URI);

    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
    
    // If in development, retry after 5 seconds
    if (config.NODE_ENV === 'development') {
      logger.info('Retrying connection in 5 seconds...');
      setTimeout(connectDB, 5000);
    } else {
      // In production, exit with failure
      process.exit(1);
    }
  }
};

module.exports = connectDB; 