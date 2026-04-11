const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Blog = require('../models/Blog');

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bhagarathi-ayurveda';

// Helper for localized strings
const toLocal = (text) => ({ en: text || '', hi: '', mr: '' });

// Comprehensive Blogs Data
const blogsData = [
    { 
        title: toLocal('Panchakarma – Treasure of Ayurveda'), 
        publishDate: new Date('2023-01-16'),
        excerpt: toLocal('Discover the ancient healing practice of Panchakarma and its benefits for modern wellness. Learn how this comprehensive detoxification therapy can transform your health.'),
        featuredImage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop&q=80",
        content: toLocal(`<div class="space-y-6">
            <h2 class="text-2xl font-bold text-emerald-800">Panchakarma: What Is It?</h2>
            <p>Panchakarma is one of the most powerful healing modalities in Ayurvedic medicine. The word "Panchakarma" literally means "five actions" and refers to five cleansing treatments that eliminate toxins from the body and restore balance to the doshas.</p>
            
            <h3 class="text-xl font-semibold text-emerald-700">The Five Therapies</h3>
            <p>An Ayurvedic cleanse called Panchakarma can assist in deep detoxification. Panchakarma combines unique herbal medicines, specialized diet, lifestyle changes, and therapeutic treatments to aid in the body's natural detoxification processes.</p>
            
            <ul class="list-disc pl-6 space-y-2">
                <li><strong>Vamana (Therapeutic Emesis):</strong> Eliminates excess Kapha dosha</li>
                <li><strong>Virechana (Purgation):</strong> Removes excess Pitta dosha</li>
                <li><strong>Basti (Medicated Enema):</strong> Balances Vata dosha</li>
                <li><strong>Nasya (Nasal Administration):</strong> Clears the head and sinuses</li>
                <li><strong>Raktamokshana (Bloodletting):</strong> Purifies the blood</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-emerald-700">Benefits of Panchakarma</h3>
            <p>Regular Panchakarma therapy can help eliminate accumulated toxins, strengthen digestion, boost immunity, reduce stress, improve mental clarity, and promote overall vitality and longevity.</p>
            
            <p>At Bhagirathi Ayurveda Centre, we offer authentic Panchakarma treatments under the guidance of experienced Ayurvedic physicians, ensuring a safe and transformative healing experience.</p>
        </div>`), 
        author: "Dr. Yogita Manoj", 
        category: "Wellness", 
        tags: ["Panchakarma", "Detox", "Ayurveda", "Healing"],
        isPublished: true, 
        slug: 'panchakarma-treasure-of-ayurveda',
        readTime: 5
    },
    { 
        title: toLocal('Secrets of Ayurveda Skin Care'), 
        publishDate: new Date('2023-01-20'),
        excerpt: toLocal('Learn about natural Ayurvedic approaches to achieve radiant and healthy skin. Discover time-tested remedies for glowing complexion.'),
        featuredImage: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=600&fit=crop&q=80",
        content: toLocal(`<div class="space-y-6">
            <h2 class="text-2xl font-bold text-emerald-800">Ayurvedic Approach to Skin Care</h2>
            <p>In Ayurveda, beautiful skin is a reflection of overall health and balance. Rather than treating skin issues superficially, Ayurveda addresses the root causes by balancing the doshas and eliminating toxins.</p>
            
            <h3 class="text-xl font-semibold text-emerald-700">Understanding Your Skin Type</h3>
            <p>According to Ayurveda, skin types correspond to the three doshas:</p>
            <ul class="list-disc pl-6 space-y-2">
                <li><strong>Vata Skin:</strong> Dry, thin, delicate, prone to premature aging</li>
                <li><strong>Pitta Skin:</strong> Sensitive, prone to inflammation, redness, and acne</li>
                <li><strong>Kapha Skin:</strong> Oily, thick, prone to enlarged pores and blackheads</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-emerald-700">Natural Ayurvedic Remedies</h3>
            <p>Ayurvedic tools including face oils, herbal packs, natural washes, and Udvaratana (herbal powder massage) gently hydrate skin, clear pores, improve skin ventilation, and promote a natural glow.</p>
            
            <p>Popular ingredients include turmeric for brightening, neem for purification, sandalwood for cooling, and rose for rejuvenation. These natural remedies work in harmony with your body's innate healing abilities.</p>
            
            <h3 class="text-xl font-semibold text-emerald-700">Daily Skin Care Rituals</h3>
            <p>Establish a daily routine (Dinacharya) that includes gentle cleansing, facial massage with appropriate oils, and the use of natural face packs. Remember, consistency is key to achieving lasting results.</p>
        </div>`), 
        author: "Dr. Yogita Manoj", 
        category: "Beauty", 
        tags: ["Skincare", "Beauty", "Natural Remedies", "Ayurveda"],
        isPublished: true, 
        slug: 'secrets-of-ayurveda-skin-care',
        readTime: 4
    },
    { 
        title: toLocal('PCOS (Polycystic Ovarian Syndrome) - Ayurvedic Perspective'), 
        publishDate: new Date('2023-02-05'),
        excerpt: toLocal('Understanding PCOS through the lens of Ayurveda and natural management techniques. Discover holistic approaches to hormonal balance.'),
        featuredImage: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&h=600&fit=crop&q=80",
        content: toLocal(`<div class="space-y-6">
            <h2 class="text-2xl font-bold text-emerald-800">Understanding PCOS in Ayurveda</h2>
            <p>Polycystic Ovarian Syndrome (PCOS) is a relatively common hormonal condition in women and is one of the main factors affecting female fertility. In Ayurveda, PCOS is understood as an imbalance of Kapha and Vata doshas, along with impaired metabolism (Agni).</p>
            
            <h3 class="text-xl font-semibold text-emerald-700">Common Symptoms</h3>
            <ul class="list-disc pl-6 space-y-2">
                <li>Irregular or absent menstrual periods</li>
                <li>Excessive hair growth (hirsutism)</li>
                <li>Acne and oily skin</li>
                <li>Weight gain and difficulty losing weight</li>
                <li>Thinning hair on the scalp</li>
                <li>Difficulty conceiving</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-emerald-700">Ayurvedic Management</h3>
            <p>Ayurveda offers a comprehensive approach to managing PCOS through:</p>
            
            <h4 class="text-lg font-semibold text-emerald-600">1. Dietary Modifications</h4>
            <p>Focus on whole grains, fresh vegetables, lean proteins, and healthy fats. Avoid processed foods, excessive sugar, and heavy, oily foods that aggravate Kapha dosha.</p>
            
            <h4 class="text-lg font-semibold text-emerald-600">2. Herbal Support</h4>
            <p>Herbs like Shatavari, Ashwagandha, Guduchi, and Triphala help balance hormones, improve metabolism, and support reproductive health.</p>
            
            <h4 class="text-lg font-semibold text-emerald-600">3. Lifestyle Changes</h4>
            <p>Regular exercise, stress management through yoga and meditation, and maintaining a consistent daily routine are crucial for managing PCOS.</p>
            
            <h4 class="text-lg font-semibold text-emerald-600">4. Panchakarma Therapy</h4>
            <p>Detoxification treatments like Virechana and Basti can help eliminate toxins and restore hormonal balance.</p>
            
            <p>At Bhagirathi Ayurveda Centre, we provide personalized treatment plans for PCOS management, combining traditional wisdom with modern understanding to help women achieve hormonal balance and optimal health.</p>
        </div>`), 
        author: "Dr. Manoj Virmani", 
        category: "Women's Health", 
        tags: ["PCOS", "Women's Health", "Hormonal Balance", "Fertility"],
        isPublished: true, 
        slug: 'pcos-polycystic-ovarian-syndrome',
        readTime: 6
    },
    { 
        title: toLocal('The Power of Abhyanga: Daily Self-Massage'), 
        publishDate: new Date('2023-02-15'),
        excerpt: toLocal('Explore the transformative practice of Abhyanga, the Ayurvedic self-massage ritual that promotes health, vitality, and longevity.'),
        featuredImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop&q=80",
        content: toLocal(`<div class="space-y-6">
            <h2 class="text-2xl font-bold text-emerald-800">What is Abhyanga?</h2>
            <p>Abhyanga is the ancient Ayurvedic practice of self-massage with warm oil. This daily ritual is considered one of the most important practices for maintaining health and preventing disease in Ayurveda.</p>
            
            <h3 class="text-xl font-semibold text-emerald-700">Benefits of Daily Abhyanga</h3>
            <ul class="list-disc pl-6 space-y-2">
                <li>Nourishes the entire body and promotes longevity</li>
                <li>Improves circulation and lymphatic drainage</li>
                <li>Calms the nervous system and reduces stress</li>
                <li>Improves sleep quality</li>
                <li>Softens and moisturizes the skin</li>
                <li>Increases flexibility and joint health</li>
                <li>Strengthens the body's natural immunity</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-emerald-700">Choosing the Right Oil</h3>
            <p>Select oil based on your dosha and the season:</p>
            <ul class="list-disc pl-6 space-y-2">
                <li><strong>Vata:</strong> Sesame oil (warming and grounding)</li>
                <li><strong>Pitta:</strong> Coconut or sunflower oil (cooling)</li>
                <li><strong>Kapha:</strong> Mustard or corn oil (stimulating)</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-emerald-700">How to Practice Abhyanga</h3>
            <p>Warm the oil slightly and apply it generously to your entire body. Use long strokes on the limbs and circular motions on the joints. Massage for 10-20 minutes before bathing. Practice daily or at least 3-4 times per week for best results.</p>
        </div>`), 
        author: "Dr. Yogita Manoj", 
        category: "Wellness", 
        tags: ["Abhyanga", "Self-care", "Massage", "Daily Routine"],
        isPublished: true, 
        slug: 'power-of-abhyanga-daily-self-massage',
        readTime: 4
    },
    { 
        title: toLocal('Ayurvedic Diet: Eating According to Your Dosha'), 
        publishDate: new Date('2023-03-01'),
        excerpt: toLocal('Learn how to eat according to your unique constitution for optimal health and digestion. Discover the principles of Ayurvedic nutrition.'),
        featuredImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop&q=80",
        content: toLocal(`<div class="space-y-6">
            <h2 class="text-2xl font-bold text-emerald-800">Food as Medicine</h2>
            <p>In Ayurveda, food is considered medicine. The right diet can prevent disease, promote healing, and maintain balance, while the wrong diet can create imbalance and lead to illness.</p>
            
            <h3 class="text-xl font-semibold text-emerald-700">The Six Tastes</h3>
            <p>Ayurveda recognizes six tastes (rasas), each with specific effects on the doshas:</p>
            <ul class="list-disc pl-6 space-y-2">
                <li><strong>Sweet:</strong> Nourishing, grounding (increases Kapha)</li>
                <li><strong>Sour:</strong> Stimulating, warming (increases Pitta)</li>
                <li><strong>Salty:</strong> Hydrating, grounding (increases Kapha and Pitta)</li>
                <li><strong>Pungent:</strong> Heating, stimulating (increases Pitta and Vata)</li>
                <li><strong>Bitter:</strong> Cooling, detoxifying (increases Vata)</li>
                <li><strong>Astringent:</strong> Drying, cooling (increases Vata)</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-emerald-700">Eating for Your Dosha</h3>
            
            <h4 class="text-lg font-semibold text-emerald-600">Vata Diet</h4>
            <p>Favor warm, moist, grounding foods. Include cooked grains, root vegetables, nuts, and warming spices. Avoid cold, dry, and raw foods.</p>
            
            <h4 class="text-lg font-semibold text-emerald-600">Pitta Diet</h4>
            <p>Choose cooling, refreshing foods. Include sweet fruits, leafy greens, and cooling herbs. Avoid spicy, sour, and fried foods.</p>
            
            <h4 class="text-lg font-semibold text-emerald-600">Kapha Diet</h4>
            <p>Opt for light, warm, and stimulating foods. Include plenty of vegetables, legumes, and pungent spices. Limit heavy, oily, and sweet foods.</p>
            
            <h3 class="text-xl font-semibold text-emerald-700">Mindful Eating Practices</h3>
            <p>Eat in a calm environment, chew thoroughly, avoid overeating, and make lunch your largest meal when digestive fire (Agni) is strongest.</p>
        </div>`), 
        author: "Dr. Manoj Virmani", 
        category: "Nutrition", 
        tags: ["Diet", "Nutrition", "Dosha", "Healthy Eating"],
        isPublished: true, 
        slug: 'ayurvedic-diet-eating-according-to-dosha',
        readTime: 5
    },
    { 
        title: toLocal('Stress Management Through Ayurveda'), 
        publishDate: new Date('2023-03-15'),
        excerpt: toLocal('Discover ancient Ayurvedic techniques for managing stress and cultivating inner peace in modern life.'),
        featuredImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop&q=80",
        content: toLocal(`<div class="space-y-6">
            <h2 class="text-2xl font-bold text-emerald-800">Understanding Stress in Ayurveda</h2>
            <p>In Ayurveda, chronic stress is seen as a major cause of Vata imbalance, which can lead to anxiety, insomnia, digestive issues, and weakened immunity. Managing stress is essential for maintaining health and well-being.</p>
            
            <h3 class="text-xl font-semibold text-emerald-700">Ayurvedic Stress Management Techniques</h3>
            
            <h4 class="text-lg font-semibold text-emerald-600">1. Dinacharya (Daily Routine)</h4>
            <p>Establishing a consistent daily routine helps ground Vata and creates stability. Wake and sleep at regular times, eat meals at consistent hours, and include time for self-care practices.</p>
            
            <h4 class="text-lg font-semibold text-emerald-600">2. Pranayama (Breathing Exercises)</h4>
            <p>Controlled breathing techniques calm the nervous system and reduce stress. Practice Nadi Shodhana (alternate nostril breathing) or Bhramari (bee breath) for immediate relief.</p>
            
            <h4 class="text-lg font-semibold text-emerald-600">3. Meditation</h4>
            <p>Regular meditation practice helps quiet the mind, reduce anxiety, and cultivate inner peace. Even 10-15 minutes daily can make a significant difference.</p>
            
            <h4 class="text-lg font-semibold text-emerald-600">4. Herbal Support</h4>
            <p>Adaptogenic herbs like Ashwagandha, Brahmi, and Jatamansi help the body adapt to stress and support nervous system health.</p>
            
            <h4 class="text-lg font-semibold text-emerald-600">5. Abhyanga (Self-Massage)</h4>
            <p>Daily oil massage with warm sesame oil calms Vata, nourishes the nervous system, and promotes relaxation.</p>
            
            <h3 class="text-xl font-semibold text-emerald-700">Lifestyle Recommendations</h3>
            <p>Reduce stimulants like caffeine, limit screen time before bed, spend time in nature, and cultivate supportive relationships. Remember, managing stress is not a luxury—it's essential for health.</p>
        </div>`), 
        author: "Dr. Yogita Manoj", 
        category: "Mental Health", 
        tags: ["Stress Management", "Mental Health", "Meditation", "Wellness"],
        isPublished: true, 
        slug: 'stress-management-through-ayurveda',
        readTime: 5
    }
];

// Seed Function
const seedBlogs = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing blogs
        const deleteResult = await Blog.deleteMany({});
        console.log(`Deleted ${deleteResult.deletedCount} existing blogs`);

        // Insert new blogs
        const result = await Blog.insertMany(blogsData);
        console.log(`Successfully seeded ${result.length} blogs!`);
        
        console.log('\nSeeded blogs:');
        result.forEach((blog, index) => {
            console.log(`${index + 1}. ${blog.title.en} (${blog.slug})`);
        });

        process.exit(0);
    } catch (err) {
        console.error('Error seeding blogs:', err);
        process.exit(1);
    }
};

// Run if called directly
if (require.main === module) {
    seedBlogs();
}

module.exports = { seedBlogs, blogsData };
