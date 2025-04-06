const Testimonial = require('../models/Testimonial');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/asyncHandler');
const path = require('path');
const fs = require('fs');

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
exports.getTestimonials = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get featured testimonials
// @route   GET /api/testimonials/featured
// @access  Public
exports.getFeaturedTestimonials = asyncHandler(async (req, res, next) => {
  const testimonials = await Testimonial.find({ featured: true })
    .sort('-createdAt')
    .populate({ path: 'project', select: 'title slug images' });

  res.status(200).json({
    success: true,
    count: testimonials.length,
    data: testimonials
  });
});

// @desc    Get single testimonial
// @route   GET /api/testimonials/:id
// @access  Public
exports.getTestimonial = asyncHandler(async (req, res, next) => {
  const testimonial = await Testimonial.findById(req.params.id).populate({
    path: 'project',
    select: 'title slug images'
  });

  if (!testimonial) {
    return next(
      new ErrorResponse(`Testimonial not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: testimonial
  });
});

// @desc    Create new testimonial
// @route   POST /api/testimonials
// @access  Private/Admin
exports.createTestimonial = asyncHandler(async (req, res, next) => {
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
    file.name = `testimonial_${req.body.name.toLowerCase().replace(/ /g, '_')}_${uniqueSuffix}${path.parse(file.name).ext}`;
    
    const filePath = `testimonials/${file.name}`;
    
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

  const testimonial = await Testimonial.create(req.body);

  res.status(201).json({
    success: true,
    data: testimonial
  });
});

// @desc    Update testimonial
// @route   PUT /api/testimonials/:id
// @access  Private/Admin
exports.updateTestimonial = asyncHandler(async (req, res, next) => {
  let testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    return next(
      new ErrorResponse(`Testimonial not found with id of ${req.params.id}`, 404)
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
    
    // Delete previous image if exists and not default
    if (testimonial.image && !testimonial.image.includes('default.jpg')) {
      const previousImagePath = path.join(process.cwd(), 'public', 'uploads', testimonial.image);
      if (fs.existsSync(previousImagePath)) {
        fs.unlinkSync(previousImagePath);
      }
    }
    
    // Create custom filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    file.name = `testimonial_${req.body.name ? req.body.name.toLowerCase().replace(/ /g, '_') : testimonial.name.toLowerCase().replace(/ /g, '_')}_${uniqueSuffix}${path.parse(file.name).ext}`;
    
    const filePath = `testimonials/${file.name}`;
    
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

  testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: testimonial
  });
});

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private/Admin
exports.deleteTestimonial = asyncHandler(async (req, res, next) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    return next(
      new ErrorResponse(`Testimonial not found with id of ${req.params.id}`, 404)
    );
  }

  // Delete associated image if not default
  if (testimonial.image && !testimonial.image.includes('default.jpg')) {
    const imagePath = path.join(process.cwd(), 'public', 'uploads', testimonial.image);
    
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  await testimonial.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
}); 