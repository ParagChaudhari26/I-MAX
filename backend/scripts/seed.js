require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const TrainingProgram = require('../models/TrainingProgram');
const NewsEvent = require('../models/NewsEvent');
const Testimonial = require('../models/Testimonial');
const Blog = require('../models/Blog');

const testimonials = [
  { customerName: "Angela Kopic", customerLocation: "Dublin, Ireland", treatment: "Ayurveda Training", testimonialText: "Studying Ayurveda with Dr. Yogita was enriching.", rating: 5, isApproved: true },
  { customerName: "Cecilia Frigerio", customerLocation: "Barcelona, Spain", treatment: "Panchakarma Training", testimonialText: "Dr. Yogita and Dr. Manoj are amazing teachers.", rating: 5, isApproved: true },
  { customerName: "Yuri Takeuchi", customerLocation: "Japan", treatment: "Ayurveda Training", testimonialText: "Dr. Yogita and Dr. Manoj are very kind.", rating: 5, isApproved: true },
  { customerName: "Cecilia Pancali", customerLocation: "Italy", treatment: "Ayurvedic Massage", testimonialText: "I learned massage with professionalism and love.", rating: 5, isApproved: true },
  { customerName: "Ettore Messinas", customerLocation: "Italy", treatment: "Yoga & Ayurveda", testimonialText: "Bhagirathi is truly a family school.", rating: 5, isApproved: true },
  { customerName: "Maria Peluzzi", customerLocation: "Italy", treatment: "Multiple Courses", testimonialText: "I love their teaching style.", rating: 5, isApproved: true },
  { customerName: "Chiharu", customerLocation: "Japan", treatment: "Ayurveda Training", testimonialText: "Genuine Ayurvedic training from Dr. Yogita.", rating: 5, isApproved: true },
  { customerName: "Dorota Klaudia", customerLocation: "Poland", treatment: "Ayurveda Therapy", testimonialText: "Bhagirathi Centre is full of life.", rating: 5, isApproved: true },
  { customerName: "Natalia Tageva", customerLocation: "Russia", treatment: "Ayurveda Training", testimonialText: "Dr. Yogita helped guide me back to health.", rating: 5, isApproved: true },
  { customerName: "Sayuri Honda", customerLocation: "Japan", treatment: "Ayurveda Training", testimonialText: "Dr. Yogita makes wisdom accessible.", rating: 5, isApproved: true },
  { customerName: "Daniela Erhana", customerLocation: "Romania", treatment: "Ayurveda Training", testimonialText: "Grateful for the training.", rating: 5, isApproved: true },
  { customerName: "Sebastian", customerLocation: "Dublin, Ireland", treatment: "Ayurveda Training", testimonialText: "This course gave me immense value.", rating: 5, isApproved: true },
  { customerName: "Candida Romoli", customerLocation: "Italy", treatment: "Ayurveda Training", testimonialText: "Fortunate to have trained here.", rating: 5, isApproved: true },
  { customerName: "Saskia Haeger", customerLocation: "Germany", treatment: "Baby Massage", testimonialText: "Learned traditional Indian baby massage.", rating: 5, isApproved: true },
  { customerName: "Giulia", customerLocation: "Italy", treatment: "Ayurveda Therapy", testimonialText: "Dr. Yogita passion is infectious.", rating: 5, isApproved: true },
  { customerName: "Renate Bartel", customerLocation: "Austria", treatment: "Ayurveda Training", testimonialText: "Dr. Yogita is generous with knowledge.", rating: 5, isApproved: true },
  { customerName: "Sabrina Ignesti", customerLocation: "Italy", treatment: "Ayurveda Training", testimonialText: "Professional and kind doctors.", rating: 5, isApproved: true },
  { customerName: "Marcela", customerLocation: "Brazil", treatment: "Ayurveda Training", testimonialText: "Teaching is relevant yet traditional.", rating: 5, isApproved: true },
  { customerName: "Sonia Ladatto", customerLocation: "Italy", treatment: "Ayurveda Training", testimonialText: "Life-changing experience.", rating: 5, isApproved: true },
  { customerName: "Monica Mori", customerLocation: "Pisa, Italy", treatment: "Massage & Panchakarma", testimonialText: "Graduated in massage and panchakarma.", rating: 5, isApproved: true },
  { customerName: "Irene", customerLocation: "Italy", treatment: "Ayurveda Training", testimonialText: "Applicable in Western society.", rating: 5, isApproved: true },
  { customerName: "Sarah Kothari", customerLocation: "Oxford, England", treatment: "Ayurveda Training", testimonialText: "Amazing teachers with deep knowledge.", rating: 5, isApproved: true },
  { customerName: "Natalia T.", customerLocation: "Russia", treatment: "Health Restoration", testimonialText: "Dr. Yogita changed my life.", rating: 5, isApproved: true },
  { customerName: "Vanessa Sabatini", customerLocation: "Italy", treatment: "Ayurveda Training", testimonialText: "Professional and heart-centered.", rating: 5, isApproved: true },
  { customerName: "Claudia Bartoli", customerLocation: "Italy", treatment: "Ayurveda Training", testimonialText: "Kept me inspired.", rating: 5, isApproved: true },
  { customerName: "Elena Sanchez", customerLocation: "Venezuela", treatment: "Ayurveda Training", testimonialText: "Best decision I made.", rating: 5, isApproved: true },
  { customerName: "Nicola Messinas", customerLocation: "Italy", treatment: "Ayurveda Training", testimonialText: "Knowledge from the heart.", rating: 5, isApproved: true },
  { customerName: "Mai Fujii", customerLocation: "Hawaii", treatment: "Panchakarma", testimonialText: "Healthier than ever.", rating: 5, isApproved: true },
  { customerName: "Heena Khan", customerLocation: "Germany", treatment: "Ayurveda Cooking", testimonialText: "Very happy with my course.", rating: 5, isApproved: true }
];

const blogs = [
  { title: "Panchakarma Treasure", slug: "panchakarma-treasure", content: "Panchakarma is traditional Ayurvedic cleanse.", excerpt: "Discover Panchakarma.", author: "Dr. Yogita", tags: ["panchakarma"], category: "Treatments", isPublished: true, publishDate: new Date("2023-01-16") },
  { title: "Ayurveda Skin Care", slug: "ayurveda-skin-care", content: "Ayurvedic tools hydrate skin.", excerpt: "Natural skin care.", author: "Dr. Yogita", tags: ["skincare"], category: "Beauty", isPublished: true, publishDate: new Date("2023-01-16") },
  { title: "Skin and Hair Benefits", slug: "skin-hair-benefits", content: "Ayurveda is traditional healing.", excerpt: "Transform skincare.", author: "Dr. Yogita", tags: ["skincare"], category: "Beauty", isPublished: true, publishDate: new Date("2023-01-16") },
  { title: "Stop Aging Clock", slug: "stop-aging-clock", content: "Ayurveda lessens aging effects.", excerpt: "Slow aging naturally.", author: "Dr. Yogita", tags: ["anti-aging"], category: "Wellness", isPublished: true, publishDate: new Date("2023-01-16") },
  { title: "PCOS Treatment", slug: "pcos-treatment", content: "PCOS is hormonal condition.", excerpt: "Understanding PCOS.", author: "Dr. Yogita", tags: ["pcos"], category: "Health", isPublished: true, publishDate: new Date("2023-01-16") },
  { title: "Fasting Benefits", slug: "fasting-benefits", content: "Ayurveda emphasizes diet.", excerpt: "Fasting perspective.", author: "Dr. Yogita", tags: ["diet"], category: "Nutrition", isPublished: true, publishDate: new Date("2023-01-16") }
];


// 11 ONLINE PROGRAMS
const onlinePrograms = [
  { title: "Beauty Care by Ayurveda (Online)", description: "Develop beauty from within.", type: "Online", duration: "30 hours", price: 250, instructor: "Dr. Yogita", schedule: "Self-paced", isActive: true, syllabus: [{ topic: "Beauty", duration: "5 hours" }] },
  { title: "Basics of Ayurveda (Online)", description: "Foundational principles.", type: "Online", duration: "30 hours", price: 250, instructor: "Dr. Yogita", schedule: "Self-paced", isActive: true, syllabus: [{ topic: "Basics", duration: "6 hours" }] },
  { title: "Advance Ayurveda (Online)", description: "Deeper concepts.", type: "Online", duration: "50 hours", price: 450, instructor: "Dr. Yogita", schedule: "Self-paced", isActive: true, syllabus: [{ topic: "Advanced", duration: "10 hours" }] },
  { title: "Ayurveda Herbology (Online)", description: "Medicinal Herbs study.", type: "Online", duration: "30 hours", price: 250, instructor: "Dr. Yogita", schedule: "Self-paced", isActive: true, syllabus: [{ topic: "Herbs", duration: "8 hours" }] },
  { title: "Sushruta Samhita (Online)", description: "Surgery principles.", type: "Online", duration: "30 hours", price: 250, instructor: "Dr. Yogita", schedule: "Self-paced", isActive: true, syllabus: [{ topic: "Sushruta", duration: "4 hours" }] },
  { title: "Ashtanga Hridaya (Online)", description: "Ayurvedic Medicine.", type: "Online", duration: "30 hours", price: 250, instructor: "Dr. Yogita", schedule: "Self-paced", isActive: true, syllabus: [{ topic: "Ashtanga", duration: "4 hours" }] },
  { title: "Madhava Nidana (Online)", description: "Diagnostic Methodology.", type: "Online", duration: "30 hours", price: 250, instructor: "Dr. Yogita", schedule: "Self-paced", isActive: true, syllabus: [{ topic: "Diagnostics", duration: "5 hours" }] },
  { title: "PMS and Menopause (Online)", description: "PMS management.", type: "Online", duration: "15 hours", price: 125, instructor: "Dr. Yogita", schedule: "Self-paced", isActive: true, syllabus: [{ topic: "PMS", duration: "7 hours" }] },
  { title: "Women Care (Online)", description: "Pregnancy care.", type: "Online", duration: "30 hours", price: 250, instructor: "Dr. Yogita", schedule: "Self-paced", isActive: true, syllabus: [{ topic: "Women", duration: "10 hours" }] },
  { title: "Rasayana Therapy (Online)", description: "Rejuvenation.", type: "Online", duration: "20 hours", price: 170, instructor: "Dr. Yogita", schedule: "Self-paced", isActive: true, syllabus: [{ topic: "Rasayana", duration: "10 hours" }] },
  { title: "Vajikarana Therapy (Online)", description: "Vitalization.", type: "Online", duration: "20 hours", price: 170, instructor: "Dr. Yogita", schedule: "Self-paced", isActive: true, syllabus: [{ topic: "Vajikarana", duration: "10 hours" }] }
];

// 14 IN-PERSON PROGRAMS
const inPersonPrograms = [
  { title: "Panchakarma Training", description: "Panchakarma intro.", type: "In-Person", duration: "30 hours", price: 450, instructor: "Dr. Yogita & Dr. Manoj", schedule: "Contact", isActive: true, syllabus: [{ topic: "Theory", duration: "15 hours" }] },
  { title: "Beauty Care Step I", description: "Beauty practical.", type: "In-Person", duration: "30 hours", price: 450, instructor: "Dr. Yogita & Dr. Manoj", schedule: "Contact", isActive: true, syllabus: [{ topic: "Theory", duration: "15 hours" }] },
  { title: "Herbal Medicines Prep", description: "Formulations.", type: "In-Person", duration: "30 hours", price: 450, instructor: "Dr. Yogita & Dr. Manoj", schedule: "Contact", isActive: true, syllabus: [{ topic: "Theory", duration: "15 hours" }] },
  { title: "Cooking Training", description: "Ayurvedic cooking.", type: "In-Person", duration: "30 hours", price: 450, instructor: "Dr. Yogita & Dr. Manoj", schedule: "Contact", isActive: true, syllabus: [{ topic: "Theory", duration: "15 hours" }] },
  { title: "Lifestyle Management", description: "Daily regimens.", type: "In-Person", duration: "30 hours", price: 450, instructor: "Dr. Yogita & Dr. Manoj", schedule: "Contact", isActive: true, syllabus: [{ topic: "Theory", duration: "15 hours" }] },
  { title: "Baby Massage Training", description: "Baby and pregnancy.", type: "In-Person", duration: "30 hours", price: 450, instructor: "Dr. Yogita & Dr. Manoj", schedule: "Contact", isActive: true, syllabus: [{ topic: "Theory", duration: "15 hours" }] },
  { title: "Herbs Identification", description: "Identify herbs.", type: "In-Person", duration: "30 hours", price: 450, instructor: "Dr. Yogita & Dr. Manoj", schedule: "Contact", isActive: true, syllabus: [{ topic: "Theory", duration: "15 hours" }] },
  { title: "Yoga Basic Training", description: "Basic yoga.", type: "In-Person", duration: "30 hours", price: 450, instructor: "Dr. Yogita & Dr. Manoj", schedule: "Contact", isActive: true, syllabus: [{ topic: "Theory", duration: "15 hours" }] },
  { title: "Therapist Training", description: "Comprehensive.", type: "In-Person", duration: "160 hours", price: 2300, instructor: "Dr. Yogita & Dr. Manoj", schedule: "Contact", isActive: true, syllabus: [{ topic: "Complete", duration: "160 hours" }] },
  { title: "Panchakarma Step III", description: "Advanced.", type: "In-Person", duration: "80 hours", price: 1100, instructor: "Dr. Yogita & Dr. Manoj", schedule: "Contact", isActive: true, syllabus: [{ topic: "Advanced", duration: "80 hours" }] },
  { title: "Beauty Care Step II", description: "Advanced beauty.", type: "In-Person", duration: "60 hours", price: 850, instructor: "Dr. Yogita & Dr. Manoj", schedule: "Contact", isActive: true, syllabus: [{ topic: "Advanced", duration: "60 hours" }] },
  { title: "Marma Massage", description: "Marma training.", type: "In-Person", duration: "90 hours", price: 1350, instructor: "Dr. Yogita & Dr. Manoj", schedule: "Contact", isActive: true, syllabus: [{ topic: "Marma", duration: "90 hours" }] },
  { title: "Panchakarma Advance", description: "Advanced training.", type: "In-Person", duration: "60 hours", price: 850, instructor: "Dr. Yogita & Dr. Manoj", schedule: "Contact", isActive: true, syllabus: [{ topic: "Advanced", duration: "60 hours" }] },
  { title: "Yoga Advance Training", description: "Advanced yoga.", type: "In-Person", duration: "80 hours", price: 850, instructor: "Dr. Yogita & Dr. Manoj", schedule: "Contact", isActive: true, syllabus: [{ topic: "Advanced", duration: "80 hours" }] }
];

const newsEvents = [
  { title: "Ayurveda Conference 2025", content: "Annual conference.", type: "Event", eventDate: new Date(Date.now() + 30*24*60*60*1000), location: "Pune", isPublished: true, author: "Admin" },
  { title: "New Treatment Center", content: "New center opening.", type: "News", isPublished: true, author: "Dr. Yogita" }
];


async function seed() {
  console.log("Starting seed...");
  try {
    await mongoose.connect("mongodb://localhost:27017/bhagarathi-ayurveda");
    console.log("Connected to MongoDB");

    // Clear all data
    await Admin.deleteMany({});
    await TrainingProgram.deleteMany({});
    await NewsEvent.deleteMany({});
    await Testimonial.deleteMany({});
    await Blog.deleteMany({});
    console.log("Cleared all collections");

    // Create admin
    const admin = new Admin({
      username: "admin",
      email: "admin@test.com",
      password: "admin123",
      role: "admin",
      isActive: true
    });
    await admin.save();
    console.log("Admin created");

    // Insert Online programs one by one
    for (const program of onlinePrograms) {
      await TrainingProgram.create(program);
    }
    console.log("Online programs created: " + onlinePrograms.length);

    // Insert In-Person programs one by one
    for (const program of inPersonPrograms) {
      await TrainingProgram.create(program);
    }
    console.log("In-Person programs created: " + inPersonPrograms.length);

    // Insert other data
    await NewsEvent.insertMany(newsEvents);
    console.log("News/Events created: " + newsEvents.length);

    await Testimonial.insertMany(testimonials);
    console.log("Testimonials created: " + testimonials.length);

    await Blog.insertMany(blogs);
    console.log("Blogs created: " + blogs.length);

    // Verify counts
    const onlineCount = await TrainingProgram.countDocuments({ type: "Online" });
    const inPersonCount = await TrainingProgram.countDocuments({ type: "In-Person" });
    const totalPrograms = await TrainingProgram.countDocuments();
    const totalTestimonials = await Testimonial.countDocuments();
    const totalBlogs = await Blog.countDocuments();
    const totalEvents = await NewsEvent.countDocuments();

    console.log("\n=== SEED COMPLETE ===");
    console.log("Online Programs: " + onlineCount);
    console.log("In-Person Programs: " + inPersonCount);
    console.log("Total Programs: " + totalPrograms);
    console.log("Testimonials: " + totalTestimonials);
    console.log("Blogs: " + totalBlogs);
    console.log("News/Events: " + totalEvents);

  } catch (error) {
    console.error("Seed error:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("Connection closed");
  }
}

seed();
