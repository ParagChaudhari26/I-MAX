const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Admin = require('../models/Admin');

const router = express.Router();

// Login endpoint
router.post('/login', [
  // Validation middleware
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Username must be between 3 and 50 characters'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input data',
          details: errors.array().reduce((acc, error) => {
            acc[error.path] = error.msg;
            return acc;
          }, {})
        }
      });
    }

    const { username, password } = req.body;

    // Find admin by username
    const admin = await Admin.findOne({ username, isActive: true });
    if (!admin) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid username or password'
        }
      });
    }

    // Check password
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid username or password'
        }
      });
    }

    // Update last login
    await admin.updateLastLogin();

    // Generate JWT token
    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '24h'
      }
    );

    // Return success response with token
    res.json({
      success: true,
      data: {
        token,
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
          lastLogin: admin.lastLogin
        }
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An error occurred during login'
      }
    });
  }
});

// Logout endpoint (optional - mainly for client-side token cleanup)
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

// Token refresh endpoint
router.post('/refresh', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'NO_TOKEN',
          message: 'Access token is required'
        }
      });
    }

    // Verify the token (allow expired tokens for refresh)
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });
    } catch (error) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Invalid token'
        }
      });
    }

    // Check if token is too old to refresh (e.g., more than 7 days old)
    const tokenAge = Date.now() / 1000 - decoded.iat;
    const maxRefreshAge = 7 * 24 * 60 * 60; // 7 days in seconds
    
    if (tokenAge > maxRefreshAge) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'TOKEN_TOO_OLD',
          message: 'Token is too old to refresh. Please login again.'
        }
      });
    }

    // Verify admin still exists and is active
    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin || !admin.isActive) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'INVALID_USER',
          message: 'User no longer exists or is inactive'
        }
      });
    }

    // Generate new token
    const newToken = jwt.sign(
      {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '24h'
      }
    );

    res.json({
      success: true,
      data: {
        token: newToken,
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
          lastLogin: admin.lastLogin
        }
      }
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An error occurred during token refresh'
      }
    });
  }
});

// Verify token endpoint (check if token is still valid)
router.get('/verify', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'NO_TOKEN',
          message: 'Access token is required'
        }
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verify admin still exists and is active
    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin || !admin.isActive) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'INVALID_USER',
          message: 'User no longer exists or is inactive'
        }
      });
    }

    // Calculate time until expiration
    const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);

    res.json({
      success: true,
      data: {
        valid: true,
        expiresIn,
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role
        }
      }
    });

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({
        success: false,
        error: {
          code: 'EXPIRED_TOKEN',
          message: 'Token has expired'
        }
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Invalid token'
        }
      });
    }

    console.error('Token verification error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An error occurred during token verification'
      }
    });
  }
});

module.exports = router;