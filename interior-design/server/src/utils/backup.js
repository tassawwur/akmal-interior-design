const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');
const config = require('../config/config');
const logger = require('./logger');

// Convert exec to promise-based
const execPromise = util.promisify(exec);

/**
 * Perform MongoDB database backup
 * Uses mongodump command line tool to create a backup
 * @returns {Promise<Object>} Success status and message
 */
const backupDatabase = async () => {
  try {
    // Create backup directory if it doesn't exist
    const backupDir = path.join(__dirname, '../../backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
      logger.info(`Created backup directory: ${backupDir}`);
    }

    // Generate timestamp for the backup filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(backupDir, `backup-${timestamp}`);
    
    // Get database name from connection string
    const dbName = config.MONGO_URI.split('/').pop().split('?')[0];
    
    // Construct mongodump command
    // Note: For Atlas, you need to have mongodump installed and in your PATH
    const command = `mongodump --uri="${config.MONGO_URI}" --out=${backupPath}`;
    
    logger.info(`Starting database backup of ${dbName} to ${backupPath}`);
    
    // Execute the command
    const { stdout, stderr } = await execPromise(command);
    
    if (stderr && !stderr.includes('done')) {
      throw new Error(stderr);
    }
    
    // Clean up old backups - keep only last 7 backups
    await cleanupOldBackups(backupDir, 7);
    
    logger.info(`Database backup completed successfully: ${backupPath}`);
    
    return {
      success: true,
      message: 'Database backup completed successfully',
      path: backupPath
    };
  } catch (error) {
    logger.error(`Database backup failed: ${error.message}`);
    
    // If the error is about mongodump not being installed, provide a helpful message
    if (error.message.includes('command not found') || error.message.includes('not recognized')) {
      logger.error('mongodump command not found. Make sure MongoDB tools are installed.');
    }
    
    return {
      success: false,
      message: `Database backup failed: ${error.message}`
    };
  }
};

/**
 * Clean up old backup files, keeping only the most recent ones
 * @param {string} backupDir - Directory containing backups
 * @param {number} keepCount - Number of latest backups to keep
 */
const cleanupOldBackups = async (backupDir, keepCount = 7) => {
  try {
    // Get all backup directories
    const files = fs.readdirSync(backupDir);
    
    // Filter backup directories and sort by creation date (oldest first)
    const backups = files
      .filter(file => file.startsWith('backup-'))
      .map(file => ({
        name: file,
        path: path.join(backupDir, file),
        created: fs.statSync(path.join(backupDir, file)).birthtime
      }))
      .sort((a, b) => a.created - b.created);
    
    // If we have more backups than we want to keep
    if (backups.length > keepCount) {
      const toDelete = backups.slice(0, backups.length - keepCount);
      
      // Delete old backups
      for (const backup of toDelete) {
        // Use rm with recursive option to delete directories
        await fs.promises.rm(backup.path, { recursive: true, force: true });
        logger.info(`Deleted old backup: ${backup.path}`);
      }
      
      logger.info(`Cleaned up ${toDelete.length} old backups`);
    }
  } catch (error) {
    logger.error(`Error cleaning up old backups: ${error.message}`);
  }
};

module.exports = {
  backupDatabase,
  cleanupOldBackups
}; 