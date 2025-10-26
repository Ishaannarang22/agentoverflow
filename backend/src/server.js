import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

// Import routes
import searchRoutes from './routes/search.js';
import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';

// Import config
import { testConnection } from './config/elastic.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 3002;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:8083',
    'http://localhost:8082',
    'http://localhost:8081',
    'http://localhost:8080'
  ],
  credentials: true
}));

// Compression
app.use(compression());

// Logging
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.'
  }
});
app.use(limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parsing
app.use(cookieParser());

// Health check endpoint
app.get('/health', async (req, res) => {
  const elasticStatus = await testConnection();
  
  res.json({
    success: true,
    status: 'OK',
    timestamp: new Date().toISOString(),
    services: {
      elastic: elasticStatus ? 'connected' : 'disconnected'
    }
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/posts', postRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  
  res.status(error.status || 500).json({
    success: false,
    error: error.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth`);
  console.log(`🔍 Search API: http://localhost:${PORT}/api/search`);
  console.log(`📝 Posts API: http://localhost:${PORT}/api/posts`);
  
  // Test Elastic connection
  await testConnection();
});

export default app;
