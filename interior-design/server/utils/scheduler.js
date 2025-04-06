const cron = require('node-cron');
const config = require('../config/config');
const logger = require('./logger');
const { clearCache } = require('../middlewares/cache');
const generateSitemap = require('./generateSitemap');
const { backupDatabase } = require('../src/utils/backup');

/**
 * Initialize the scheduler for automated tasks
 */
const initScheduler = () => {
  logger.info('Initializing scheduled tasks');
  
  // Schedule sitemap generation - weekly by default
  if (config.SITEMAP_CRON) {
    cron.schedule(config.SITEMAP_CRON, async () => {
      try {
        logger.info('Running scheduled sitemap generation');
        await generateSitemap();
        logger.info('Sitemap generation completed successfully');
      } catch (error) {
        logger.error(`Sitemap generation failed: ${error.message}`);
      }
    });
    logger.info(`Sitemap generation scheduled: ${config.SITEMAP_CRON}`);
  }

  // Schedule cache clearing - every 12 hours by default
  if (config.CACHE_CLEAR_CRON) {
    cron.schedule(config.CACHE_CLEAR_CRON, () => {
      try {
        logger.info('Running scheduled cache clearing');
        clearCache();
        logger.info('Cache cleared successfully');
      } catch (error) {
        logger.error(`Cache clearing failed: ${error.message}`);
      }
    });
    logger.info(`Cache clearing scheduled: ${config.CACHE_CLEAR_CRON}`);
  }

  // Schedule database backup - daily by default
  if (config.BACKUP_CRON) {
    cron.schedule(config.BACKUP_CRON, async () => {
      try {
        logger.info('Running scheduled database backup');
        const result = await backupDatabase();
        if (result.success) {
          logger.info(`Database backup completed successfully: ${result.path}`);
        } else {
          logger.error(`Database backup failed: ${result.message}`);
        }
      } catch (error) {
        logger.error(`Database backup failed: ${error.message}`);
      }
    });
    logger.info(`Database backup scheduled: ${config.BACKUP_CRON}`);
  }
};

module.exports = {
  initScheduler
}; 