/**
 * User Authentication Controller
 * Handles user registration, email verification, login, and resend verification
 */

const { User, EmailVerificationToken } = require('../models');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendVerificationEmail } = require('../utils/emailService');
const { setUserSession, deleteUserSession, jwtExpiryToSeconds } = require('../utils/redis');

/**
 * Generate secure random token for email verification
 * @returns {string} Secure random token
 */
const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

/**
 * Register a new user
 * POST /api/user-auth/register
 */
const register = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: errors.array().reduce((acc, error) => {
            acc[error.path] = error.msg;
            return acc;
          }, {})
        }
      });
    }

    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: {
          code: 'USER_EXISTS',
          message: 'An account with this email already exists'
        }
      });
    }

    // Create new user (isVerified defaults to false)
    const user = new User({
      username: username.trim(),
      email: email.toLowerCase(),
      password,
      isVerified: false
    });

    await user.save();

    // Generate verification token
    const token = generateVerificationToken();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24 hours expiration

    // Save verification token
    const verificationToken = new EmailVerificationToken({
      userId: user._id,
      token,
      expiresAt
    });

    await verificationToken.save();

    // Send verification email
    try {
      await sendVerificationEmail(user.email, token, user.username);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // Don't fail registration if email fails, but log it
      // In production, you might want to queue this for retry
    }

    // Return success response (don't include sensitive data)
    res.status(201).json({
      success: true,
      message: 'Registration successful. Please check your email to verify your account.',
      data: {
        userId: user._id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: Object.keys(error.errors).reduce((acc, key) => {
            acc[key] = error.errors[key].message;
            return acc;
          }, {})
        }
      });
    }

    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Failed to register user',
        details: error.message
      }
    });
  }
};

/**
 * Verify user email
 * GET /api/user-auth/verify
 */
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'TOKEN_REQUIRED',
          message: 'Verification token is required'
        }
      });
    }

    // Find verification token
    const verificationToken = await EmailVerificationToken.findOne({ token });
    
    if (!verificationToken) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Invalid or expired verification token'
        }
      });
    }

    // Check if token is expired
    if (new Date() > verificationToken.expiresAt) {
      // Delete expired token
      await EmailVerificationToken.findByIdAndDelete(verificationToken._id);
      return res.status(400).json({
        success: false,
        error: {
          code: 'TOKEN_EXPIRED',
          message: 'Verification token has expired. Please request a new one.'
        }
      });
    }

    // Find user
    const user = await User.findById(verificationToken.userId);
    if (!user) {
      await EmailVerificationToken.findByIdAndDelete(verificationToken._id);
      return res.status(404).json({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found'
        }
      });
    }

    // Check if already verified
    if (user.isVerified) {
      // Delete token since it's already used
      await EmailVerificationToken.findByIdAndDelete(verificationToken._id);
      return res.status(200).json({
        success: true,
        message: 'Email is already verified',
        data: {
          email: user.email,
          isVerified: true
        }
      });
    }

    // Mark user as verified
    user.isVerified = true;
    await user.save({ validateBeforeSave: false });

    // Delete verification token (one-time use)
    await EmailVerificationToken.findByIdAndDelete(verificationToken._id);

    res.json({
      success: true,
      message: 'Email verified successfully',
      data: {
        email: user.email,
        isVerified: true
      }
    });

  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Failed to verify email',
        details: error.message
      }
    });
  }
};

/**
 * Resend verification email
 * POST /api/user-auth/resend-verification
 */
const resendVerification = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: errors.array().reduce((acc, error) => {
            acc[error.path] = error.msg;
            return acc;
          }, {})
        }
      });
    }

    const { email } = req.body;

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // Don't reveal if user exists (security best practice)
      return res.status(200).json({
        success: true,
        message: 'If an account exists with this email, a verification link has been sent.'
      });
    }

    // Check if already verified
    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'ALREADY_VERIFIED',
          message: 'Email is already verified'
        }
      });
    }

    // Rate limiting: Check for recent token requests (within last 5 minutes)
    const recentToken = await EmailVerificationToken.findOne({
      userId: user._id,
      createdAt: { $gte: new Date(Date.now() - 5 * 60 * 1000) } // 5 minutes
    });

    if (recentToken) {
      return res.status(429).json({
        success: false,
        error: {
          code: 'RATE_LIMIT',
          message: 'Please wait a few minutes before requesting another verification email'
        }
      });
    }

    // Delete old tokens for this user
    await EmailVerificationToken.deleteMany({ userId: user._id });

    // Generate new verification token
    const token = generateVerificationToken();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    // Save new verification token
    const verificationToken = new EmailVerificationToken({
      userId: user._id,
      token,
      expiresAt
    });

    await verificationToken.save();

    // Send verification email
    try {
      await sendVerificationEmail(user.email, token, user.username);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      return res.status(500).json({
        success: false,
        error: {
          code: 'EMAIL_ERROR',
          message: 'Failed to send verification email. Please try again later.'
        }
      });
    }

    res.json({
      success: true,
      message: 'Verification email sent successfully'
    });

  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Failed to resend verification email',
        details: error.message
      }
    });
  }
};

/**
 * User login
 * POST /api/user-auth/login
 */
const login = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: errors.array().reduce((acc, error) => {
            acc[error.path] = error.msg;
            return acc;
          }, {})
        }
      });
    }

    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password'
        }
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password'
        }
      });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'EMAIL_NOT_VERIFIED',
          message: 'Please verify your email before logging in. Check your inbox for the verification link.',
          data: {
            email: user.email,
            isVerified: false
          }
        }
      });
    }

    // Generate JWT token
    const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: 'user'
      },
      process.env.JWT_SECRET,
      { expiresIn }
    );

    // Store token in Redis for session invalidation on logout
    const ttlSeconds = jwtExpiryToSeconds(expiresIn);
    await setUserSession(token, user._id.toString(), ttlSeconds);

    // Update last login
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    // Return success response
    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          isVerified: user.isVerified,
          lastLogin: user.lastLogin
        }
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'An error occurred during login'
      }
    });
  }
};

/**
 * User logout - delete token from Redis
 * POST /api/user-auth/logout
 * Header: Authorization: Bearer <token>
 */
const logout = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;

    if (token) {
      await deleteUserSession(token);
    }

    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'An error occurred during logout'
      }
    });
  }
};

/**
 * Forgot Password - Send reset email
 * POST /api/user-auth/forgot-password
 */
const forgotPassword = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: errors.array().reduce((acc, error) => {
            acc[error.path] = error.msg;
            return acc;
          }, {})
        }
      });
    }

    const { email } = req.body;

    // Find user - but don't reveal if they exist (security best practice)
    const user = await User.findOne({ email: email.toLowerCase() });
    
    // Always return success message regardless of whether user exists
    if (!user) {
      return res.status(200).json({
        success: true,
        message: 'If an account exists with this email, a password reset link has been sent.'
      });
    }

    // Generate JWT reset token (15 minutes expiry)
    const resetToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        type: 'password_reset'
      },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    // Send password reset email
    try {
      const { sendPasswordResetEmail } = require('../utils/emailService');
      await sendPasswordResetEmail(user.email, resetToken, user.username);
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError);
      // Don't reveal email sending failure to user
    }

    res.status(200).json({
      success: true,
      message: 'If an account exists with this email, a password reset link has been sent.'
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Failed to process password reset request',
        details: error.message
      }
    });
  }
};

/**
 * Reset Password - Update password with token
 * POST /api/user-auth/reset-password/:token
 */
const resetPassword = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: errors.array().reduce((acc, error) => {
            acc[error.path] = error.msg;
            return acc;
          }, {})
        }
      });
    }

    const { token } = req.params;
    const { password } = req.body;

    // Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (jwtError) {
      if (jwtError.name === 'TokenExpiredError') {
        return res.status(400).json({
          success: false,
          error: {
            code: 'TOKEN_EXPIRED',
            message: 'Password reset link has expired. Please request a new one.'
          }
        });
      }
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Invalid password reset link.'
        }
      });
    }

    // Verify token type
    if (decoded.type !== 'password_reset') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_TOKEN_TYPE',
          message: 'Invalid token type.'
        }
      });
    }

    // Find user
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found.'
        }
      });
    }

    // Update password (will be hashed by pre-save hook)
    user.password = password;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successful. You can now login with your new password.'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Failed to reset password',
        details: error.message
      }
    });
  }
};

/**
 * Change Password (for logged-in users)
 * POST /api/user-auth/change-password
 * Requires authentication
 */
const changePassword = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: errors.array().reduce((acc, error) => {
            acc[error.path] = error.msg;
            return acc;
          }, {})
        }
      });
    }

    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id; // From auth middleware

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found'
        }
      });
    }

    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_PASSWORD',
          message: 'Current password is incorrect'
        }
      });
    }

    // Check if new password is same as current
    const isSamePassword = await user.comparePassword(newPassword);
    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'SAME_PASSWORD',
          message: 'New password must be different from current password'
        }
      });
    }

    // Update password (will be hashed by pre-save hook)
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Failed to change password',
        details: error.message
      }
    });
  }
};

module.exports = {
  register,
  verifyEmail,
  resendVerification,
  login,
  logout,
  forgotPassword,
  resetPassword,
  changePassword
};

