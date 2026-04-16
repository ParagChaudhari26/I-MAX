# Bhagirathi Ayurveda (I-MAX) - Full Stack Web Application

A comprehensive Ayurveda center management system with AI-powered chatbot, user authentication, admin dashboard, and multi-language support.

## Features

- 🏥 Ayurveda Treatment Information & Services
- 🤖 AI-Powered Chatbot (Google Gemini)
- 👥 User Authentication & Dashboard
- 📊 Admin Management Panel
- 💳 Payment Receipt Management
- 📝 Prescription Management
- 📰 News, Events & Blog Management
- 🖼️ Photo Gallery
- 🌐 Multi-language Support (English/Hindi)
- 📱 Fully Responsive Design

## Tech Stack

### Frontend
- React 19
- React Router v6
- Axios for API calls
- React Icons
- Tailwind CSS
- Parcel bundler

### Backend
- Node.js & Express
- MongoDB (Atlas)
- Redis (for session management)
- JWT Authentication
- Google Gemini AI (Chatbot)
- Cloudinary (Image hosting)
- Nodemailer (Email service)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Redis Cloud account
- Google Gemini API key
- Cloudinary account

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd I-MAX
```

2. Install frontend dependencies
```bash
npm install
```

3. Install backend dependencies
```bash
cd backend
npm install
```

4. Configure environment variables

Create a `.env` file in the `backend` directory with the following:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Redis
REDIS_URL=your_redis_connection_string

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=24h

# Server
PORT=5000
NODE_ENV=development

# Admin
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password

# Email (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Frontend URL
FRONTEND_URL=http://localhost:1234
APP_URL=http://localhost:1234

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# AI Chatbot (Google Gemini)
GEMINI_API_KEY=your_gemini_api_key
```

### Running the Application

1. Start the backend server
```bash
cd backend
npm start
```
The backend will run on http://localhost:5000

2. Start the frontend (in a new terminal)
```bash
npm start
```
The frontend will run on http://localhost:1234

## AI Chatbot Setup

The chatbot is powered by Google Gemini AI and appears as a floating button on all public pages.

### Features:
- ✅ Floating chat widget on all pages
- ✅ Smooth animations and transitions
- ✅ Mobile responsive design
- ✅ Context-aware responses based on admin-configured data
- ✅ Error handling and loading states
- ✅ Typing indicators

### Admin Configuration:
1. Login to admin dashboard at `/admin/login`
2. Navigate to "Chatbot Context" section (if available)
3. Add/edit context information that the AI will use to answer questions
4. The chatbot will use this context along with general Ayurveda knowledge

### Testing the Chatbot:
1. Visit any public page (e.g., home page)
2. Click the green robot icon in the bottom-right corner
3. Type a question about Ayurveda treatments, services, or general inquiries
4. The AI will respond based on configured context and knowledge

## Project Structure

```
I-MAX/
├── src/                      # Frontend source
│   ├── components/          # React components
│   │   ├── admin/          # Admin dashboard
│   │   ├── auth/           # Authentication
│   │   ├── user/           # User dashboard
│   │   └── ChatbotWidget.js # AI Chatbot
│   ├── services/           # API services
│   └── index.js            # App entry point
├── backend/
│   ├── config/             # Configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Express middleware
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   └── server.js           # Server entry point
└── package.json
```

## API Endpoints

### Public Routes
- `GET /api/public/training-programs` - Get training programs
- `GET /api/public/news-events` - Get news and events
- `GET /api/public/testimonials` - Get testimonials
- `GET /api/public/blogs` - Get blogs
- `POST /api/public/chat` - Chatbot endpoint
- `GET /api/public/gallery` - Get gallery images

### Admin Routes (Protected)
- `/api/admin/training-programs` - CRUD operations
- `/api/admin/news-events` - CRUD operations
- `/api/admin/testimonials` - CRUD operations
- `/api/admin/blogs` - CRUD operations
- `/api/admin/chatbot-context` - Manage chatbot context
- `/api/admin/notifications` - Manage notifications
- `/api/admin/prescriptions` - Manage prescriptions
- `/api/admin/payment-receipts` - Manage payment receipts

### User Routes (Protected)
- `/api/user/notifications` - Get user notifications
- `/api/user/prescriptions` - Get user prescriptions
- `/api/user/payment-receipts` - Get payment receipts

## Deployment

### Frontend
- Build: `npm run build`
- Deploy the `dist` folder to your hosting service

### Backend
- Ensure all environment variables are set
- Use PM2 or similar for process management
- Set `NODE_ENV=production`

## Security Features

- JWT-based authentication
- Rate limiting on API endpoints
- Input sanitization
- NoSQL injection prevention
- Helmet.js security headers
- CORS configuration
- Password hashing with bcrypt

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is proprietary software for Bhagirathi Ayurveda.

## Support

For issues or questions, contact the development team.
