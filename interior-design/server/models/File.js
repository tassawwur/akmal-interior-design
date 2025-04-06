const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a file name']
  },
  originalName: {
    type: String,
    required: [true, 'Please add original file name']
  },
  mimetype: {
    type: String,
    required: [true, 'Please add a file type']
  },
  size: {
    type: Number,
    required: [true, 'Please add a file size']
  },
  path: {
    type: String,
    required: [true, 'Please add a file path']
  },
  type: {
    type: String,
    enum: ['image', 'document', 'video', 'other'],
    default: 'image'
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create full url for file
FileSchema.virtual('url').get(function() {
  return `/uploads/${this.path}`;
});

module.exports = mongoose.model('File', FileSchema); 