const Admin = require('./Admin');
const User = require('./User');
const EmailVerificationToken = require('./EmailVerificationToken');
const TrainingProgram = require('./TrainingProgram');
const NewsEvent = require('./NewsEvent');
const Testimonial = require('./Testimonial');
const Blog = require('./Blog');
const BannerMessage = require('./BannerMessage');
const { Notification, UserNotification } = require('./Notification');
const Prescription = require('./Prescription');
const PaymentReceipt = require('./PaymentReceipt');

module.exports = {
  Admin,
  User,
  EmailVerificationToken,
  TrainingProgram,
  NewsEvent,
  Testimonial,
  Blog,
  BannerMessage,
  Notification,
  UserNotification,
  Prescription,
  PaymentReceipt
};