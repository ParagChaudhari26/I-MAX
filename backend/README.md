# Bhagarathi Ayurveda Backend API

Backend API server for the Bhagarathi Ayurveda admin dashboard system.

## Features

- Express.js server with security middleware
- MongoDB integration with Mongoose ODM
- JWT-based authentication
- Rate limiting and CORS protection
- Comprehensive error handling
- Environment-based configuration

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Start production server:
   ```bash
   npm start
   ```

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Authentication (Coming Soon)
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout

### Admin Routes (Coming Soon)
- `GET /api/admin/training-programs` - Get all training programs
- `POST /api/admin/training-programs` - Create training program
- `PUT /api/admin/training-programs/:id` - Update training program
- `DELETE /api/admin/training-programs/:id` - Delete training program

### Public Routes (Coming Soon)
- `GET /api/public/training-programs` - Get published training programs
- `GET /api/public/testimonials` - Get approved testimonials
- `GET /api/public/blogs` - Get published blogs
- `GET /api/public/news-events` - Get published news and events

## Testing

Run tests:
```bash
npm test
```

## Project Structure

```
backend/
├── config/          # Configuration files
├── controllers/     # Business logic
├── middleware/      # Custom middleware
├── models/          # Mongoose schemas
├── routes/          # API routes
├── tests/           # Test files
├── server.js        # Main server file
└── package.json     # Dependencies and scripts
```