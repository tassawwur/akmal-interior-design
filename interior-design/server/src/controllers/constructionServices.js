const path = require('path');
const ConstructionService = require('../models/ConstructionService');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all construction services
// @route   GET /api/construction-services
// @access  Public
exports.getConstructionServices = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single construction service
// @route   GET /api/construction-services/:id
// @access  Public
exports.getConstructionService = asyncHandler(async (req, res, next) => {
  let service = await ConstructionService.findById(req.params.id);
  
  if (!service) {
    service = await ConstructionService.findOne({ slug: req.params.id });
    
    if (!service) {
      return next(
        new ErrorResponse(`Construction service not found with id or slug of ${req.params.id}`, 404)
      );
    }
  }
  
  // Populate related services
  await service.populate({
    path: 'relatedServices',
    select: 'name slug image shortDescription'
  });
  
  res.status(200).json({
    success: true,
    data: service
  });
});

// @desc    Create new construction service
// @route   POST /api/construction-services
// @access  Private/Admin
exports.createConstructionService = asyncHandler(async (req, res, next) => {
  const service = await ConstructionService.create(req.body);
  
  res.status(201).json({
    success: true,
    data: service
  });
});

// @desc    Update construction service
// @route   PUT /api/construction-services/:id
// @access  Private/Admin
exports.updateConstructionService = asyncHandler(async (req, res, next) => {
  let service = await ConstructionService.findById(req.params.id);
  
  if (!service) {
    return next(
      new ErrorResponse(`Construction service not found with id of ${req.params.id}`, 404)
    );
  }
  
  service = await ConstructionService.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  res.status(200).json({
    success: true,
    data: service
  });
});

// @desc    Delete construction service
// @route   DELETE /api/construction-services/:id
// @access  Private/Admin
exports.deleteConstructionService = asyncHandler(async (req, res, next) => {
  const service = await ConstructionService.findById(req.params.id);
  
  if (!service) {
    return next(
      new ErrorResponse(`Construction service not found with id of ${req.params.id}`, 404)
    );
  }
  
  await service.deleteOne();
  
  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Upload photo for construction service
// @route   PUT /api/construction-services/:id/photo
// @access  Private/Admin
exports.uploadConstructionServicePhoto = asyncHandler(async (req, res, next) => {
  const service = await ConstructionService.findById(req.params.id);
  
  if (!service) {
    return next(
      new ErrorResponse(`Construction service not found with id of ${req.params.id}`, 404)
    );
  }
  
  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }
  
  const file = req.files.file;
  
  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }
  
  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD / 1000000}MB`,
        400
      )
    );
  }
  
  // Create custom filename
  file.name = `construction_service_${service._id}${path.parse(file.name).ext}`;
  
  file.mv(`${process.env.FILE_UPLOAD_PATH}/construction-services/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }
    
    await ConstructionService.findByIdAndUpdate(req.params.id, { image: file.name });
    
    res.status(200).json({
      success: true,
      data: file.name
    });
  });
});

// @desc    Get featured construction services
// @route   GET /api/construction-services/featured
// @access  Public
exports.getFeaturedConstructionServices = asyncHandler(async (req, res, next) => {
  const services = await ConstructionService.find({ featured: true })
    .sort({ order: 1 })
    .select('name slug shortDescription image');
  
  res.status(200).json({
    success: true,
    count: services.length,
    data: services
  });
});

// @desc    Search construction services
// @route   GET /api/construction-services/search
// @access  Public
exports.searchConstructionServices = asyncHandler(async (req, res, next) => {
  const { term } = req.query;
  
  if (!term) {
    return next(new ErrorResponse('Please provide a search term', 400));
  }
  
  // Search in name, description, shortDescription, and keywords
  const services = await ConstructionService.find({
    $or: [
      { name: { $regex: term, $options: 'i' } },
      { description: { $regex: term, $options: 'i' } },
      { shortDescription: { $regex: term, $options: 'i' } },
      { keywords: { $in: [new RegExp(term, 'i')] } }
    ]
  }).select('name slug shortDescription image');
  
  res.status(200).json({
    success: true,
    count: services.length,
    data: services
  });
}); 