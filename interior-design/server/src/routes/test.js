const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// @desc    Test MongoDB connection
// @route   GET /api/test
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Check database connection
    const dbStatus = mongoose.connection.readyState === 1 
      ? 'Connected to MongoDB' 
      : 'Not connected to MongoDB';
    
    // Return success response
    res.status(200).json({
      success: true,
      message: 'API is working',
      database: dbStatus,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

module.exports = router; 