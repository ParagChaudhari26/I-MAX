/**
 * API Service Layer
 * Provides centralized API communication with error handling and loading states
 * Requirements: 9.1, 9.4
 */

import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * Custom API Error class for consistent error handling
 */
export class ApiError extends Error {
  constructor(message, code, status, details = null) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

/**
 * Shared Axios client
 * - Keeps API surface stable for the rest of the frontend (no UI changes)
 * - Centralizes baseURL, headers, and error normalization
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});

/**
 * Normalize axios errors into ApiError for consistent handling
 * @param {any} error - axios error
 * @returns {ApiError}
 */
function toApiError(error) {
  // Server responded with non-2xx
  if (error?.response) {
    const status = error.response.status;
    const payload = error.response.data;
    const message = payload?.error?.message || payload?.message || 'An error occurred';
    const code = payload?.error?.code || payload?.code || 'UNKNOWN_ERROR';
    const details = payload?.error?.details || payload?.details || null;
    return new ApiError(message, code, status, details);
  }

  // Request made but no response / network failure / timeout
  const isTimeout = error?.code === 'ECONNABORTED';
  if (isTimeout) {
    return new ApiError(
      'Request timed out. Please try again.',
      'TIMEOUT',
      0
    );
  }

  return new ApiError(
    'Unable to connect to server. Please check your connection.',
    'NETWORK_ERROR',
    0
  );
}

/**
 * Generic request wrapper with error handling
 * @param {string} endpoint - API endpoint
 * @param {object} options - Axios request options
 * @returns {Promise<object>} - Response data
 */
async function requestApi(endpoint, options = {}) {
  try {
    // Inject preferred language header based on saved preference (if running in browser)
    let headers = options.headers || {};
    if (typeof window !== 'undefined') {
      const lang = localStorage.getItem('app_language');
      if (lang) {
        headers = {
          ...headers,
          'Accept-Language': lang,
        };
      }
    }

    const response = await apiClient.request({
      url: endpoint,
      method: options.method || 'GET',
      headers,
      data: options.data,
      params: options.params,
    });
    return response.data;
  } catch (error) {
    throw (error instanceof ApiError ? error : toApiError(error));
  }
}

/**
 * Authenticated request wrapper
 * @param {string} endpoint - API endpoint
 * @param {string} token - JWT token
 * @param {object} options - Axios options
 * @returns {Promise<object>} - Response data
 */
async function requestAuthApi(endpoint, token, options = {}) {
  if (!token) {
    throw new ApiError('Authentication required', 'AUTH_REQUIRED', 401);
  }

  return requestApi(endpoint, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    },
  });
}

// ============================================
// Public API Services (No authentication required)
// ============================================

/**
 * Fetch all published training programs
 * @returns {Promise<Array>} - Array of training programs
 */
export async function getPublicTrainingPrograms() {
  const response = await requestApi('/api/public/training-programs');
  return response.data || [];
}

/**
 * Fetch all published news and events
 * @returns {Promise<Array>} - Array of news/events
 */
export async function getPublicNewsEvents() {
  const response = await requestApi('/api/public/news-events');
  // Backend returns { success: true, data: newsEvents }
  // requestApi returns response.data which is { success: true, data: newsEvents }
  // So we need response.data to get the newsEvents array
  return (response && response.data) ? response.data : (Array.isArray(response) ? response : []);
}

/**
 * Fetch all approved testimonials
 * @returns {Promise<Array>} - Array of testimonials
 */
export async function getPublicTestimonials() {
  const response = await requestApi('/api/public/testimonials');
  // Backend returns { success: true, data: testimonials }
  // requestApi returns response.data which is { success: true, data: testimonials }
  // So we need response.data to get the testimonials array
  return (response && response.data) ? response.data : (Array.isArray(response) ? response : []);
}

/**
 * Fetch all published blogs
 * @returns {Promise<Array>} - Array of blogs
 */
export async function getPublicBlogs() {
  const response = await requestApi('/api/public/blogs');
  // Backend returns { success: true, data: blogs }
  // requestApi returns response.data which is { success: true, data: blogs }
  // So we need response.data to get the blogs array
  return (response && response.data) ? response.data : (Array.isArray(response) ? response : []);
}

/**
 * Fetch a single published blog by slug
 * @param {string} slug - Blog slug
 * @returns {Promise<object>} - Blog object
 */
export async function getPublicBlogBySlug(slug) {
  const response = await requestApi(`/api/public/blogs/${slug}`);
  return response.data;
}

// ============================================
// Admin API Services (Authentication required)
// ============================================

// Training Programs Admin API
export const trainingProgramsApi = {
  getAll: (token) => requestAuthApi('/api/admin/training-programs', token),
  getById: (token, id) => requestAuthApi(`/api/admin/training-programs/${id}`, token),
  create: (token, data) => requestAuthApi('/api/admin/training-programs', token, {
    method: 'POST',
    data,
  }),
  update: (token, id, data) => requestAuthApi(`/api/admin/training-programs/${id}`, token, {
    method: 'PUT',
    data,
  }),
  delete: (token, id) => requestAuthApi(`/api/admin/training-programs/${id}`, token, {
    method: 'DELETE',
  }),
};

// News & Events Admin API
export const newsEventsApi = {
  getAll: (token) => requestAuthApi('/api/admin/news-events', token),
  getById: (token, id) => requestAuthApi(`/api/admin/news-events/${id}`, token),
  create: (token, data) => requestAuthApi('/api/admin/news-events', token, {
    method: 'POST',
    data,
  }),
  update: (token, id, data) => requestAuthApi(`/api/admin/news-events/${id}`, token, {
    method: 'PUT',
    data,
  }),
  delete: (token, id) => requestAuthApi(`/api/admin/news-events/${id}`, token, {
    method: 'DELETE',
  }),
};

// Testimonials Admin API
export const testimonialsApi = {
  getAll: (token) => requestAuthApi('/api/admin/testimonials', token),
  getById: (token, id) => requestAuthApi(`/api/admin/testimonials/${id}`, token),
  create: (token, data) => requestAuthApi('/api/admin/testimonials', token, {
    method: 'POST',
    data,
  }),
  update: (token, id, data) => requestAuthApi(`/api/admin/testimonials/${id}`, token, {
    method: 'PUT',
    data,
  }),
  delete: (token, id) => requestAuthApi(`/api/admin/testimonials/${id}`, token, {
    method: 'DELETE',
  }),
  toggleApproval: (token, id) => requestAuthApi(`/api/admin/testimonials/${id}/approve`, token, {
    method: 'PATCH',
  }),
};

// Blogs Admin API
export const blogsApi = {
  getAll: (token) => requestAuthApi('/api/admin/blogs', token),
  getById: (token, id) => requestAuthApi(`/api/admin/blogs/${id}`, token),
  create: (token, data) => requestAuthApi('/api/admin/blogs', token, {
    method: 'POST',
    data,
  }),
  update: (token, id, data) => requestAuthApi(`/api/admin/blogs/${id}`, token, {
    method: 'PUT',
    data,
  }),
  delete: (token, id) => requestAuthApi(`/api/admin/blogs/${id}`, token, {
    method: 'DELETE',
  }),
  togglePublish: (token, id) => requestAuthApi(`/api/admin/blogs/${id}/toggle-publish`, token, {
    method: 'PATCH',
  }),
  uploadImage: async (token, file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch(`${API_BASE_URL}/api/admin/blogs/upload-image`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new ApiError(error.error?.message || 'Upload failed', error.error?.code);
    }
    
    return response.json();
  },
  deleteImage: (token, publicId) => requestAuthApi('/api/admin/blogs/delete-image', token, {
    method: 'DELETE',
    data: { publicId },
  }),
};

// Authentication API (Admin)
export const authApi = {
  login: (username, password) => requestApi('/api/auth/login', {
    method: 'POST',
    data: { username, password },
  }),
  logout: () => requestApi('/api/auth/logout', {
    method: 'POST',
  }),
  refresh: (token) => requestApi('/api/auth/refresh', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
  verify: (token) => requestApi('/api/auth/verify', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
};

// User Authentication API (Public users with email verification, tokens in Redis)
export const userAuthApi = {
  register: (username, email, password) => requestApi('/api/user-auth/register', {
    method: 'POST',
    data: { username, email, password },
  }),
  login: (email, password) => requestApi('/api/user-auth/login', {
    method: 'POST',
    data: { email, password },
  }),
  logout: (token) => requestAuthApi('/api/user-auth/logout', token, { method: 'POST' }),
  verifyEmail: (token) => requestApi('/api/user-auth/verify', {
    method: 'GET',
    params: { token },
  }),
  resendVerification: (email) => requestApi('/api/user-auth/resend-verification', {
    method: 'POST',
    data: { email },
  }),
  forgotPassword: (email) => requestApi('/api/user-auth/forgot-password', {
    method: 'POST',
    data: { email },
  }),
  resetPassword: (token, password) => requestApi(`/api/user-auth/reset-password/${token}`, {
    method: 'POST',
    data: { password },
  }),
  changePassword: (token, currentPassword, newPassword) => requestAuthApi('/api/user-auth/change-password', token, {
    method: 'POST',
    data: { currentPassword, newPassword },
  }),
};

// Banner Messages Admin API
export const bannerMessagesApi = {
  getAll: (token) => requestAuthApi('/api/admin/banner-messages', token),
  getById: (token, id) => requestAuthApi(`/api/admin/banner-messages/${id}`, token),
  create: (token, data) => requestAuthApi('/api/admin/banner-messages', token, {
    method: 'POST',
    data,
  }),
  update: (token, id, data) => requestAuthApi(`/api/admin/banner-messages/${id}`, token, {
    method: 'PUT',
    data,
  }),
  delete: (token, id) => requestAuthApi(`/api/admin/banner-messages/${id}`, token, {
    method: 'DELETE',
  }),
  toggle: (token, id) => requestAuthApi(`/api/admin/banner-messages/${id}/toggle`, token, {
    method: 'PATCH',
  }),
};

// Public Banner Messages API
export async function getPublicBannerMessages() {
  const response = await requestApi('/api/public/banner-messages');
  return (response && response.data) ? response.data : (Array.isArray(response) ? response : []);
}

// Public Gallery API
export async function getPublicGalleryImages(category) {
  const query = category ? `?category=${encodeURIComponent(category)}` : '';
  const response = await requestApi(`/api/public/gallery${query}`);
  return (response && response.data) ? response.data : (Array.isArray(response) ? response : []);
}

// Gallery Admin API
export const galleryApi = {
  getAll: (token) => requestAuthApi('/api/admin/gallery', token),
  create: (token, formData) => requestAuthApi('/api/admin/gallery', token, {
    method: 'POST',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  update: (token, id, data) => requestAuthApi(`/api/admin/gallery/${id}`, token, {
    method: 'PUT',
    data,
  }),
  delete: (token, id) => requestAuthApi(`/api/admin/gallery/${id}`, token, {
    method: 'DELETE',
  }),
};

// Chatbot API
export const chatApi = {
  sendMessage: (message) => requestApi('/api/public/chat', {
    method: 'POST',
    data: { message },
  }),
  getAllContexts: (token) => requestAuthApi('/api/admin/chatbot-context', token),
  saveContext: (token, data) => requestAuthApi('/api/admin/chatbot-context', token, {
    method: 'POST',
    data,
  }),
  updateContext: (token, id, data) => requestAuthApi(`/api/admin/chatbot-context/${id}`, token, {
    method: 'PUT',
    data,
  }),
  deleteContext: (token, id) => requestAuthApi(`/api/admin/chatbot-context/${id}`, token, {
    method: 'DELETE',
  }),
};

// User Specific APIs
export const userApi = {
  getNotifications: (token, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return requestAuthApi(`/api/user/notifications${queryString ? '?' + queryString : ''}`, token);
  },
  getUnreadCount: (token) => requestAuthApi('/api/user/notifications/unread-count', token),
  markAllAsRead: (token) => requestAuthApi('/api/user/notifications/mark-all-read', token, { method: 'PUT' }),
  markAsRead: (token, id) => requestAuthApi(`/api/user/notifications/${id}/read`, token, { method: 'PUT' }),
  
  // Prescriptions
  getPrescriptions: (token, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return requestAuthApi(`/api/user/prescriptions${queryString ? '?' + queryString : ''}`, token);
  },
  getPrescriptionById: (token, id) => requestAuthApi(`/api/user/prescriptions/${id}`, token),
  
  // Payment Receipts
  getPaymentReceipts: (token, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return requestAuthApi(`/api/user/payment-receipts${queryString ? '?' + queryString : ''}`, token);
  },
  getPaymentReceiptById: (token, id) => requestAuthApi(`/api/user/payment-receipts/${id}`, token),
};

// Admin Prescriptions API
export const prescriptionsApi = {
  getAll: (token, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return requestAuthApi(`/api/admin/prescriptions${queryString ? '?' + queryString : ''}`, token);
  },
  upload: (token, formData) => requestAuthApi('/api/admin/prescriptions/upload', token, {
    method: 'POST',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (token, id) => requestAuthApi(`/api/admin/prescriptions/${id}`, token, {
    method: 'DELETE',
  }),
};

// Admin Payment Receipts API
export const paymentReceiptsApi = {
  getAll: (token, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return requestAuthApi(`/api/admin/payment-receipts${queryString ? '?' + queryString : ''}`, token);
  },
  upload: (token, formData) => requestAuthApi('/api/admin/payment-receipts/upload', token, {
    method: 'POST',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (token, id) => requestAuthApi(`/api/admin/payment-receipts/${id}`, token, {
    method: 'DELETE',
  }),
};

export default {
  // Public APIs
  getPublicTrainingPrograms,
  getPublicNewsEvents,
  getPublicTestimonials,
  getPublicBlogs,
  getPublicBlogBySlug,
  getPublicBannerMessages,
  getPublicGalleryImages,
  // Admin APIs
  trainingProgramsApi,
  newsEventsApi,
  testimonialsApi,
  blogsApi,
  authApi,
  bannerMessagesApi,
  galleryApi,
  chatApi,
  userApi,
  prescriptionsApi,
  paymentReceiptsApi,
  // User Auth APIs
  userAuthApi,
  // Error class
  ApiError,
};
