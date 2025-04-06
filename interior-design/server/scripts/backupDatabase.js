/**
 * Script to manually backup the database
 * Can be run with: npm run db:backup
 */
require('dotenv').config();
const { backupDatabase } = require('../src/utils/backup');
const logger = require('../src/utils/logger');

// Run database backup
(async () => {
  try {
    logger.info('Starting manual database backup');
    
    // Perform backup
    const result = await backupDatabase();
    
    if (result.success) {
      logger.info(`Database backup completed successfully: ${result.path}`);
      process.exit(0);
    } else {
      logger.error(`Database backup failed: ${result.message}`);
      process.exit(1);
    }
  } catch (error) {
    logger.error(`Error during database backup: ${error.message}`);
    process.exit(1);
  }
})(); 