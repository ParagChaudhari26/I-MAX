/**
 * User Authentication Routes
 * Separate from admin auth routes
 */

const express = require('express');
const { body } = require('express-validator');
const userAuthController = require('../controllers/userAuthController');
const { authenticateUserToken } = require('../middleware/auth');

const router = express.Router();

/**
 * @route   POST /api/user-auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Username must be between 2 and 50 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
], userAuthController.register);

/**
 * @route   GET /api/user-auth/verify
 * @desc    Verify user email with token
 * @access  Public
 */
router.get('/verify', userAuthController.verifyEmail);

/**
 * @route   POST /api/user-auth/resend-verification
 * @desc    Resend verification email
 * @access  Public
 */
router.post('/resend-verification', [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail()
], userAuthController.resendVerification);

/**
 * @route   POST /api/user-auth/login
 * @desc    User login (requires verified email). Token is stored in Redis.
 * @access  Public
 */
router.post('/login', [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
], userAuthController.login);

/**
 * @route   POST /api/user-auth/logout
 * @desc    User logout - deletes token from Redis. Send token in Authorization header.
 * @access  Public (token in header)
 */
router.post('/logout', userAuthController.logout);

/**
 * @route   POST /api/user-auth/forgot-password
 * @desc    Request password reset email
 * @access  Public
 */
router.post('/forgot-password', [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail()
], userAuthController.forgotPassword);

/**
 * @route   POST /api/user-auth/reset-password/:token
 * @desc    Reset password with token
 * @access  Public
 */
router.post('/reset-password/:token', [
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one letter and one number')
], userAuthController.resetPassword);

/**
 * @route   POST /api/user-auth/change-password
 * @desc    Change password for logged-in user
 * @access  Protected (requires authentication)
 */
router.post('/change-password', authenticateUserToken, [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .notEmpty()
    .withMessage('New password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one letter and one number')
], userAuthController.changePassword);

module.exports = router;

