const Prescription = require('../models/Prescription');
const User = require('../models/User');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');

/**
 * Create prescription with file upload
 * @param {Buffer} fileBuffer - File buffer from multer
 * @param {String} mimetype - File mimetype
 * @param {String} userEmailOrId - User email or ID
 * @param {Object} metadata - Optional metadata (doctorName, notes, followUpDate)
 * @param {String} adminId - Admin ID who uploaded
 * @returns {Promise<Object>} Created prescription
 */
const createPrescription = async (fileBuffer, mimetype, userEmailOrId, metadata, adminId) => {
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
    throw new Error('File is required');
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
    uploadResult = await uploadToCloudinary(fileBuffer, 'prescriptions', resourceType);
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload file to cloud storage');
  }

  // Create prescription document
  const prescription = await Prescription.create({
    userId: user._id,
    fileUrl: uploadResult.secure_url,
    filePublicId: uploadResult.public_id,
    fileType,
    doctorName: metadata.doctorName || undefined,
    notes: metadata.notes || undefined,
    uploadedBy: adminId
  });

  // Populate user and admin info
  await prescription.populate('userId', 'email username');
  await prescription.populate('uploadedBy', 'username email');

  return prescription;
};

/**
 * Get all prescriptions for a user with pagination
 * @param {String} userId - User ID
 * @param {Object} options - Pagination options
 * @returns {Promise<Object>} Paginated prescriptions
 */
const getUserPrescriptions = async (userId, options = {}) => {
  const {
    page = 1,
    limit = 10
  } = options;

  const skip = (page - 1) * limit;

  const [prescriptions, total] = await Promise.all([
    Prescription.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('uploadedBy', 'username email')
      .lean(),
    Prescription.countDocuments({ userId })
  ]);

  return {
    prescriptions,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

/**
 * Get single prescription by ID
 * @param {String} prescriptionId - Prescription ID
 * @param {String} userId - User ID (for ownership validation)
 * @returns {Promise<Object>} Prescription
 */
const getPrescriptionById = async (prescriptionId, userId) => {
  const prescription = await Prescription.findOne({
    _id: prescriptionId,
    userId
  })
    .populate('uploadedBy', 'username email')
    .lean();

  if (!prescription) {
    throw new Error('Prescription not found or access denied');
  }

  return prescription;
};

/**
 * Get all prescriptions (admin view) with pagination
 * @param {Object} options - Query options
 * @returns {Promise<Object>} Paginated prescriptions
 */
const getAllPrescriptions = async (options = {}) => {
  const {
    page = 1,
    limit = 20,
    userId,
    search
  } = options;

  const query = {};
  if (userId) query.userId = userId;

  // If search is provided, find users matching the search term
  if (search) {
    const searchRegex = new RegExp(search, 'i');
    const matchingUsers = await User.find({
      $or: [
        { email: searchRegex },
        { username: searchRegex }
      ]
    }).select('_id').lean();
    
    const userIds = matchingUsers.map(u => u._id);
    query.userId = { $in: userIds };
  }

  const skip = (page - 1) * limit;

  const [prescriptions, total] = await Promise.all([
    Prescription.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'email username')
      .populate('uploadedBy', 'username email')
      .lean(),
    Prescription.countDocuments(query)
  ]);

  return {
    prescriptions,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

/**
 * Delete prescription (admin only)
 * @param {String} prescriptionId - Prescription ID
 * @returns {Promise<Boolean>} Success status
 */
const deletePrescription = async (prescriptionId) => {
  const prescription = await Prescription.findById(prescriptionId);
  
  if (!prescription) {
    throw new Error('Prescription not found');
  }

  // Delete from Cloudinary
  const resourceType = prescription.fileType === 'pdf' ? 'raw' : 'image';
  try {
    await deleteFromCloudinary(prescription.filePublicId, resourceType);
  } catch (error) {
    console.error('Failed to delete from Cloudinary:', error);
    // Continue with DB deletion even if Cloudinary deletion fails
  }

  // Delete from database
  await Prescription.findByIdAndDelete(prescriptionId);

  return true;
};

module.exports = {
  createPrescription,
  getUserPrescriptions,
  getPrescriptionById,
  getAllPrescriptions,
  deletePrescription
};
