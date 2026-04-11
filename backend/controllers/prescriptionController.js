const prescriptionService = require('../services/prescriptionService');
const { body, validationResult } = require('express-validator');

// --- Admin Endpoints ---

/**
 * Validation rules for uploading prescription
 */
exports.validateUploadPrescription = [
  body('userId')
    .notEmpty().withMessage('User email is required')
    .isEmail().withMessage('Invalid email address'),
  body('doctorName')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Doctor name cannot exceed 100 characters'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Notes cannot exceed 500 characters')
];

/**
 * Upload prescription (Admin only)
 * POST /api/admin/prescriptions/upload
 */
exports.uploadPrescription = async (req, res) => {
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
          message: 'Prescription file is required'
        }
      });
    }

    const { userId: userEmail, doctorName, notes } = req.body;
    const adminId = req.user._id;

    // Create prescription (service will look up user by email)
    const prescription = await prescriptionService.createPrescription(
      req.file.buffer,
      req.file.mimetype,
      userEmail,
      { doctorName, notes },
      adminId
    );

    res.status(201).json({
      success: true,
      data: prescription,
      message: 'Prescription uploaded successfully'
    });
  } catch (error) {
    console.error('Upload prescription error:', error);
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
 * Get all prescriptions (Admin view)
 * GET /api/admin/prescriptions
 */
exports.getAdminPrescriptions = async (req, res) => {
  try {
    const { page, limit, userId, search } = req.query;

    const result = await prescriptionService.getAllPrescriptions({
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 20,
      userId,
      search
    });

    res.status(200).json({
      success: true,
      data: result.prescriptions,
      pagination: result.pagination
    });
  } catch (error) {
    console.error('Get admin prescriptions error:', error);
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
 * Delete prescription (Admin only)
 * DELETE /api/admin/prescriptions/:id
 */
exports.deletePrescription = async (req, res) => {
  try {
    await prescriptionService.deletePrescription(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Prescription deleted successfully'
    });
  } catch (error) {
    console.error('Delete prescription error:', error);
    const statusCode = error.message === 'Prescription not found' ? 404 : 500;
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
 * Get user prescriptions
 * GET /api/user/prescriptions
 */
exports.getUserPrescriptions = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page, limit } = req.query;

    const result = await prescriptionService.getUserPrescriptions(userId, {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10
    });

    res.status(200).json({
      success: true,
      data: result.prescriptions,
      pagination: result.pagination
    });
  } catch (error) {
    console.error('Get user prescriptions error:', error);
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
 * Get single prescription by ID
 * GET /api/user/prescriptions/:id
 */
exports.getPrescriptionById = async (req, res) => {
  try {
    const userId = req.user.id;
    const prescriptionId = req.params.id;

    const prescription = await prescriptionService.getPrescriptionById(prescriptionId, userId);

    res.status(200).json({
      success: true,
      data: prescription
    });
  } catch (error) {
    console.error('Get prescription by ID error:', error);
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
