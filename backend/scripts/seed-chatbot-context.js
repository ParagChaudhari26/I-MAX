// Seed script for chatbot context
require('dotenv').config();
const mongoose = require('mongoose');
const AIContext = require('../models/AIContext');

const contextData = [
  {
    title: 'About Bhagirathi Ayurveda',
    content: `Bhagirathi Ayurveda (I-MAX) is a premier Ayurvedic treatment center dedicated to providing authentic and holistic healing solutions. We combine traditional Ayurvedic wisdom with modern healthcare practices to offer comprehensive wellness services.`,
    isActive: true,
    category: 'general'
  },
  {
    title: 'Booking Appointments',
    content: `To book an appointment with Bhagirathi Ayurveda, please visit our website or call us directly. Our team will be happy to assist you in scheduling a suitable time for your consultation. We offer both in-person and online consultation options.`,
    isActive: true,
    category: 'appointments'
  },
  {
    title: 'Services Offered',
    content: `We offer a wide range of Ayurvedic treatments including Panchakarma therapies, herbal medicine consultations, lifestyle counseling, dietary guidance, yoga therapy, and specialized treatments for chronic conditions. Our experienced practitioners create personalized treatment plans for each patient.`,
    isActive: true,
    category: 'services'
  },
  {
    title: 'Contact Information',
    content: `You can reach us through our website contact form, by phone, or by email. Our staff is available during business hours to answer your questions and help you schedule appointments. We strive to respond to all inquiries within 24 hours.`,
    isActive: true,
    category: 'contact'
  },
  {
    title: 'Training Programs',
    content: `Bhagirathi Ayurveda offers professional training programs in Ayurvedic medicine, Panchakarma therapy, and wellness counseling. Our courses are designed for both beginners and experienced practitioners looking to deepen their knowledge of Ayurveda.`,
    isActive: true,
    category: 'training'
  },
  {
    title: 'Consultation Process',
    content: `Our consultation process begins with a detailed assessment of your health history, current concerns, and lifestyle. The practitioner will perform traditional Ayurvedic diagnostic methods including pulse diagnosis (Nadi Pariksha) and physical examination. Based on this assessment, a personalized treatment plan will be created for you.`,
    isActive: true,
    category: 'consultation'
  }
];

async function seedChatbotContext() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing context
    const deleteResult = await AIContext.deleteMany({});
    console.log(`🗑️  Deleted ${deleteResult.deletedCount} existing context entries`);

    // Insert new context
    const result = await AIContext.insertMany(contextData);
    console.log(`✅ Successfully seeded ${result.length} chatbot context entries`);

    console.log('\n📋 Context entries created:');
    result.forEach(ctx => {
      console.log(`   - ${ctx.title} (${ctx.category})`);
    });

    console.log('\n✨ Chatbot is now ready with context information!');
    console.log('Test it by asking questions like:');
    console.log('   - "How do I book an appointment?"');
    console.log('   - "What services do you offer?"');
    console.log('   - "Tell me about your training programs"');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding chatbot context:', error);
    process.exit(1);
  }
}

seedChatbotContext();
