const Admin = require('../models/Admin');

async function seedAdminFromEnv() {
  const username = (process.env.ADMIN_USERNAME || '').trim();
  const email = (process.env.ADMIN_EMAIL || '').trim();
  const password = (process.env.ADMIN_PASSWORD || '').trim();

  if (!username || !email || !password) return;

  const existingByUsername = await Admin.findOne({ username });
  if (existingByUsername) return;

  const existingByEmail = await Admin.findOne({ email: email.toLowerCase() });
  if (existingByEmail) return;

  const admin = new Admin({
    username,
    email: email.toLowerCase(),
    password,
    role: 'admin',
    isActive: true,
  });

  await admin.save();
  console.log(`Seeded admin account: ${username}`);
}

module.exports = { seedAdminFromEnv };

