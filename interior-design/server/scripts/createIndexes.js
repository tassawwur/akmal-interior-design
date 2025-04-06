/**
 * Script to manually create database indexes
 * Can be run with: npm run db:index
 */
require('dotenv').config();
const mongoose = require('mongoose');
const { createIndexes } = require('../src/utils/indexing');
const config = require('../src/config/config');
const logger = require('../src/utils/logger');

// Connect to database and create indexes
(async () => {
  try {
    logger.info('Starting database indexing script');
    
    // Connect to MongoDB
    logger.info(`Connecting to MongoDB at ${config.MONGO_URI}`);
    await mongoose.connect(config.MONGO_URI);
    
    logger.info('Connected to MongoDB, creating indexes...');
    
    // Create indexes
    const result = await createIndexes();
    
    logger.info(`Database indexing complete: ${result.message}`);
    
    // Close database connection
    await mongoose.connection.close();
    logger.info('Database connection closed');
    
    process.exit(0);
  } catch (error) {
    logger.error(`Error creating indexes: ${error.message}`);
    
    // Close database connection if open
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      logger.info('Database connection closed after error');
    }
    
    process.exit(1);
  }
})(); 