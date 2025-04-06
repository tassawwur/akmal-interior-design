const Service = require('../models/Service');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/asyncHandler');
const path = require('path');
const fs = require('fs');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
exports.getServices = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
exports.getService = asyncHandler(async (req, res, next) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return next(
      new ErrorResponse(`Service not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: service
  });
});

// @desc    Get service by slug
// @route   GET /api/services/slug/:slug
// @access  Public
exports.getServiceBySlug = asyncHandler(async (req, res, next) => {
  const service = await Service.findOne({ slug: req.params.slug });

  if (!service) {
    return next(
      new ErrorResponse(`Service not found with slug of ${req.params.slug}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: service
  });
});

// @desc    Create new service
// @route   POST /api/services
// @access  Private/Admin
exports.createService = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;
  
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
    file.name = `service_${req.body.title.toLowerCase().replace(/ /g, '_')}_${uniqueSuffix}${path.parse(file.name).ext}`;
    
    const filePath = `services/${file.name}`;
    
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
  
  // Handle key points as array
  if (req.body.keyPoints && typeof req.body.keyPoints === 'string') {
    req.body.keyPoints = req.body.keyPoints.split(',').map(point => point.trim());
  }

  const service = await Service.create(req.body);

  res.status(201).json({
    success: true,
    data: service
  });
});

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private/Admin
exports.updateService = asyncHandler(async (req, res, next) => {
  let service = await Service.findById(req.params.id);

  if (!service) {
    return next(
      new ErrorResponse(`Service not found with id of ${req.params.id}`, 404)
    );
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
    
    // Delete previous image if exists
    if (service.image) {
      const previousImagePath = path.join(process.cwd(), 'public', 'uploads', service.image);
      if (fs.existsSync(previousImagePath)) {
        fs.unlinkSync(previousImagePath);
      }
    }
    
    // Create custom filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    file.name = `service_${req.body.title ? req.body.title.toLowerCase().replace(/ /g, '_') : service.title.toLowerCase().replace(/ /g, '_')}_${uniqueSuffix}${path.parse(file.name).ext}`;
    
    const filePath = `services/${file.name}`;
    
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
  
  // Handle key points as array
  if (req.body.keyPoints && typeof req.body.keyPoints === 'string') {
    req.body.keyPoints = req.body.keyPoints.split(',').map(point => point.trim());
  }

  service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: service
  });
});

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private/Admin
exports.deleteService = asyncHandler(async (req, res, next) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return next(
      new ErrorResponse(`Service not found with id of ${req.params.id}`, 404)
    );
  }

  // Delete associated image
  if (service.image) {
    const imagePath = path.join(process.cwd(), 'public', 'uploads', service.image);
    
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  await service.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
}); 