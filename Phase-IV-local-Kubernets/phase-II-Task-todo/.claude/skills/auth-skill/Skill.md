---
name: auth-skill
description: Implement secure authentication flows with signup, signin, password hashing, JWT tokens, and Better Auth integration. Use for user authentication systems.
---

# Authentication Implementation

## Instructions

1. **Core Authentication Flow**
   - User signup with validation
   - Secure password hashing (bcrypt/Argon2)
   - JWT token generation and validation
   - Protected route middleware

2. **Security Requirements**
   - Password hashing with salt
   - JWT expiration and refresh tokens
   - Input sanitization and validation
   - Rate limiting for login attempts

3. **Better Auth Integration**
   - OAuth provider configuration
   - Session management
   - Multi-factor authentication setup
   - Social login (Google, GitHub, etc.)

## Best Practices

- Never store plain-text passwords
- Use HTTPS in production
- Implement CSRF protection
- Store refresh tokens securely (HTTP-only cookies)
- Validate all user inputs server-side
- Use environment variables for secrets
- Log authentication events for security monitoring

## Example Structure

### Backend (Node.js/Express)

```javascript
// Authentication middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });
  
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Signup route
app.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create user
    const user = await User.create({ 
      email, 
      password: hashedPassword 
    });
    
    // Generate JWT
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );
    
    res.status(201).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Signin route
app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    
    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid credentials' });
    
    // Generate tokens
    const accessToken = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '15m' }
    );
    
    const refreshToken = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_REFRESH_SECRET, 
      { expiresIn: '7d' }
    );
    
    // Store refresh token securely
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    res.json({ 
      accessToken, 
      userId: user._id,
      email: user.email 
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});
```

### Frontend (React Example)

```javascript
// Authentication context
import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  
  const signup = async (email, password) => {
    try {
      const response = await axios.post('/api/signup', { email, password });
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      setUser({ id: response.data.userId, email });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error };
    }
  };
  
  const signin = async (email, password) => {
    try {
      const response = await axios.post('/api/signin', { email, password });
      localStorage.setItem('token', response.data.accessToken);
      setToken(response.data.accessToken);
      setUser({ id: response.data.userId, email: response.data.email });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error };
    }
  };
  
  const signout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };
  
  useEffect(() => {
    if (token) {
      // Validate token and fetch user data
      axios.get('/api/me', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(response => {
        setUser(response.data);
      }).catch(() => {
        signout();
      });
    }
  }, [token]);
  
  return (
    <AuthContext.Provider value={{ user, token, signup, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

### Better Auth Configuration

```javascript
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // Update session every day
  },
  rateLimit: {
    enabled: true,
    window: 15 * 60 * 1000, // 15 minutes
    max: 10, // Max 10 attempts per window
  },
});
```

## Security Checklist

- [ ] Password hashing with appropriate work factor
- [ ] JWT tokens signed with strong secret
- [ ] Refresh token rotation implemented
- [ ] Input validation on all endpoints
- [ ] Rate limiting on authentication endpoints
- [ ] CORS properly configured
- [ ] Secure cookie settings for production
- [ ] Email verification for signups
- [ ] Password reset flow with secure tokens
- [ ] Logging of authentication attempts
