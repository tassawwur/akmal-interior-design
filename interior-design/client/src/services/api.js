import axios from 'axios';

// Base API URL - change to your actual API endpoint
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:5000/api';

// Create axios instance with defaults
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies/sessions
});

// Automatically attach token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle session expiration or unauthorized access
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      // You can redirect to login page here if needed
    }
    return Promise.reject(error);
  }
);

// Contact form APIs
export const submitContactForm = async (formData) => {
  try {
    // Use the Vercel API route directly instead of the Express backend
    const response = await axios.post('/api/contacts', formData);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Something went wrong. Please try again.',
    };
  }
};

export const getContacts = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/contacts?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch contacts.',
    };
  }
};

export const updateContact = async (id, data) => {
  try {
    const response = await api.put(`/contacts/${id}`, data);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update contact.',
    };
  }
};

export const deleteContact = async (id) => {
  try {
    const response = await api.delete(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to delete contact.',
    };
  }
};

// Admin authentication APIs
export const loginAdmin = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    if (response.data.success && response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Invalid credentials. Please try again.',
    };
  }
};

export const logoutAdmin = async () => {
  try {
    localStorage.removeItem('token');
    const response = await api.post('/auth/logout');
    return response.data;
  } catch (error) {
    // Still remove token even if server-side logout fails
    localStorage.removeItem('token');
    return {
      success: true, // Always consider client-side logout successful
      message: 'Logged out successfully',
    };
  }
};

export const getCurrentAdmin = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to authenticate.',
    };
  }
};

export default api; 