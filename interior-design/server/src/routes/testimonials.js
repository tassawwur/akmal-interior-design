const express = require('express');
const router = express.Router();
const { 
  getTestimonials,
  getFeaturedTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} = require('../controllers/testimonials');

const Testimonial = require('../models/Testimonial');
const advancedResults = require('../middlewares/advancedResults');
const { protect, authorize } = require('../middlewares/auth');

// Public routes
router.get('/', advancedResults(Testimonial, {
  populate: { path: 'project', select: 'title slug images' }
}), getTestimonials);
router.get('/featured', getFeaturedTestimonials);
router.get('/:id', getTestimonial);

// Protected routes - only admins can create, update, delete testimonials
router.post('/', protect, authorize('admin'), createTestimonial);
router.put('/:id', protect, authorize('admin'), updateTestimonial);
router.delete('/:id', protect, authorize('admin'), deleteTestimonial);

module.exports = router; 