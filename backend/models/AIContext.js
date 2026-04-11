const mongoose = require('mongoose');

const aiContextSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Context title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Context content is required'],
    trim: true,
    maxlength: [5000, 'Content cannot exceed 5000 characters']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

aiContextSchema.index({ isActive: 1 });

module.exports = mongoose.model('AIContext', aiContextSchema);
