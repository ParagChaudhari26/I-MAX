const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const trainingProgramController = require('../controllers/trainingProgramController');
const newsEventController = require('../controllers/newsEventController');
const testimonialController = require('../controllers/testimonialController');
const blogController = require('../controllers/blogController');
const chatbotController = require('../controllers/chatbotController');
const notificationController = require('../controllers/notificationController');
const galleryController = require('../controllers/galleryController');
const upload = require('../middleware/upload');
const { uploadBlogImage, handleUploadError } = require('../middleware/blogImageUpload');

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
router.post('/blogs/upload-image', uploadBlogImage, handleUploadError, blogController.uploadBlogImage);
router.delete('/blogs/delete-image', blogController.deleteBlogImage);

// Banner Messages routes
router.use('/banner-messages', require('./bannerMessages'));

// Chatbot Context admin routes
router.get('/chatbot-context', chatbotController.getAllContexts);
router.post('/chatbot-context', chatbotController.createContext);
router.put('/chatbot-context/:id', chatbotController.updateContext);
router.delete('/chatbot-context/:id', chatbotController.deleteContext);

// Notification admin routes
router.get('/notifications', notificationController.getAdminNotifications);
router.post('/notifications', notificationController.validateCreateNotification, notificationController.createNotification);
router.delete('/notifications/:id', notificationController.deleteNotification);

// Prescription admin routes
router.use('/prescriptions', require('./prescriptions'));

// Payment Receipt admin routes
router.use('/payment-receipts', require('./paymentReceipts'));

// Gallery admin routes
router.get('/gallery', galleryController.getImages);
router.post('/gallery', upload.single('image'), galleryController.uploadImage);
router.put('/gallery/:id', galleryController.updateImage);
router.delete('/gallery/:id', galleryController.deleteImage);

module.exports = router;