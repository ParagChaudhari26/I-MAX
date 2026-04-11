/**
 * Seed Banner Messages
 * Adds initial banner messages to the database
 */

require('dotenv').config();
const mongoose = require('mongoose');
const { BannerMessage } = require('../models');

const initialMessages = [
  {
    message: 'Ranked Among Top 10 Ayurveda Clinics in India',
    icon: '🏆',
    isActive: true,
    order: 1
  },
  {
    message: 'Expert Panchkarma Treatments Available',
    icon: '💆',
    isActive: true,
    order: 2
  },
  {
    message: 'ISO Certified Research Centre',
    icon: '✨',
    isActive: true,
    order: 3
  },
  {
    message: '25+ Years of Excellence in Healthcare',
    icon: '🌿',
    isActive: true,
    order: 4
  }
];

async function seedBannerMessages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    // Check if messages already exist
    const existingCount = await BannerMessage.countDocuments();
    
    if (existingCount > 0) {
      console.log(`⚠️  ${existingCount} banner message(s) already exist.`);
      console.log('Do you want to:');
      console.log('1. Keep existing and add new ones');
      console.log('2. Delete all and start fresh');
      console.log('\nRun with argument:');
      console.log('  node seed-banner-messages.js keep    - Keep existing');
      console.log('  node seed-banner-messages.js fresh   - Delete and recreate');
      
      const arg = process.argv[2];
      
      if (arg === 'fresh') {
        await BannerMessage.deleteMany({});
        console.log('\n✅ Deleted all existing banner messages\n');
      } else if (arg !== 'keep') {
        console.log('\nExiting without changes.');
        process.exit(0);
      }
    }

    // Insert messages
    const created = await BannerMessage.insertMany(initialMessages);
    
    console.log(`✅ Successfully created ${created.length} banner messages:\n`);
    
    created.forEach((msg, index) => {
      console.log(`${index + 1}. ${msg.icon} ${msg.message}`);
      console.log(`   Order: ${msg.order}, Active: ${msg.isActive}`);
      console.log('');
    });

    console.log('Banner messages are now available in the admin dashboard!');
    console.log('Visit: http://localhost:1234/admin/dashboard/banner-messages');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

seedBannerMessages();
