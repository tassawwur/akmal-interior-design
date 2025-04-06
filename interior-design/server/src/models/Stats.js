const mongoose = require('mongoose');

const StatsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a stat name'],
    trim: true,
    unique: true
  },
  value: {
    type: Number,
    required: [true, 'Please add a value'],
    min: [0, 'Value must be a positive number']
  },
  icon: {
    type: String,
    default: 'fa-award'
  },
  prefix: {
    type: String,
    default: ''
  },
  suffix: {
    type: String,
    default: ''
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

module.exports = mongoose.model('Stats', StatsSchema);