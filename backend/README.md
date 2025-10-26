# AgentOverflow Backend

Express.js middleware layer for integrating Elastic AI with your React frontend.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Setup

Copy the example environment file and configure your Elastic AI credentials:

```bash
cp env.example .env
```

Edit `.env` with your Elastic AI credentials:

```env
# Elastic AI Configuration
ELASTIC_NODE=https://your-endpoint:9200
ELASTIC_API_KEY=your_api_key_here
ELASTIC_CLOUD_ID=your_cloud_id_here

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3. Start the Server

```bash
# Development
npm run dev

# Production
npm start
```

The server will start on `http://localhost:3001`

## 📊 API Endpoints

### Health Check
- `GET /health` - Check server and Elastic AI connection status

### Search
- `GET /api/search/posts` - Search posts with filters
- `GET /api/search/posts/:id` - Get single post with full details
- `GET /api/search/users/:userId/posts` - Get user's posts
- `GET /api/search/posts/trending` - Get trending posts

### Posts
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Like/unlike post
- `POST /api/posts/:id/comments` - Add comment to post

## 🔧 Configuration

### Elastic AI Setup

1. **Get your API key** from Elastic AI dashboard
2. **Set your endpoint** URL
3. **Create the required indices** using the provided mappings

### Required Elastic Indices

The backend expects these three indices to exist:

1. **posts_ai** - Main posts content
2. **user_post_map** - User-post relationships
3. **post_edges** - Likes, comments, and engagement data

## 🔐 Authentication

Currently, authentication is disabled for development. To enable:

1. Install Supabase client: `npm install @supabase/supabase-js`
2. Update `src/middleware/auth.js` to verify JWT tokens
3. Add authentication to protected routes

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3001
ELASTIC_NODE=https://your-production-endpoint:9200
ELASTIC_API_KEY=your_production_api_key
FRONTEND_URL=https://your-frontend-domain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## 📝 Usage Examples

### Search Posts
```javascript
// Search with query and filters
const response = await fetch('http://localhost:3001/api/search/posts?query=react&category=frontend&tags=javascript&page=1&limit=10');
const data = await response.json();
```

### Create Post
```javascript
const response = await fetch('http://localhost:3001/api/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    author_id: 'user-123',
    title: 'How to use React hooks',
    content: 'React hooks are...',
    category: 'frontend',
    tags: ['react', 'javascript'],
    type: 'tutorial'
  })
});
```

### Like a Post
```javascript
const response = await fetch('http://localhost:3001/api/posts/post-123/like', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    user_id: 'user-123',
    type: 'like'
  })
});
```

## 🛠️ Development

### Project Structure
```
backend/
├── src/
│   ├── config/
│   │   └── elastic.js          # Elastic AI client configuration
│   ├── middleware/
│   │   └── auth.js             # Authentication middleware
│   ├── routes/
│   │   ├── search.js           # Search endpoints
│   │   └── posts.js            # Post management endpoints
│   └── server.js               # Main server file
├── package.json
├── env.example
└── README.md
```

### Adding New Endpoints

1. Create route handler in `src/routes/`
2. Import and use in `src/server.js`
3. Update frontend service layer accordingly

## 🔍 Troubleshooting

### Common Issues

1. **Elastic AI Connection Failed**
   - Check your API key and endpoint URL
   - Verify network connectivity
   - Check Elastic AI service status

2. **CORS Errors**
   - Ensure `FRONTEND_URL` matches your frontend domain
   - Check if frontend is running on correct port

3. **Rate Limiting**
   - Adjust `RATE_LIMIT_MAX_REQUESTS` if needed
   - Check if requests are being made too frequently

### Debug Mode

Set `NODE_ENV=development` to enable detailed error messages and logging.

## 📚 Next Steps

1. **Set up Elastic AI indices** using the provided mappings
2. **Configure authentication** with Supabase
3. **Add data synchronization** between Supabase and Elastic AI
4. **Implement real-time updates** using WebSockets
5. **Add caching layer** with Redis for better performance
