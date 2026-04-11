const { TrainingProgram } = require('../models');
const { validationResult } = require('express-validator');

// Get all training programs
const getAllTrainingPrograms = async (req, res) => {
  try {
    const { type, isActive, page = 1, limit = 100 } = req.query;
    const filter = {};
    
    if (type) filter.type = type;
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    
    const skip = (page - 1) * limit;
    
    const trainingPrograms = await TrainingProgram.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await TrainingProgram.countDocuments(filter);
    
    res.json({
      success: true,
      data: trainingPrograms,
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
        message: 'Failed to fetch training programs',
        details: error.message
      }
    });
  }
};

// Get single training program by ID
const getTrainingProgramById = async (req, res) => {
  try {
    const trainingProgram = await TrainingProgram.findById(req.params.id);
    
    if (!trainingProgram) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Training program not found'
        }
      });
    }
    
    res.json({
      success: true,
      data: trainingProgram
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_ID',
          message: 'Invalid training program ID'
        }
      });
    }
    
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Failed to fetch training program',
        details: error.message
      }
    });
  }
};

// Create new training program
const createTrainingProgram = async (req, res) => {
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
    
    const trainingProgram = new TrainingProgram(req.body);
    await trainingProgram.save();
    
    res.status(201).json({
      success: true,
      data: trainingProgram,
      message: 'Training program created successfully'
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
        message: 'Failed to create training program',
        details: error.message
      }
    });
  }
};

// Update training program
const updateTrainingProgram = async (req, res) => {
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
    
    const trainingProgram = await TrainingProgram.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!trainingProgram) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Training program not found'
        }
      });
    }
    
    res.json({
      success: true,
      data: trainingProgram,
      message: 'Training program updated successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_ID',
          message: 'Invalid training program ID'
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
        message: 'Failed to update training program',
        details: error.message
      }
    });
  }
};

// Delete training program
const deleteTrainingProgram = async (req, res) => {
  try {
    const trainingProgram = await TrainingProgram.findByIdAndDelete(req.params.id);
    
    if (!trainingProgram) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Training program not found'
        }
      });
    }
    
    res.json({
      success: true,
      message: 'Training program deleted successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_ID',
          message: 'Invalid training program ID'
        }
      });
    }
    
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Failed to delete training program',
        details: error.message
      }
    });
  }
};

module.exports = {
  getAllTrainingPrograms,
  getTrainingProgramById,
  createTrainingProgram,
  updateTrainingProgram,
  deleteTrainingProgram
};