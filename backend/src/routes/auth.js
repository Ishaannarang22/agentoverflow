import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { elasticClient, INDICES } from '../config/elastic.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// JWT secret (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_EXPIRES_IN = '30d'; // 30 days

// Validation rules
const registerValidation = [
  body('username')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('fullName')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Full name must be less than 100 characters')
];

const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Register endpoint
router.post('/register', registerValidation, async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { username, email, password } = req.body;

    // Check if user already exists by email
    const emailExists = await elasticClient.search({
      index: INDICES.USERS,
      body: {
        query: {
          term: { email: email.toLowerCase() }
        }
      }
    });

    if (emailExists.hits.total.value > 0) {
      return res.status(400).json({
        success: false,
        error: 'Email already registered'
      });
    }

    // Check if username already exists
    const usernameExists = await elasticClient.search({
      index: INDICES.USERS,
      body: {
        query: {
          term: { username: username.toLowerCase() }
        }
      }
    });

    if (usernameExists.hits.total.value > 0) {
      return res.status(400).json({
        success: false,
        error: 'Username already taken'
      });
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create minimal user document
    const userDoc = {
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password_hash: passwordHash,
      created_at: new Date().toISOString(),
      last_login: null
    };

    // Save user to Elasticsearch
    const result = await elasticClient.index({
      index: INDICES.USERS,
      body: userDoc
    });

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: result._id,
        username: userDoc.username,
        email: userDoc.email
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Set cookie with long expiration (30 days)
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds
    });

    // Return success response (without password hash)
    const { password_hash, ...userResponse } = userDoc;
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: result._id,
        username: userDoc.username,
        email: userDoc.email,
        created_at: userDoc.created_at,
        last_login: userDoc.last_login
      },
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Login endpoint
router.post('/login', loginValidation, async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find user by email
    const userSearch = await elasticClient.search({
      index: INDICES.USERS,
      body: {
        query: {
          term: { email: email.toLowerCase() }
        }
      }
    });

    if (userSearch.hits.total.value === 0) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    const user = userSearch.hits.hits[0];
    const userData = user._source;

    // Minimal schema - no is_active field, all users are active by default

    // Verify password
    const isValidPassword = await bcrypt.compare(password, userData.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    // Update last login
    await elasticClient.update({
      index: INDICES.USERS,
      id: user._id,
      body: {
        doc: {
          last_login: new Date().toISOString()
        }
      }
    });

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id,
        username: userData.username,
        email: userData.email
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Set cookie with long expiration (30 days)
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds
    });

    // Return success response (without password hash)
    const { password_hash, ...userResponse } = userData;
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        username: userData.username,
        email: userData.email,
        created_at: userData.created_at,
        last_login: userData.last_login
      },
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Logout endpoint
router.post('/logout', (req, res) => {
  res.clearCookie('authToken');
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

// Get current user endpoint
router.get('/me', authenticateToken, async (req, res) => {
  try {
    if (!req.user || req.user.id === 'anonymous') {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated'
      });
    }

    // Get user from Elasticsearch
    const user = await elasticClient.get({
      index: INDICES.USERS,
      id: req.user.id
    });

    const userData = user._source;
    const { password_hash, ...userResponse } = userData;

    res.json({
      success: true,
      user: {
        id: user._id,
        username: userData.username,
        email: userData.email,
        created_at: userData.created_at,
        last_login: userData.last_login
      }
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Verify token endpoint
router.get('/verify', authenticateToken, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

export default router;
