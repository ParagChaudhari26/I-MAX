const AIContext = require('../models/AIContext');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Admin Methods
exports.createContext = async (req, res) => {
  try {
    const newContext = await AIContext.create(req.body);
    res.status(201).json({ success: true, data: newContext });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getAllContexts = async (req, res) => {
  try {
    const contexts = await AIContext.find();
    res.status(200).json({ success: true, data: contexts });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.updateContext = async (req, res) => {
  try {
    const context = await AIContext.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!context) return res.status(404).json({ success: false, message: 'Context not found' });
    res.status(200).json({ success: true, data: context });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.deleteContext = async (req, res) => {
  try {
    const context = await AIContext.findByIdAndDelete(req.params.id);
    if (!context) return res.status(404).json({ success: false, message: 'Context not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Public Chat Resource
exports.generateChatResponse = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ success: false, message: 'Message is required' });

    // Initialize Gemini API
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ success: false, message: 'AI Chat integration is not configured properly' });
    }
    
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Use gemini-2.5-flash (stable, fast, and efficient)
    // Other options: gemini-2.5-pro (more capable), gemini-pro-latest (always latest)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    });

    // Load dynamic context from DB
    const activeContexts = await AIContext.find({ isActive: true });
    let combinedContextText = activeContexts.map(c => `[${c.title}]: ${c.content}`).join('\n');

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

User Question: ${message}`;

    const result = await model.generateContent(systemPrompt);
    const textResponse = result.response.text();

    res.status(200).json({ success: true, data: textResponse });
  } catch (error) {
    console.error('Chat error:', error);
    
    // Provide more specific error messages
    let errorMessage = 'An error occurred while calling the AI model';
    if (error.status === 404) {
      errorMessage = 'AI model not found. Please check the model name configuration.';
    } else if (error.status === 429) {
      errorMessage = 'Rate limit exceeded. Please try again in a moment.';
    } else if (error.status === 403) {
      errorMessage = 'Invalid API key. Please check your GEMINI_API_KEY configuration.';
    }
    
    res.status(500).json({ success: false, message: errorMessage });
  }
};
