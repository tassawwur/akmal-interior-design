const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { protect, authorize } = require('../middlewares/auth');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
  '/register',
  [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ],
  authController.register
);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists()
  ],
  authController.login
);

// @route   POST /api/auth/admin/login
// @desc    Authenticate admin & get token
// @access  Public
router.post(
  '/admin/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists()
  ],
  authController.adminLogin
);

// @route   GET /api/auth/logout
// @desc    Logout user / clear cookie
// @access  Private
router.get('/logout', authController.logout);

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', protect, authController.getMe);

// @route   PUT /api/auth/password
// @desc    Update password
// @access  Private
router.put(
  '/password',
  [
    body('currentPassword', 'Current password is required').not().isEmpty(),
    body('newPassword', 'New password must be at least 6 characters').isLength({ min: 6 })
  ],
  protect,
  authController.updatePassword
);

// @route   GET /api/auth/admin/profile
// @desc    Get admin profile
// @access  Private/Admin
router.get('/admin/profile', protect, authorize('admin'), authController.getAdminProfile);

module.exports = router; 