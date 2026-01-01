const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const trainingProgramController = require('../controllers/trainingProgramController');
const newsEventController = require('../controllers/newsEventController');
const testimonialController = require('../controllers/testimonialController');
const blogController = require('../controllers/blogController');

const router = express.Router();

// Apply authentication middleware to all admin routes
router.use(authenticateToken);

// Training Programs routes
router.get('/training-programs', trainingProgramController.getAllTrainingPrograms);
router.get('/training-programs/:id', trainingProgramController.getTrainingProgramById);
router.post('/training-programs', trainingProgramController.createTrainingProgram);
router.put('/training-programs/:id', trainingProgramController.updateTrainingProgram);
router.delete('/training-programs/:id', trainingProgramController.deleteTrainingProgram);

// News & Events routes
router.get('/news-events', newsEventController.getAllNewsEvents);
router.get('/news-events/:id', newsEventController.getNewsEventById);
router.post('/news-events', newsEventController.createNewsEvent);
router.put('/news-events/:id', newsEventController.updateNewsEvent);
router.delete('/news-events/:id', newsEventController.deleteNewsEvent);

// Testimonials routes
router.get('/testimonials', testimonialController.getAllTestimonials);
router.get('/testimonials/:id', testimonialController.getTestimonialById);
router.post('/testimonials', testimonialController.createTestimonial);
router.put('/testimonials/:id', testimonialController.updateTestimonial);
router.delete('/testimonials/:id', testimonialController.deleteTestimonial);
router.patch('/testimonials/:id/approve', testimonialController.approveTestimonial);

// Blogs routes
router.get('/blogs', blogController.getAllBlogs);
router.get('/blogs/:id', blogController.getBlogByIdOrSlug);
router.post('/blogs', blogController.createBlog);
router.put('/blogs/:id', blogController.updateBlog);
router.delete('/blogs/:id', blogController.deleteBlog);
router.patch('/blogs/:id/toggle-publish', blogController.toggleBlogPublishStatus);

module.exports = router;