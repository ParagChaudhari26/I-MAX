const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true,
    maxlength: [100, 'Customer name cannot exceed 100 characters']
  },
  customerLocation: {
    type: String,
    trim: true,
    maxlength: [100, 'Customer location cannot exceed 100 characters']
  },
  treatment: {
    type: String,
    required: [true, 'Treatment is required'],
    trim: true,
    maxlength: [200, 'Treatment cannot exceed 200 characters']
  },
  testimonialText: {
    type: String,
    required: [true, 'Testimonial text is required'],
    trim: true,
    maxlength: [2000, 'Testimonial text cannot exceed 2000 characters']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
    validate: {
      validator: function(v) {
        return Number.isInteger(v);
      },
      message: 'Rating must be a whole number'
    }
  },
  imageUrl: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        if (!v) return true; // Allow empty string
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
      },
      message: 'Image URL must be a valid URL ending with jpg, jpeg, png, gif, or webp'
    }
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  dateReceived: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for better query performance
testimonialSchema.index({ isApproved: 1 });
testimonialSchema.index({ rating: -1 });
testimonialSchema.index({ dateReceived: -1 });
testimonialSchema.index({ customerName: 'text', testimonialText: 'text' });

// Virtual for getting star display
testimonialSchema.virtual('starDisplay').get(function() {
  return '★'.repeat(this.rating) + '☆'.repeat(5 - this.rating);
});

module.exports = mongoose.model('Testimonial', testimonialSchema);