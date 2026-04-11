const express = require('express');
const TrainingProgram = require('../models/TrainingProgram');
const NewsEvent = require('../models/NewsEvent');
const Testimonial = require('../models/Testimonial');
const Blog = require('../models/Blog');
const chatbotController = require('../controllers/chatbotController');
const galleryController = require('../controllers/galleryController');

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

// Public Banner Messages endpoint
router.use('/banner-messages', require('./publicBannerMessages'));

// Public AI Chatbot endpoint
router.post('/chat', chatbotController.generateChatResponse);

// Public Gallery endpoint
router.get('/gallery', galleryController.getImages);

// Seed blogs endpoint (for development/testing) - GET for easy browser access
router.get('/blogsseed', async (req, res) => {
  try {
    // Import seed data
    const { blogsData } = require('../scripts/seed-blogs');
    
    // Delete existing blogs
    const deleteResult = await Blog.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} existing blogs`);

    // Insert new blogs
    const result = await Blog.insertMany(blogsData);
    
    res.json({
      success: true,
      message: `Successfully seeded ${result.length} blogs`,
      data: {
        deleted: deleteResult.deletedCount,
        created: result.length,
        blogs: result.map(blog => ({
          title: blog.title.en,
          slug: blog.slug,
          category: blog.category,
          author: blog.author,
          tags: blog.tags
        }))
      }
    });
  } catch (error) {
    console.error('Error seeding blogs:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'SEED_ERROR',
        message: 'Failed to seed blogs',
        details: error.message
      }
    });
  }
});

// Seed testimonials endpoint (for development/testing) - GET for easy browser access
router.get('/testimonialsseed', async (req, res) => {
  try {
    // Import seed data
    const { testimonialsData } = require('../scripts/seed-testimonials');
    
    // Delete existing testimonials
    const deleteResult = await Testimonial.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} existing testimonials`);

    // Insert new testimonials
    const result = await Testimonial.insertMany(testimonialsData);
    
    // Group by location for summary
    const locationCounts = {};
    result.forEach(testimonial => {
      const location = testimonial.customerLocation || 'Unknown';
      locationCounts[location] = (locationCounts[location] || 0) + 1;
    });
    
    res.json({
      success: true,
      message: `Successfully seeded ${result.length} testimonials`,
      data: {
        deleted: deleteResult.deletedCount,
        created: result.length,
        byLocation: locationCounts,
        testimonials: result.map(t => ({
          name: t.customerName,
          location: t.customerLocation,
          treatment: t.treatment.en,
          rating: t.rating,
          approved: t.isApproved
        }))
      }
    });
  } catch (error) {
    console.error('Error seeding testimonials:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'SEED_ERROR',
        message: 'Failed to seed testimonials',
        details: error.message
      }
    });
  }
});

// Seed training programs endpoint (for development/testing) - GET for easy browser access
router.get('/trainingprogramsseed', async (req, res) => {
  try {
    // Import seed data
    const { trainingProgramsData } = require('../scripts/seed-training-programs');
    
    // Delete existing training programs
    const deleteResult = await TrainingProgram.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} existing training programs`);

    // Insert new training programs
    const result = await TrainingProgram.insertMany(trainingProgramsData);
    
    // Group by type for summary
    const onlinePrograms = result.filter(p => p.type === 'Online');
    const inPersonPrograms = result.filter(p => p.type === 'In-Person');
    
    res.json({
      success: true,
      message: `Successfully seeded ${result.length} training programs`,
      data: {
        deleted: deleteResult.deletedCount,
        created: result.length,
        summary: {
          total: result.length,
          online: onlinePrograms.length,
          inPerson: inPersonPrograms.length
        },
        onlinePrograms: onlinePrograms.map(p => ({
          title: p.title.en,
          duration: p.duration,
          price: p.price,
          instructor: p.instructor
        })),
        inPersonPrograms: inPersonPrograms.map(p => ({
          title: p.title.en,
          duration: p.duration,
          price: p.price,
          instructor: p.instructor
        }))
      }
    });
  } catch (error) {
    console.error('Error seeding training programs:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'SEED_ERROR',
        message: 'Failed to seed training programs',
        details: error.message
      }
    });
  }
});

module.exports = router;