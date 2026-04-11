const mongoose = require('mongoose');

const { createLocalizedString } = require('../utils/languageSchema');

const blogSchema = new mongoose.Schema({
  title: createLocalizedString('Title is required', 200),
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: [200, 'Slug cannot exceed 200 characters'],
    validate: {
      validator: function(v) {
        return /^[a-z0-9-]+$/.test(v);
      },
      message: 'Slug can only contain lowercase letters, numbers, and hyphens'
    }
  },
  content: createLocalizedString('Content is required', 10000),
  excerpt: createLocalizedString('Excerpt is required', 500),
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
    maxlength: [100, 'Author name cannot exceed 100 characters']
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [50, 'Tag cannot exceed 50 characters']
  }],
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    maxlength: [100, 'Category cannot exceed 100 characters']
  },
  featuredImage: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        if (!v) return true; // Allow empty string
        // Allow URLs ending with image extensions OR Cloudinary URLs OR Unsplash URLs
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v) || 
               /^https?:\/\/res\.cloudinary\.com\/.+/i.test(v) ||
               /^https?:\/\/images\.unsplash\.com\/.+/i.test(v);
      },
      message: 'Featured image URL must be a valid image URL (jpg, jpeg, png, gif, webp), Cloudinary URL, or Unsplash URL'
    }
  },
  featuredImagePublicId: {
    type: String,
    trim: true
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  publishDate: {
    type: Date,
    validate: {
      validator: function(v) {
        // Publish date is required only for published blogs
        if (this.isPublished) {
          return v != null;
        }
        return true;
      },
      message: 'Publish date is required for published blogs'
    }
  },
  readTime: {
    type: Number,
    min: [1, 'Read time must be at least 1 minute'],
    max: [120, 'Read time cannot exceed 120 minutes']
  }
}, {
  timestamps: true
});

// Pre-save middleware to auto-generate slug from title if not provided
blogSchema.pre('save', function(next) {
  if (!this.slug && this.title && this.title.en) {
    this.slug = this.title.en
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim('-'); // Remove leading/trailing hyphens
  }
  
  // Auto-calculate read time if not provided (assuming 200 words per minute)
  if (!this.readTime && this.content && this.content.en) {
    const wordCount = this.content.en.split(/\s+/).length;
    this.readTime = Math.max(1, Math.ceil(wordCount / 200));
  }
  
  // Set publish date if publishing for the first time
  if (this.isPublished && !this.publishDate) {
    this.publishDate = new Date();
  }
  
  next();
});

// Index for better query performance
blogSchema.index({ isPublished: 1, publishDate: -1 });
blogSchema.index({ category: 1, isPublished: 1 });
blogSchema.index({ tags: 1 });
// Note: slug index is already created by unique: true constraint
blogSchema.index({ 
  'title.en': 'text', 'title.hi': 'text', 'title.mr': 'text',
  'content.en': 'text', 'content.hi': 'text', 'content.mr': 'text',
  'excerpt.en': 'text', 'excerpt.hi': 'text', 'excerpt.mr': 'text' 
});

// Virtual for getting reading time display
blogSchema.virtual('readTimeDisplay').get(function() {
  if (this.readTime === 1) {
    return '1 minute read';
  }
  return `${this.readTime} minutes read`;
});

module.exports = mongoose.model('Blog', blogSchema);