Here's your Backend Skill `.md` file based on the reference format:

```markdown
---
name: backend-skill
description: Build RESTful APIs with proper routing, request/response handling, database integration, and middleware. Use for creating server-side applications.
---

# Backend API Development

## Instructions

1. **Route Structure**
   - RESTful resource naming (nouns, not verbs)
   - Versioned API endpoints (/api/v1/)
   - Group related routes by resource
   - Consistent HTTP methods (GET, POST, PUT, DELETE, PATCH)

2. **Request/Response Handling**
   - Validate and sanitize all inputs
   - Consistent response formats
   - Proper HTTP status codes
   - Error handling with meaningful messages

3. **Database Integration**
   - Connection pooling
   - Transaction management
   - Query optimization
   - Connection lifecycle management

## Best Practices
- Use middleware for cross-cutting concerns
- Implement rate limiting for public endpoints
- Add request logging and monitoring
- Use environment variables for configuration
- Implement proper error handling at all levels
- Add API documentation (OpenAPI/Swagger)
- Use HTTPS in production
- Implement CORS properly
- Add health check endpoints

## Example Structures

### Express.js Application Structure
```javascript
// app.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { connectDB } from './config/database.js';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Database connection
connectDB();

// Routes
app.use('/api/v1', routes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.url}`
  });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Route Definitions

```javascript
// routes/index.js
import { Router } from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import postRoutes from './post.routes.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Public routes
router.use('/auth', authRoutes);

// Protected routes (require authentication)
router.use('/users', authenticate, userRoutes);
router.use('/posts', authenticate, postRoutes);

export default router;
```

### Resource Route Example (Users)

```javascript
// routes/user.routes.js
import { Router } from 'express';
import { 
  getUsers, 
  getUser, 
  createUser, 
  updateUser, 
  deleteUser,
  getUserPosts 
} from '../controllers/user.controller.js';
import { validateUser } from '../middleware/validation.js';
import { authorize } from '../middleware/auth.js';

const router = Router();

// GET /api/v1/users
router.get('/', getUsers);

// GET /api/v1/users/:id
router.get('/:id', getUser);

// POST /api/v1/users
router.post('/', validateUser, createUser);

// PUT /api/v1/users/:id
router.put('/:id', authorize(['admin', 'user']), validateUser, updateUser);

// DELETE /api/v1/users/:id
router.delete('/:id', authorize(['admin']), deleteUser);

// Nested routes
// GET /api/v1/users/:id/posts
router.get('/:id/posts', getUserPosts);

export default router;
```

### Controller with Database Operations

```javascript
// controllers/user.controller.js
import { db } from '../config/database.js';
import { users } from '../models/schema.js';
import { eq } from 'drizzle-orm';

// GET /users
export const getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const offset = (page - 1) * limit;
    
    let query = db.select().from(users);
    
    // Apply search filter
    if (search) {
      query = query.where(
        or(
          ilike(users.email, `%${search}%`),
          ilike(users.username, `%${search}%`)
        )
      );
    }
    
    // Apply pagination
    const result = await query
      .limit(limit)
      .offset(offset)
      .orderBy(users.createdAt, 'desc');
    
    // Get total count for pagination metadata
    const total = await db.select({ count: count() }).from(users);
    
    res.json({
      success: true,
      data: result,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: total[0].count,
        totalPages: Math.ceil(total[0].count / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// GET /users/:id
export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    
    if (!user[0]) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    // Remove sensitive data
    const { passwordHash, ...safeUser } = user[0];
    
    res.json({
      success: true,
      data: safeUser
    });
  } catch (error) {
    next(error);
  }
};

// POST /users
export const createUser = async (req, res, next) => {
  try {
    const userData = req.body;
    
    // Hash password if provided
    if (userData.password) {
      userData.passwordHash = await bcrypt.hash(userData.password, 10);
      delete userData.password;
    }
    
    const [newUser] = await db
      .insert(users)
      .values(userData)
      .returning();
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser
    });
  } catch (error) {
    if (error.code === '23505') { // Unique constraint violation
      return res.status(409).json({
        success: false,
        error: 'User with this email or username already exists'
      });
    }
    next(error);
  }
};

// PUT /users/:id
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Prevent updating certain fields
    delete updateData.id;
    delete updateData.createdAt;
    
    // Hash new password if provided
    if (updateData.password) {
      updateData.passwordHash = await bcrypt.hash(updateData.password, 10);
      delete updateData.password;
    }
    
    const [updatedUser] = await db
      .update(users)
      .set({
        ...updateData,
        updatedAt: new Date()
      })
      .where(eq(users.id, id))
      .returning();
    
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (error) {
    next(error);
  }
};
```

### Middleware Examples

```javascript
// middleware/auth.js
import jwt from 'jsonwebtoken';

// Authentication middleware
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'No token provided'
      });
    }
    
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Fetch user from database
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, decoded.userId))
      .limit(1);
    
    if (!user[0]) {
      return res.status(401).json({
        success: false,
        error: 'User not found'
      });
    }
    
    req.user = user[0];
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Token expired'
      });
    }
    
    res.status(401).json({
      success: false,
      error: 'Invalid token'
    });
  }
};

// Authorization middleware
export const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }
    
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Insufficient permissions'
      });
    }
    
    next();
  };
};
```

```javascript
// middleware/validation.js
import { body, validationResult } from 'express-validator';

// User validation middleware
export const validateUser = [
  body('email')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('username')
    .isLength({ min: 3, max: 30 }).withMessage('Username must be 3-30 characters')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores'),
  
  body('password')
    .optional()
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    next();
  }
];
```

```javascript
// middleware/errorHandler.js
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  // Handle different types of errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      details: err.errors
    });
  }
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized'
    });
  }
  
  if (err.code === '23505') { // PostgreSQL unique violation
    return res.status(409).json({
      success: false,
      error: 'Duplicate entry',
      details: err.detail
    });
  }
  
  // Default error
  res.status(err.status || 500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
};
```

### Database Configuration

```javascript
// config/database.js
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../models/schema.js';

let pool;
let db;

export const connectDB = async () => {
  try {
    pool = new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      max: 20, // Maximum number of clients
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    db = drizzle(pool, { schema });
    
    // Test connection
    await pool.query('SELECT NOW()');
    console.log('Database connected successfully');
    
    return db;
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error('Database not connected. Call connectDB first.');
  }
  return db;
};

export const closeDB = async () => {
  if (pool) {
    await pool.end();
    console.log('Database connection closed');
  }
};
```

## API Development Checklist

- [ ] RESTful route structure implemented
- [ ] Input validation for all endpoints
- [ ] Proper HTTP status codes returned
- [ ] Consistent error response format
- [ ] Authentication middleware applied
- [ ] Rate limiting for public endpoints
- [ ] CORS properly configured
- [ ] Request logging implemented
- [ ] Database connection pooling
- [ ] Transaction management for writes
- [ ] Health check endpoint added
- [ ] API documentation generated
- [ ] Environment-specific configurations
- [ ] Security headers (Helmet)
- [ ] Request size limits

## Response Format Standard

```javascript
// Success response
{
  "success": true,
  "data": { /* resource data */ },
  "message": "Operation completed successfully",
  "meta": { /* pagination, timestamps, etc */ }
}

// Error response
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE", // Optional error code
  "details": [ /* validation errors or details */ ]
}
```

## Route Testing Example

```javascript
// tests/user.routes.test.js
import request from 'supertest';
import app from '../app.js';

describe('User Routes', () => {
  let authToken;
  
  beforeAll(async () => {
    // Setup test data
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });
    authToken = res.body.token;
  });
  
  test('GET /users returns list of users', async () => {
    const res = await request(app)
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
  
  test('POST /users creates new user', async () => {
    const newUser = {
      email: 'new@example.com',
      username: 'newuser',
      password: 'securepassword123'
    };
    
    const res = await request(app)
      .post('/api/v1/users')
      .send(newUser);
    
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe(newUser.email);
  });
});
