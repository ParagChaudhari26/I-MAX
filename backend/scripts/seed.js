require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("../models/Admin");
const TrainingProgram = require("../models/TrainingProgram");
const NewsEvent = require("../models/NewsEvent");
const Testimonial = require("../models/Testimonial");
const Blog = require("../models/Blog");

async function seed() {
  console.log("Starting complete seed...");
  await mongoose.connect("mongodb://localhost:27017/bhagarathi-ayurveda");
  console.log("Connected to MongoDB");

  // Clear all
  await Admin.deleteMany({});
  await TrainingProgram.deleteMany({});
  await NewsEvent.deleteMany({});
  await Testimonial.deleteMany({});
  await Blog.deleteMany({});
  console.log("Cleared all collections");

  // Admin
  await new Admin({ username: "admin", email: "admin@bhagirathi.com", password: "admin123", role: "admin", isActive: true }).save();
  console.log("Admin created");

  // 11 ONLINE COURSES
  const onlineCourses = [
    { title: "Beauty Care by Ayurveda", description: "This course helps you develop a deep sense of beauty that radiates from within.", type: "Online", duration: "30 hours", price: 250, instructor: "Dr. Yogita", schedule: "Self-paced", isActive: true, syllabus: [{ topic: "Ayurvedic approach to beauty", duration: "5 hours" }] },
    { title: "Basics of Ayurveda", description: "Learn the foundational principles of Ayurveda and its approach to holistic health.", type: "Online", duration: "30 hours", price: 250, instructor: "Dr. Yogita", schedule: "Self-paced", isActive: true, syllabus: [{ topic: "Foundations of Ayurveda", duration: "6 hours" }] },
    { title: "Advance Ayurveda", description: "This module provides a deeper examination of Ayurvedic concepts.", type: "Online", duration: "50 hours", price: 450, instructor: "Dr. Yogita", schedule: "Self-paced", isActive: true, syllabus: [{ topic: "Philosophy and Basic Principles", duration: "10 hours" }] },
    { title: "Ayurveda Herbology", description: "Study of Ayurvedic Medicinal Herbs and their uses for treating diseases.", type: "Online", duration: "30 hours", price: 250, instructor: "Dr. Yogita", schedule: "Self-paced", isActive: true, syllabus: [{ topic: "Dravya Guna Shastra", duration: "8 hours" }] },
    { title: "Sushruta Samhita Introduction", description: "Introduction to the principles and practice of Ayurvedic Surgery.", type: "Online", duration: "30 hours", price: 250, instructor: "Dr. Yogita", schedule: "Self-paced", isActive: true, syllabus: [{ topic: "Sushruta Samhita", duration: "4 hours" }] },
    { title: "Ashtanga Hridaya Samhita Introduction", description: "Essentials of Ayurvedic Medicine and Surgery from this classical text.", type: "Online", duration: "30 hours", price: 250, instructor: "Dr. Yogita", schedule: "Self-paced", isActive: true, syllabus: [{ topic: "Ashtanga Hridaya", duration: "4 hours" }] },
    { title: "Madhava Nidana Introduction", description: "Principles and Practice of Ayurvedic Diagnostic Methodology.", type: "Online", duration: "30 hours", price: 250, instructor: "Dr. Yogita", schedule: "Self-paced", isActive: true, syllabus: [{ topic: "Diagnostic Principles", duration: "5 hours" }] },
    { title: "Pre-Menstrual Syndrome and Menopause", description: "Ayurvedic approach to managing PMS and Menopause.", type: "Online", duration: "15 hours", price: 125, instructor: "Dr. Yogita", schedule: "Self-paced", isActive: true, syllabus: [{ topic: "PMS in Ayurveda", duration: "7 hours" }] },
    { title: "Women Care and Pregnancy Care", description: "Ayurvedic approach to womens health and pregnancy care.", type: "Online", duration: "30 hours", price: 250, instructor: "Dr. Yogita", schedule: "Self-paced", isActive: true, syllabus: [{ topic: "Womens Health", duration: "10 hours" }] },
    { title: "Rasayana Rejuvenation Therapy", description: "Learn about Ayurvedic rejuvenation therapies.", type: "Online", duration: "20 hours", price: 170, instructor: "Dr. Yogita", schedule: "Self-paced", isActive: true, syllabus: [{ topic: "Rasayana Therapy", duration: "10 hours" }] },
    { title: "Vajikarana Vitalization Therapy", description: "Ayurvedic approach to sexual health and vitality.", type: "Online", duration: "20 hours", price: 170, instructor: "Dr. Yogita", schedule: "Self-paced", isActive: true, syllabus: [{ topic: "Vajikarana Therapy", duration: "10 hours" }] }
  ];

  // 14 IN-PERSON COURSES
  const inPersonCourses = [
    { title: "Ayurveda Basics and Panchakarma Training", description: "Introduction to Ayurveda and Panchakarma with practical training.", type: "In-Person", duration: "30 hours", price: 450, instructor: "Dr. Yogita & Dr. Manoj", schedule: "Contact for schedule", isActive: true, syllabus: [{ topic: "Theory and Practical", duration: "30 hours" }] },
    { title: "Beauty Care by Ayurveda Step I", description: "Ayurvedic approach to beauty care with practical sessions.", type: "In-Person", duration: "30 hours", price: 450, instructor: "Dr. Yogita & Dr. Manoj", schedule: "Contact for schedule", isActive: true, syllabus: [{ topic: "Theory and Practical", duration: "30 hours" }] },
    { title: "Herbal Medicines and Oils Preparation", description: "Learn to prepare various Ayurvedic formulations.", type: "In-Person", duration: "30 hours", price: 450, instructor: "Dr. Yogita & Dr. Manoj", schedule: "Contact for schedule", isActive: true, syllabus: [{ topic: "Theory and Practical", duration: "30 hours" }] },
    { title: "Ayurveda Cooking Training", description: "Learn Ayurvedic principles of cooking and nutrition.", type: "In-Person", duration: "30 hours", price: 450, instructor: "Dr. Yogita & Dr. Manoj", schedule: "Contact for schedule", isActive: true, syllabus: [{ topic: "Theory and Practical", duration: "30 hours" }] },
    { title: "Ayurveda Lifestyle Management", description: "Learn daily and seasonal regimens according to Ayurveda.", type: "In-Person", duration: "30 hours", price: 450, instructor: "Dr. Yogita & Dr. Manoj", schedule: "Contact for schedule", isActive: true, syllabus: [{ topic: "Theory and Practical", duration: "30 hours" }] },
    { title: "Ayurveda Massage for Baby and Pregnancy Care", description: "Ayurvedic approach to baby massage and pregnancy care.", type: "In-Person", duration: "30 hours", price: 450, instructor: "Dr. Yogita & Dr. Manoj", schedule: "Contact for schedule", isActive: true, syllabus: [{ topic: "Theory and Practical", duration: "30 hours" }] },
    { title: "Identification of Ayurvedic Herbs and Spices", description: "Learn to identify and use common Ayurvedic herbs.", type: "In-Person", duration: "30 hours", price: 450, instructor: "Dr. Yogita & Dr. Manoj", schedule: "Contact for schedule", isActive: true, syllabus: [{ topic: "Theory and Practical", duration: "30 hours" }] },
    { title: "Yoga Teacher Training Basic", description: "Basic yoga teacher training program.", type: "In-Person", duration: "30 hours", price: 450, instructor: "Dr. Yogita & Dr. Manoj", schedule: "Contact for schedule", isActive: true, syllabus: [{ topic: "Theory and Practical", duration: "30 hours" }] },
    { title: "Ayurveda Therapist Training", description: "Comprehensive training to become an Ayurveda therapist.", type: "In-Person", duration: "160 hours", price: 2300, instructor: "Dr. Yogita & Dr. Manoj", schedule: "Contact for schedule", isActive: true, syllabus: [{ topic: "Complete Training", duration: "160 hours" }] },
    { title: "Ayurveda and Panchakarma Therapy Step III", description: "Advanced training in Ayurveda and Panchakarma.", type: "In-Person", duration: "80 hours", price: 1100, instructor: "Dr. Yogita & Dr. Manoj", schedule: "Contact for schedule", isActive: true, syllabus: [{ topic: "Advanced Panchakarma", duration: "80 hours" }] },
    { title: "Beauty Care by Ayurveda Step II", description: "Advanced beauty care techniques with Ayurveda.", type: "In-Person", duration: "60 hours", price: 850, instructor: "Dr. Yogita & Dr. Manoj", schedule: "Contact for schedule", isActive: true, syllabus: [{ topic: "Advanced Beauty Care", duration: "60 hours" }] },
    { title: "Ayurveda Marma Massage Step III", description: "Specialized training in Ayurvedic Marma massage.", type: "In-Person", duration: "90 hours", price: 1350, instructor: "Dr. Yogita & Dr. Manoj", schedule: "Contact for schedule", isActive: true, syllabus: [{ topic: "Marma Massage", duration: "90 hours" }] },
    { title: "Ayurveda and Panchakarma Advance Training", description: "Advanced training in Ayurveda and Panchakarma.", type: "In-Person", duration: "60 hours", price: 850, instructor: "Dr. Yogita & Dr. Manoj", schedule: "Contact for schedule", isActive: true, syllabus: [{ topic: "Advanced Training", duration: "60 hours" }] },
    { title: "Yoga Teacher Training Advance", description: "Advanced yoga teacher training program.", type: "In-Person", duration: "80 hours", price: 850, instructor: "Dr. Yogita & Dr. Manoj", schedule: "Contact for schedule", isActive: true, syllabus: [{ topic: "Advanced Yoga", duration: "80 hours" }] }
  ];

  // Insert programs
  for (const p of onlineCourses) { await TrainingProgram.create(p); }
  console.log("Online courses created: " + onlineCourses.length);
  for (const p of inPersonCourses) { await TrainingProgram.create(p); }
  console.log("In-Person courses created: " + inPersonCourses.length);

  // 29 Testimonials
  const testimonialNames = ["Angela Kopic", "Cecilia Frigerio", "Yuri Takeuchi", "Cecilia Pancali", "Ettore Messinas", "Maria Peluzzi", "Chiharu", "Dorota Klaudia", "Natalia Tageva", "Sayuri Honda", "Daniela Erhana", "Sebastian", "Candida Romoli", "Saskia Haeger", "Giulia", "Renate Bartel", "Sabrina Ignesti", "Marcela", "Sonia Ladatto", "Monica Mori", "Irene", "Sarah Kothari", "Natalia T.", "Vanessa Sabatini", "Claudia Bartoli", "Elena Sanchez", "Nicola Messinas", "Mai Fujii", "Heena Khan"];
  const testimonials = testimonialNames.map((name, i) => ({
    customerName: name,
    customerLocation: ["Dublin, Ireland", "Barcelona, Spain", "Japan", "Italy", "Italy", "Italy", "Japan", "Poland", "Russia", "Japan", "Romania", "Dublin, Ireland", "Italy", "Germany", "Italy", "Austria", "Italy", "Brazil", "Italy", "Pisa, Italy", "Italy", "Oxford, England", "Russia", "Italy", "Italy", "Venezuela", "Italy", "Hawaii", "Germany"][i],
    treatment: "Ayurveda Training",
    testimonialText: "Amazing experience at Bhagirathi Ayurveda Centre. Dr. Yogita and Dr. Manoj are wonderful teachers.",
    rating: 5,
    isApproved: true
  }));
  await Testimonial.insertMany(testimonials);
  console.log("Testimonials created: 29");

  // 6 Blogs
  const blogs = [
    { title: "Panchakarma Treasure of Ayurveda", slug: "panchakarma-treasure", content: "Panchakarma is a traditional Ayurvedic cleanse.", excerpt: "Discover Panchakarma.", author: "Dr. Yogita", tags: ["panchakarma"], category: "Treatments", isPublished: true, publishDate: new Date() },
    { title: "Secrets of Ayurveda Skin Care", slug: "ayurveda-skin-care", content: "Ayurvedic tools for skin care.", excerpt: "Natural skin care.", author: "Dr. Yogita", tags: ["skincare"], category: "Beauty", isPublished: true, publishDate: new Date() },
    { title: "Can Ayurveda benefit skin and hair", slug: "skin-hair-benefits", content: "Ayurveda for skin and hair.", excerpt: "Transform skincare.", author: "Dr. Yogita", tags: ["skincare"], category: "Beauty", isPublished: true, publishDate: new Date() },
    { title: "Stop Your Aging Clock", slug: "stop-aging-clock", content: "Ayurveda for anti-aging.", excerpt: "Slow aging naturally.", author: "Dr. Yogita", tags: ["anti-aging"], category: "Wellness", isPublished: true, publishDate: new Date() },
    { title: "PCOS Polycystic ovarian syndrome", slug: "pcos-treatment", content: "PCOS treatment in Ayurveda.", excerpt: "Understanding PCOS.", author: "Dr. Yogita", tags: ["pcos"], category: "Health", isPublished: true, publishDate: new Date() },
    { title: "Want to forgo eating", slug: "fasting-benefits", content: "Ayurveda on fasting.", excerpt: "Fasting benefits.", author: "Dr. Yogita", tags: ["diet"], category: "Nutrition", isPublished: true, publishDate: new Date() }
  ];
  await Blog.insertMany(blogs);
  console.log("Blogs created: 6");

  // 2 News/Events
  await NewsEvent.insertMany([
    { title: "Annual Ayurveda Conference 2025", content: "Join us for our annual conference.", type: "Event", eventDate: new Date(Date.now() + 30*24*60*60*1000), location: "Pune, India", isPublished: true, author: "Admin" },
    { title: "New Panchakarma Treatment Center", content: "New center opening announcement.", type: "News", isPublished: true, author: "Dr. Yogita" }
  ]);
  console.log("News/Events created: 2");

  // Final counts
  const onlineCount = await TrainingProgram.countDocuments({ type: "Online" });
  const inPersonCount = await TrainingProgram.countDocuments({ type: "In-Person" });
  console.log("\n=== FINAL COUNTS ===");
  console.log("Online Programs: " + onlineCount);
  console.log("In-Person Programs: " + inPersonCount);
  console.log("Total Programs: " + (onlineCount + inPersonCount));
  console.log("Testimonials: " + await Testimonial.countDocuments());
  console.log("Blogs: " + await Blog.countDocuments());
  console.log("News/Events: " + await NewsEvent.countDocuments());

  await mongoose.connection.close();
  console.log("\nSeed complete!");
}

seed();
