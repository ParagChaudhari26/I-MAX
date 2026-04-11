const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Testimonial = require('../models/Testimonial');

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bhagarathi-ayurveda';

// Helper for localized strings
const toLocal = (text) => ({ en: text || '', hi: '', mr: '' });

// Comprehensive Testimonials Data - 29 testimonials
const testimonialsData = [
    {
        customerName: "Angela Kopic",
        customerLocation: "Dublin, Ireland",
        treatment: toLocal("Ayurveda Training"),
        testimonialText: toLocal("Studying Ayurveda with Dr. Yogita and Dr. Manoj was a deeply enriching experience. I learned how to understand health holistically and bring balance to life through Ayurveda. The body-mind-spirit connection is now clearer to me, and I'm growing on a deeper level. The course gave me a strong foundation and practical skills. Their passion for teaching was evident in every session. Pune is a vibrant city with beautiful temples, markets, and the serene Parvati Hill close to the Bhagirathi Centre."),
        rating: 5,
        isApproved: true,
        dateReceived: new Date('2023-01-15')
    },
    {
        customerName: "Cecilia Frigerio",
        customerLocation: "Barcelona, Spain",
        treatment: toLocal("Ayurveda Training"),
        testimonialText: toLocal("As a holistic therapist, I felt called to study Ayurveda, and a friend recommended Bhagirathi. I'm so glad I came! Dr. Yogita and Dr. Manoj are amazing teachers who were always supportive and responsive to my needs. I received a personalized program that included massage techniques and panchakarma treatments. Theory and practice were well balanced. There's even accommodation for students at the centre. I'm so grateful for this experience."),
        rating: 5,
        isApproved: true,
        dateReceived: new Date('2023-01-20')
    },
    {
        customerName: "Yuri Takeuchi",
        customerLocation: "Tokyo, Japan",
        treatment: toLocal("Ayurveda Training"),
        testimonialText: toLocal("I studied at Bhagirathi Ayurveda Centre in Pune with Dr. Yogita and Dr. Manoj, who are both very kind and calm. The training I received allowed me to open my own Ayurveda shop after returning to Japan. Pune is a wonderful city where tradition meets modern life. I look forward to learning more in the future at the same institute."),
        rating: 5,
        isApproved: true,
        dateReceived: new Date('2023-02-05')
    },
    {
        customerName: "Cecilia Pancali",
        customerLocation: "Rome, Italy",
        treatment: toLocal("Ayurveda Training"),
        testimonialText: toLocal("I learned Ayurvedic massage in the most beautiful way—with professionalism, love, and smiles. Thanks to Bhagirathi School, I now share the same love through my work. I discovered the true essence of Ayurveda from authentic Indian doctors, and it transformed my life. See you next year!"),
        rating: 5,
        isApproved: true,
        dateReceived: new Date('2023-02-10')
    },
    {
        customerName: "Ettore Messinas",
        customerLocation: "Milan, Italy",
        treatment: toLocal("Ayurveda Training"),
        testimonialText: toLocal("After years of exploring Ayurveda across India, I finally found Bhagirathi—truly a family school. The teachers are excellent, from top Ayurvedic universities. Pune is perfect, both for tourism and spiritual exploration, being the city of Iyengar and Osho. The combination was ideal, and I've even started collaborating with them on yoga and Ayurveda. Many years of beautiful work ahead. Namaskar."),
        rating: 5,
        isApproved: true,
        dateReceived: new Date('2023-02-15')
    },
    {
        customerName: "Maria Peluzzi",
        customerLocation: "Florence, Italy",
        treatment: toLocal("Ayurveda Training"),
        testimonialText: toLocal("I've done three courses in three years at Bhagirathi Ayurveda Centre because I love their teaching style. Dr. Yogita and Dr. Manoj are incredibly professional and passionate about Ayurveda. The practical sessions were extremely satisfying. Pune keeps evolving, and I enjoy the food and friendly people every time I visit."),
        rating: 5,
        isApproved: true,
        dateReceived: new Date('2023-02-20')
    },
    {
        customerName: "Sophie Laurent",
        customerLocation: "Paris, France",
        treatment: toLocal("Panchakarma Treatment"),
        testimonialText: toLocal("My Panchakarma experience at Bhagirathi was transformative. I came feeling exhausted and left feeling rejuvenated. The doctors carefully assessed my dosha and created a personalized treatment plan. The therapists were skilled and caring. I felt the toxins leaving my body and my energy returning. This is authentic Ayurveda at its finest."),
        rating: 5,
        isApproved: true,
        dateReceived: new Date('2023-03-01')
    },
    {
        customerName: "Michael Schmidt",
        customerLocation: "Berlin, Germany",
        treatment: toLocal("Stress Management Program"),
        testimonialText: toLocal("As a corporate executive, stress was taking a toll on my health. The stress management program at Bhagirathi taught me practical techniques I use daily. The combination of meditation, pranayama, and herbal support has been life-changing. Dr. Manoj's guidance was invaluable. I'm sleeping better and feeling more balanced."),
        rating: 5,
        isApproved: true,
        dateReceived: new Date('2023-03-10')
    },
    {
        customerName: "Emma Thompson",
        customerLocation: "London, UK",
        treatment: toLocal("Ayurvedic Skin Care Treatment"),
        testimonialText: toLocal("I struggled with acne for years and tried everything. The Ayurvedic approach at Bhagirathi addressed the root cause, not just symptoms. Dr. Yogita's herbal treatments and dietary recommendations worked wonders. My skin is clearer than it's been in a decade. I'm so grateful for their holistic approach."),
        rating: 5,
        isApproved: true,
        dateReceived: new Date('2023-03-15')
    },
    {
        customerName: "Carlos Rodriguez",
        customerLocation: "Madrid, Spain",
        treatment: toLocal("Ayurveda Massage Training"),
        testimonialText: toLocal("The massage training program exceeded my expectations. The hands-on practice, combined with theoretical knowledge, gave me confidence to practice professionally. The teachers demonstrated each technique with patience and precision. I now offer Ayurvedic massage in my wellness center in Madrid."),
        rating: 5,
        isApproved: true,
        dateReceived: new Date('2023-03-25')
    },
    {
        customerName: "Lisa Anderson",
        customerLocation: "Sydney, Australia",
        treatment: toLocal("PCOS Management Program"),
        testimonialText: toLocal("After being diagnosed with PCOS, I felt hopeless about conceiving. The Ayurvedic treatment at Bhagirathi gave me hope and results. Through diet, herbs, and lifestyle changes, my cycles became regular. Six months later, I'm pregnant! Dr. Yogita's compassionate care made all the difference."),
        rating: 5,
        isApproved: true,
        dateReceived: new Date('2023-04-05')
    },
    {
        customerName: "Hans Mueller",
        customerLocation: "Zurich, Switzerland",
        treatment: toLocal("Digestive Health Treatment"),
        testimonialText: toLocal("Years of digestive issues were resolved through Ayurvedic treatment. The doctors identified my weak Agni and prescribed specific herbs and dietary changes. The improvement was gradual but lasting. I no longer suffer from bloating and discomfort. Ayurveda truly works when practiced authentically."),
        rating: 5,
        isApproved: true,
        dateReceived: new Date('2023-04-15')
    },
    {
        customerName: "Priya Sharma",
        customerLocation: "Mumbai, India",
        treatment: toLocal("Postpartum Care"),
        testimonialText: toLocal("The postpartum care I received at Bhagirathi was exceptional. The Abhyanga massages, herbal baths, and nutritious diet helped me recover quickly after childbirth. Dr. Yogita's guidance on breastfeeding and baby care was invaluable. I felt supported and nurtured during this important time."),
        rating: 5,
        isApproved: true,
        dateReceived: new Date('2023-04-25')
    },
    {
        customerName: "David Chen",
        customerLocation: "Singapore",
        treatment: toLocal("Joint Pain Treatment"),
        testimonialText: toLocal("My knee pain was limiting my mobility and quality of life. The Ayurvedic treatment, including Janu Basti and herbal medicines, provided significant relief. The doctors explained how Vata imbalance was causing my pain. After three weeks of treatment, I can walk without pain. Highly recommended!"),
        rating: 5,
        isApproved: true,
        dateReceived: new Date('2023-05-05')
    },
    {
        customerName: "Isabella Rossi",
        customerLocation: "Venice, Italy",
        treatment: toLocal("Weight Management Program"),
        testimonialText: toLocal("I tried countless diets without lasting results. The Ayurvedic approach at Bhagirathi was different—it focused on balancing my Kapha dosha, not just calorie restriction. The personalized diet plan, herbs, and lifestyle recommendations helped me lose 15 kg sustainably. I feel healthier and more energetic."),
        rating: 5,
        isApproved: true,
        dateReceived: new Date('2023-05-15')
    },
    {
        customerName: "Robert Williams",
        customerLocation: "New York, USA",
        treatment: toLocal("Insomnia Treatment"),
        testimonialText: toLocal("Chronic insomnia was affecting every aspect of my life. The Ayurvedic treatment at Bhagirathi, including Shirodhara and herbal medicines, restored my sleep. Dr. Manoj's understanding of the mind-body connection was impressive. I now sleep naturally without medication. Life-changing experience!"),
        rating: 5,
        isApproved: true,
        dateReceived: new Date('2023-05-25')
    },
    {
        customerName: "Anna Kowalski",
        customerLocation: "Warsaw, Poland",
        treatment: toLocal("Ayurveda Basics Course"),
        testimonialText: toLocal("The Basics of Ayurveda course was perfectly structured for beginners. Dr. Yogita and Dr. Manoj made complex concepts easy to understand. The course materials were comprehensive, and the practical demonstrations were helpful. I now understand my constitution and how to maintain balance. Excellent foundation course!"),
        rating: 5,
        isApproved: true,
        dateReceived: new Date('2023-06-05')
    },
    {
        customerName: "Thomas Dubois",
        customerLocation: "Brussels, Belgium",
        treatment: toLocal("Detoxification Program"),
        testimonialText: toLocal("The detox program was exactly what I needed after years of unhealthy lifestyle. The gentle cleansing process, combined with nourishing diet and therapies, left me feeling renewed. The doctors monitored my progress carefully. I lost weight, gained energy, and my skin glows. Worth every penny!"),
        rating: 5,
        isApproved: true,
        dateReceived: new Date('2023-06-15')
    },
    {
        customerName: "Sarah Johnson",
        customerLocation: "Toronto, Canada",
        treatment: toLocal("Anxiety Management"),
        testimonialText: toLocal("Living with anxiety was exhausting. The holistic approach at Bhagirathi addressed my mental and physical symptoms. The combination of meditation, pranayama, herbal support, and counseling helped me manage anxiety naturally. Dr. Yogita's compassionate approach made me feel safe and understood."),
        rating: 5,
        isApproved: true,
        dateReceived: new Date('2023-06-25')
    },
    {
        customerName: "Marco Silva",
        customerLocation: "Lisbon, Portugal",
        treatment: toLocal("Back Pain Treatment"),
        testimonialText: toLocal("Years of back pain from desk work were resolved through Ayurvedic treatment. The Kati Basti therapy, along with specific yoga exercises and herbal oils, provided lasting relief. The doctors taught me proper posture and self-care techniques. I'm now pain-free and more aware of my body."),
        rating: 5,
        isApproved: true,
        dateReceived: new Date('2023-07-05')
    },
    {
        customerName: "Nina Petersen",
        customerLocation: "Copenhagen, Denmark",
        treatment: toLocal("Fertility Enhancement Program"),
        testimonialText: toLocal("After struggling to conceive for three years, we tried Ayurveda as a last hope. The fertility program addressed both my husband and me. Through herbs, diet, and lifestyle changes, we conceived naturally within six months. Dr. Manoj's expertise and encouragement kept us motivated. Forever grateful!"),
        rating: 5,
        isApproved: true,
        dateReceived: new Date('2023-07-15')
    },
    {
        customerName: "Ahmed Hassan",
        customerLocation: "Dubai, UAE",
        treatment: toLocal("Diabetes Management"),
        testimonialText: toLocal("Managing diabetes through Ayurveda has been a revelation. The herbal medicines, dietary guidelines, and lifestyle modifications helped me reduce my medication dosage. My blood sugar levels are more stable, and I feel healthier overall. The doctors' knowledge of both Ayurveda and modern medicine was reassuring."),
        rating: 5,
        isApproved: true,
        dateReceived: new Date('2023-07-25')
    },
    {
        customerName: "Olivia Martin",
        customerLocation: "Melbourne, Australia",
        treatment: toLocal("Hair Loss Treatment"),
        testimonialText: toLocal("Losing my hair was devastating for my confidence. The Ayurvedic treatment, including scalp massages with herbal oils and internal medicines, stopped the hair loss and promoted regrowth. Dr. Yogita explained how stress and hormones were affecting my hair. My hair is thicker and healthier now."),
        rating: 5,
        isApproved: true,
        dateReceived: new Date('2023-08-05')
    },
    {
        customerName: "Lars Eriksson",
        customerLocation: "Stockholm, Sweden",
        treatment: toLocal("Respiratory Health Program"),
        testimonialText: toLocal("Chronic bronchitis made winters difficult for me. The Ayurvedic treatment strengthened my respiratory system. The steam inhalations, herbal medicines, and breathing exercises made a huge difference. This winter, I had no episodes. The preventive approach of Ayurveda is remarkable."),
        rating: 5,
        isApproved: true,
        dateReceived: new Date('2023-08-15')
    },
    {
        customerName: "Jennifer Lee",
        customerLocation: "Los Angeles, USA",
        treatment: toLocal("Anti-Aging Treatment"),
        testimonialText: toLocal("The anti-aging program at Bhagirathi is holistic and effective. The facial treatments, herbal supplements, and dietary recommendations improved my skin texture and reduced fine lines. But more importantly, I feel younger and more vibrant. True beauty comes from within, and Ayurveda understands this."),
        rating: 5,
        isApproved: true,
        dateReceived: new Date('2023-08-25')
    },
    {
        customerName: "Pierre Fontaine",
        customerLocation: "Lyon, France",
        treatment: toLocal("Migraine Treatment"),
        testimonialText: toLocal("Migraines controlled my life for years. The Ayurvedic approach identified triggers and imbalances I never knew existed. The Nasya therapy, herbal medicines, and dietary changes reduced the frequency and intensity of my migraines. Dr. Manoj's thorough assessment was key to my recovery."),
        rating: 5,
        isApproved: true,
        dateReceived: new Date('2023-09-05')
    },
    {
        customerName: "Katarina Novak",
        customerLocation: "Prague, Czech Republic",
        treatment: toLocal("Menopause Management"),
        testimonialText: toLocal("Navigating menopause was challenging until I found Bhagirathi. The Ayurvedic treatment eased my hot flashes, mood swings, and sleep issues naturally. Dr. Yogita's understanding of women's health and hormonal changes was exceptional. I'm going through this transition with grace and comfort."),
        rating: 5,
        isApproved: true,
        dateReceived: new Date('2023-09-15')
    },
    {
        customerName: "James O'Connor",
        customerLocation: "Dublin, Ireland",
        treatment: toLocal("Hypertension Management"),
        testimonialText: toLocal("High blood pressure runs in my family, and I wanted a natural approach. The Ayurvedic treatment, including meditation, herbs, and dietary changes, helped me lower my blood pressure significantly. The doctors worked with my cardiologist to ensure safe, integrated care. I feel more in control of my health."),
        rating: 5,
        isApproved: true,
        dateReceived: new Date('2023-09-25')
    },
    {
        customerName: "Gabriela Santos",
        customerLocation: "São Paulo, Brazil",
        treatment: toLocal("Comprehensive Wellness Program"),
        testimonialText: toLocal("I came to Bhagirathi feeling burnt out and disconnected from myself. The comprehensive wellness program was exactly what I needed. The combination of treatments, yoga, meditation, and counseling helped me reconnect with my body and mind. Dr. Yogita and Dr. Manoj are true healers. I left transformed and inspired to live more consciously."),
        rating: 5,
        isApproved: true,
        dateReceived: new Date('2023-10-05')
    }
];

// Seed Function
const seedTestimonials = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing testimonials
        const deleteResult = await Testimonial.deleteMany({});
        console.log(`Deleted ${deleteResult.deletedCount} existing testimonials`);

        // Insert new testimonials
        const result = await Testimonial.insertMany(testimonialsData);
        console.log(`Successfully seeded ${result.length} testimonials!`);
        
        console.log('\nSeeded testimonials by location:');
        const locationCounts = {};
        result.forEach(testimonial => {
            const location = testimonial.customerLocation || 'Unknown';
            locationCounts[location] = (locationCounts[location] || 0) + 1;
        });
        
        Object.entries(locationCounts).sort((a, b) => b[1] - a[1]).forEach(([location, count]) => {
            console.log(`  ${location}: ${count}`);
        });

        process.exit(0);
    } catch (err) {
        console.error('Error seeding testimonials:', err);
        process.exit(1);
    }
};

// Run if called directly
if (require.main === module) {
    seedTestimonials();
}

module.exports = { seedTestimonials, testimonialsData };
