const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const generateSitemap = require('../utils/generateSitemap');
const logger = require('../utils/logger');
const config = require('../config/config');

// Connect to database
mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  logger.info('MongoDB Connected for sitemap generation');
  
  // Define output path
  const outputPath = path.join(__dirname, '../../public/sitemap.xml');
  
  // Generate sitemap
  generateSitemap(config.WEBSITE_URL || 'https://akmal.com', outputPath)
    .then(success => {
      if (success) {
        logger.info('Sitemap generated successfully.');
      } else {
        logger.error('Failed to generate sitemap.');
      }
      // Close database connection
      mongoose.connection.close();
      process.exit(success ? 0 : 1);
    })
    .catch(err => {
      logger.error(`Error generating sitemap: ${err.message}`);
      mongoose.connection.close();
      process.exit(1);
    });
})
.catch(err => {
  logger.error(`MongoDB Connection Error: ${err.message}`);
  process.exit(1);
}); 