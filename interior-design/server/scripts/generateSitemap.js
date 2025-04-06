/**
 * Script to manually generate sitemap.xml
 * Can be run with: npm run generate-sitemap
 */
require('dotenv').config();
const mongoose = require('mongoose');
const generateSitemap = require('../src/utils/generateSitemap');
const config = require('../src/config/config');
const logger = require('../src/utils/logger');

// Connect to database and generate sitemap
(async () => {
  try {
    logger.info('Starting sitemap generation script');
    
    // Connect to MongoDB
    logger.info(`Connecting to MongoDB at ${config.MONGO_URI}`);
    await mongoose.connect(config.MONGO_URI);
    
    logger.info('Connected to MongoDB, generating sitemap...');
    
    // Generate sitemap
    const result = await generateSitemap();
    
    logger.info(`Sitemap generation complete: ${result.message}`);
    
    // Close database connection
    await mongoose.connection.close();
    logger.info('Database connection closed');
    
    process.exit(0);
  } catch (error) {
    logger.error(`Error generating sitemap: ${error.message}`);
    
    // Close database connection if open
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      logger.info('Database connection closed after error');
    }
    
    process.exit(1);
  }
})();