const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  position: {
    type: String,
    required: [true, 'Please add a position or company'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Please add testimonial content'],
    maxlength: [500, 'Content cannot be more than 500 characters']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Please add a rating between 1 and 5']
  },
  image: {
    type: String,
    default: 'uploads/users/default.jpg'
  },
  featured: {
    type: Boolean,
    default: false
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project'
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

module.exports = mongoose.model('Testimonial', TestimonialSchema); 