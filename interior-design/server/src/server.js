/**
 * Main server file for Akmal Interior Design backend
 */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const path = require('path');
const compression = require('compression');
const connectDB = require('./config/db'); // Fixed path
const errorHandler = require('./middlewares/error'); // Fixed path
const { cacheMiddleware } = require('./middlewares/cache'); // Fixed path
const { initScheduler } = require('./utils/scheduler'); // Fixed path
const setupSecurity = require('./middlewares/security');
const logger = require('./utils/logger'); // Fixed path
const config = require('./config/config'); // Fixed path

// Load env vars - make sure this is first
require('dotenv').config();

// Connect to database
logger.info('Connecting to MongoDB database...');
connectDB().then(() => {
  logger.info('Database connection established successfully.');
}).catch(err => {
  logger.error(`Initial database connection error: ${err.message}`);
});

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (config.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File uploading
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
  limits: { fileSize: config.MAX_FILE_UPLOAD }, // max file size from config
  createParentPath: true
}));

// Compress all responses
app.use(compression());

// Setup security middleware (helmet, xss, rate limiting, etc.)
setupSecurity(app);

// Enable CORS
app.use(cors({
  origin: config.CLIENT_URL,
  credentials: true
}));

// Set static folder
app.use(express.static(path.join(__dirname, '../../public')));

// Cache middleware for public routes
app.use('/api/blogs', cacheMiddleware(1800)); // 30 minutes cache
app.use('/api/projects', cacheMiddleware(3600)); // 1 hour cache
app.use('/api/services', cacheMiddleware(3600)); // 1 hour cache
app.use('/api/testimonials', cacheMiddleware(3600)); // 1 hour cache
app.use('/api/stats', cacheMiddleware(1200)); // 20 minutes cache
app.use('/api/team', cacheMiddleware(3600)); // 1 hour cache
app.use('/api/seo/sitemap', cacheMiddleware(86400)); // 24 hours cache
app.use('/api/seo/robots', cacheMiddleware(86400)); // 24 hours cache

// Import health check middleware
const healthCheck = require('./middlewares/health');

// Health check endpoint
app.get('/health', healthCheck);

// Import route files and create basic stub implementations
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Create minimal Blog router for now - we'll add full Blog model later
const express_router = express.Router();
express_router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Blogs API is working. Full implementation coming soon.'
  });
});
app.use('/api/blogs', express_router);

// Contact routes
const contactRoutes = require('./routes/contacts');
app.use('/api/contacts', contactRoutes);

// Upload routes
const uploadRoutes = require('./routes/upload');
app.use('/api/upload', uploadRoutes);

// Serve frontend in production
if (config.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../../../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../client/build', 'index.html'));
  });
}

// Error handler
app.use(errorHandler);

// Set port
const PORT = config.PORT;

// Start server
const server = app.listen(PORT, () => {
  logger.info(`Server running in ${config.NODE_ENV} mode on port ${PORT}`);
  
  // Initialize scheduler for automated tasks in production
  if (config.NODE_ENV === 'production') {
    try {
      initScheduler();
      logger.info('Scheduler initialized for automated tasks');
    } catch (error) {
      logger.error(`Error initializing scheduler: ${error.message}`);
    }
  }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  console.error(err);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  console.error(err);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = server; 