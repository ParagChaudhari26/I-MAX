const cloudinary = require('cloudinary').v2;
const GalleryImage = require('../models/GalleryImage');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Admin: Upload Image
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image provided' });
    }

    // Convert buffer to base64
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'imax-gallery',
      resource_type: 'image'
    });

    // Save to DB
    const newImage = await GalleryImage.create({
      title: req.body.title || 'Untitled',
      category: req.body.category || 'Other',
      url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height
    });

    res.status(201).json({ success: true, data: newImage });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ success: false, error: 'Failed to upload image' });
  }
};

// Admin + Public: Get Images
exports.getImages = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category && req.query.category !== 'All') {
      filter.category = req.query.category;
    }
    const images = await GalleryImage.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: images });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Admin: Update Image Metadata
exports.updateImage = async (req, res) => {
  try {
    const updatedImage = await GalleryImage.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, category: req.body.category },
      { new: true, runValidators: true }
    );
    if (!updatedImage) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }
    res.status(200).json({ success: true, data: updatedImage });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Admin: Delete Image
exports.deleteImage = async (req, res) => {
  try {
    const image = await GalleryImage.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }

    // Attempt to delete it from Cloudinary
    await cloudinary.uploader.destroy(image.public_id);

    // Delete from MongoDB
    await image.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ success: false, error: 'Failed to delete image' });
  }
};
