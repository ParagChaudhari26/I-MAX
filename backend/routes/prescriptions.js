const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const prescriptionController = require('../controllers/prescriptionController');
const prescriptionUpload = require('../middleware/prescriptionUpload');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Admin routes
router.post(
  '/upload',
  prescriptionUpload.single('file'),
  prescriptionController.validateUploadPrescription,
  prescriptionController.uploadPrescription
);

router.get('/', prescriptionController.getAdminPrescriptions);
router.delete('/:id', prescriptionController.deletePrescription);

module.exports = router;
