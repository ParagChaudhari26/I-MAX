const mongoose = require('mongoose');

const galleryImageSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  url: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Ayurveda Treatment', 'Training Programs', 'Clinic', 'Events', 'Other'],
    default: 'Other'
  },
  width: {
    type: Number,
  },
  height: {
    type: Number,
  }
}, { timestamps: true });

module.exports = mongoose.model('GalleryImage', galleryImageSchema);
