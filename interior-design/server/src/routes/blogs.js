const express = require('express');
const router = express.Router();
const { 
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogs');
const { protect, authorize } = require('../middlewares/auth');

// Public routes
router.get('/', getBlogs);
router.get('/:id', getBlog);

// Protected routes - only admins can create, update, delete blogs
router.post('/', protect, authorize('admin'), createBlog);
router.put('/:id', protect, authorize('admin'), updateBlog);
router.delete('/:id', protect, authorize('admin'), deleteBlog);

module.exports = router; 