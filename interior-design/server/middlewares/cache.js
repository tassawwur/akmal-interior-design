const NodeCache = require('node-cache');
const config = require('../config/config');
const logger = require('../utils/logger');

// Create a new cache instance
const cache = new NodeCache({
  stdTTL: 3600, // Default TTL is 1 hour
  checkperiod: 120, // Check for expired keys every 2 minutes
  useClones: false, // Store as reference to improve performance
});

/**
 * Cache middleware for Express
 * @param {number} ttl - Time to live in seconds
 * @returns {Function} Express middleware
 */
const cacheMiddleware = (ttl = 3600) => {
  return (req, res, next) => {
    // Skip caching for non-GET requests
    if (req.method !== 'GET') {
      return next();
    }

    // Skip caching if user is authenticated (for admin routes)
    if (req.user) {
      return next();
    }

    // Generate a cache key based on the original URL
    const key = `__express__${req.originalUrl || req.url}`;

    // Try to get the cached response
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      // If cache hit, send the cached response
      if (config.NODE_ENV === 'development') {
        logger.debug(`Cache hit for ${key}`);
      }
      return res.json(cachedResponse);
    } else {
      // If cache miss, store the response in cache
      const originalSend = res.json;

      res.json = function(body) {
        if (res.statusCode < 400) { // Only cache successful responses
          cache.set(key, body, ttl);
          if (config.NODE_ENV === 'development') {
            logger.debug(`Cache miss for ${key}, stored for ${ttl}s`);
          }
        }
        originalSend.call(this, body);
      };

      next();
    }
  };
};

/**
 * Clear the entire cache
 */
const clearCache = () => {
  cache.flushAll();
  logger.info('Cache cleared');
};

/**
 * Clear a specific key from cache
 * @param {string} key - The key to clear
 */
const clearCacheKey = (key) => {
  if (key) {
    cache.del(key);
    logger.debug(`Cache key cleared: ${key}`);
    return true;
  }
  return false;
};

/**
 * Get cache stats
 * @returns {Object} Cache statistics
 */
const getCacheStats = () => {
  return {
    keys: cache.keys(),
    stats: cache.getStats(),
    size: cache.keys().length,
  };
};

module.exports = {
  cacheMiddleware,
  clearCache,
  clearCacheKey,
  getCacheStats,
}; 