const mongoose = require('mongoose');

const newsEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
    maxlength: [5000, 'Content cannot exceed 5000 characters']
  },
  type: {
    type: String,
    enum: {
      values: ['News', 'Event'],
      message: 'Type must be either News or Event'
    },
    required: [true, 'Type is required']
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  eventDate: {
    type: Date,
    validate: {
      validator: function(v) {
        // Event date is required only for events
        if (this.type === 'Event') {
          return v != null;
        }
        return true;
      },
      message: 'Event date is required for events'
    }
  },
  location: {
    type: String,
    trim: true,
    maxlength: [200, 'Location cannot exceed 200 characters'],
    validate: {
      validator: function(v) {
        // Location is required only for events
        if (this.type === 'Event') {
          return v && v.trim().length > 0;
        }
        return true;
      },
      message: 'Location is required for events'
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
  isPublished: {
    type: Boolean,
    default: true
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
    maxlength: [100, 'Author name cannot exceed 100 characters']
  }
}, {
  timestamps: true
});

// Index for better query performance
newsEventSchema.index({ type: 1, isPublished: 1 });
newsEventSchema.index({ publishDate: -1 });
newsEventSchema.index({ eventDate: 1 });
newsEventSchema.index({ title: 'text', content: 'text' });

// Virtual for checking if event is upcoming
newsEventSchema.virtual('isUpcoming').get(function() {
  if (this.type === 'Event' && this.eventDate) {
    return this.eventDate > new Date();
  }
  return false;
});

module.exports = mongoose.model('NewsEvent', newsEventSchema);