const { Blog } = require('../models');
const { validationResult } = require('express-validator');

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const { isPublished, category, tags, page = 1, limit = 10 } = req.query;
    const filter = {};
    
    if (isPublished !== undefined) filter.isPublished = isPublished === 'true';
    if (category) filter.category = category;
    if (tags) filter.tags = { $in: tags.split(',') };
    
    const skip = (page - 1) * limit;
    
    const blogs = await Blog.find(filter)
      .sort({ publishDate: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Blog.countDocuments(filter);
    
    res.json({
      success: true,
      data: blogs,
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
        message: 'Failed to fetch blogs',
        details: error.message
      }
    });
  }
};

// Get single blog by ID or slug
const getBlogByIdOrSlug = async (req, res) => {
  try {
    const { identifier } = req.params;
    let blog;
    
    // Try to find by ID first, then by slug
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(identifier);
    } else {
      blog = await Blog.findOne({ slug: identifier });
    }
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Blog not found'
        }
      });
    }
    
    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Failed to fetch blog',
        details: error.message
      }
    });
  }
};

// Create new blog
const createBlog = async (req, res) => {
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
    
    const blog = new Blog(req.body);
    await blog.save();
    
    res.status(201).json({
      success: true,
      data: blog,
      message: 'Blog created successfully'
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
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'DUPLICATE_SLUG',
          message: 'Blog slug already exists',
          details: { slug: 'This slug is already in use' }
        }
      });
    }
    
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Failed to create blog',
        details: error.message
      }
    });
  }
};

// Update blog
const updateBlog = async (req, res) => {
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
    
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Blog not found'
        }
      });
    }
    
    res.json({
      success: true,
      data: blog,
      message: 'Blog updated successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_ID',
          message: 'Invalid blog ID'
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
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'DUPLICATE_SLUG',
          message: 'Blog slug already exists',
          details: { slug: 'This slug is already in use' }
        }
      });
    }
    
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Failed to update blog',
        details: error.message
      }
    });
  }
};

// Delete blog
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Blog not found'
        }
      });
    }
    
    res.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_ID',
          message: 'Invalid blog ID'
        }
      });
    }
    
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Failed to delete blog',
        details: error.message
      }
    });
  }
};

// Publish/unpublish blog
const toggleBlogPublishStatus = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Blog not found'
        }
      });
    }
    
    blog.isPublished = !blog.isPublished;
    if (blog.isPublished && !blog.publishDate) {
      blog.publishDate = new Date();
    }
    
    await blog.save();
    
    res.json({
      success: true,
      data: blog,
      message: `Blog ${blog.isPublished ? 'published' : 'unpublished'} successfully`
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_ID',
          message: 'Invalid blog ID'
        }
      });
    }
    
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Failed to toggle blog publish status',
        details: error.message
      }
    });
  }
};

module.exports = {
  getAllBlogs,
  getBlogByIdOrSlug,
  createBlog,
  updateBlog,
  deleteBlog,
  toggleBlogPublishStatus
};