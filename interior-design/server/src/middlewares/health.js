/**
 * Health check middleware to monitor application status
 * Provides basic system information and database connection status
 */
const os = require('os');
const mongoose = require('mongoose');
const config = require('../config/config');
const logger = require('../utils/logger');

/**
 * Health check middleware
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const healthCheck = (req, res) => {
  // Get system information
  const totalMemory = Math.round(os.totalmem() / 1024 / 1024);
  const freeMemory = Math.round(os.freemem() / 1024 / 1024);
  const usedMemory = totalMemory - freeMemory;
  const memoryUsage = Math.round((usedMemory / totalMemory) * 100);
  
  // Get Node.js process memory usage
  const processMemory = Math.round(process.memoryUsage().rss / 1024 / 1024);
  
  // Check database connection status
  const dbStatus = {
    connected: mongoose.connection.readyState === 1,
    state: getConnectionState(mongoose.connection.readyState)
  };
  
  // Get uptime information
  const processUptime = Math.round(process.uptime());
  const systemUptime = Math.round(os.uptime());
  
  // Construct health check response
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: config.NODE_ENV,
    system: {
      platform: os.platform(),
      architecture: os.arch(),
      hostname: os.hostname(),
      cpus: os.cpus().length,
      loadAvg: os.loadavg(),
      memory: {
        total: `${totalMemory} MB`,
        free: `${freeMemory} MB`,
        used: `${usedMemory} MB`,
        percentUsed: `${memoryUsage}%`
      },
      uptime: formatUptime(systemUptime)
    },
    process: {
      nodeVersion: process.version,
      pid: process.pid,
      memory: `${processMemory} MB`,
      uptime: formatUptime(processUptime)
    },
    database: dbStatus
  };
  
  // Log health check
  logger.info(`Health check performed: ${health.status}`);

  // Send health check response
  res.status(200).json(health);
};

/**
 * Format uptime into human-readable string
 * @param {Number} uptime - Uptime in seconds
 * @returns {String} Formatted uptime
 */
function formatUptime(uptime) {
  const days = Math.floor(uptime / 86400);
  const hours = Math.floor((uptime % 86400) / 3600);
  const minutes = Math.floor(((uptime % 86400) % 3600) / 60);
  const seconds = ((uptime % 86400) % 3600) % 60;
  
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

/**
 * Get database connection state as string
 * @param {Number} state - Mongoose connection state
 * @returns {String} Connection state description
 */
function getConnectionState(state) {
  switch (state) {
    case 0: return 'disconnected';
    case 1: return 'connected';
    case 2: return 'connecting';
    case 3: return 'disconnecting';
    default: return 'unknown';
  }
}

module.exports = healthCheck; 