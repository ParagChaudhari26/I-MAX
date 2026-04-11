const { Notification, UserNotification } = require('../models/Notification');
const User = require('../models/User');
const { sendBulkNotificationEmails } = require('../utils/emailService');

/**
 * Notification Service Layer
 * Handles business logic for notification operations
 */

const BATCH_SIZE = 1000; // Process users in batches of 1000

/**
 * Create a new notification
 * @param {Object} data - Notification data
 * @param {String} adminId - ID of admin creating the notification
 * @returns {Promise<Object>} Created notification
 */
const createNotification = async (data, adminId) => {
  const { title, message, type, scheduledAt, category, targetUsers, sendEmail } = data;

  // Validate scheduled time
  if (type === 'scheduled') {
    if (!scheduledAt) {
      throw new Error('scheduledAt is required for scheduled notifications');
    }
    
    const scheduleDate = new Date(scheduledAt);
    if (scheduleDate < new Date()) {
      // If scheduled time is in the past, send immediately
      console.warn('Scheduled time is in the past, sending immediately');
    }
  }

  const notification = await Notification.create({
    title,
    message,
    type,
    category: category || 'general',
    targetUsers: targetUsers || 'all',
    scheduledAt: type === 'scheduled' ? new Date(scheduledAt) : null,
    isSent: false,
    createdBy: adminId,
    sendEmail: sendEmail || false // Store whether to send email
  });

  return notification;
};

/**
 * Send instant notification to all users
 * Uses batch processing for efficiency
 * @param {Object} notification - Notification document
 * @param {Boolean} sendEmail - Whether to send email notifications
 * @returns {Promise<Object>} Results with user count and email stats
 */
const sendInstantNotification = async (notification, sendEmail = false) => {
  try {
    let userIds = [];
    let users = []; // Full user objects for email

    // Determine target users
    if (notification.targetUsers === 'all') {
      // Fetch users with email for email sending
      if (sendEmail) {
        users = await User.find({ isVerified: true }, '_id email').lean();
        userIds = users.map(user => user._id);
      } else {
        // Fetch only _id field for efficiency
        const userDocs = await User.find({ isVerified: true }, '_id').lean();
        userIds = userDocs.map(user => user._id);
      }
    } else if (Array.isArray(notification.targetUsers)) {
      userIds = notification.targetUsers;
      if (sendEmail) {
        users = await User.find({ _id: { $in: userIds }, isVerified: true }, '_id email').lean();
      }
    }

    if (userIds.length === 0) {
      console.log(`No users to notify for notification ${notification._id}`);
      notification.isSent = true;
      notification.sentAt = new Date();
      await notification.save();
      return {
        userCount: 0,
        emailStats: null
      };
    }

    // Process in batches to avoid memory issues
    let totalInserted = 0;
    for (let i = 0; i < userIds.length; i += BATCH_SIZE) {
      const batch = userIds.slice(i, i + BATCH_SIZE);
      
      const userNotificationsBatch = batch.map(userId => ({
        userId,
        notificationId: notification._id,
        isRead: false
      }));

      try {
        const result = await UserNotification.insertMany(userNotificationsBatch, { 
          ordered: false 
        });
        totalInserted += result.length;
      } catch (error) {
        // Handle duplicate key errors gracefully
        if (error.code === 11000) {
          // Count successful inserts from error details
          const inserted = error.insertedDocs ? error.insertedDocs.length : 0;
          totalInserted += inserted;
          console.warn(`Batch ${i / BATCH_SIZE + 1}: ${inserted} inserted, some duplicates skipped`);
        } else {
          throw error;
        }
      }
    }

    // Send emails if requested
    let emailStats = null;
    if (sendEmail && users.length > 0) {
      console.log(`Sending notification emails to ${users.length} users...`);
      emailStats = await sendBulkNotificationEmails(
        users,
        notification.title,
        notification.message,
        notification.category
      );
      console.log(`Email sending complete: ${emailStats.success} sent, ${emailStats.failed} failed`);
    }

    // Mark notification as sent
    notification.isSent = true;
    notification.sentAt = new Date();
    await notification.save();

    console.log(`Notification ${notification._id} sent to ${totalInserted} users`);
    
    return {
      userCount: totalInserted,
      emailStats: emailStats
    };
  } catch (error) {
    console.error('Error sending instant notification:', error);
    throw error;
  }
};

/**
 * Process and dispatch scheduled notifications
 * Called by cron job
 * @returns {Promise<Number>} Number of notifications processed
 */
const dispatchScheduledNotifications = async () => {
  try {
    const now = new Date();
    
    // Find notifications that are due
    const pendingNotifications = await Notification.find({
      isSent: false,
      type: 'scheduled',
      scheduledAt: { $lte: now }
    }).limit(50); // Process max 50 notifications per run

    if (pendingNotifications.length === 0) {
      return 0;
    }

    console.log(`Processing ${pendingNotifications.length} scheduled notifications`);

    for (const notification of pendingNotifications) {
      try {
        // Check if email should be sent (stored in notification or default to false)
        const sendEmail = notification.sendEmail || false;
        await sendInstantNotification(notification, sendEmail);
      } catch (error) {
        console.error(`Failed to send notification ${notification._id}:`, error);
        // Continue with next notification
      }
    }

    return pendingNotifications.length;
  } catch (error) {
    console.error('Error dispatching scheduled notifications:', error);
    throw error;
  }
};

/**
 * Get paginated notifications for admin
 * @param {Object} options - Query options
 * @returns {Promise<Object>} Paginated results
 */
const getAdminNotifications = async (options = {}) => {
  const {
    page = 1,
    limit = 20,
    type,
    isSent
  } = options;

  const query = {};
  if (type) query.type = type;
  if (isSent !== undefined) query.isSent = isSent;

  const skip = (page - 1) * limit;

  const [notifications, total] = await Promise.all([
    Notification.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('createdBy', 'username email')
      .lean(),
    Notification.countDocuments(query)
  ]);

  return {
    notifications,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

/**
 * Get user notifications with pagination
 * @param {String} userId - User ID
 * @param {Object} options - Query options
 * @returns {Promise<Object>} Paginated results
 */
const getUserNotifications = async (userId, options = {}) => {
  const {
    page = 1,
    limit = 20,
    unreadOnly = false
  } = options;

  const query = { userId };
  if (unreadOnly) query.isRead = false;

  const skip = (page - 1) * limit;

  const [notifications, total] = await Promise.all([
    UserNotification.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('notificationId')
      .lean(),
    UserNotification.countDocuments(query)
  ]);

  return {
    notifications,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

/**
 * Get unread notification count for user
 * @param {String} userId - User ID
 * @returns {Promise<Number>} Unread count
 */
const getUnreadCount = async (userId) => {
  return await UserNotification.countDocuments({ userId, isRead: false });
};

/**
 * Mark notification as read
 * @param {String} userNotificationId - UserNotification ID
 * @param {String} userId - User ID (for verification)
 * @returns {Promise<Object>} Updated notification
 */
const markAsRead = async (userNotificationId, userId) => {
  const userNotif = await UserNotification.findOneAndUpdate(
    { _id: userNotificationId, userId },
    { isRead: true, readAt: new Date() },
    { new: true }
  );

  if (!userNotif) {
    throw new Error('Notification not found for this user');
  }

  return userNotif;
};

/**
 * Mark all notifications as read for user
 * @param {String} userId - User ID
 * @returns {Promise<Number>} Number of notifications updated
 */
const markAllAsRead = async (userId) => {
  const result = await UserNotification.updateMany(
    { userId, isRead: false },
    { isRead: true, readAt: new Date() }
  );

  return result.modifiedCount;
};

/**
 * Delete notification (admin only)
 * @param {String} notificationId - Notification ID
 * @returns {Promise<Boolean>} Success status
 */
const deleteNotification = async (notificationId) => {
  const notification = await Notification.findByIdAndDelete(notificationId);
  
  if (!notification) {
    throw new Error('Notification not found');
  }

  // Delete associated UserNotifications
  await UserNotification.deleteMany({ notificationId });

  return true;
};

module.exports = {
  createNotification,
  sendInstantNotification,
  dispatchScheduledNotifications,
  getAdminNotifications,
  getUserNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification
};
