const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Testimonial = require('../models/Testimonial');
const Blog = require('../models/Blog');
const TrainingProgram = require('../models/TrainingProgram');

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bhagarathi-ayurveda';

// Helper for localized strings
const toLocal = (text) => ({ en: text || '', hi: '', mr: '' });


// 1. Testimonials Data
const staticTestimonials = [
    { customerName: "Angela Kopic", customerLocation: "Dublin, Ireland", treatment: toLocal("Ayurveda Training"), testimonialText: toLocal("Studying Ayurveda with Dr. Yogita and Dr. Manoj was a deeply enriching experience. I learned how to understand health holistically and bring balance to life through Ayurveda. The body-mind-spirit connection is now clearer to me, and I’m growing on a deeper level. The course gave me a strong foundation and practical skills. Their passion for teaching was evident in every session. Pune is a vibrant city with beautiful temples, markets, and the serene Parvati Hill close to the Bhagirathi Centre."), rating: 5, isApproved: true },
    { customerName: "Cecilia Frigerio", customerLocation: "Barcelona, Spain", treatment: toLocal("Ayurveda Training"), testimonialText: toLocal("As a holistic therapist, I felt called to study Ayurveda, and a friend recommended Bhagirathi. I'm so glad I came! Dr. Yogita and Dr. Manoj are amazing teachers who were always supportive and responsive to my needs. I received a personalized program that included massage techniques and panchakarma treatments. Theory and practice were well balanced. There’s even accommodation for students at the centre. I’m so grateful for this experience."), rating: 5, isApproved: true },
    { customerName: "Yuri Takeuchi San", customerLocation: "Japan", treatment: toLocal("Ayurveda Training"), testimonialText: toLocal("I studied at Bhagirathi Ayurveda Centre in Pune with Dr. Yogita and Dr. Manoj, who are both very kind and calm. The training I received allowed me to open my own Ayurveda shop after returning to Japan. Pune is a wonderful city where tradition meets modern life. I look forward to learning more in the future at the same institute."), rating: 5, isApproved: true },
    { customerName: "Cecilia Pancali", customerLocation: "Italy", treatment: toLocal("Ayurveda Training"), testimonialText: toLocal("I learned Ayurvedic massage in the most beautiful way—with professionalism, love, and smiles. Thanks to Bhagirathi School, I now share the same love through my work. I discovered the true essence of Ayurveda from authentic Indian doctors, and it transformed my life. See you next year!"), rating: 5, isApproved: true },
    { customerName: "Ettore Messinas", customerLocation: "Italy", treatment: toLocal("Ayurveda Training"), testimonialText: toLocal("After years of exploring Ayurveda across India, I finally found Bhagirathi—truly a family school. The teachers are excellent, from top Ayurvedic universities. Pune is perfect, both for tourism and spiritual exploration, being the city of Iyengar and Osho. The combination was ideal, and I’ve even started collaborating with them on yoga and Ayurveda. Many years of beautiful work ahead. Namaskar."), rating: 5, isApproved: true },
    { customerName: "Maria Peluzzi", customerLocation: "Italy", treatment: toLocal("Ayurveda Training"), testimonialText: toLocal("I’ve done three courses in three years at Bhagirathi Ayurveda Centre because I love their teaching style. Dr. Yogita and Dr. Manoj are incredibly professional and passionate about Ayurveda. The practical sessions were extremely satisfying. Pune keeps evolving, and I enjoy the food and friendly people every time I visit."), rating: 5, isApproved: true }
];

// 2. Blogs Data
const staticBlogsData = [
    { 
        title: toLocal('Panchakarma – Treasure of Ayurveda'), 
        publishDate: new Date('January 16, 2023'),
        excerpt: toLocal('Discover the ancient healing practice of Panchakarma and its benefits for modern wellness.'),
        content:  toLocal(`<div class="space-y-6"><h2 class="text-2xl font-bold text-emerald-800">Panchakarma: What Is It?</h2><p>An Ayurvedic cleanse called Panchakarma can assist. Panchkarma combines unique herbal medicines, food, lifestyle changes, and relaxation to aid in the body’s detoxification.</p></div>`), 
        author: "Admin", category: "Wellness", isPublished: true, slug: 'panchakarma-treasure-of-ayurveda'
    },
    { 
        title: toLocal('Secrets of Ayurveda Skin Care'), 
        publishDate: new Date('January 16, 2023'),
        excerpt: toLocal('Learn about natural Ayurvedic approaches to achieve radiant and healthy skin.'),
        content: toLocal(`<div class="space-y-6"><p>Ayurvedic tools including face oils, packs, washes, and Udvaratana gently hydrate skin, clear pores, and improve skin ventilation.</p></div>`), 
        author: "Admin", category: "Beauty", isPublished: true, slug: 'secrets-of-ayurveda-skin-care'
    },
    { 
        title: toLocal('PCOS (Polycystic ovarian syndrome)'), 
        publishDate: new Date('January 16, 2023'),
        excerpt: toLocal('Understanding PCOS through the lens of Ayurveda and natural management techniques.'),
        content: toLocal(`<div class="space-y-6"><p>Relatively common hormonal condition in women, polycystic ovarian syndrome (PCOS) is the main factor affecting female fertility.</p></div>`), 
        author: "Admin", category: "Women's Health", isPublished: true, slug: 'pcos-polycystic-ovarian-syndrome'
    }
];

// 3. Training Programs Data
const staticProgramsData = [
    {
        title: toLocal("Beauty Care by Ayurveda"),
        type: "Online",
        duration: "30 hours",
        price: 250,
        instructor: "Dr. Yogita",
        description: toLocal("This course helps you develop a deep sense of beauty that radiates from within."),
        isActive: true,
        syllabus: [
          { topic: "MODULE I: Beauty:- Ayurvedic approach", duration: "5 hours" },
          { topic: "MODULE II: Ayurvedic Skin Care", duration: "5 hours" }
        ]
    },
    {
        title: toLocal("Basics of Ayurveda"),
        type: "Online",
        duration: "30 hours",
        price: 250,
        instructor: "Dr. Manoj",
        description: toLocal("Learn the foundational principles of Ayurveda and its approach to holistic health."),
        isActive: true,
        syllabus: [
          { topic: "MODULE I: The Foundations of Ayurveda", duration: "10 hours" }
        ]
    },
    {
        title: toLocal("Ayurveda Basics & Panchakarma Training"),
        type: "In-Person",
        duration: "30 hours",
        price: 450,
        instructor: "Dr. Yogita",
        description: toLocal("Introduction to Ayurveda and Panchakarma with practical training sessions."),
        isActive: true,
        syllabus: [
          { topic: "Theory Sessions", duration: "15 hours" },
          { topic: "Practical Sessions", duration: "15 hours" }
        ]
    }
];

// Seed Function
const seedDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Seed Testimonials
        if (await Testimonial.countDocuments() === 0) {
            await Testimonial.insertMany(staticTestimonials);
            console.log(`Seeded ${staticTestimonials.length} Testimonials successfully!`);
        } else {
            console.log('Testimonials collection is not empty, skipping seed.');
        }

        // Seed Blogs
        if (await Blog.countDocuments() === 0) {
            await Blog.insertMany(staticBlogsData);
            console.log(`Seeded ${staticBlogsData.length} Blogs successfully!`);
        } else {
            console.log('Blogs collection is not empty, skipping seed.');
        }

        // Seed Training Programs
        if (await TrainingProgram.countDocuments() === 0) {
            await TrainingProgram.insertMany(staticProgramsData);
            console.log(`Seeded ${staticProgramsData.length} Training Programs successfully!`);
        } else {
            console.log('TrainingPrograms collection is not empty, skipping seed.');
        }

        console.log('Database seeding process fully completed.');
        process.exit();
    } catch (err) {
        console.error('Error seeding data:', err);
        process.exit(1);
    }
}

seedDB();
