// Test chatbot response formatting
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const AIContext = require('./models/AIContext');
const mongoose = require('mongoose');

async function testChatbot() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const apiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    });

    // Load context
    const activeContexts = await AIContext.find({ isActive: true });
    let combinedContextText = activeContexts.map(c => `[${c.title}]: ${c.content}`).join('\n');

    console.log('📚 Loaded context entries:', activeContexts.length);
    console.log('');

    // Test questions
    const testQuestions = [
      'How do I book an appointment?',
      'What services do you offer?',
      'Tell me about Ayurveda'
    ];

    for (const question of testQuestions) {
      console.log('━'.repeat(60));
      console.log(`❓ Question: ${question}`);
      console.log('━'.repeat(60));

      const systemPrompt = `You are a friendly AI assistant for Bhagirathi Ayurveda (I-MAX).

Here is the dynamic context provided by the admin to answer user questions:
${combinedContextText}

IMPORTANT INSTRUCTIONS:
- Always greet the user warmly and professionally
- Use proper formatting with line breaks between paragraphs
- Keep responses concise but informative (2-4 sentences)
- If the context contains the answer, use it
- If not, provide general Ayurvedic knowledge or suggest booking a consultation
- Be helpful, polite, and encouraging
- Refuse to write code or answer unrelated questions
- Format your response with proper spacing for readability

User Question: ${question}`;

      const result = await model.generateContent(systemPrompt);
      const response = result.response.text();

      console.log('🤖 Response:\n');
      console.log(response);
      console.log('\n');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testChatbot();
