const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const ConstructionServiceSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Service name is required'],
    unique: true,
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  slug: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    trim: true,
    maxlength: [500, 'Short description cannot be more than 500 characters']
  },
  keywords: {
    type: [String],
    required: [true, 'Keywords are required'],
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'Please add at least one keyword'
    }
  },
  image: {
    type: String,
    default: 'no-photo.jpg'
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  metaTitle: {
    type: String,
    trim: true,
    maxlength: [70, 'Meta title should not exceed 70 characters']
  },
  metaDescription: {
    type: String,
    trim: true,
    maxlength: [160, 'Meta description should not exceed 160 characters']
  },
  faqs: [{
    question: {
      type: String,
      required: [true, 'FAQ question is required'],
      trim: true,
      maxlength: [200, 'Question cannot be more than 200 characters']
    },
    answer: {
      type: String,
      required: [true, 'FAQ answer is required'],
      trim: true,
      maxlength: [1000, 'Answer cannot be more than 1000 characters']
    }
  }],
  relatedServices: [{
    type: mongoose.Schema.ObjectId,
    ref: 'ConstructionService'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create service slug from the name
ConstructionServiceSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  
  // Set meta title and description if not provided
  if (!this.metaTitle) {
    this.metaTitle = `${this.name} - Professional Construction Service | Akmal`;
  }
  
  if (!this.metaDescription) {
    this.metaDescription = this.shortDescription.substring(0, 160);
  }
  
  next();
});

module.exports = mongoose.model('ConstructionService', ConstructionServiceSchema); 