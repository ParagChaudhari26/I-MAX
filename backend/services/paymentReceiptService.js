const PaymentReceipt = require('../models/PaymentReceipt');
const User = require('../models/User');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');

/**
 * Create payment receipt with file upload
 * @param {Buffer} fileBuffer - File buffer from multer
 * @param {String} mimetype - File mimetype
 * @param {String} userEmailOrId - User email or ID
 * @param {Object} metadata - Receipt metadata
 * @param {String} adminId - Admin ID who uploaded
 * @returns {Promise<Object>} Created receipt
 */
const createPaymentReceipt = async (fileBuffer, mimetype, userEmailOrId, metadata, adminId) => {
  // Validate user exists - accept both email and ID
  let user;
  if (userEmailOrId.includes('@')) {
    // It's an email
    user = await User.findOne({ email: userEmailOrId });
  } else {
    // It's an ID
    user = await User.findById(userEmailOrId);
  }
  
  if (!user) {
    throw new Error('User not found');
  }

  // Validate file presence
  if (!fileBuffer) {
    throw new Error('Receipt file is required');
  }

  // Determine file type and resource type for Cloudinary
  let fileType = 'image';
  let resourceType = 'image';
  
  if (mimetype === 'application/pdf') {
    fileType = 'pdf';
    resourceType = 'raw';
  }

  // Upload to Cloudinary
  let uploadResult;
  try {
    uploadResult = await uploadToCloudinary(fileBuffer, 'payment-receipts', resourceType);
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload receipt to cloud storage');
  }

  // Create receipt document
  const receipt = await PaymentReceipt.create({
    userId: user._id,
    receiptUrl: uploadResult.secure_url,
    receiptPublicId: uploadResult.public_id,
    fileType,
    amount: metadata.amount || undefined,
    paymentDate: metadata.paymentDate || new Date(),
    paymentMethod: metadata.paymentMethod || 'other',
    description: metadata.description || undefined,
    notes: metadata.notes || undefined,
    uploadedBy: adminId
  });

  // Populate user and admin info
  await receipt.populate('userId', 'email');
  await receipt.populate('uploadedBy', 'username email');

  return receipt;
};

/**
 * Get all receipts for a user with pagination
 * @param {String} userId - User ID
 * @param {Object} options - Pagination options
 * @returns {Promise<Object>} Paginated receipts
 */
const getUserReceipts = async (userId, options = {}) => {
  const {
    page = 1,
    limit = 10
  } = options;

  const skip = (page - 1) * limit;

  const [receipts, total] = await Promise.all([
    PaymentReceipt.find({ userId })
      .sort({ paymentDate: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('uploadedBy', 'username email')
      .lean(),
    PaymentReceipt.countDocuments({ userId })
  ]);

  return {
    receipts,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

/**
 * Get single receipt by ID
 * @param {String} receiptId - Receipt ID
 * @param {String} userId - User ID (for ownership validation)
 * @returns {Promise<Object>} Receipt
 */
const getReceiptById = async (receiptId, userId) => {
  const receipt = await PaymentReceipt.findOne({
    _id: receiptId,
    userId
  })
    .populate('uploadedBy', 'username email')
    .lean();

  if (!receipt) {
    throw new Error('Receipt not found or access denied');
  }

  return receipt;
};

/**
 * Get all receipts (admin view) with pagination
 * @param {Object} options - Query options
 * @returns {Promise<Object>} Paginated receipts
 */
const getAllReceipts = async (options = {}) => {
  const {
    page = 1,
    limit = 20,
    userId
  } = options;

  const query = {};
  if (userId) query.userId = userId;

  const skip = (page - 1) * limit;

  const [receipts, total] = await Promise.all([
    PaymentReceipt.find(query)
      .sort({ paymentDate: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'email')
      .populate('uploadedBy', 'username email')
      .lean(),
    PaymentReceipt.countDocuments(query)
  ]);

  return {
    receipts,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

/**
 * Delete receipt (admin only)
 * @param {String} receiptId - Receipt ID
 * @returns {Promise<Boolean>} Success status
 */
const deleteReceipt = async (receiptId) => {
  const receipt = await PaymentReceipt.findById(receiptId);
  
  if (!receipt) {
    throw new Error('Receipt not found');
  }

  // Delete from Cloudinary
  const resourceType = receipt.fileType === 'pdf' ? 'raw' : 'image';
  try {
    await deleteFromCloudinary(receipt.receiptPublicId, resourceType);
  } catch (error) {
    console.error('Failed to delete from Cloudinary:', error);
    // Continue with DB deletion even if Cloudinary deletion fails
  }

  // Delete from database
  await PaymentReceipt.findByIdAndDelete(receiptId);

  return true;
};

module.exports = {
  createPaymentReceipt,
  getUserReceipts,
  getReceiptById,
  getAllReceipts,
  deleteReceipt
};
