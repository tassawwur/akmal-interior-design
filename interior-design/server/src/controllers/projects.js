const Project = require('../models/Project');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/asyncHandler');
const path = require('path');
const fs = require('fs');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
exports.getProjects = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
exports.getProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(
      new ErrorResponse(`Project not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: project
  });
});

// @desc    Get project by slug
// @route   GET /api/projects/slug/:slug
// @access  Public
exports.getProjectBySlug = asyncHandler(async (req, res, next) => {
  const project = await Project.findOne({ slug: req.params.slug });

  if (!project) {
    return next(
      new ErrorResponse(`Project not found with slug of ${req.params.slug}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: project
  });
});

// @desc    Create new project
// @route   POST /api/projects
// @access  Private/Admin
exports.createProject = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;
  
  // Handle image uploads
  if (!req.files || !req.files.images) {
    return next(new ErrorResponse('Please upload at least one image', 400));
  }

  // Process single file or multiple files
  const imageFiles = Array.isArray(req.files.images) 
    ? req.files.images 
    : [req.files.images];
  
  // Validate file types
  for (const file of imageFiles) {
    // Make sure the image is a photo
    if (!file.mimetype.startsWith('image')) {
      return next(new ErrorResponse('Please upload valid image files', 400));
    }

    // Check filesize
    if (file.size > process.env.MAX_FILE_UPLOAD || 1000000) { // Default 1MB
      return next(
        new ErrorResponse(`Please upload image less than ${process.env.MAX_FILE_UPLOAD || 1000000 / 1000000}MB`, 400)
      );
    }
  }
  
  // Save images and get paths
  const imagesPaths = [];
  
  for (const [index, file] of imageFiles.entries()) {
    // Create custom filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    file.name = `project_${req.body.title.toLowerCase().replace(/ /g, '_')}_${uniqueSuffix}${path.parse(file.name).ext}`;
    
    const filePath = `projects/${file.name}`;
    imagesPaths.push(filePath);
    
    // Move file to upload directory
    file.mv(`./public/uploads/${filePath}`, async err => {
      if (err) {
        console.error(err);
        return next(new ErrorResponse('Problem with file upload', 500));
      }
    });
  }
  
  // Add image paths to request body
  req.body.images = imagesPaths;

  const project = await Project.create(req.body);

  res.status(201).json({
    success: true,
    data: project
  });
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private/Admin
exports.updateProject = asyncHandler(async (req, res, next) => {
  let project = await Project.findById(req.params.id);

  if (!project) {
    return next(
      new ErrorResponse(`Project not found with id of ${req.params.id}`, 404)
    );
  }

  // Handle image uploads if included
  if (req.files && req.files.images) {
    // Process single file or multiple files
    const imageFiles = Array.isArray(req.files.images) 
      ? req.files.images 
      : [req.files.images];
    
    // Validate file types
    for (const file of imageFiles) {
      // Make sure the image is a photo
      if (!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse('Please upload valid image files', 400));
      }

      // Check filesize
      if (file.size > process.env.MAX_FILE_UPLOAD || 1000000) { // Default 1MB
        return next(
          new ErrorResponse(`Please upload image less than ${process.env.MAX_FILE_UPLOAD || 1000000 / 1000000}MB`, 400)
        );
      }
    }
    
    // Save images and get paths
    const imagesPaths = [];
    
    for (const [index, file] of imageFiles.entries()) {
      // Create custom filename
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      file.name = `project_${req.body.title ? req.body.title.toLowerCase().replace(/ /g, '_') : project.title.toLowerCase().replace(/ /g, '_')}_${uniqueSuffix}${path.parse(file.name).ext}`;
      
      const filePath = `projects/${file.name}`;
      imagesPaths.push(filePath);
      
      // Move file to upload directory
      file.mv(`./public/uploads/${filePath}`, async err => {
        if (err) {
          console.error(err);
          return next(new ErrorResponse('Problem with file upload', 500));
        }
      });
    }
    
    // Add image paths to request body
    req.body.images = [...project.images, ...imagesPaths];
  }

  project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: project
  });
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
exports.deleteProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(
      new ErrorResponse(`Project not found with id of ${req.params.id}`, 404)
    );
  }

  // Delete associated images
  if (project.images && project.images.length > 0) {
    for (const image of project.images) {
      const imagePath = path.join(process.cwd(), 'public', 'uploads', image);
      
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
  }

  await project.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
}); 