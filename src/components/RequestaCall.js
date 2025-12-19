import React, { useState, useRef, useEffect } from 'react';

function BhagirathiAIAgent() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Namaste! 🙏 Welcome to Bhagirathi AI Agent! I'm your intelligent assistant for Ayurveda courses and therapies. I can help you find the perfect courses, therapies, and wellness guidance based on your specific needs. How can I assist you today? 🌿",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Conversation history for maintaining context
  const [conversationHistory, setConversationHistory] = useState([]);

  // Course and therapy data
  const coursesData = {
    online: [
      {
        id: 'beauty-care-online',
        name: 'Beauty Care by Ayurveda',
        category: 'Beauty',
        duration: '30 hours',
        price: 250,
        type: 'online',
        description: 'Develop a deep sense of beauty that radiates from within with Ayurvedic principles.',
        modules: ['Ayurvedic approach to beauty', 'Skin care', 'Rejuvenation therapies', 'Masks & moisturizers', 'Hair care', 'Inner beauty secrets']
      },
      {
        id: 'basics-ayurveda',
        name: 'Basics of Ayurveda',
        category: 'Foundation',
        duration: '30 hours',
        price: 250,
        type: 'online',
        description: 'Learn foundational principles of Ayurveda and its approach to holistic health.',
        modules: ['Foundations of Ayurveda', 'Principles of Ayurveda', 'Metabolism and digestion', 'Physical Constitution (Prakriti)']
      },
      {
        id: 'advance-ayurveda',
        name: 'Advance Ayurveda',
        category: 'Advanced',
        duration: '50 hours',
        price: 450,
        type: 'online',
        description: 'Deeper examination of Ayurvedic concepts with comprehensive modules.',
        modules: ['Philosophy and principles', 'Positive health concepts', 'Materia-medica', 'Diagnostic methodology', 'Disease management']
      },
      {
        id: 'herbology',
        name: 'Ayurveda Herbology',
        category: 'Herbs',
        duration: '30 hours',
        price: 250,
        type: 'online',
        description: 'Study of energetic principles and uses of Ayurvedic medicinal herbs.',
        modules: ['History of Ayurveda', 'Basic principles', 'Herbology - Dravya Guna', 'Ayurvedic pharmacy', 'Disease diagnosis']
      },
      {
        id: 'pms-menopause',
        name: 'Pre-Menstrual Syndrome (PMS) and Menopause',
        category: 'Women\'s Health',
        duration: '15 hours',
        price: 125,
        type: 'online',
        description: 'Ayurvedic approach to managing PMS and Menopause.',
        modules: ['PMS concept in Ayurveda', 'Menopause (Rajo-Nivrutti) concept', 'Ayurvedic solutions for both conditions']
      },
      {
        id: 'women-pregnancy-care',
        name: 'Women Care and Pregnancy Care',
        category: 'Women\'s Health',
        duration: '30 hours',
        price: 250,
        type: 'online',
        description: 'Comprehensive Ayurvedic approach to women\'s health and pregnancy care.',
        modules: ['Women as community strength', 'Menstrual cycle understanding', 'Pregnancy preparation', 'Month-wise pregnancy care', 'Panchakarma for women']
      },
      {
        id: 'rasayana-therapy',
        name: 'Rasayana (Rejuvenation) Therapy',
        category: 'Special Therapies',
        duration: '20 hours',
        price: 170,
        type: 'online',
        description: 'Learn Ayurvedic rejuvenation therapies for physical and psychological well-being.',
        modules: ['Rasayana therapy importance', 'Types of rejuvenation', 'Useful herbs', 'Popular recipes', 'Ideal conduct (Achara Rasayana)']
      },
      {
        id: 'vajikarana-therapy',
        name: 'Vajikaranana (Vitalization) Therapy',
        category: 'Special Therapies',
        duration: '20 hours',
        price: 170,
        type: 'online',
        description: 'Ayurvedic approach to sexual health and vitality.',
        modules: ['Vitalization therapy importance', 'Sexual dysfunction diagnosis', 'Treatment guidelines', 'Useful herbs', 'Popular formulations']
      }
    ],
    inPerson: [
      {
        id: 'basics-panchakarma-training',
        name: 'Ayurveda Basics & Panchakarma Training',
        category: 'Foundation',
        duration: '30 hours',
        price: 450,
        type: 'in-person',
        description: 'Introduction to Ayurveda and Panchakarma with practical training sessions.',
        modules: ['Theory: Basic principles, Panchakarma steps, massage techniques', 'Practical: Body-type analysis, massage practice, oil preparation']
      },
      {
        id: 'beauty-care-step1',
        name: 'Beauty Care by Ayurveda - Step I',
        category: 'Beauty',
        duration: '30 hours',
        price: 450,
        type: 'in-person',
        description: 'Ayurvedic approach to beauty care with theoretical and practical sessions.',
        modules: ['Face, hair, skin anatomy per Ayurveda', 'Rejuvenation massage techniques', 'Anti-aging management', 'Udvartana therapy']
      },
      {
        id: 'herbal-medicines-prep',
        name: 'Ayurveda\'s Herbal Medicines and Oils Preparation',
        category: 'Herbs',
        duration: '30 hours',
        price: 450,
        type: 'in-person',
        description: 'Learn to prepare various Ayurvedic formulations and medicines.',
        modules: ['Five basic preparation forms', 'Herbal decoctions', 'Oil and ghee preparation', 'Tablet and compound making']
      },
      {
        id: 'cooking-training',
        name: 'Ayurveda Cooking Training',
        category: 'Lifestyle',
        duration: '30 hours',
        price: 450,
        type: 'in-person',
        description: 'Learn Ayurvedic principles of cooking and nutrition.',
        modules: ['Tridosha theory', 'Six tastes concept', 'Food combinations', 'Practical cooking sessions with various dishes']
      },
      {
        id: 'lifestyle-management',
        name: 'Ayurveda Lifestyle Management',
        category: 'Lifestyle',
        duration: '30 hours',
        price: 450,
        type: 'in-person',
        description: 'Learn daily and seasonal regimens according to Ayurveda.',
        modules: ['Daily regimen (Dinacharya)', 'Seasonal regimen (Ritucharya)', 'Food, sleep, and brahmacharya management', 'Home remedies']
      },
      {
        id: 'baby-pregnancy-massage',
        name: 'Ayurveda Massage for Baby & Pregnancy Care',
        category: 'Special Care',
        duration: '30 hours',
        price: 450,
        type: 'in-person',
        description: 'Ayurvedic approach to baby massage and pregnancy care.',
        modules: ['Basic Ayurveda principles', 'Baby massage techniques', 'Pregnancy massage safety', 'Postnatal care methods']
      },
      {
        id: 'herbs-spices-identification',
        name: 'Identification of Ayurvedic Herbs and Spices',
        category: 'Herbs',
        duration: '30 hours',
        price: 450,
        type: 'in-person',
        description: 'Learn to identify and use common Ayurvedic herbs and spices.',
        modules: ['Herb properties and actions', 'Six tastes, potency, effects', 'Dosha-balancing herbs', 'Herbal garden visits']
      },
      {
        id: 'yoga-basic-training',
        name: 'Yoga Teacher Training (Basic)',
        category: 'Yoga',
        duration: '30 hours',
        price: 450,
        type: 'in-person',
        description: 'Basic yoga teacher training program.',
        modules: ['Ashtanga Yoga theory', 'Asana, Pranayama, Dhyana practice', 'Anatomy and physiology', 'Teaching techniques']
      },
      {
        id: 'therapist-training',
        name: 'Ayurveda Therapist Training',
        category: 'Professional',
        duration: '160 hours',
        price: 2300,
        type: 'in-person',
        description: 'Comprehensive training to become an Ayurveda therapist.',
        modules: ['Complete Ayurveda principles', 'Beauty care techniques', 'Panchakarma procedures', 'Massage specializations', 'Professional practice']
      },
      {
        id: 'panchakarma-step3',
        name: 'Ayurveda & Panchakarma Therapy - Step III',
        category: 'Advanced',
        duration: '80 hours',
        price: 1100,
        type: 'in-person',
        description: 'Advanced training in Ayurveda and Panchakarma therapies.',
        modules: ['Advanced Panchakarma theory', 'All five main procedures', 'Specialized massage techniques', 'Marma therapy']
      }
    ]
  };

  // AI Agent Functions (Tools)
  const findCoursesByCategory = ({ category }) => {
    const allCourses = [...coursesData.online, ...coursesData.inPerson];
    const filtered = allCourses.filter(course => 
      course.category.toLowerCase().includes(category.toLowerCase())
    );
    return filtered.length > 0 ? filtered : 'No courses found in this category';
  };

  const findCoursesByPriceRange = ({ minPrice, maxPrice }) => {
    const allCourses = [...coursesData.online, ...coursesData.inPerson];
    const filtered = allCourses.filter(course => 
      course.price >= minPrice && course.price <= maxPrice
    );
    return filtered.length > 0 ? filtered : 'No courses found in this price range';
  };

  const getCourseDetails = ({ courseName }) => {
    const allCourses = [...coursesData.online, ...coursesData.inPerson];
    const course = allCourses.find(course => 
      course.name.toLowerCase().includes(courseName.toLowerCase())
    );
    return course || 'Course not found';
  };

  const recommendCoursesForCondition = ({ condition }) => {
    const allCourses = [...coursesData.online, ...coursesData.inPerson];
    const conditionLower = condition.toLowerCase();
    
    let recommendations = [];
    
    if (conditionLower.includes('beauty') || conditionLower.includes('skin') || conditionLower.includes('hair')) {
      recommendations = allCourses.filter(course => course.category === 'Beauty');
    } else if (conditionLower.includes('women') || conditionLower.includes('pregnancy') || conditionLower.includes('menopause')) {
      recommendations = allCourses.filter(course => course.category === 'Women\'s Health' || course.category === 'Special Care');
    } else if (conditionLower.includes('stress') || conditionLower.includes('rejuvenation') || conditionLower.includes('energy')) {
      recommendations = allCourses.filter(course => course.category === 'Special Therapies');
    } else if (conditionLower.includes('beginner') || conditionLower.includes('basic') || conditionLower.includes('foundation')) {
      recommendations = allCourses.filter(course => course.category === 'Foundation');
    } else if (conditionLower.includes('herb') || conditionLower.includes('medicine')) {
      recommendations = allCourses.filter(course => course.category === 'Herbs');
    } else if (conditionLower.includes('lifestyle') || conditionLower.includes('cooking') || conditionLower.includes('daily routine')) {
      recommendations = allCourses.filter(course => course.category === 'Lifestyle');
    } else {
      // General recommendations
      recommendations = allCourses.filter(course => 
        course.category === 'Foundation' || course.category === 'Special Therapies'
      ).slice(0, 3);
    }
    
    return recommendations.length > 0 ? recommendations : 'No specific recommendations found, but I suggest starting with our Basics of Ayurveda course';
  };

  // Tool declarations for the AI
  const toolDeclarations = [
    {
      name: 'findCoursesByCategory',
      description: 'Find courses by category like Beauty, Foundation, Advanced, Herbs, Women\'s Health, Special Therapies, Lifestyle, Yoga, Professional',
      parameters: {
        type: 'OBJECT',
        properties: {
          category: {
            type: 'STRING',
            description: 'Category name to search for courses'
          }
        },
        required: ['category']
      }
    },
    {
      name: 'findCoursesByPriceRange',
      description: 'Find courses within a specific price range in USD',
      parameters: {
        type: 'OBJECT',
        properties: {
          minPrice: {
            type: 'NUMBER',
            description: 'Minimum price in USD'
          },
          maxPrice: {
            type: 'NUMBER',
            description: 'Maximum price in USD'
          }
        },
        required: ['minPrice', 'maxPrice']
      }
    },
    {
      name: 'getCourseDetails',
      description: 'Get detailed information about a specific course',
      parameters: {
        type: 'OBJECT',
        properties: {
          courseName: {
            type: 'STRING',
            description: 'Name or partial name of the course'
          }
        },
        required: ['courseName']
      }
    },
    {
      name: 'recommendCoursesForCondition',
      description: 'Recommend courses based on health condition, interest, or learning goal',
      parameters: {
        type: 'OBJECT',
        properties: {
          condition: {
            type: 'STRING',
            description: 'Health condition, interest area, or learning goal like beauty, stress, women health, beginner level, etc.'
          }
        },
        required: ['condition']
      }
    }
  ];

  const availableTools = {
    findCoursesByCategory,
    findCoursesByPriceRange,
    getCourseDetails,
    recommendCoursesForCondition
  };

  const systemInstructionText = `You are 'Bhagirathi AI Agent,' an intelligent digital assistant for Bhagirathi Ayurveda Clinic and Research Centre. You have access to tools that can help you recommend specific courses and therapies based on user needs.

Your primary purpose is to:
1. Provide informative, supportive responses about Ayurveda
2. Use your available tools to recommend specific courses and therapies from our extensive catalog
3. Actively promote our services while being helpful and educational

Available Tools:
- findCoursesByCategory: Find courses by category
- findCoursesByPriceRange: Find courses within price range
- getCourseDetails: Get details about specific courses
- recommendCoursesForCondition: Recommend courses for specific conditions or interests

Guidelines:
- ALWAYS use tools when users ask about courses, therapies, or recommendations
- When presenting course information, include price, duration, and key benefits
- Maintain the same caring, knowledgeable tone as the original Bhagirathi AI
- For medical concerns, always recommend consultation with certified Ayurvedic doctors
- Stay focused on Ayurveda, wellness, and our clinic's offerings
- Be proactive in suggesting relevant courses based on user interests

Remember: You are an AI assistant, not a medical professional. Always recommend professional consultation for health concerns while providing educational information about Ayurveda.`;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const runAgent = async (userInput) => {
    const updatedHistory = [
      ...conversationHistory,
      {
        role: 'user',
        parts: [{ text: userInput }]
      }
    ];

    const GEMINI_API_KEY = "AIzaSyAxuxDGlgslFSAeJkRWGE9LqwLVEX3Fby0";
    const MODEL_NAME = "gemini-2.5-flash";
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`;

    while (true) {
      const requestBody = {
        contents: updatedHistory,
        systemInstruction: {
          parts: [{ text: systemInstructionText }]
        },
        tools: [{
          functionDeclarations: toolDeclarations
        }]
      };

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts) {
          const parts = data.candidates[0].content.parts;
          
          // Check if there are function calls
          const functionCalls = parts.filter(part => part.functionCall);
          
          if (functionCalls.length > 0) {
            // Process function calls
            for (const part of functionCalls) {
              const { name, args } = part.functionCall;
              const toolFunction = availableTools[name];
              
              if (toolFunction) {
                const result = toolFunction(args);
                
                // Add function call to history
                updatedHistory.push({
                  role: 'model',
                  parts: [{ functionCall: part.functionCall }]
                });

                // Add function response to history
                updatedHistory.push({
                  role: 'user',
                  parts: [{
                    functionResponse: {
                      name: name,
                      response: { result: result }
                    }
                  }]
                });
              }
            }
          } else {
            // No function calls, this is the final response
            const textParts = parts.filter(part => part.text);
            if (textParts.length > 0) {
              const responseText = textParts.map(part => part.text).join(' ');
              
              // Add final response to history
              updatedHistory.push({
                role: 'model',
                parts: [{ text: responseText }]
              });
              
              // Update conversation history
              setConversationHistory(updatedHistory);
              
              return responseText;
            }
          }
        }
      } catch (error) {
        console.error('Agent Error:', error);
        return `I apologize for the technical difficulty. Please try again or contact our clinic directly for assistance with course recommendations.`;
      }
    }
  };

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    const newUserMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    const currentInput = inputText;
    setInputText('');
    setIsLoading(true);

    try {
      const agentResponse = await runAgent(currentInput);
      
      const newBotMessage = {
        id: messages.length + 2,
        text: agentResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newBotMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: 'I apologize for the technical difficulty. Please try asking again, and I\'ll do my best to help you with our Ayurveda courses and therapies.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "Show me beauty care courses 🌸",
    "What courses are good for beginners? 📚",
    "Find courses under $300 💰",
    "I want to learn about herbs 🌿",
    "Recommend courses for stress management 🧘‍♂️",
    "Tell me about panchakarma training 💆‍♀️"
  ];

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isOpen ? 'w-96 h-5/6' : 'w-16 h-16'}`}>
      {/* Chatbot toggle button */}
      <div 
        className={`flex items-center justify-center rounded-full shadow-lg cursor-pointer transition-all duration-300 ${isOpen ? 'hidden' : 'w-16 h-16 bg-green-800 hover:bg-green-900'} animate-pulse`}
        onClick={() => setIsOpen(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>

      {/* Chatbot container */}
      <div className={`flex flex-col bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ${isOpen ? 'w-full h-full' : 'w-0 h-0'}`}>
        {/* Header */}
        <div className="bg-green-800 text-white p-4 flex justify-between items-center">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <div>
              <h3 className="font-semibold">Bhagirathi AI Agent</h3>
              <p className="text-xs text-green-200">Smart Course Advisor • Online</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-green-200 focus:outline-none transition-transform duration-200 hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} transition-all duration-300 transform ${index === messages.length - 1 ? 'animate-fadeIn' : ''}`}
            >
              <div
                className={`max-w-xs md:max-w-md rounded-lg p-3 ${message.sender === 'user' 
                  ? 'bg-green-700 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-200'}`}
              >
                <p className="whitespace-pre-wrap">{message.text}</p>
                <span className="text-xs opacity-70 block mt-1 text-right">
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-white text-gray-800 rounded-lg rounded-bl-none p-3 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                  </div>
                  <span className="ml-2 text-green-700">Analyzing and finding best recommendations...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested questions */}
        <div className="px-4 py-2 bg-gray-100 border-t border-gray-200">
          <p className="text-xs text-gray-600 mb-2">Quick suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => {
                  setInputText(question.replace(/[^\w\s?]/gi, '').replace(/\s+/g, ' ').trim());
                  setTimeout(() => handleSendMessage(), 100);
                }}
                className="text-xs bg-white text-green-800 hover:bg-green-50 px-3 py-1 rounded-full border border-gray-300 transition-colors duration-200"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Input area */}
        <div className="p-3 bg-gray-100 border-t border-gray-200">
          <div className="flex items-center">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about courses, therapies, or Ayurveda guidance..."
              className="flex-1 border border-gray-300 rounded-l-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent resize-none"
              rows="1"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || inputText.trim() === ''}
              className={`bg-green-800 text-white p-2 rounded-r-lg hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-600 transition-colors duration-200 ${isLoading || inputText.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1 text-center">
            Bhagirathi AI Agent · Intelligent Course & Therapy Advisor
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
      `}</style>
    </div>
  );
}

export default BhagirathiAIAgent;