/**
 * Banner Message Controller
 * Handles CRUD operations for dynamic banner messages
 */

const { BannerMessage } = require('../models');
const { validationResult } = require('express-validator');

/**
 * Get all banner messages (Admin)
 * GET /api/admin/banner-messages
 */
const getAllBannerMessages = async (req, res) => {
  try {
    const messages = await BannerMessage.find().sort({ order: 1, createdAt: -1 });
    
    res.json({
      success: true,
      data: messages
    });
  } catch (error) {
    console.error('Get banner messages error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Failed to fetch banner messages'
      }
    });
  }
};

/**
 * Get active banner messages (Public)
 * GET /api/public/banner-messages
 */
const getActiveBannerMessages = async (req, res) => {
  try {
    const messages = await BannerMessage.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    
    res.json({
      success: true,
      data: messages
    });
  } catch (error) {
    console.error('Get active banner messages error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Failed to fetch banner messages'
      }
    });
  }
};

/**
 * Get single banner message by ID
 * GET /api/admin/banner-messages/:id
 */
const getBannerMessageById = async (req, res) => {
  try {
    const message = await BannerMessage.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Banner message not found'
        }
      });
    }
    
    res.json({
      success: true,
      data: message
    });
  } catch (error) {
    console.error('Get banner message error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Failed to fetch banner message'
      }
    });
  }
};

/**
 * Create new banner message
 * POST /api/admin/banner-messages
 */
const createBannerMessage = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: errors.array()
        }
      });
    }

    const { message, icon, isActive, order } = req.body;

    const bannerMessage = new BannerMessage({
      message,
      icon: icon || '🏆',
      isActive: isActive !== undefined ? isActive : true,
      order: order || 0
    });

    await bannerMessage.save();

    res.status(201).json({
      success: true,
      message: 'Banner message created successfully',
      data: bannerMessage
    });
  } catch (error) {
    console.error('Create banner message error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Failed to create banner message'
      }
    });
  }
};

/**
 * Update banner message
 * PUT /api/admin/banner-messages/:id
 */
const updateBannerMessage = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: errors.array()
        }
      });
    }

    const { message, icon, isActive, order } = req.body;

    const bannerMessage = await BannerMessage.findById(req.params.id);
    
    if (!bannerMessage) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Banner message not found'
        }
      });
    }

    // Update fields
    if (message !== undefined) bannerMessage.message = message;
    if (icon !== undefined) bannerMessage.icon = icon;
    if (isActive !== undefined) bannerMessage.isActive = isActive;
    if (order !== undefined) bannerMessage.order = order;

    await bannerMessage.save();

    res.json({
      success: true,
      message: 'Banner message updated successfully',
      data: bannerMessage
    });
  } catch (error) {
    console.error('Update banner message error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Failed to update banner message'
      }
    });
  }
};

/**
 * Delete banner message
 * DELETE /api/admin/banner-messages/:id
 */
const deleteBannerMessage = async (req, res) => {
  try {
    const bannerMessage = await BannerMessage.findByIdAndDelete(req.params.id);
    
    if (!bannerMessage) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Banner message not found'
        }
      });
    }

    res.json({
      success: true,
      message: 'Banner message deleted successfully'
    });
  } catch (error) {
    console.error('Delete banner message error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Failed to delete banner message'
      }
    });
  }
};

/**
 * Toggle banner message active status
 * PATCH /api/admin/banner-messages/:id/toggle
 */
const toggleBannerMessage = async (req, res) => {
  try {
    const bannerMessage = await BannerMessage.findById(req.params.id);
    
    if (!bannerMessage) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Banner message not found'
        }
      });
    }

    bannerMessage.isActive = !bannerMessage.isActive;
    await bannerMessage.save();

    res.json({
      success: true,
      message: `Banner message ${bannerMessage.isActive ? 'activated' : 'deactivated'} successfully`,
      data: bannerMessage
    });
  } catch (error) {
    console.error('Toggle banner message error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Failed to toggle banner message'
      }
    });
  }
};

module.exports = {
  getAllBannerMessages,
  getActiveBannerMessages,
  getBannerMessageById,
  createBannerMessage,
  updateBannerMessage,
  deleteBannerMessage,
  toggleBannerMessage
};
