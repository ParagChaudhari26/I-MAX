const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const paymentReceiptController = require('../controllers/paymentReceiptController');
const prescriptionUpload = require('../middleware/prescriptionUpload');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Admin routes
router.post(
  '/upload',
  prescriptionUpload.single('file'),
  paymentReceiptController.validateUploadReceipt,
  paymentReceiptController.uploadReceipt
);

router.get('/', paymentReceiptController.getAdminReceipts);
router.delete('/:id', paymentReceiptController.deleteReceipt);

module.exports = router;
