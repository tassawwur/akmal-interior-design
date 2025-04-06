const mongoose = require('mongoose');
const logger = require('../utils/logger');
const config = require('./config');

/**
 * Connect to MongoDB Atlas
 */
const connectDB = async () => {
  try {
    // Connect to MongoDB Atlas using the URI from environment variables
    // Removed deprecated options: useNewUrlParser and useUnifiedTopology
    const conn = await mongoose.connect(config.MONGO_URI);

    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    
    // After successful connection, create database indexes
    try {
      const { createIndexes } = require('../utils/indexing');
      await createIndexes();
    } catch (error) {
      logger.warn(`Failed to create database indexes: ${error.message}`);
    }
    
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