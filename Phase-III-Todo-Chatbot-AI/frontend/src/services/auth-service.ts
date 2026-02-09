// frontend/src/services/auth-service.ts
import { authClient } from '@/lib/auth-client';
import { UserRegister, UserLogin, Token } from '@/types/api-types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

export const authService = {
  async register(user: UserRegister): Promise<Token> {
    console.log('Attempting registration at:', `${API_BASE_URL}/auth/register`);
    console.log('User data:', user);
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      console.log('Response status:', response.status);

      // Check if response is JSON before parsing
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text.substring(0, 200));
        
        // Check if it's a Hugging Face error
        if (text.includes('hf.co') || text.includes('huggingface')) {
          throw new Error('Backend server is down. Please restart your Hugging Face Space or run the backend locally.');
        }
        
        throw new Error('Cannot connect to backend server. Please ensure the backend is running on port 8000.');
      }

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Registration error:', errorData);
        throw new Error(errorData.detail || 'Registration was unsuccessful.');
      }
      
      const token: Token = await response.json();
      console.log('Registration successful');
      return token;
    } catch (error) {
      console.error('Registration fetch error:', error);
      throw error;
    }
  },

  async login(user: UserLogin): Promise<any> {
    // Direct API call to backend for authentication
    const formData = new FormData();
    formData.append('username', user.email);
    formData.append('password', user.password);

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      body: formData,
    });

    // Check if response is JSON before parsing
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response:', text.substring(0, 200));
      
      // Check if it's a Hugging Face error
      if (text.includes('hf.co') || text.includes('huggingface')) {
        throw new Error('Backend server is down. Please restart your Hugging Face Space or run the backend locally.');
      }
      
      throw new Error('Cannot connect to backend server. Please ensure the backend is running on port 8000.');
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Login failed');
    }

    const tokenData = await response.json();
    
    // Store token in localStorage for API calls
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', tokenData.access_token);
    }

    // Also use Better Auth for session management
    const result = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (result?.error) {
      throw new Error(result.error.message || 'Login failed');
    }
    return result;
  },

  async logout(): Promise<void> {
    await authClient.signOut();
  },
};
