const cron = require('node-cron');
const path = require('path');
const { exec } = require('child_process');
const logger = require('./logger');
const { clearCache } = require('../middlewares/cache');

/**
 * Initialize scheduled tasks
 */
const initScheduler = () => {
  // Generate sitemap every day at midnight
  cron.schedule('0 0 * * *', () => {
    generateSitemap();
  });
  
  // Clear cache every 6 hours to ensure fresh content
  cron.schedule('0 */6 * * *', () => {
    logger.info('Clearing cache...');
    clearCache();
    logger.info('Cache cleared successfully');
  });
  
  // Run database backups every day at 2am
  cron.schedule('0 2 * * *', () => {
    backupDatabase();
  });

  logger.info('Scheduler initialized with all cron jobs');
};

/**
 * Generate sitemap
 */
const generateSitemap = () => {
  logger.info('Generating sitemap...');
  
  const scriptPath = path.join(__dirname, '../commands/generateSitemap.js');
  
  exec(`node ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      logger.error(`Error generating sitemap: ${error.message}`);
      return;
    }
    
    if (stderr) {
      logger.error(`Sitemap generation stderr: ${stderr}`);
      return;
    }
    
    logger.info(`Sitemap generated: ${stdout}`);
  });
};

/**
 * Backup database
 */
const backupDatabase = () => {
  logger.info('Starting database backup...');
  
  // Get current date for backup filename
  const date = new Date();
  const backupPath = path.join(
    __dirname, 
    `../../backups/db-backup-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.gz`
  );
  
  // Create backup directory if it doesn't exist
  const backupsDir = path.join(__dirname, '../../backups');
  const mkdirCmd = `mkdir -p ${backupsDir}`;
  
  // MongoDB connection string
  const dbUrl = process.env.MONGO_URI || 'mongodb://localhost:27017/interior-design';
  const dbName = dbUrl.split('/').pop().split('?')[0];
  
  // Backup command
  const cmd = `mongodump --uri="${dbUrl}" --archive="${backupPath}" --gzip`;

  // First ensure backup directory exists, then run backup
  exec(mkdirCmd, (error) => {
    if (error) {
      logger.error(`Error creating backup directory: ${error.message}`);
      return;
    }
    
    // Run backup command
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        logger.error(`Database backup error: ${error.message}`);
        return;
      }
      
      if (stderr && !stderr.includes('writing')) {
        logger.error(`Database backup stderr: ${stderr}`);
        return;
      }
      
      logger.info(`Database backup completed: ${backupPath}`);
      
      // Remove backups older than 7 days
      const cleanupCmd = `find ${backupsDir} -name "db-backup-*.gz" -type f -mtime +7 -delete`;
      exec(cleanupCmd);
    });
  });
};

module.exports = {
  initScheduler,
  generateSitemap,
  backupDatabase
}; 