const express = require('express');
const TrainingProgram = require('../models/TrainingProgram');
const NewsEvent = require('../models/NewsEvent');
const Testimonial = require('../models/Testimonial');
const Blog = require('../models/Blog');

const router = express.Router();

// Public Training Programs endpoint - only active programs
router.get('/training-programs', async (req, res) => {
  try {
    const trainingPrograms = await TrainingProgram.find({ isActive: true })
      .select('-__v')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: trainingPrograms
    });
  } catch (error) {
    console.error('Error fetching training programs:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch training programs'
      }
    });
  }
});

// Public News & Events endpoint - only published content
router.get('/news-events', async (req, res) => {
  try {
    const newsEvents = await NewsEvent.find({ isPublished: true })
      .select('-__v')
      .sort({ publishDate: -1 });

    res.json({
      success: true,
      data: newsEvents
    });
  } catch (error) {
    console.error('Error fetching news and events:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch news and events'
      }
    });
  }
});

// Public Testimonials endpoint - only approved testimonials
router.get('/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isApproved: true })
      .select('-__v')
      .sort({ dateReceived: -1 });

    res.json({
      success: true,
      data: testimonials
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch testimonials'
      }
    });
  }
});

// Public Blogs endpoint - only published blogs
router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true })
      .select('-__v')
      .sort({ publishDate: -1 });

    res.json({
      success: true,
      data: blogs
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch blogs'
      }
    });
  }
});

// Public single blog endpoint by slug - only published
router.get('/blogs/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ 
      slug: req.params.slug, 
      isPublished: true 
    }).select('-__v');

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Blog post not found'
        }
      });
    }

    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch blog post'
      }
    });
  }
});

module.exports = router;