const mongoose = require('mongoose');
const logger = require('./logger');

/**
 * Create indexes for MongoDB collections to improve performance
 * Called once during application startup
 */
const createIndexes = async () => {
  logger.info('Setting up database indexes');
  
  try {
    // Blog indexes
    try {
      const Blog = mongoose.model('Blog');
      await Blog.collection.createIndex({ slug: 1 }, { unique: true });
      await Blog.collection.createIndex({ category: 1 });
      await Blog.collection.createIndex({ tags: 1 });
      await Blog.collection.createIndex({ createdAt: -1 });
      logger.info('Blog indexes created');
    } catch (error) {
      logger.warn(`Skipping Blog indexes: ${error.message}`);
    }
    
    // Project indexes
    try {
      const Project = mongoose.model('Project');
      await Project.collection.createIndex({ slug: 1 }, { unique: true });
      await Project.collection.createIndex({ category: 1 });
      await Project.collection.createIndex({ completionDate: -1 });
      logger.info('Project indexes created');
    } catch (error) {
      logger.warn(`Skipping Project indexes: ${error.message}`);
    }
    
    // Service indexes
    try {
      const Service = mongoose.model('Service');
      await Service.collection.createIndex({ slug: 1 }, { unique: true });
      await Service.collection.createIndex({ category: 1 });
      logger.info('Service indexes created');
    } catch (error) {
      logger.warn(`Skipping Service indexes: ${error.message}`);
    }
    
    // User indexes
    try {
      const User = mongoose.model('User');
      await User.collection.createIndex({ email: 1 }, { unique: true });
      await User.collection.createIndex({ createdAt: -1 });
      logger.info('User indexes created');
    } catch (error) {
      logger.warn(`Skipping User indexes: ${error.message}`);
    }
    
    // Contact indexes
    try {
      const Contact = mongoose.model('Contact');
      await Contact.collection.createIndex({ email: 1 });
      await Contact.collection.createIndex({ createdAt: -1 });
      logger.info('Contact indexes created');
    } catch (error) {
      logger.warn(`Skipping Contact indexes: ${error.message}`);
    }
    
    // SEO indexes
    try {
      const SEO = mongoose.model('SEO');
      await SEO.collection.createIndex({ route: 1 }, { unique: true });
      logger.info('SEO indexes created');
    } catch (error) {
      logger.warn(`Skipping SEO indexes: ${error.message}`);
    }
    
    // Construction Service indexes
    try {
      const ConstructionService = mongoose.model('ConstructionService');
      await ConstructionService.collection.createIndex({ slug: 1 }, { unique: true });
      await ConstructionService.collection.createIndex({ category: 1 });
      await ConstructionService.collection.createIndex({ 'pricing.tier': 1 });
      logger.info('Construction Service indexes created');
    } catch (error) {
      logger.warn(`Skipping Construction Service indexes: ${error.message}`);
    }
    
    logger.info('Finished setting up database indexes');
    return { success: true, message: 'All indexes created successfully' };
  } catch (error) {
    logger.error(`Error creating indexes: ${error.message}`);
    return { success: false, message: error.message };
  }
};

/**
 * Drop indexes for MongoDB collections (use with caution, mainly for development)
 */
const dropIndexes = async () => {
  logger.warn('Dropping all database indexes - this may impact performance');
  
  try {
    // Drop indexes for each collection
    const collections = ['Blog', 'Project', 'Service', 'User', 'Contact', 'SEO', 'ConstructionService'];
    
    for (const collection of collections) {
      try {
        const model = mongoose.model(collection);
        await model.collection.dropIndexes();
        logger.info(`Dropped indexes for ${collection}`);
      } catch (error) {
        logger.warn(`Skipping dropping indexes for ${collection}: ${error.message}`);
      }
    }
    
    logger.info('Finished dropping database indexes');
    return { success: true, message: 'All indexes dropped successfully' };
  } catch (error) {
    logger.error(`Error dropping indexes: ${error.message}`);
    return { success: false, message: error.message };
  }
};

module.exports = {
  createIndexes,
  dropIndexes
}; 