const express = require('express');
const router = express.Router();
const { 
  getProjects,
  getProject,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projects');

const Project = require('../models/Project');
const advancedResults = require('../middlewares/advancedResults');
const { protect, authorize } = require('../middlewares/auth');

// Public routes
router.get('/', advancedResults(Project), getProjects);
router.get('/:id', getProject);
router.get('/slug/:slug', getProjectBySlug);

// Protected routes - only admins can create, update, delete projects
router.post('/', protect, authorize('admin'), createProject);
router.put('/:id', protect, authorize('admin'), updateProject);
router.delete('/:id', protect, authorize('admin'), deleteProject);

module.exports = router; 