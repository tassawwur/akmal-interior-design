const express = require('express');
const router = express.Router();

const {
  getConstructionServices,
  getConstructionService,
  createConstructionService,
  updateConstructionService,
  deleteConstructionService,
  uploadConstructionServicePhoto,
  getFeaturedConstructionServices,
  searchConstructionServices
} = require('../controllers/constructionServices');

const ConstructionService = require('../models/ConstructionService');
const advancedResults = require('../middlewares/advancedResults');
const { protect, authorize } = require('../middlewares/auth');

// Public routes
router.get('/featured', getFeaturedConstructionServices);
router.get('/search', searchConstructionServices);
router.get('/:id', getConstructionService);
router.get('/', advancedResults(ConstructionService, 'relatedServices'), getConstructionServices);

// Protected routes
router.use(protect);
router.use(authorize('admin'));

router.post('/', createConstructionService);
router.put('/:id', updateConstructionService);
router.delete('/:id', deleteConstructionService);
router.put('/:id/photo', uploadConstructionServicePhoto);

module.exports = router; 