const express = require('express');
const { 
  submitContact, 
  getContacts, 
  getContact, 
  updateContact, 
  deleteContact 
} = require('../controllers/contactController');

// Import middleware
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

// Public routes
router.post('/', submitContact);

// Admin only routes
router
  .route('/')
  .get(protect, authorize('admin'), getContacts);

router
  .route('/:id')
  .get(protect, authorize('admin'), getContact)
  .put(protect, authorize('admin'), updateContact)
  .delete(protect, authorize('admin'), deleteContact);

module.exports = router; 