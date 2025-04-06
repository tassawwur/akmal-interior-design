const express = require('express');
const router = express.Router();
const { 
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact
} = require('../controllers/contacts');
const { protect, authorize } = require('../middlewares/auth');

// Public route - anyone can submit contact
router.post('/', createContact);

// Admin only routes - manage contacts
router.get('/', protect, authorize('admin'), getContacts);
router.get('/:id', protect, authorize('admin'), getContact);
router.put('/:id', protect, authorize('admin'), updateContact);
router.delete('/:id', protect, authorize('admin'), deleteContact);

module.exports = router; 