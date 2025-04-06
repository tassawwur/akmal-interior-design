const path = require('path');
const fs = require('fs');
const ErrorResponse = require('../utils/errorResponse');
const logger = require('../utils/logger');
const config = require('../config/config');

/**
 * @desc    Upload a file
 * @route   POST /api/upload
 * @access  Private/Admin
 */
exports.upload = async (req, res, next) => {
  try {
    // Check if file was uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return next(new ErrorResponse('No file uploaded', 400));
    }

    const file = req.files.file;

    // Validate file type
    const validFileTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validFileTypes.includes(file.mimetype)) {
      return next(new ErrorResponse('Please upload a valid image file', 400));
    }

    // Check file size
    if (file.size > config.MAX_FILE_UPLOAD) {
      return next(
        new ErrorResponse(
          `Please upload an image less than ${config.MAX_FILE_UPLOAD / (1024 * 1024)}MB`,
          400
        )
      );
    }

    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.name);
    const fileName = `upload-${uniqueSuffix}${fileExtension}`;

    // Ensure upload directory exists
    const uploadDir = config.UPLOAD_PATH;
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Move file to upload location
    await file.mv(path.join(uploadDir, fileName));

    logger.info(`File uploaded: ${fileName}`);

    // Return success response with file info
    res.status(200).json({
      success: true,
      data: {
        fileName,
        filePath: `/uploads/${fileName}`,
        fileSize: file.size,
        mimeType: file.mimetype
      }
    });
  } catch (err) {
    logger.error(`Upload error: ${err.message}`);
    next(err);
  }
};

/**
 * @desc    Get all uploads
 * @route   GET /api/upload
 * @access  Private/Admin
 */
exports.getUploads = async (req, res, next) => {
  try {
    const uploadDir = config.UPLOAD_PATH;

    // Check if directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
      return res.status(200).json({
        success: true,
        count: 0,
        data: []
      });
    }

    // Read directory contents
    const files = fs.readdirSync(uploadDir);

    // Map files to include full information
    const fileData = files.map(file => {
      const filePath = path.join(uploadDir, file);
      const stats = fs.statSync(filePath);

      return {
        name: file,
        path: `/uploads/${file}`,
        size: stats.size,
        createdAt: stats.birthtime,
        url: `${config.SITE_URL}/uploads/${file}`
      };
    });

    // Sort by most recent first
    fileData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json({
      success: true,
      count: fileData.length,
      data: fileData
    });
  } catch (err) {
    logger.error(`Error retrieving uploads: ${err.message}`);
    next(err);
  }
};

/**
 * @desc    Delete an upload
 * @route   DELETE /api/upload/:id
 * @access  Private/Admin
 */
exports.deleteUpload = async (req, res, next) => {
  try {
    const fileName = req.params.id;
    
    // Validate filename to prevent directory traversal
    if (fileName.includes('..') || fileName.includes('/')) {
      return next(new ErrorResponse('Invalid filename', 400));
    }

    const filePath = path.join(config.UPLOAD_PATH, fileName);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return next(new ErrorResponse('File not found', 404));
    }

    // Delete file
    fs.unlinkSync(filePath);
    logger.info(`File deleted: ${fileName}`);

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    logger.error(`Error deleting file: ${err.message}`);
    next(err);
  }
}; 