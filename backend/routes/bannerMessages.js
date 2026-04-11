/**
 * Banner Messages Routes (Admin)
 */

const express = require('express');
const { body } = require('express-validator');
const bannerMessageController = require('../controllers/bannerMessageController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

/**
 * @route   GET /api/admin/banner-messages
 * @desc    Get all banner messages
 * @access  Admin
 */
router.get('/', bannerMessageController.getAllBannerMessages);

/**
 * @route   GET /api/admin/banner-messages/:id
 * @desc    Get single banner message
 * @access  Admin
 */
router.get('/:id', bannerMessageController.getBannerMessageById);

/**
 * @route   POST /api/admin/banner-messages
 * @desc    Create new banner message
 * @access  Admin
 */
router.post('/', [
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ max: 200 })
    .withMessage('Message cannot exceed 200 characters'),
  body('icon')
    .optional()
    .trim(),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a positive integer')
], bannerMessageController.createBannerMessage);

/**
 * @route   PUT /api/admin/banner-messages/:id
 * @desc    Update banner message
 * @access  Admin
 */
router.put('/:id', [
  body('message')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Message cannot be empty')
    .isLength({ max: 200 })
    .withMessage('Message cannot exceed 200 characters'),
  body('icon')
    .optional()
    .trim(),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a positive integer')
], bannerMessageController.updateBannerMessage);

/**
 * @route   DELETE /api/admin/banner-messages/:id
 * @desc    Delete banner message
 * @access  Admin
 */
router.delete('/:id', bannerMessageController.deleteBannerMessage);

/**
 * @route   PATCH /api/admin/banner-messages/:id/toggle
 * @desc    Toggle banner message active status
 * @access  Admin
 */
router.patch('/:id/toggle', bannerMessageController.toggleBannerMessage);

module.exports = router;
