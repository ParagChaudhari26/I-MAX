const express = require('express');
const { authenticateUserToken } = require('../middleware/auth');
const notificationController = require('../controllers/notificationController');
const prescriptionController = require('../controllers/prescriptionController');
const paymentReceiptController = require('../controllers/paymentReceiptController');

const router = express.Router();

// Apply user authentication to all user routes
router.use(authenticateUserToken);

// User Notifications routes
router.get('/notifications', notificationController.getUserNotifications);
router.get('/notifications/unread-count', notificationController.getUnreadCount);
router.put('/notifications/mark-all-read', notificationController.markAllAsRead);
router.put('/notifications/:id/read', notificationController.markAsRead);

// User Prescriptions routes
router.get('/prescriptions', prescriptionController.getUserPrescriptions);
router.get('/prescriptions/:id', prescriptionController.getPrescriptionById);

// User Payment Receipts routes
router.get('/payment-receipts', paymentReceiptController.getUserReceipts);
router.get('/payment-receipts/:id', paymentReceiptController.getReceiptById);

module.exports = router;
