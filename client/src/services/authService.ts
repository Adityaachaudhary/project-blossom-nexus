
import axios from 'axios';
import api from './api';

// JWT Token management
export const TOKEN_KEY = 'auth_token';

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
  // Set default authorization header for all requests
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  delete api.defaults.headers.common['Authorization'];
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

// Auth service functions
export const authService = {
  // Login user
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token } = response.data;
      setToken(token);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Register user
  register: async (userData: { 
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await api.post('/auth/register', userData);
      const { token } = response.data;
      setToken(token);
      return response.data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },

  // Logout user
  logout: () => {
    clearToken();
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Error getting current user:', error);
      throw error;
    }
  },
};

// Add token to API calls if it exists
const token = getToken();
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default authService;
