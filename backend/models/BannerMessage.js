/**
 * Banner Message Model
 * Stores dynamic banner messages that rotate on the website
 */

const mongoose = require('mongoose');

const { createLocalizedString } = require('../utils/languageSchema');

const bannerMessageSchema = new mongoose.Schema({
  message: createLocalizedString('Message is required', 200),
  icon: {
    type: String,
    default: '🏆',
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
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

// Update the updatedAt timestamp before saving
bannerMessageSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('BannerMessage', bannerMessageSchema);
