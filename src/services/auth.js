import { apiClient } from './api.js';
// Authentication service
export const authService = {
  // Login user
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      });
      return response;
    } catch (error) {
      console.error('Login service error:', error);
      throw error;
    }
  },
  // Register new user
  register: async (name, email, password, role = 'candidate') => {
    try {
      const response = await apiClient.post('/auth/register', {
        name,
        email,
        password,
        role,
      });
      return response;
    } catch (error) {
      console.error('Register service error:', error);
      throw error;
    }
  },
  // Get user profile
  getProfile: async () => {
    try {
      const response = await apiClient.get('/auth/profile');
      return response;
    } catch (error) {
      console.error('Get profile service error:', error);
      throw error;
    }
  },
  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await apiClient.put('/auth/profile', userData);
      return response;
    } catch (error) {
      console.error('Update profile service error:', error);
      throw error;
    }
  },
  // Upload resume
  uploadResume: async (file) => {
    try {
      const formData = new FormData();
      formData.append('resume', file);
      const response = await apiClient.uploadFile('/auth/upload-resume', formData);
      return response;
    } catch (error) {
      console.error('Upload resume service error:', error);
      throw error;
    }
  },
  // Verify token (check if user is still authenticated)
  verifyToken: async () => {
    try {
      const response = await apiClient.get('/auth/profile');
      return response;
    } catch (error) {
      console.error('Token verification service error:', error);
      throw error;
    }
  },
};
