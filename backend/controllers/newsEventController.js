const { NewsEvent } = require('../models');
const { validationResult } = require('express-validator');

// Get all news and events
const getAllNewsEvents = async (req, res) => {
  try {
    const { type, isPublished, page = 1, limit = 10 } = req.query;
    const filter = {};
    
    if (type) filter.type = type;
    if (isPublished !== undefined) filter.isPublished = isPublished === 'true';
    
    const skip = (page - 1) * limit;
    
    const newsEvents = await NewsEvent.find(filter)
      .sort({ publishDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await NewsEvent.countDocuments(filter);
    
    res.json({
      success: true,
      data: newsEvents,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Failed to fetch news and events',
        details: error.message
      }
    });
  }
};

// Get single news/event by ID
const getNewsEventById = async (req, res) => {
  try {
    const newsEvent = await NewsEvent.findById(req.params.id);
    
    if (!newsEvent) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'News/Event not found'
        }
      });
    }
    
    res.json({
      success: true,
      data: newsEvent
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_ID',
          message: 'Invalid news/event ID'
        }
      });
    }
    
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Failed to fetch news/event',
        details: error.message
      }
    });
  }
};

// Create new news/event
const createNewsEvent = async (req, res) => {
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
    
    const newsEvent = new NewsEvent(req.body);
    await newsEvent.save();
    
    res.status(201).json({
      success: true,
      data: newsEvent,
      message: 'News/Event created successfully'
    });
  } catch (error) {
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
        message: 'Failed to create news/event',
        details: error.message
      }
    });
  }
};

// Update news/event
const updateNewsEvent = async (req, res) => {
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
    
    const newsEvent = await NewsEvent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!newsEvent) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'News/Event not found'
        }
      });
    }
    
    res.json({
      success: true,
      data: newsEvent,
      message: 'News/Event updated successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_ID',
          message: 'Invalid news/event ID'
        }
      });
    }
    
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
        message: 'Failed to update news/event',
        details: error.message
      }
    });
  }
};

// Delete news/event
const deleteNewsEvent = async (req, res) => {
  try {
    const newsEvent = await NewsEvent.findByIdAndDelete(req.params.id);
    
    if (!newsEvent) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'News/Event not found'
        }
      });
    }
    
    res.json({
      success: true,
      message: 'News/Event deleted successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_ID',
          message: 'Invalid news/event ID'
        }
      });
    }
    
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Failed to delete news/event',
        details: error.message
      }
    });
  }
};

module.exports = {
  getAllNewsEvents,
  getNewsEventById,
  createNewsEvent,
  updateNewsEvent,
  deleteNewsEvent
};