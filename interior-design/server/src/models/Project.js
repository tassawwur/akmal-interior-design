const mongoose = require('mongoose');
const slugify = require('slugify');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  client: {
    type: String,
    required: [true, 'Please add a client name']
  },
  projectType: {
    type: String,
    required: [true, 'Please specify the project type'],
    enum: [
      'Residential',
      'Commercial',
      'Hospitality',
      'Office',
      'Retail',
      'Educational',
      'Healthcare',
      'Other'
    ]
  },
  area: {
    type: Number,
    required: [true, 'Please specify the area in square feet']
  },
  completionDate: {
    type: Date,
    required: [true, 'Please add the completion date']
  },
  images: {
    type: [String],
    required: [true, 'Please add at least one image'],
    validate: {
      validator: function(val) {
        return val.length > 0;
      },
      message: 'A project must have at least one image'
    }
  },
  featured: {
    type: Boolean,
    default: false
  },
  services: [String],
  testimonial: {
    content: String,
    author: String
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create project slug from title
ProjectSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model('Project', ProjectSchema); 