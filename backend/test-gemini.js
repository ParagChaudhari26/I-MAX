// Test script to check available Gemini models
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY not found in .env file');
    process.exit(1);
  }
  
  console.log('🔑 API Key found:', apiKey.substring(0, 10) + '...');
  console.log('');
  
  const genAI = new GoogleGenerativeAI(apiKey);
  
  // List of models to try
  const modelsToTry = [
    'gemini-pro',
    'gemini-1.5-pro',
    'gemini-1.5-flash',
    'gemini-1.5-pro-latest',
    'gemini-1.5-flash-latest',
    'models/gemini-pro',
    'models/gemini-1.5-pro',
    'models/gemini-1.5-flash'
  ];
  
  console.log('Testing available models...\n');
  
  for (const modelName of modelsToTry) {
    try {
      console.log(`Testing: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent('Say "Hello" in one word');
      const response = await result.response;
      const text = response.text();
      console.log(`✅ ${modelName} - WORKS! Response: ${text.substring(0, 50)}`);
      console.log('');
      break; // Stop after first successful model
    } catch (error) {
      console.log(`❌ ${modelName} - Failed: ${error.message}`);
    }
  }
  
  console.log('\n📋 Recommendation:');
  console.log('Use the first model that worked in your chatbotController.js');
}

testGemini().catch(console.error);
