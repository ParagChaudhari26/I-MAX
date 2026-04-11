const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  type: {
    type: String,
    enum: ['instant', 'scheduled'],
    required: true
  },
  category: {
    type: String,
    enum: ['seasonal', 'consultation', 'admin', 'general'],
    default: 'general'
  },
  targetUsers: {
    type: mongoose.Schema.Types.Mixed,
    // Can be "all" or an array of ObjectIds
    default: 'all'
  },
  scheduledAt: {
    type: Date,
    default: null
  },
  isSent: {
    type: Boolean,
    default: false
  },
  sentAt: {
    type: Date,
    default: null
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  sendEmail: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Indexes for efficient queries
notificationSchema.index({ isSent: 1, scheduledAt: 1 });
notificationSchema.index({ createdAt: -1 });
notificationSchema.index({ type: 1, isSent: 1 });

const Notification = mongoose.model('Notification', notificationSchema);

const userNotificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  notificationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notification',
    required: true
  },
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date,
    default: null
  }
}, { timestamps: true });

// Indexes for efficient queries
userNotificationSchema.index({ userId: 1, isRead: 1 });
userNotificationSchema.index({ notificationId: 1 });
userNotificationSchema.index({ userId: 1, notificationId: 1 }, { unique: true });
userNotificationSchema.index({ userId: 1, createdAt: -1 });

const UserNotification = mongoose.model('UserNotification', userNotificationSchema);

module.exports = { Notification, UserNotification };
