// List available Gemini models for your API key
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY not found in .env file');
    process.exit(1);
  }
  
  console.log('🔑 API Key:', apiKey.substring(0, 15) + '...');
  console.log('');
  console.log('Fetching available models...\n');
  
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Try to list models using the REST API directly
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );
    
    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Error fetching models:', response.status, response.statusText);
      console.error('Response:', error);
      
      if (response.status === 403) {
        console.log('\n⚠️  API Key might be invalid or restricted.');
        console.log('Please check:');
        console.log('1. Go to https://aistudio.google.com/app/apikey');
        console.log('2. Create a new API key or verify the existing one');
        console.log('3. Make sure the API key has access to Gemini models');
        console.log('4. Update GEMINI_API_KEY in backend/.env');
      }
      return;
    }
    
    const data = await response.json();
    
    if (data.models && data.models.length > 0) {
      console.log('✅ Available models:\n');
      data.models.forEach(model => {
        console.log(`📦 ${model.name}`);
        console.log(`   Display Name: ${model.displayName}`);
        console.log(`   Description: ${model.description || 'N/A'}`);
        console.log(`   Supported Methods: ${model.supportedGenerationMethods?.join(', ') || 'N/A'}`);
        console.log('');
      });
      
      // Find models that support generateContent
      const contentModels = data.models.filter(m => 
        m.supportedGenerationMethods?.includes('generateContent')
      );
      
      if (contentModels.length > 0) {
        console.log('\n✨ Recommended models for chatbot (support generateContent):\n');
        contentModels.forEach(model => {
          // Extract just the model name without "models/" prefix
          const modelName = model.name.replace('models/', '');
          console.log(`   ${modelName}`);
        });
        
        console.log('\n📝 Update your chatbotController.js with one of these model names.');
      }
    } else {
      console.log('⚠️  No models found. Your API key might not have access to Gemini models.');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n⚠️  Troubleshooting:');
    console.log('1. Check your internet connection');
    console.log('2. Verify your API key at https://aistudio.google.com/app/apikey');
    console.log('3. Make sure the API key is correctly set in backend/.env');
  }
}

listModels().catch(console.error);
