const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SEOSchema = new Schema({
  pagePath: {
    type: String,
    required: [true, 'Page path is required'],
    unique: true,
    trim: true
  },
  title: {
    type: String,
    required: [true, 'Meta title is required'],
    trim: true,
    maxlength: [70, 'Title should not exceed 70 characters']
  },
  description: {
    type: String,
    required: [true, 'Meta description is required'],
    trim: true,
    maxlength: [160, 'Description should not exceed 160 characters']
  },
  keywords: {
    type: String,
    required: false,
    trim: true,
    maxlength: [200, 'Keywords should not exceed 200 characters']
  },
  ogTitle: {
    type: String,
    trim: true,
    maxlength: [70, 'Open Graph title should not exceed 70 characters']
  },
  ogDescription: {
    type: String,
    trim: true,
    maxlength: [200, 'Open Graph description should not exceed 200 characters']
  },
  ogImage: {
    type: String,
    trim: true
  },
  structuredData: {
    type: String,
    trim: true
  },
  canonicalUrl: {
    type: String,
    trim: true
  },
  robotsTxt: {
    type: String,
    default: 'index, follow',
    enum: ['index, follow', 'noindex, follow', 'index, nofollow', 'noindex, nofollow']
  },
  priority: {
    type: Number,
    min: 0.0,
    max: 1.0,
    default: 0.5
  },
  changeFrequency: {
    type: String,
    enum: ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'],
    default: 'weekly'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
SEOSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('SEO', SEOSchema); 