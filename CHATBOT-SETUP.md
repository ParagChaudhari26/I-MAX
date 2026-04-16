# Chatbot Setup & Troubleshooting Guide

## Quick Start

### 1. Start the Backend Server

```bash
cd backend
npm start
```

You should see:
```
Server running on port 5000 in development mode
MongoDB connected successfully
```

### 2. Start the Frontend

In a new terminal:
```bash
npm start
```

The app will open at http://localhost:1234

### 3. Test the Chatbot

1. Open http://localhost:1234 in your browser
2. Look for the green robot icon in the bottom-right corner
3. Click it to open the chat window
4. Type a message like "What is Ayurveda?" and press Enter

## Troubleshooting

### Error: "Unable to connect to the server"

**Cause:** Backend server is not running or not accessible

**Solution:**
1. Check if backend is running:
   ```bash
   cd backend
   npm start
   ```

2. Verify backend is accessible:
   - Open http://localhost:5000/health in your browser
   - You should see: `{"success":true,"message":"Bhagarathi Ayurveda API is running",...}`

3. If port 5000 is already in use:
   - Change PORT in `backend/.env`
   - Update REACT_APP_API_URL in `.env` (frontend root)

### Error: "models/gemini-1.5-flash is not found"

**Cause:** Using an incorrect model name for the Gemini API version

**Solution:**
The code now uses `gemini-pro` which is the stable model. If you want to use newer models:

1. Option 1: Keep using `gemini-pro` (recommended, most stable)
2. Option 2: Try `gemini-1.5-pro-latest` for newer features
3. Option 3: Try `gemini-1.5-flash-latest` for faster responses

To change the model, edit `backend/controllers/chatbotController.js`:
```javascript
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
// or
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
```

After changing, restart the backend server.

### Error: "AI Chat integration is not configured properly"

**Cause:** GEMINI_API_KEY is missing or invalid

**Solution:**
1. Get a Gemini API key from https://aistudio.google.com/app/apikey
2. Add it to `backend/.env`:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```
3. Restart the backend server

### Error: "MongoDB connection failed"

**Cause:** MongoDB Atlas connection string is incorrect or network issue

**Solution:**
1. Verify MONGODB_URI in `backend/.env`
2. Check MongoDB Atlas:
   - Ensure your IP is whitelisted
   - Verify credentials are correct
   - Check if cluster is running

### Error: "Redis connection failed"

**Cause:** Redis connection string is incorrect

**Solution:**
1. Verify REDIS_URL in `backend/.env`
2. Check Redis Cloud:
   - Ensure database is active
   - Verify connection string is correct

### Chatbot Opens But No Response

**Possible Causes:**
1. GEMINI_API_KEY is invalid
2. Network timeout
3. Rate limiting

**Solution:**
1. Check backend console for errors
2. Verify API key is valid
3. Check browser console (F12) for detailed errors

### CORS Errors

**Cause:** Frontend and backend on different origins

**Solution:**
Already configured in `backend/server.js` to allow localhost:1234

If you change ports, update the CORS configuration:
```javascript
const allowedOrigins = ['http://localhost:1234', 'http://localhost:YOUR_PORT'];
```

## Testing Without Frontend

Use the included test file:

1. Make sure backend is running
2. Open `test-chatbot.html` in your browser
3. Click "Check Backend Health"
4. Click "Send Message" to test the chatbot

## Manual API Testing

### Using curl:

```bash
# Test health endpoint
curl http://localhost:5000/health

# Test chatbot endpoint
curl -X POST http://localhost:5000/api/public/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What is Ayurveda?"}'
```

### Using Postman:

1. Create a POST request to `http://localhost:5000/api/public/chat`
2. Set header: `Content-Type: application/json`
3. Body (raw JSON):
   ```json
   {
     "message": "What is Ayurveda?"
   }
   ```
4. Send and check response

## Environment Variables Checklist

### Backend (`backend/.env`):

- ✅ MONGODB_URI - MongoDB connection string
- ✅ REDIS_URL - Redis connection string
- ✅ JWT_SECRET - Secret for JWT tokens
- ✅ GEMINI_API_KEY - Google Gemini API key (REQUIRED for chatbot)
- ✅ PORT - Backend port (default: 5000)
- ✅ SMTP_* - Email configuration
- ✅ CLOUDINARY_* - Image hosting

### Frontend (`.env`):

- ✅ REACT_APP_API_URL - Backend URL (default: http://localhost:5000)

## Chatbot Features

### What Works:
- ✅ Floating button on all public pages
- ✅ Smooth open/close animations
- ✅ Mobile responsive design
- ✅ AI-powered responses using Google Gemini
- ✅ Context-aware (uses admin-configured data)
- ✅ Error handling with user-friendly messages
- ✅ Typing indicators
- ✅ Message history during session

### Admin Context Management:

Admins can configure chatbot knowledge:
1. Login to admin dashboard: http://localhost:1234/admin/login
2. Navigate to "Chatbot Context" (if available in admin panel)
3. Add context entries with title and content
4. Mark as "Active" to include in chatbot responses

The chatbot will use this context along with general Ayurveda knowledge.

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Chatbot button not visible | Check if ChatbotWidget is imported in src/index.js |
| Button visible but won't open | Check browser console for JavaScript errors |
| Opens but shows error immediately | Backend not running or wrong API URL |
| Slow responses | Normal - AI processing takes 2-5 seconds |
| "Message is required" error | Frontend sending empty message |
| Rate limit errors | Too many requests - wait a few minutes |

## Performance Tips

1. **Response Time:** AI responses typically take 2-5 seconds
2. **Rate Limits:** Google Gemini has rate limits - avoid spam testing
3. **Context Size:** Keep admin context entries concise for faster responses
4. **Mobile:** Chatbot automatically adjusts for mobile screens

## Security Notes

- Chatbot endpoint is public (no authentication required)
- Rate limiting is enabled (100 requests per 15 minutes per IP)
- Input sanitization prevents XSS attacks
- NoSQL injection prevention is active
- CORS is configured for security

## Need Help?

1. Check backend console for detailed error logs
2. Check browser console (F12) for frontend errors
3. Use `test-chatbot.html` to isolate backend issues
4. Verify all environment variables are set correctly
5. Ensure MongoDB and Redis are accessible

## Success Indicators

When everything is working:
- ✅ Backend starts without errors
- ✅ Frontend loads without console errors
- ✅ Green robot button appears in bottom-right
- ✅ Clicking button opens chat window smoothly
- ✅ Sending message shows typing indicator
- ✅ AI responds within 2-5 seconds
- ✅ Responses are relevant and helpful

## Next Steps

Once chatbot is working:
1. Add more context entries via admin panel
2. Test with various questions
3. Monitor backend logs for errors
4. Adjust system prompt in `backend/controllers/chatbotController.js` if needed
5. Consider adding conversation history persistence
