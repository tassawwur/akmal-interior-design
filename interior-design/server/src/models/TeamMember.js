const mongoose = require('mongoose');
const slugify = require('slugify');

const TeamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  slug: String,
  position: {
    type: String,
    required: [true, 'Please add a position'],
    trim: true
  },
  bio: {
    type: String,
    required: [true, 'Please add a bio'],
    maxlength: [500, 'Bio cannot be more than 500 characters']
  },
  image: {
    type: String,
    default: 'uploads/users/default.jpg'
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  socialLinks: {
    instagram: String,
    linkedin: String,
    facebook: String,
    twitter: String,
    behance: String
  },
  order: {
    type: Number,
    default: 0
  },
  isVisible: {
    type: Boolean,
    default: true
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

// Create team member slug from name
TeamMemberSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('TeamMember', TeamMemberSchema); 