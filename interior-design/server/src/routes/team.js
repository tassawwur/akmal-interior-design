const express = require('express');
const router = express.Router();
const { 
  getTeamMembers,
  getVisibleTeamMembers,
  getTeamMember,
  getTeamMemberBySlug,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
} = require('../controllers/team');

const TeamMember = require('../models/TeamMember');
const advancedResults = require('../middlewares/advancedResults');
const { protect, authorize } = require('../middlewares/auth');

// Public routes
router.get('/', advancedResults(TeamMember), getTeamMembers);
router.get('/visible', getVisibleTeamMembers);
router.get('/:id', getTeamMember);
router.get('/slug/:slug', getTeamMemberBySlug);

// Protected routes - only admins can create, update, delete team members
router.post('/', protect, authorize('admin'), createTeamMember);
router.put('/:id', protect, authorize('admin'), updateTeamMember);
router.delete('/:id', protect, authorize('admin'), deleteTeamMember);

module.exports = router; 