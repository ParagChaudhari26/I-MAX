const mongoose = require('mongoose');

const paymentReceiptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  receiptUrl: {
    type: String,
    required: true
  },
  receiptPublicId: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    enum: ['image', 'pdf'],
    required: true
  },
  amount: {
    type: Number,
    min: 0
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'upi', 'bank_transfer', 'other'],
    default: 'other'
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  notes: {
    type: String,
    trim: true,
    maxlength: 500
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  }
}, { 
  timestamps: true 
});

// Indexes for efficient queries
paymentReceiptSchema.index({ userId: 1, createdAt: -1 });
paymentReceiptSchema.index({ createdAt: -1 });
paymentReceiptSchema.index({ userId: 1, paymentDate: -1 });

module.exports = mongoose.model('PaymentReceipt', paymentReceiptSchema);
