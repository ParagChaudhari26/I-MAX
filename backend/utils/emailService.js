/**
 * Email Service Utility
 * Handles sending verification emails using Nodemailer
 */

const nodemailer = require('nodemailer');

/**
 * Create reusable transporter object using SMTP transport
 */
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

/**
 * Generate HTML email template for verification
 * @param {string} verificationUrl - The verification link URL
 * @param {string} userName - User's name or email
 * @returns {string} HTML email template
 */
const generateVerificationEmailTemplate = (verificationUrl, userName) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f5f2;
        }
        .container {
          background-color: #ffffff;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          color: #3a5c40;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .content {
          margin-bottom: 30px;
        }
        .button {
          display: inline-block;
          padding: 12px 30px;
          background-color: #3a5c40;
          color: #ffffff !important;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          margin: 20px 0;
        }
        .button:hover {
          background-color: #2d4a32;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e5e0d6;
          font-size: 12px;
          color: #666;
          text-align: center;
        }
        .link {
          color: #3a5c40;
          word-break: break-all;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Bhagirathi Ayurveda</div>
          <p>Panchkarma Clinic & Research Centre</p>
        </div>
        
        <div class="content">
          <h2>Verify Your Email Address</h2>
          <p>Hello ${userName},</p>
          <p>Thank you for registering with Bhagirathi Ayurveda. Please verify your email address to complete your registration and access your account.</p>
          
          <div style="text-align: center;">
            <a href="${verificationUrl}" class="button">Verify Email Address</a>
          </div>
          
          <p>Or copy and paste this link into your browser:</p>
          <p class="link">${verificationUrl}</p>
          
          <p><strong>This link will expire in 24 hours.</strong></p>
          
          <p>If you did not create an account, please ignore this email.</p>
        </div>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} Bhagirathi Ayurveda Panchkarma Clinic & Research Centre. All rights reserved.</p>
          <p>This is an automated email, please do not reply.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Send verification email
 * @param {string} email - Recipient email address
 * @param {string} verificationToken - Verification token
 * @param {string} userName - User's name or email
 * @returns {Promise<object>} Email send result
 */
const sendVerificationEmail = async (email, verificationToken, userName) => {
  try {
    // Validate email configuration
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      throw new Error('Email configuration is missing. Please set SMTP_USER and SMTP_PASSWORD environment variables.');
    }

    const transporter = createTransporter();
    
    // Construct verification URL
    const baseUrl = process.env.FRONTEND_URL || process.env.APP_URL || 'http://localhost:1234';
    const verificationUrl = `${baseUrl}/verify-email?token=${verificationToken}`;
    
    // Generate HTML email content
    const htmlContent = generateVerificationEmailTemplate(verificationUrl, userName);
    
    // Email options
    const mailOptions = {
      from: `"Bhagirathi Ayurveda" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Verify Your Email Address - Bhagirathi Ayurveda',
      html: htmlContent,
      text: `Please verify your email by clicking this link: ${verificationUrl}`,
    };
    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Verification email sent:', info.messageId);
    
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error(`Failed to send verification email: ${error.message}`);
  }
};

/**
 * Test email configuration
 * @returns {Promise<boolean>} True if configuration is valid
 */
const testEmailConfiguration = async () => {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      return false;
    }
    
    const transporter = createTransporter();
    await transporter.verify();
    return true;
  } catch (error) {
    console.error('Email configuration test failed:', error);
    return false;
  }
};

/**
 * Generate HTML email template for notifications
 * @param {string} title - Notification title
 * @param {string} message - Notification message
 * @param {string} category - Notification category
 * @returns {string} HTML email template
 */
const generateNotificationEmailTemplate = (title, message, category) => {
  const categoryColors = {
    general: '#3a5c40',
    seasonal: '#d97706',
    consultation: '#2563eb',
    admin: '#dc2626'
  };

  const categoryColor = categoryColors[category] || categoryColors.general;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f5f2;
        }
        .container {
          background-color: #ffffff;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          color: #3a5c40;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .category-badge {
          display: inline-block;
          padding: 4px 12px;
          background-color: ${categoryColor};
          color: #ffffff;
          border-radius: 12px;
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .content {
          margin-bottom: 30px;
        }
        .notification-title {
          color: ${categoryColor};
          font-size: 22px;
          font-weight: bold;
          margin-bottom: 15px;
        }
        .notification-message {
          font-size: 16px;
          line-height: 1.8;
          color: #555;
          padding: 20px;
          background-color: #f9fafb;
          border-left: 4px solid ${categoryColor};
          border-radius: 4px;
        }
        .button {
          display: inline-block;
          padding: 12px 30px;
          background-color: #3a5c40;
          color: #ffffff !important;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          margin: 20px 0;
        }
        .button:hover {
          background-color: #2d4a32;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e5e0d6;
          font-size: 12px;
          color: #666;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Bhagirathi Ayurveda</div>
          <p>Panchkarma Clinic & Research Centre</p>
          <div class="category-badge">${category}</div>
        </div>
        
        <div class="content">
          <h2 class="notification-title">${title}</h2>
          <div class="notification-message">
            ${message}
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:1234'}/user/notifications" class="button">View in Dashboard</a>
          </div>
        </div>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} Bhagirathi Ayurveda Panchkarma Clinic & Research Centre. All rights reserved.</p>
          <p>You received this email because you are a registered user.</p>
          <p style="margin-top: 10px;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:1234'}" style="color: #3a5c40;">Visit Website</a> | 
            <a href="tel:+919021255057" style="color: #3a5c40;">+91 9021255057</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Send notification email to a single user
 * @param {string} email - Recipient email address
 * @param {string} title - Notification title
 * @param {string} message - Notification message
 * @param {string} category - Notification category
 * @returns {Promise<object>} Email send result
 */
const sendNotificationEmail = async (email, title, message, category = 'general') => {
  try {
    // Validate email configuration
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      throw new Error('Email configuration is missing. Please set SMTP_USER and SMTP_PASSWORD environment variables.');
    }

    const transporter = createTransporter();
    
    // Generate HTML email content
    const htmlContent = generateNotificationEmailTemplate(title, message, category);
    
    // Email options
    const mailOptions = {
      from: `"Bhagirathi Ayurveda" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `${title} - Bhagirathi Ayurveda`,
      html: htmlContent,
      text: `${title}\n\n${message}`,
    };
    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    return {
      success: true,
      messageId: info.messageId,
      email: email
    };
  } catch (error) {
    console.error(`Error sending notification email to ${email}:`, error.message);
    return {
      success: false,
      error: error.message,
      email: email
    };
  }
};

/**
 * Send notification emails to multiple users in batches
 * @param {Array} users - Array of user objects with email field
 * @param {string} title - Notification title
 * @param {string} message - Notification message
 * @param {string} category - Notification category
 * @returns {Promise<object>} Results with success/failure counts
 */
const sendBulkNotificationEmails = async (users, title, message, category = 'general') => {
  const BATCH_SIZE = 50; // Send 50 emails at a time
  const BATCH_DELAY = 1000; // 1 second delay between batches
  
  let successCount = 0;
  let failureCount = 0;
  const failedEmails = [];

  console.log(`Starting bulk email send to ${users.length} users...`);

  for (let i = 0; i < users.length; i += BATCH_SIZE) {
    const batch = users.slice(i, i + BATCH_SIZE);
    
    // Send emails in parallel for this batch
    const results = await Promise.allSettled(
      batch.map(user => sendNotificationEmail(user.email, title, message, category))
    );

    // Count successes and failures
    results.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value.success) {
        successCount++;
      } else {
        failureCount++;
        failedEmails.push(batch[index].email);
      }
    });

    console.log(`Batch ${Math.floor(i / BATCH_SIZE) + 1}: Sent ${successCount}/${users.length} emails`);

    // Delay between batches to avoid rate limiting
    if (i + BATCH_SIZE < users.length) {
      await new Promise(resolve => setTimeout(resolve, BATCH_DELAY));
    }
  }

  return {
    total: users.length,
    success: successCount,
    failed: failureCount,
    failedEmails: failedEmails
  };
};

/**
 * Generate HTML email template for password reset
 * @param {string} resetUrl - The password reset link URL
 * @param {string} userName - User's name or email
 * @returns {string} HTML email template
 */
const generatePasswordResetEmailTemplate = (resetUrl, userName) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f5f2;
        }
        .container {
          background-color: #ffffff;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          color: #3a5c40;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .content {
          margin-bottom: 30px;
        }
        .button {
          display: inline-block;
          padding: 12px 30px;
          background-color: #3a5c40;
          color: #ffffff !important;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          margin: 20px 0;
        }
        .button:hover {
          background-color: #2d4a32;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e5e0d6;
          font-size: 12px;
          color: #666;
          text-align: center;
        }
        .link {
          color: #3a5c40;
          word-break: break-all;
        }
        .warning {
          background-color: #fff3cd;
          border-left: 4px solid #ffc107;
          padding: 12px;
          margin: 20px 0;
          border-radius: 4px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Bhagirathi Ayurveda</div>
          <p>Panchkarma Clinic & Research Centre</p>
        </div>
        
        <div class="content">
          <h2>Reset Your Password</h2>
          <p>Hello ${userName},</p>
          <p>We received a request to reset your password. Click the button below to create a new password:</p>
          
          <div style="text-align: center;">
            <a href="${resetUrl}" class="button">Reset Password</a>
          </div>
          
          <p>Or copy and paste this link into your browser:</p>
          <p class="link">${resetUrl}</p>
          
          <div class="warning">
            <strong>⚠️ Important:</strong> This link will expire in 15 minutes for security reasons.
          </div>
          
          <p>If you did not request a password reset, please ignore this email. Your password will remain unchanged.</p>
        </div>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} Bhagirathi Ayurveda Panchkarma Clinic & Research Centre. All rights reserved.</p>
          <p>This is an automated email, please do not reply.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Send password reset email
 * @param {string} email - Recipient email address
 * @param {string} resetToken - JWT reset token
 * @param {string} userName - User's name or email
 * @returns {Promise<object>} Email send result
 */
const sendPasswordResetEmail = async (email, resetToken, userName) => {
  try {
    // Validate email configuration
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      throw new Error('Email configuration is missing. Please set SMTP_USER and SMTP_PASSWORD environment variables.');
    }

    const transporter = createTransporter();
    
    // Construct reset URL
    const baseUrl = process.env.FRONTEND_URL || process.env.APP_URL || 'http://localhost:1234';
    const resetUrl = `${baseUrl}/reset-password/${resetToken}`;
    
    // Generate HTML email content
    const htmlContent = generatePasswordResetEmailTemplate(resetUrl, userName);
    
    // Email options
    const mailOptions = {
      from: `"Bhagirathi Ayurveda" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Reset Your Password - Bhagirathi Ayurveda',
      html: htmlContent,
      text: `Please reset your password by clicking this link: ${resetUrl}\n\nThis link will expire in 15 minutes.`,
    };
    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Password reset email sent:', info.messageId);
    
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error(`Failed to send password reset email: ${error.message}`);
  }
};

module.exports = {
  sendVerificationEmail,
  testEmailConfiguration,
  generateVerificationEmailTemplate,
  sendNotificationEmail,
  sendBulkNotificationEmails,
  generateNotificationEmailTemplate,
  sendPasswordResetEmail,
  generatePasswordResetEmailTemplate,
};

