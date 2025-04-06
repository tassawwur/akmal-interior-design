const TeamMember = require('../models/TeamMember');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/asyncHandler');
const path = require('path');
const fs = require('fs');

// @desc    Get all team members
// @route   GET /api/team
// @access  Public
exports.getTeamMembers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get visible team members
// @route   GET /api/team/visible
// @access  Public
exports.getVisibleTeamMembers = asyncHandler(async (req, res, next) => {
  const teamMembers = await TeamMember.find({ isVisible: true }).sort('order');

  res.status(200).json({
    success: true,
    count: teamMembers.length,
    data: teamMembers
  });
});

// @desc    Get single team member
// @route   GET /api/team/:id
// @access  Public
exports.getTeamMember = asyncHandler(async (req, res, next) => {
  const teamMember = await TeamMember.findById(req.params.id);

  if (!teamMember) {
    return next(
      new ErrorResponse(`Team member not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: teamMember
  });
});

// @desc    Get team member by slug
// @route   GET /api/team/slug/:slug
// @access  Public
exports.getTeamMemberBySlug = asyncHandler(async (req, res, next) => {
  const teamMember = await TeamMember.findOne({ slug: req.params.slug });

  if (!teamMember) {
    return next(
      new ErrorResponse(`Team member not found with slug of ${req.params.slug}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: teamMember
  });
});

// @desc    Create new team member
// @route   POST /api/team
// @access  Private/Admin
exports.createTeamMember = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;
  
  // Handle social links as an object
  if (req.body.socialLinks && typeof req.body.socialLinks === 'string') {
    try {
      req.body.socialLinks = JSON.parse(req.body.socialLinks);
    } catch (err) {
      return next(new ErrorResponse('Invalid social links format', 400));
    }
  }

  // Handle image upload if included
  if (req.files && req.files.image) {
    const file = req.files.image;
    
    // Make sure the image is a photo
    if (!file.mimetype.startsWith('image')) {
      return next(new ErrorResponse('Please upload a valid image file', 400));
    }

    // Check filesize
    if (file.size > process.env.MAX_FILE_UPLOAD || 1000000) {
      return next(
        new ErrorResponse(`Please upload image less than ${process.env.MAX_FILE_UPLOAD || 1000000 / 1000000}MB`, 400)
      );
    }
    
    // Create custom filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    file.name = `team_${req.body.name.toLowerCase().replace(/ /g, '_')}_${uniqueSuffix}${path.parse(file.name).ext}`;
    
    const filePath = `team/${file.name}`;
    
    // Move file to upload directory
    file.mv(`./public/uploads/${filePath}`, async err => {
      if (err) {
        console.error(err);
        return next(new ErrorResponse('Problem with file upload', 500));
      }
    });
    
    // Add image path to request body
    req.body.image = filePath;
  }

  const teamMember = await TeamMember.create(req.body);

  res.status(201).json({
    success: true,
    data: teamMember
  });
});

// @desc    Update team member
// @route   PUT /api/team/:id
// @access  Private/Admin
exports.updateTeamMember = asyncHandler(async (req, res, next) => {
  let teamMember = await TeamMember.findById(req.params.id);

  if (!teamMember) {
    return next(
      new ErrorResponse(`Team member not found with id of ${req.params.id}`, 404)
    );
  }
  
  // Handle social links as an object
  if (req.body.socialLinks && typeof req.body.socialLinks === 'string') {
    try {
      req.body.socialLinks = JSON.parse(req.body.socialLinks);
    } catch (err) {
      return next(new ErrorResponse('Invalid social links format', 400));
    }
  }

  // Handle image upload if included
  if (req.files && req.files.image) {
    const file = req.files.image;
    
    // Make sure the image is a photo
    if (!file.mimetype.startsWith('image')) {
      return next(new ErrorResponse('Please upload a valid image file', 400));
    }

    // Check filesize
    if (file.size > process.env.MAX_FILE_UPLOAD || 1000000) {
      return next(
        new ErrorResponse(`Please upload image less than ${process.env.MAX_FILE_UPLOAD || 1000000 / 1000000}MB`, 400)
      );
    }
    
    // Delete previous image if exists and not default
    if (teamMember.image && !teamMember.image.includes('default.jpg')) {
      const previousImagePath = path.join(process.cwd(), 'public', 'uploads', teamMember.image);
      if (fs.existsSync(previousImagePath)) {
        fs.unlinkSync(previousImagePath);
      }
    }
    
    // Create custom filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    file.name = `team_${req.body.name ? req.body.name.toLowerCase().replace(/ /g, '_') : teamMember.name.toLowerCase().replace(/ /g, '_')}_${uniqueSuffix}${path.parse(file.name).ext}`;
    
    const filePath = `team/${file.name}`;
    
    // Move file to upload directory
    file.mv(`./public/uploads/${filePath}`, async err => {
      if (err) {
        console.error(err);
        return next(new ErrorResponse('Problem with file upload', 500));
      }
    });
    
    // Add image path to request body
    req.body.image = filePath;
  }

  teamMember = await TeamMember.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: teamMember
  });
});

// @desc    Delete team member
// @route   DELETE /api/team/:id
// @access  Private/Admin
exports.deleteTeamMember = asyncHandler(async (req, res, next) => {
  const teamMember = await TeamMember.findById(req.params.id);

  if (!teamMember) {
    return next(
      new ErrorResponse(`Team member not found with id of ${req.params.id}`, 404)
    );
  }

  // Delete associated image if not default
  if (teamMember.image && !teamMember.image.includes('default.jpg')) {
    const imagePath = path.join(process.cwd(), 'public', 'uploads', teamMember.image);
    
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  await teamMember.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
}); 