import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

// Authentication middleware
export const authenticateToken = (req, res, next) => {
  // Try to get token from Authorization header first
  const authHeader = req.headers['authorization'];
  let token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  // If no token in header, try to get from cookies
  if (!token) {
    token = req.cookies?.authToken;
  }

  if (!token) {
    // For development, allow requests without auth
    // In production, uncomment the following:
    // return res.status(401).json({ success: false, error: 'Access token required' });
    
    req.user = { id: 'anonymous' }; // Default for development
    return next();
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = {
      id: decoded.userId,
      username: decoded.username,
      email: decoded.email
    };
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    // For development, allow requests with invalid tokens
    // In production, uncomment the following:
    // return res.status(403).json({ success: false, error: 'Invalid token' });
    
    req.user = { id: 'anonymous' }; // Default for development
    next();
  }
};

export const requireAuth = (req, res, next) => {
  if (!req.user || req.user.id === 'anonymous') {
    return res.status(401).json({
      success: false,
      error: 'Authentication required'
    });
  }
  next();
};
