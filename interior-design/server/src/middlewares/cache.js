const NodeCache = require('node-cache');

// Cache with default TTL of 10 minutes and checking period of 60 seconds
const cache = new NodeCache({ stdTTL: 600, checkperiod: 60 });

/**
 * Middleware for caching API responses
 * @param {number} duration - Cache duration in seconds (overrides default TTL)
 * @param {boolean} dynamicKey - Whether to include query params in cache key
 */
const cacheMiddleware = (duration = null, dynamicKey = true) => {
  return (req, res, next) => {
    // Skip caching for non-GET requests
    if (req.method !== 'GET') {
      return next();
    }
    
    // Only authorized users can bypass cache with the no-cache header
    const noCache = req.headers['x-no-cache'] && req.user && req.user.role === 'admin';
    if (noCache) {
      return next();
    }
    
    // Generate cache key based on URL and optionally query params
    let key = req.originalUrl;
    if (!dynamicKey) {
      key = req.baseUrl + req.path;
    }
    
    // Check if response exists in cache
    const cachedResponse = cache.get(key);
    if (cachedResponse) {
      // Return cached response
      return res.status(200).json(cachedResponse);
    }
    
    // Override response.json method to cache the response before sending
    const originalJson = res.json;
    res.json = function(body) {
      // Only cache successful responses
      if (res.statusCode === 200 || res.statusCode === 201) {
        // Set custom TTL if provided
        if (duration) {
          cache.set(key, body, duration);
        } else {
          cache.set(key, body);
        }
      }
      
      // Call the original json method
      return originalJson.call(this, body);
    };
    
    next();
  };
};

/**
 * Clear cache manually
 * @param {string} pattern - Optional pattern to match keys
 */
const clearCache = (pattern = null) => {
  if (!pattern) {
    // Clear all cache
    cache.flushAll();
    return;
  }
  
  // Clear specific keys that match the pattern
  const keys = cache.keys();
  const matchingKeys = keys.filter(key => key.includes(pattern));
  
  matchingKeys.forEach(key => {
    cache.del(key);
  });
};

module.exports = {
  cacheMiddleware,
  clearCache
}; 