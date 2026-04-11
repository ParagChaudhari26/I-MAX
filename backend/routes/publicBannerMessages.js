/**
 * Public Banner Messages Routes
 */

const express = require('express');
const bannerMessageController = require('../controllers/bannerMessageController');

const router = express.Router();

/**
 * @route   GET /api/public/banner-messages
 * @desc    Get active banner messages
 * @access  Public
 */
router.get('/', bannerMessageController.getActiveBannerMessages);

module.exports = router;
