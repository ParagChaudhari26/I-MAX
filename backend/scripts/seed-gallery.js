require('dotenv').config();
// Override DNS BEFORE any network calls — your ISP's DNS can't resolve Atlas SRV records
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');
const GalleryImage = require('../models/GalleryImage');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Build connection string - try SRV first, fallback guidance
const MONGO_URI = process.env.MONGODB_URI;

// Image category mapping based on number ranges (customize as needed)
const getCategoryForIndex = (n) => {
  if (n >= 1 && n <= 12)  return 'Clinic';
  if (n >= 13 && n <= 22) return 'Ayurveda Treatment';
  if (n >= 23 && n <= 33) return 'Training Programs';
  if (n >= 34 && n <= 40) return 'Events';
  return 'Other';
};

const IMAGES_DIR = path.resolve(__dirname, '../../src/images/images');

async function seedGallery() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const files = fs.readdirSync(IMAGES_DIR).filter(f => /\.(webp|jpg|jpeg|png|gif)$/i.test(f));
    console.log(`📁 Found ${files.length} images to upload\n`);

    let successCount = 0;
    let skipCount = 0;
    let failCount = 0;

    for (const file of files) {
      const imgNumber = parseInt(file.replace(/\.[^.]+$/, ''));
      const filePath = path.join(IMAGES_DIR, file);
      const title = `Gallery Image ${imgNumber}`;
      const category = getCategoryForIndex(imgNumber);

      // Check if already seeded to avoid duplicates
      const existing = await GalleryImage.findOne({ public_id: `imax-gallery/${path.parse(file).name}` });
      if (existing) {
        console.log(`  ⏭️  Skipping ${file} — already seeded`);
        skipCount++;
        continue;
      }

      try {
        process.stdout.write(`  ⬆️  Uploading ${file} [${category}] ... `);
        const result = await cloudinary.uploader.upload(filePath, {
          folder: 'imax-gallery',
          public_id: path.parse(file).name,
          resource_type: 'image',
          overwrite: false,
        });

        await GalleryImage.create({
          title,
          category,
          url: result.secure_url,
          public_id: result.public_id,
          width: result.width,
          height: result.height,
        });

        console.log(`✅ Done (${result.width}x${result.height})`);
        successCount++;
      } catch (err) {
        console.log(`❌ Failed — ${err.message}`);
        failCount++;
      }
    }

    console.log('\n📊 Summary:');
    console.log(`   ✅ Uploaded: ${successCount}`);
    console.log(`   ⏭️  Skipped:  ${skipCount}`);
    console.log(`   ❌ Failed:   ${failCount}`);
    console.log('\n🎉 Gallery seeding complete!');

  } catch (err) {
    console.error('Fatal error:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seedGallery();
