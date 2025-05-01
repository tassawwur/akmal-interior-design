/**
 * Application configuration settings
 * Centralizes all environment variables and app settings
 */
require('dotenv').config();
const path = require('path');

// Export configuration with fallbacks
module.exports = {
  // Server settings
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  
  // Database settings - ensure we're using the correct MongoDB URI
  MONGO_URI: process.env.MONGO_URI || 'mongodb+srv://tassawwurhussain61:Bh7bgbbMJDv8Pu2a@interiordesigncluster.graa0.mongodb.net/interior-design?retryWrites=true&w=majority&appName=InteriorDesignCluster',
  
  // JWT settings
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_super_secret_for_development',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '30d',
  JWT_COOKIE_EXPIRE: parseInt(process.env.JWT_COOKIE_EXPIRE || '30', 10),
  
  // CORS settings
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
  
  // Upload settings
  MAX_FILE_UPLOAD: parseInt(process.env.MAX_FILE_UPLOAD || '5242880', 10), // 5MB
  UPLOAD_PATH: process.env.UPLOAD_PATH || path.join(__dirname, '../../../public/uploads'),
  
  // Cloudinary settings (if used)
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
  
  // Email settings (for contact form)
  SMTP_HOST: process.env.SMTP_HOST || '',
  SMTP_PORT: parseInt(process.env.SMTP_PORT || '587', 10),
  SMTP_EMAIL: process.env.SMTP_EMAIL || '',
  SMTP_PASSWORD: process.env.SMTP_PASSWORD || '',
  FROM_EMAIL: process.env.FROM_EMAIL || 'noreply@akmalinteriors.com',
  FROM_NAME: process.env.FROM_NAME || 'Akmal Interior Design',
  
  // Admin settings
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@akmalinteriors.com',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'password123',
  
  // Cron job settings
  SITEMAP_CRON: process.env.SITEMAP_CRON || '0 0 * * 0', // Weekly on Sunday at midnight
  BACKUP_CRON: process.env.BACKUP_CRON || '0 0 * * *', // Daily at midnight
  CACHE_CLEAR_CRON: process.env.CACHE_CLEAR_CRON || '0 */12 * * *', // Every 12 hours
  
  // Site settings
  SITE_NAME: process.env.SITE_NAME || 'AanganLab Interior Design',
  SITE_URL: process.env.SITE_URL || 'https://aanganlab.com',
  SITE_DESCRIPTION: process.env.SITE_DESCRIPTION || 'Pakistan\'s most distinguished interior design atelier, crafting environments of exceptional beauty and functionality.',
  
  // Rate limiting
  RATE_LIMIT_WINDOW: parseInt(process.env.RATE_LIMIT_WINDOW || '15', 10), // 15 minutes
  RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX || '100', 10), // 100 requests per window
  
  // Security
  HELMET_CONTENT_SECURITY_POLICY: process.env.HELMET_CONTENT_SECURITY_POLICY === 'true'
}; 