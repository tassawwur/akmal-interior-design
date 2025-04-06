const path = require('path');
const fs = require('fs');
const File = require('../models/File');
const ErrorResponse = require('../utils/errorResponse');
const logger = require('../utils/logger');
const config = require('../config/config');

// @desc    Upload file
// @route   POST /api/upload
// @access  Private/Admin
exports.uploadFile = async (req, res, next) => {
  try {
    if (!req.files) {
      return next(new ErrorResponse('Please upload a file', 400));
    }

    const file = req.files.file;

    // Make sure the file is an image
    if (!file.mimetype.startsWith('image')) {
      return next(new ErrorResponse('Please upload an image file', 400));
    }

    // Check filesize
    if (file.size > config.MAX_FILE_UPLOAD) {
      return next(
        new ErrorResponse(
          `Please upload an image less than ${config.MAX_FILE_UPLOAD / (1024 * 1024)}MB`,
          400
        )
      );
    }

    // Create custom filename
    const fileExtension = path.parse(file.name).ext;
    file.name = `${Date.now()}-${Math.round(Math.random() * 1E9)}${fileExtension}`;

    // Create folder for uploads if it doesn't exist
    const uploadPath = path.join(__dirname, '..', config.FILE_UPLOAD_PATH);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // Create folder for type if specified
    let folderPath = uploadPath;
    if (req.body.folder) {
      folderPath = path.join(uploadPath, req.body.folder);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }
    }

    // Move file to the folder
    file.mv(`${folderPath}/${file.name}`, async (err) => {
      if (err) {
        logger.error(`Error uploading file: ${err.message}`);
        return next(new ErrorResponse('Problem with file upload', 500));
      }

      // Save file info to database
      const filePath = req.body.folder 
        ? `${req.body.folder}/${file.name}` 
        : file.name;
        
      const fileData = await File.create({
        name: file.name,
        originalName: file.name,
        mimetype: file.mimetype,
        size: file.size,
        path: filePath,
        type: req.body.type || 'image',
        uploadedBy: req.user.id
      });

      res.status(200).json({
        success: true,
        data: fileData
      });
    });
  } catch (err) {
    logger.error(`Upload error: ${err.message}`);
    next(err);
  }
};

// @desc    Get all files
// @route   GET /api/upload/files
// @access  Private/Admin
exports.getFiles = async (req, res, next) => {
  try {
    // Extract query params for filtering
    const { type, page = 1, limit = 20 } = req.query;
    
    // Build query
    const query = {};
    if (type) {
      query.type = type;
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * parseInt(limit);
    const total = await File.countDocuments(query);

    const files = await File.find(query)
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(parseInt(limit))
      .populate('uploadedBy', 'name');

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: files.length,
      pagination,
      data: files
    });
  } catch (err) {
    logger.error(`Get files error: ${err.message}`);
    next(err);
  }
};

// @desc    Delete file
// @route   DELETE /api/upload/:id
// @access  Private/Admin
exports.deleteFile = async (req, res, next) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return next(new ErrorResponse(`File not found with id of ${req.params.id}`, 404));
    }

    // Build the file path
    const filePath = path.join(
      __dirname,
      '..',
      config.FILE_UPLOAD_PATH,
      file.path
    );

    // Check if file exists
    if (fs.existsSync(filePath)) {
      // Delete file from filesystem
      fs.unlinkSync(filePath);
    }

    // Delete file from database
    await file.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    logger.error(`Delete file error: ${err.message}`);
    next(err);
  }
}; 