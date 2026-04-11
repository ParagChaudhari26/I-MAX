const notificationService = require('../services/notificationService');
const { body, validationResult } = require('express-validator');

// --- Admin Endpoints ---

/**
 * Validation rules for creating notification
 */
exports.validateCreateNotification = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ max: 500 }).withMessage('Message cannot exceed 500 characters'),
  body('type')
    .isIn(['instant', 'scheduled']).withMessage('Type must be either instant or scheduled'),
  body('scheduledAt')
    .optional()
    .isISO8601().withMessage('scheduledAt must be a valid date'),
  body('category')
    .optional()
    .isIn(['seasonal', 'consultation', 'admin', 'general']).withMessage('Invalid category'),
  body('sendEmail')
    .optional()
    .isBoolean().withMessage('sendEmail must be a boolean')
];

/**
 * Create and optionally send notification
 * POST /api/admin/notifications
 */
exports.createNotification = async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input',
          details: errors.array()
        }
      });
    }

    const { title, message, type, scheduledAt, category, targetUsers, sendEmail } = req.body;
    const adminId = req.user._id;

    // Create notification
    const notification = await notificationService.createNotification(
      { title, message, type, scheduledAt, category, targetUsers, sendEmail },
      adminId
    );

    // If instant, send immediately
    if (type === 'instant') {
      const result = await notificationService.sendInstantNotification(notification, sendEmail);
      
      let responseMessage = `Notification sent to ${result.userCount} users`;
      if (sendEmail && result.emailStats) {
        responseMessage += `. Emails: ${result.emailStats.success} sent, ${result.emailStats.failed} failed`;
      }
      
      return res.status(201).json({
        success: true,
        data: notification,
        message: responseMessage,
        emailStats: result.emailStats
      });
    }

    // If scheduled, just return the created notification
    res.status(201).json({
      success: true,
      data: notification,
      message: 'Notification scheduled successfully'
    });
  } catch (error) {
    console.error('Create notification error:', error);
    res.status(400).json({
      success: false,
      error: {
        code: 'CREATE_FAILED',
        message: error.message
      }
    });
  }
};

/**
 * Get all notifications (admin view) with pagination
 * GET /api/admin/notifications
 */
exports.getAdminNotifications = async (req, res) => {
  try {
    const { page, limit, type, isSent } = req.query;

    const result = await notificationService.getAdminNotifications({
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 20,
      type,
      isSent: isSent !== undefined ? isSent === 'true' : undefined
    });

    res.status(200).json({
      success: true,
      data: result.notifications,
      pagination: result.pagination
    });
  } catch (error) {
    console.error('Get admin notifications error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'FETCH_FAILED',
        message: error.message
      }
    });
  }
};

/**
 * Delete notification
 * DELETE /api/admin/notifications/:id
 */
exports.deleteNotification = async (req, res) => {
  try {
    await notificationService.deleteNotification(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Notification deleted successfully'
    });
  } catch (error) {
    console.error('Delete notification error:', error);
    const statusCode = error.message === 'Notification not found' ? 404 : 500;
    res.status(statusCode).json({
      success: false,
      error: {
        code: 'DELETE_FAILED',
        message: error.message
      }
    });
  }
};

// --- User Endpoints ---

/**
 * Get user notifications with pagination
 * GET /api/user/notifications
 */
exports.getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page, limit, unreadOnly } = req.query;

    const result = await notificationService.getUserNotifications(userId, {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 20,
      unreadOnly: unreadOnly === 'true'
    });

    res.status(200).json({
      success: true,
      data: result.notifications,
      pagination: result.pagination
    });
  } catch (error) {
    console.error('Get user notifications error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'FETCH_FAILED',
        message: error.message
      }
    });
  }
};

/**
 * Get unread notification count
 * GET /api/user/notifications/unread-count
 */
exports.getUnreadCount = async (req, res) => {
  try {
    const userId = req.user.id;
    const count = await notificationService.getUnreadCount(userId);

    res.status(200).json({
      success: true,
      count
    });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'FETCH_FAILED',
        message: error.message
      }
    });
  }
};

/**
 * Mark notification as read
 * PUT /api/user/notifications/:id/read
 */
exports.markAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const userNotificationId = req.params.id;

    const userNotif = await notificationService.markAsRead(userNotificationId, userId);

    res.status(200).json({
      success: true,
      data: userNotif
    });
  } catch (error) {
    console.error('Mark as read error:', error);
    const statusCode = error.message === 'Notification not found for this user' ? 404 : 500;
    res.status(statusCode).json({
      success: false,
      error: {
        code: 'UPDATE_FAILED',
        message: error.message
      }
    });
  }
};

/**
 * Mark all notifications as read
 * PUT /api/user/notifications/mark-all-read
 */
exports.markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const count = await notificationService.markAllAsRead(userId);

    res.status(200).json({
      success: true,
      message: `${count} notifications marked as read`
    });
  } catch (error) {
    console.error('Mark all as read error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'UPDATE_FAILED',
        message: error.message
      }
    });
  }
};
