const express = require('express');
const router = express.Router();

const {
  getSEOByPage,
  getAllSEO,
  createSEO,
  updateSEO,
  deleteSEO,
  generateSitemap,
  generateRobotsTxt,
  generateMetaTags
} = require('../controllers/seo');

const SEO = require('../models/SEO');
const advancedResults = require('../middlewares/advancedResults');
const { protect, authorize } = require('../middlewares/auth');

// Public routes
router.get('/page/:pagePath', getSEOByPage);
router.get('/sitemap', generateSitemap);
router.get('/robots', generateRobotsTxt);
router.get('/meta/:pagePath', generateMetaTags);

// Protected routes
router.use(protect);
router.use(authorize('admin'));

router
  .route('/')
  .get(advancedResults(SEO), getAllSEO)
  .post(createSEO);

router
  .route('/:id')
  .put(updateSEO)
  .delete(deleteSEO);

module.exports = router; 