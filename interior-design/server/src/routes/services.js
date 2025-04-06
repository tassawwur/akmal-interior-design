const express = require('express');
const router = express.Router();
const { 
  getServices,
  getService,
  getServiceBySlug,
  createService,
  updateService,
  deleteService
} = require('../controllers/services');

const Service = require('../models/Service');
const advancedResults = require('../middlewares/advancedResults');
const { protect, authorize } = require('../middlewares/auth');

// Public routes
router.get('/', advancedResults(Service, {
  sort: { order: 1, createdAt: -1 } // Sort by order then by creation date
}), getServices);
router.get('/:id', getService);
router.get('/slug/:slug', getServiceBySlug);

// Protected routes - only admins can create, update, delete services
router.post('/', protect, authorize('admin'), createService);
router.put('/:id', protect, authorize('admin'), updateService);
router.delete('/:id', protect, authorize('admin'), deleteService);

module.exports = router; 