const paymentReceiptService = require('../services/paymentReceiptService');
const { body, validationResult } = require('express-validator');

// --- Admin Endpoints ---

/**
 * Validation rules for uploading receipt
 */
exports.validateUploadReceipt = [
  body('userId')
    .notEmpty().withMessage('User email is required')
    .isEmail().withMessage('Invalid email address'),
  body('amount')
    .optional()
    .isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
  body('paymentDate')
    .optional()
    .isISO8601().withMessage('Payment date must be a valid date'),
  body('paymentMethod')
    .optional()
    .isIn(['cash', 'card', 'upi', 'bank_transfer', 'other']).withMessage('Invalid payment method'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Notes cannot exceed 500 characters')
];

/**
 * Upload payment receipt (Admin only)
 * POST /api/admin/payment-receipts/upload
 */
exports.uploadReceipt = async (req, res) => {
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

    // Check if file is present
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'FILE_REQUIRED',
          message: 'Receipt file is required'
        }
      });
    }

    const { userId: userEmail, amount, paymentDate, paymentMethod, description, notes } = req.body;
    const adminId = req.user._id;

    // Create receipt (service will look up user by email)
    const receipt = await paymentReceiptService.createPaymentReceipt(
      req.file.buffer,
      req.file.mimetype,
      userEmail,
      { amount, paymentDate, paymentMethod, description, notes },
      adminId
    );

    res.status(201).json({
      success: true,
      data: receipt,
      message: 'Payment receipt uploaded successfully'
    });
  } catch (error) {
    console.error('Upload receipt error:', error);
    const statusCode = error.message === 'User not found' ? 404 : 500;
    res.status(statusCode).json({
      success: false,
      error: {
        code: 'UPLOAD_FAILED',
        message: error.message
      }
    });
  }
};

/**
 * Get all receipts (Admin view)
 * GET /api/admin/payment-receipts
 */
exports.getAdminReceipts = async (req, res) => {
  try {
    const { page, limit, userId } = req.query;

    const result = await paymentReceiptService.getAllReceipts({
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 20,
      userId
    });

    res.status(200).json({
      success: true,
      data: result.receipts,
      pagination: result.pagination
    });
  } catch (error) {
    console.error('Get admin receipts error:', error);
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
 * Delete receipt (Admin only)
 * DELETE /api/admin/payment-receipts/:id
 */
exports.deleteReceipt = async (req, res) => {
  try {
    await paymentReceiptService.deleteReceipt(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Payment receipt deleted successfully'
    });
  } catch (error) {
    console.error('Delete receipt error:', error);
    const statusCode = error.message === 'Receipt not found' ? 404 : 500;
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
 * Get user receipts
 * GET /api/user/payment-receipts
 */
exports.getUserReceipts = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page, limit } = req.query;

    const result = await paymentReceiptService.getUserReceipts(userId, {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10
    });

    res.status(200).json({
      success: true,
      data: result.receipts,
      pagination: result.pagination
    });
  } catch (error) {
    console.error('Get user receipts error:', error);
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
 * Get single receipt by ID
 * GET /api/user/payment-receipts/:id
 */
exports.getReceiptById = async (req, res) => {
  try {
    const userId = req.user.id;
    const receiptId = req.params.id;

    const receipt = await paymentReceiptService.getReceiptById(receiptId, userId);

    res.status(200).json({
      success: true,
      data: receipt
    });
  } catch (error) {
    console.error('Get receipt by ID error:', error);
    const statusCode = error.message.includes('not found') ? 404 : 500;
    res.status(statusCode).json({
      success: false,
      error: {
        code: 'FETCH_FAILED',
        message: error.message
      }
    });
  }
};
