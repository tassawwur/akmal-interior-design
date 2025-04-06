const express = require('express');
const { upload, getUploads, deleteUpload } = require('../controllers/upload');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

// Protect all routes - require authentication
router.use(protect);

// Restrict to admin
router.use(authorize('admin'));

// Routes
router.route('/')
  .post(upload)
  .get(getUploads);

router.route('/:id')
  .delete(deleteUpload);

module.exports = router; 