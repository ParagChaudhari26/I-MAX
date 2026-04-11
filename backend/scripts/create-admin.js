/**
 * Create or reset the default admin user (username: admin, password: admin123).
 * Does not delete any other data. Use when you get "Invalid username or password".
 *
 * Run from backend folder: node scripts/create-admin.js
 */
require('dns').setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to database.');

    const username = 'admin';
    const password = 'admin123';
    const email = process.env.ADMIN_EMAIL || 'admin@bhagarathi-ayurveda.com';

    let admin = await Admin.findOne({ username });
    if (admin) {
      admin.password = password;
      admin.email = email;
      admin.isActive = true;
      await admin.save();
      console.log('Admin user updated. You can sign in with username: admin, password: admin123');
    } else {
      admin = new Admin({
        username,
        email,
        password,
        role: 'admin',
        isActive: true
      });
      await admin.save();
      console.log('Admin user created. Sign in with username: admin, password: admin123');
    }

    await mongoose.disconnect();
    console.log('Done.');
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
  process.exit(0);
}

run();
