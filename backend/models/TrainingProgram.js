const mongoose = require('mongoose');

const trainingProgramSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  type: {
    type: String,
    enum: {
      values: ['Online', 'In-Person'],
      message: 'Type must be either Online or In-Person'
    },
    required: [true, 'Type is required']
  },
  duration: {
    type: String,
    required: [true, 'Duration is required'],
    trim: true,
    maxlength: [100, 'Duration cannot exceed 100 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  instructor: {
    type: String,
    required: [true, 'Instructor is required'],
    trim: true,
    maxlength: [100, 'Instructor name cannot exceed 100 characters']
  },
  schedule: {
    type: String,
    trim: true,
    maxlength: [500, 'Schedule cannot exceed 500 characters']
  },
  isActive: {
    type: Boolean,
    default: true
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
  syllabus: [{
    topic: {
      type: String,
      required: [true, 'Topic is required'],
      trim: true,
      maxlength: [200, 'Topic cannot exceed 200 characters']
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
      trim: true,
      maxlength: [50, 'Duration cannot exceed 50 characters']
    }
  }]
}, {
  timestamps: true
});

// Index for better query performance
trainingProgramSchema.index({ type: 1, isActive: 1 });
trainingProgramSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('TrainingProgram', trainingProgramSchema);