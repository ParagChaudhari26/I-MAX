const mongoose = require('mongoose');
const dotenv = require('dotenv');
const TrainingProgram = require('../models/TrainingProgram');

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bhagarathi-ayurveda';

// Helper for localized strings
const toLocal = (text) => ({ en: text || '', hi: '', mr: '' });

// ============================================
// ONLINE COURSES (11 courses)
// ============================================
const onlineCourses = [
    {
        title: toLocal("Fundamentals of Ayurveda"),
        type: "Online",
        duration: "40 hours",
        price: 299,
        instructor: "Dr. Manoj Virmani",
        schedule: "Self-paced with live Q&A sessions every Saturday",
        description: toLocal("Comprehensive introduction to Ayurvedic principles, philosophy, and foundational concepts. Perfect for beginners wanting to understand the ancient science of life and health."),
        isActive: true,
        syllabus: [
            { topic: "History and Philosophy of Ayurveda", duration: "6 hours" },
            { topic: "Panchamahabhuta (Five Elements Theory)", duration: "5 hours" },
            { topic: "Tridosha Theory (Vata, Pitta, Kapha)", duration: "8 hours" },
            { topic: "Prakriti (Constitution) Assessment", duration: "6 hours" },
            { topic: "Agni and Digestion", duration: "5 hours" },
            { topic: "Dhatus (Seven Tissues)", duration: "5 hours" },
            { topic: "Malas (Waste Products)", duration: "3 hours" },
            { topic: "Final Assessment", duration: "2 hours" }
        ]
    },
    {
        title: toLocal("Ayurvedic Nutrition and Diet Planning"),
        type: "Online",
        duration: "35 hours",
        price: 275,
        instructor: "Dr. Yogita Manoj",
        schedule: "8 weeks, 2 sessions per week",
        description: toLocal("Learn to create personalized diet plans based on Ayurvedic principles. Understand food energetics, seasonal eating, and therapeutic nutrition for various health conditions."),
        isActive: true,
        syllabus: [
            { topic: "Six Tastes and Food Properties", duration: "5 hours" },
            { topic: "Food Combinations and Incompatibilities", duration: "4 hours" },
            { topic: "Seasonal Diet and Ritucharya", duration: "4 hours" },
            { topic: "Diet for Different Doshas", duration: "6 hours" },
            { topic: "Therapeutic Diets for Common Conditions", duration: "8 hours" },
            { topic: "Meal Planning and Recipe Development", duration: "6 hours" },
            { topic: "Case Studies and Practical Applications", duration: "2 hours" }
        ]
    },
    {
        title: toLocal("Beauty Care by Ayurveda"),
        type: "Online",
        duration: "30 hours",
        price: 250,
        instructor: "Dr. Yogita Manoj",
        schedule: "6 weeks, flexible timing",
        description: toLocal("Discover the secrets of Ayurvedic beauty care. Learn natural skincare, haircare, and anti-aging techniques using herbs, oils, and traditional formulations."),
        isActive: true,
        syllabus: [
            { topic: "Ayurvedic Approach to Beauty and Wellness", duration: "5 hours" },
            { topic: "Skin Types and Dosha-Based Care", duration: "6 hours" },
            { topic: "Herbal Face Packs and Masks", duration: "5 hours" },
            { topic: "Ayurvedic Hair Care", duration: "5 hours" },
            { topic: "Anti-Aging Treatments", duration: "5 hours" },
            { topic: "DIY Beauty Product Formulation", duration: "4 hours" }
        ]
    },
    {
        title: toLocal("Ayurvedic Herbology - Part 1"),
        type: "Online",
        duration: "45 hours",
        price: 350,
        instructor: "Dr. Manoj Virmani",
        schedule: "10 weeks, self-paced with weekly webinars",
        description: toLocal("In-depth study of 50 essential Ayurvedic herbs. Learn identification, properties, therapeutic uses, dosage, and contraindications of commonly used medicinal plants."),
        isActive: true,
        syllabus: [
            { topic: "Introduction to Dravyaguna (Herbology)", duration: "5 hours" },
            { topic: "Digestive and Metabolic Herbs", duration: "8 hours" },
            { topic: "Respiratory System Herbs", duration: "7 hours" },
            { topic: "Nervous System and Adaptogenic Herbs", duration: "8 hours" },
            { topic: "Immune System Herbs", duration: "7 hours" },
            { topic: "Women's Health Herbs", duration: "6 hours" },
            { topic: "Herb Preparation Methods", duration: "4 hours" }
        ]
    },
    {
        title: toLocal("Ayurvedic Psychology and Mind-Body Medicine"),
        type: "Online",
        duration: "32 hours",
        price: 280,
        instructor: "Dr. Yogita Manoj",
        schedule: "8 weeks, 2 live sessions per week",
        description: toLocal("Explore the Ayurvedic understanding of mind, consciousness, and mental health. Learn techniques for emotional balance, stress management, and psychological well-being."),
        isActive: true,
        syllabus: [
            { topic: "Ayurvedic Concept of Mind (Manas)", duration: "5 hours" },
            { topic: "Three Mental Qualities (Sattva, Rajas, Tamas)", duration: "5 hours" },
            { topic: "Stress and Anxiety Management", duration: "6 hours" },
            { topic: "Depression and Mood Disorders", duration: "5 hours" },
            { topic: "Meditation and Pranayama", duration: "6 hours" },
            { topic: "Counseling Techniques", duration: "5 hours" }
        ]
    },
    {
        title: toLocal("Women's Health in Ayurveda"),
        type: "Online",
        duration: "38 hours",
        price: 295,
        instructor: "Dr. Yogita Manoj",
        schedule: "9 weeks, flexible schedule",
        description: toLocal("Comprehensive course on women's health from menarche to menopause. Learn Ayurvedic approaches to menstrual health, fertility, pregnancy, postpartum care, and menopause."),
        isActive: true,
        syllabus: [
            { topic: "Menstrual Health and Disorders", duration: "7 hours" },
            { topic: "PCOS and Hormonal Imbalances", duration: "6 hours" },
            { topic: "Fertility Enhancement", duration: "6 hours" },
            { topic: "Pregnancy Care (Garbhini Paricharya)", duration: "7 hours" },
            { topic: "Postpartum Care (Sutika Paricharya)", duration: "6 hours" },
            { topic: "Menopause Management", duration: "6 hours" }
        ]
    },
    {
        title: toLocal("Ayurvedic Massage Therapy - Online Theory"),
        type: "Online",
        duration: "28 hours",
        price: 240,
        instructor: "Dr. Manoj Virmani",
        schedule: "7 weeks, video demonstrations included",
        description: toLocal("Learn the theoretical foundations of Ayurvedic massage. Understand different massage techniques, oils, and their therapeutic applications. Practical training available separately."),
        isActive: true,
        syllabus: [
            { topic: "Introduction to Ayurvedic Massage", duration: "4 hours" },
            { topic: "Abhyanga (Oil Massage) Theory", duration: "5 hours" },
            { topic: "Therapeutic Oils and Their Properties", duration: "5 hours" },
            { topic: "Marma Points (Vital Energy Points)", duration: "6 hours" },
            { topic: "Specialized Massage Techniques", duration: "5 hours" },
            { topic: "Contraindications and Safety", duration: "3 hours" }
        ]
    },
    {
        title: toLocal("Ayurvedic Lifestyle and Daily Routines"),
        type: "Online",
        duration: "25 hours",
        price: 220,
        instructor: "Dr. Yogita Manoj",
        schedule: "5 weeks, self-paced",
        description: toLocal("Master the art of Ayurvedic daily and seasonal routines (Dinacharya and Ritucharya). Learn practical lifestyle modifications for optimal health and disease prevention."),
        isActive: true,
        syllabus: [
            { topic: "Dinacharya (Daily Routine)", duration: "6 hours" },
            { topic: "Ritucharya (Seasonal Routines)", duration: "6 hours" },
            { topic: "Sleep Hygiene and Ratricharya", duration: "4 hours" },
            { topic: "Exercise and Yoga for Doshas", duration: "5 hours" },
            { topic: "Detox and Cleansing Practices", duration: "4 hours" }
        ]
    },
    {
        title: toLocal("Ayurvedic Pulse Diagnosis (Nadi Pariksha)"),
        type: "Online",
        duration: "42 hours",
        price: 380,
        instructor: "Dr. Manoj Virmani",
        schedule: "12 weeks with live practice sessions",
        description: toLocal("Advanced course on the art of pulse diagnosis. Learn to assess health, detect imbalances, and understand disease progression through pulse reading."),
        isActive: true,
        syllabus: [
            { topic: "Fundamentals of Pulse Diagnosis", duration: "6 hours" },
            { topic: "Technique and Hand Positioning", duration: "8 hours" },
            { topic: "Identifying Dosha Pulses", duration: "8 hours" },
            { topic: "Disease Detection Through Pulse", duration: "8 hours" },
            { topic: "Organ-Specific Pulse Assessment", duration: "7 hours" },
            { topic: "Practice and Case Studies", duration: "5 hours" }
        ]
    },
    {
        title: toLocal("Pediatric Ayurveda (Kaumarbhritya)"),
        type: "Online",
        duration: "35 hours",
        price: 290,
        instructor: "Dr. Yogita Manoj",
        schedule: "8 weeks, 2 sessions per week",
        description: toLocal("Specialized course on children's health from conception to adolescence. Learn Ayurvedic approaches to common childhood conditions, nutrition, and developmental care."),
        isActive: true,
        syllabus: [
            { topic: "Preconception and Prenatal Care", duration: "5 hours" },
            { topic: "Newborn Care and Breastfeeding", duration: "6 hours" },
            { topic: "Infant and Toddler Nutrition", duration: "6 hours" },
            { topic: "Common Childhood Ailments", duration: "8 hours" },
            { topic: "Growth and Development", duration: "5 hours" },
            { topic: "Immunity Building in Children", duration: "5 hours" }
        ]
    },
    {
        title: toLocal("Ayurvedic Detoxification and Cleansing"),
        type: "Online",
        duration: "30 hours",
        price: 265,
        instructor: "Dr. Manoj Virmani",
        schedule: "6 weeks, flexible timing",
        description: toLocal("Learn various Ayurvedic detoxification methods including home cleansing protocols, seasonal detox, and preparation for Panchakarma. Understand Ama (toxins) and its elimination."),
        isActive: true,
        syllabus: [
            { topic: "Concept of Ama (Toxins)", duration: "5 hours" },
            { topic: "Home Detox Protocols", duration: "6 hours" },
            { topic: "Seasonal Cleansing", duration: "5 hours" },
            { topic: "Fasting and Mono-Diets", duration: "5 hours" },
            { topic: "Herbal Detox Formulations", duration: "5 hours" },
            { topic: "Post-Detox Care", duration: "4 hours" }
        ]
    }
];

// ============================================
// IN-PERSON COURSES (14 courses)
// ============================================
const inPersonCourses = [
    {
        title: toLocal("Ayurveda Basics & Panchakarma Training"),
        type: "In-Person",
        duration: "2 weeks (80 hours)",
        price: 850,
        instructor: "Dr. Yogita Manoj & Dr. Manoj Virmani",
        schedule: "Monday to Friday, 9 AM - 5 PM",
        description: toLocal("Intensive hands-on training combining Ayurvedic fundamentals with practical Panchakarma therapy. Includes theory, demonstrations, and supervised practice sessions."),
        isActive: true,
        syllabus: [
            { topic: "Ayurveda Fundamentals", duration: "20 hours" },
            { topic: "Panchakarma Theory", duration: "15 hours" },
            { topic: "Practical Panchakarma Procedures", duration: "30 hours" },
            { topic: "Patient Assessment", duration: "10 hours" },
            { topic: "Clinical Observation", duration: "5 hours" }
        ]
    },
    {
        title: toLocal("Professional Ayurvedic Massage Certification"),
        type: "In-Person",
        duration: "3 weeks (120 hours)",
        price: 1200,
        instructor: "Dr. Manoj Virmani",
        schedule: "Monday to Saturday, 9 AM - 5 PM",
        description: toLocal("Comprehensive hands-on training in Ayurvedic massage techniques. Learn Abhyanga, Shirodhara, Pizhichil, and other specialized therapies with extensive practice."),
        isActive: true,
        syllabus: [
            { topic: "Massage Theory and Anatomy", duration: "20 hours" },
            { topic: "Abhyanga (Full Body Massage)", duration: "25 hours" },
            { topic: "Shirodhara (Oil Pouring Therapy)", duration: "15 hours" },
            { topic: "Specialized Therapies", duration: "30 hours" },
            { topic: "Marma Therapy", duration: "15 hours" },
            { topic: "Clinical Practice", duration: "15 hours" }
        ]
    },
    {
        title: toLocal("Advanced Panchakarma Practitioner Program"),
        type: "In-Person",
        duration: "4 weeks (160 hours)",
        price: 1800,
        instructor: "Dr. Yogita Manoj & Dr. Manoj Virmani",
        schedule: "Monday to Friday, 9 AM - 6 PM",
        description: toLocal("Advanced intensive training for healthcare professionals. Master all five Panchakarma procedures with extensive clinical practice and case management."),
        isActive: true,
        syllabus: [
            { topic: "Advanced Panchakarma Theory", duration: "30 hours" },
            { topic: "Vamana (Therapeutic Emesis)", duration: "20 hours" },
            { topic: "Virechana (Purgation Therapy)", duration: "20 hours" },
            { topic: "Basti (Medicated Enema)", duration: "30 hours" },
            { topic: "Nasya and Raktamokshana", duration: "20 hours" },
            { topic: "Clinical Practice and Case Studies", duration: "40 hours" }
        ]
    },
    {
        title: toLocal("Ayurvedic Spa Therapy Training"),
        type: "In-Person",
        duration: "10 days (60 hours)",
        price: 680,
        instructor: "Dr. Yogita Manoj",
        schedule: "Daily, 10 AM - 4 PM",
        description: toLocal("Learn to set up and manage an Ayurvedic spa. Training includes beauty treatments, relaxation therapies, and spa management essentials."),
        isActive: true,
        syllabus: [
            { topic: "Spa Therapy Fundamentals", duration: "10 hours" },
            { topic: "Facial Treatments and Beauty Care", duration: "15 hours" },
            { topic: "Body Treatments and Wraps", duration: "15 hours" },
            { topic: "Relaxation Therapies", duration: "12 hours" },
            { topic: "Spa Management and Setup", duration: "8 hours" }
        ]
    },
    {
        title: toLocal("Marma Therapy Intensive"),
        type: "In-Person",
        duration: "1 week (40 hours)",
        price: 550,
        instructor: "Dr. Manoj Virmani",
        schedule: "Monday to Friday, 9 AM - 5 PM",
        description: toLocal("Specialized training in Marma therapy - the science of vital energy points. Learn location, functions, and therapeutic applications of 107 Marma points."),
        isActive: true,
        syllabus: [
            { topic: "Introduction to Marma Science", duration: "8 hours" },
            { topic: "Marma Point Identification", duration: "12 hours" },
            { topic: "Marma Massage Techniques", duration: "10 hours" },
            { topic: "Therapeutic Applications", duration: "8 hours" },
            { topic: "Practice Sessions", duration: "2 hours" }
        ]
    },
    {
        title: toLocal("Ayurvedic Cooking and Nutrition Workshop"),
        type: "In-Person",
        duration: "5 days (30 hours)",
        price: 420,
        instructor: "Dr. Yogita Manoj",
        schedule: "Daily, 10 AM - 4 PM",
        description: toLocal("Hands-on cooking workshop teaching Ayurvedic meal preparation, spice blending, and therapeutic cooking for different doshas and health conditions."),
        isActive: true,
        syllabus: [
            { topic: "Ayurvedic Cooking Principles", duration: "6 hours" },
            { topic: "Spice Blending and Usage", duration: "6 hours" },
            { topic: "Dosha-Specific Cooking", duration: "8 hours" },
            { topic: "Therapeutic Recipes", duration: "6 hours" },
            { topic: "Meal Planning Workshop", duration: "4 hours" }
        ]
    },
    {
        title: toLocal("Clinical Ayurveda Internship"),
        type: "In-Person",
        duration: "8 weeks (320 hours)",
        price: 2500,
        instructor: "Dr. Yogita Manoj & Dr. Manoj Virmani",
        schedule: "Monday to Saturday, 9 AM - 5 PM",
        description: toLocal("Comprehensive clinical internship for aspiring Ayurvedic practitioners. Gain hands-on experience in patient consultation, diagnosis, treatment planning, and therapy administration."),
        isActive: true,
        syllabus: [
            { topic: "Patient Assessment and Diagnosis", duration: "60 hours" },
            { topic: "Treatment Planning", duration: "50 hours" },
            { topic: "Panchakarma Practice", duration: "80 hours" },
            { topic: "Herbal Medicine Dispensing", duration: "40 hours" },
            { topic: "Case Documentation", duration: "40 hours" },
            { topic: "Clinical Rounds and Supervision", duration: "50 hours" }
        ]
    },
    {
        title: toLocal("Shirodhara Specialist Training"),
        type: "In-Person",
        duration: "3 days (18 hours)",
        price: 320,
        instructor: "Dr. Manoj Virmani",
        schedule: "Friday to Sunday, 10 AM - 4 PM",
        description: toLocal("Intensive training focused exclusively on Shirodhara - the signature Ayurvedic therapy. Learn proper technique, oil selection, and therapeutic applications."),
        isActive: true,
        syllabus: [
            { topic: "Shirodhara Theory and Benefits", duration: "4 hours" },
            { topic: "Equipment Setup and Preparation", duration: "3 hours" },
            { topic: "Technique and Practice", duration: "8 hours" },
            { topic: "Oil Selection and Variations", duration: "3 hours" }
        ]
    },
    {
        title: toLocal("Ayurvedic Herbology Field Training"),
        type: "In-Person",
        duration: "1 week (35 hours)",
        price: 480,
        instructor: "Dr. Manoj Virmani",
        schedule: "Daily field trips and lab work",
        description: toLocal("Unique field-based training including herb identification walks, garden visits, and hands-on preparation of herbal medicines. Learn to identify, harvest, and process medicinal plants."),
        isActive: true,
        syllabus: [
            { topic: "Herb Identification in Nature", duration: "10 hours" },
            { topic: "Harvesting and Processing", duration: "8 hours" },
            { topic: "Medicine Preparation Lab", duration: "10 hours" },
            { topic: "Quality Assessment", duration: "5 hours" },
            { topic: "Storage and Preservation", duration: "2 hours" }
        ]
    },
    {
        title: toLocal("Pregnancy and Postpartum Care Workshop"),
        type: "In-Person",
        duration: "4 days (24 hours)",
        price: 380,
        instructor: "Dr. Yogita Manoj",
        schedule: "Thursday to Sunday, 10 AM - 4 PM",
        description: toLocal("Specialized workshop for healthcare providers and doulas. Learn Ayurvedic approaches to prenatal care, labor support, and postpartum recovery including massage techniques."),
        isActive: true,
        syllabus: [
            { topic: "Ayurvedic Prenatal Care", duration: "6 hours" },
            { topic: "Labor Support Techniques", duration: "4 hours" },
            { topic: "Postpartum Massage and Care", duration: "8 hours" },
            { topic: "Newborn Care Basics", duration: "4 hours" },
            { topic: "Lactation Support", duration: "2 hours" }
        ]
    },
    {
        title: toLocal("Ayurvedic Facial Rejuvenation Training"),
        type: "In-Person",
        duration: "3 days (18 hours)",
        price: 340,
        instructor: "Dr. Yogita Manoj",
        schedule: "Friday to Sunday, 10 AM - 4 PM",
        description: toLocal("Learn authentic Ayurvedic facial treatments including Mukhalepam, herbal facials, and anti-aging therapies. Perfect for beauty professionals and spa therapists."),
        isActive: true,
        syllabus: [
            { topic: "Facial Anatomy and Skin Types", duration: "4 hours" },
            { topic: "Mukhalepam (Face Pack) Techniques", duration: "5 hours" },
            { topic: "Facial Massage and Marma", duration: "5 hours" },
            { topic: "Anti-Aging Treatments", duration: "4 hours" }
        ]
    },
    {
        title: toLocal("Kati Basti and Janu Basti Specialist"),
        type: "In-Person",
        duration: "2 days (12 hours)",
        price: 280,
        instructor: "Dr. Manoj Virmani",
        schedule: "Saturday to Sunday, 10 AM - 4 PM",
        description: toLocal("Focused training on localized oil pooling therapies for back and knee pain. Learn proper technique, indications, and contraindications for these popular treatments."),
        isActive: true,
        syllabus: [
            { topic: "Theory of Basti Therapies", duration: "3 hours" },
            { topic: "Kati Basti (Lower Back)", duration: "4 hours" },
            { topic: "Janu Basti (Knee)", duration: "4 hours" },
            { topic: "Practice and Troubleshooting", duration: "1 hour" }
        ]
    },
    {
        title: toLocal("Ayurvedic Yoga Therapy Integration"),
        type: "In-Person",
        duration: "1 week (40 hours)",
        price: 520,
        instructor: "Dr. Yogita Manoj & Yoga Instructor",
        schedule: "Monday to Friday, 9 AM - 5 PM",
        description: toLocal("Learn to integrate yoga therapy with Ayurvedic principles. Understand dosha-specific yoga practices, therapeutic applications, and how to design personalized yoga programs."),
        isActive: true,
        syllabus: [
            { topic: "Ayurveda and Yoga Philosophy", duration: "8 hours" },
            { topic: "Dosha-Specific Yoga Practices", duration: "12 hours" },
            { topic: "Therapeutic Yoga for Common Conditions", duration: "12 hours" },
            { topic: "Pranayama and Meditation", duration: "6 hours" },
            { topic: "Program Design", duration: "2 hours" }
        ]
    },
    {
        title: toLocal("Ayurvedic Home Remedies Workshop"),
        type: "In-Person",
        duration: "2 days (12 hours)",
        price: 240,
        instructor: "Dr. Yogita Manoj",
        schedule: "Saturday to Sunday, 10 AM - 4 PM",
        description: toLocal("Practical workshop teaching simple, effective home remedies for common ailments. Learn to prepare herbal teas, decoctions, pastes, and first-aid treatments using kitchen ingredients."),
        isActive: true,
        syllabus: [
            { topic: "Common Ailments and Remedies", duration: "4 hours" },
            { topic: "Herbal Tea and Decoction Preparation", duration: "3 hours" },
            { topic: "Topical Applications", duration: "3 hours" },
            { topic: "First Aid and Emergency Care", duration: "2 hours" }
        ]
    }
];

// Combine all programs
const trainingProgramsData = [...onlineCourses, ...inPersonCourses];

// Seed Function
const seedTrainingPrograms = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing training programs
        const deleteResult = await TrainingProgram.deleteMany({});
        console.log(`Deleted ${deleteResult.deletedCount} existing training programs`);

        // Insert new training programs
        const result = await TrainingProgram.insertMany(trainingProgramsData);
        console.log(`Successfully seeded ${result.length} training programs!`);
        
        // Statistics
        const onlineCount = result.filter(p => p.type === 'Online').length;
        const inPersonCount = result.filter(p => p.type === 'In-Person').length;
        
        console.log('\n=== Training Programs Summary ===');
        console.log(`Total Programs: ${result.length}`);
        console.log(`Online Courses: ${onlineCount}`);
        console.log(`In-Person Courses: ${inPersonCount}`);
        
        console.log('\n=== Online Courses ===');
        result.filter(p => p.type === 'Online').forEach((program, index) => {
            console.log(`${index + 1}. ${program.title.en} - $${program.price} (${program.duration})`);
        });
        
        console.log('\n=== In-Person Courses ===');
        result.filter(p => p.type === 'In-Person').forEach((program, index) => {
            console.log(`${index + 1}. ${program.title.en} - $${program.price} (${program.duration})`);
        });

        process.exit(0);
    } catch (err) {
        console.error('Error seeding training programs:', err);
        process.exit(1);
    }
};

// Run if called directly
if (require.main === module) {
    seedTrainingPrograms();
}

module.exports = { seedTrainingPrograms, trainingProgramsData };
