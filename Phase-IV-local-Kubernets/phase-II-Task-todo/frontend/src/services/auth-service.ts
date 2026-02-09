// frontend/src/services/auth-service.ts
import { signIn, signOut } from 'next-auth/react';
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
      console.log('Response headers:', response.headers);

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

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Login failed');
    }

    const tokenData = await response.json();
    
    // Store token in localStorage for API calls
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', tokenData.access_token);
    }

    // Also use NextAuth for session management
    const result = await signIn('credentials', {
      redirect: false,
      email: user.email,
      password: user.password,
      accessToken: tokenData.access_token,
    });

    if (result?.error) {
      throw new Error(result.error);
    }
    return result;
  },

  async logout(): Promise<void> {
    await signOut({ redirect: false });
  },
};
