const express = require('express');
const router = express.Router();
const { 
  getStats,
  getVisibleStats,
  getStat,
  createStat,
  updateStat,
  deleteStat
} = require('../controllers/stats');

const Stats = require('../models/Stats');
const advancedResults = require('../middlewares/advancedResults');
const { protect, authorize } = require('../middlewares/auth');

// Public routes
router.get('/', advancedResults(Stats), getStats);
router.get('/visible', getVisibleStats);
router.get('/:id', getStat);

// Protected routes - only admins can create, update, delete stats
router.post('/', protect, authorize('admin'), createStat);
router.put('/:id', protect, authorize('admin'), updateStat);
router.delete('/:id', protect, authorize('admin'), deleteStat);

module.exports = router; 