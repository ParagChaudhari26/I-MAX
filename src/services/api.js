/**
 * API Service Layer
 * Provides centralized API communication with error handling and loading states
 * Requirements: 9.1, 9.4
 */

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
 * Generic fetch wrapper with error handling
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise<object>} - Response data
 */
async function fetchApi(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.error?.message || 'An error occurred',
        data.error?.code || 'UNKNOWN_ERROR',
        response.status,
        data.error?.details
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network or parsing errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new ApiError(
        'Unable to connect to server. Please check your connection.',
        'NETWORK_ERROR',
        0
      );
    }
    
    throw new ApiError(
      error.message || 'An unexpected error occurred',
      'UNEXPECTED_ERROR',
      0
    );
  }
}

/**
 * Authenticated fetch wrapper
 * @param {string} endpoint - API endpoint
 * @param {string} token - JWT token
 * @param {object} options - Fetch options
 * @returns {Promise<object>} - Response data
 */
async function fetchAuthApi(endpoint, token, options = {}) {
  if (!token) {
    throw new ApiError('Authentication required', 'AUTH_REQUIRED', 401);
  }

  return fetchApi(endpoint, {
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
  const response = await fetchApi('/api/public/training-programs');
  return response.data || [];
}

/**
 * Fetch all published news and events
 * @returns {Promise<Array>} - Array of news/events
 */
export async function getPublicNewsEvents() {
  const response = await fetchApi('/api/public/news-events');
  return response.data || [];
}

/**
 * Fetch all approved testimonials
 * @returns {Promise<Array>} - Array of testimonials
 */
export async function getPublicTestimonials() {
  const response = await fetchApi('/api/public/testimonials');
  return response.data || [];
}

/**
 * Fetch all published blogs
 * @returns {Promise<Array>} - Array of blogs
 */
export async function getPublicBlogs() {
  const response = await fetchApi('/api/public/blogs');
  return response.data || [];
}

/**
 * Fetch a single published blog by slug
 * @param {string} slug - Blog slug
 * @returns {Promise<object>} - Blog object
 */
export async function getPublicBlogBySlug(slug) {
  const response = await fetchApi(`/api/public/blogs/${slug}`);
  return response.data;
}

// ============================================
// Admin API Services (Authentication required)
// ============================================

// Training Programs Admin API
export const trainingProgramsApi = {
  getAll: (token) => fetchAuthApi('/api/admin/training-programs', token),
  getById: (token, id) => fetchAuthApi(`/api/admin/training-programs/${id}`, token),
  create: (token, data) => fetchAuthApi('/api/admin/training-programs', token, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (token, id, data) => fetchAuthApi(`/api/admin/training-programs/${id}`, token, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (token, id) => fetchAuthApi(`/api/admin/training-programs/${id}`, token, {
    method: 'DELETE',
  }),
};

// News & Events Admin API
export const newsEventsApi = {
  getAll: (token) => fetchAuthApi('/api/admin/news-events', token),
  getById: (token, id) => fetchAuthApi(`/api/admin/news-events/${id}`, token),
  create: (token, data) => fetchAuthApi('/api/admin/news-events', token, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (token, id, data) => fetchAuthApi(`/api/admin/news-events/${id}`, token, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (token, id) => fetchAuthApi(`/api/admin/news-events/${id}`, token, {
    method: 'DELETE',
  }),
};

// Testimonials Admin API
export const testimonialsApi = {
  getAll: (token) => fetchAuthApi('/api/admin/testimonials', token),
  getById: (token, id) => fetchAuthApi(`/api/admin/testimonials/${id}`, token),
  create: (token, data) => fetchAuthApi('/api/admin/testimonials', token, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (token, id, data) => fetchAuthApi(`/api/admin/testimonials/${id}`, token, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (token, id) => fetchAuthApi(`/api/admin/testimonials/${id}`, token, {
    method: 'DELETE',
  }),
  toggleApproval: (token, id) => fetchAuthApi(`/api/admin/testimonials/${id}/toggle-approval`, token, {
    method: 'PATCH',
  }),
};

// Blogs Admin API
export const blogsApi = {
  getAll: (token) => fetchAuthApi('/api/admin/blogs', token),
  getById: (token, id) => fetchAuthApi(`/api/admin/blogs/${id}`, token),
  create: (token, data) => fetchAuthApi('/api/admin/blogs', token, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (token, id, data) => fetchAuthApi(`/api/admin/blogs/${id}`, token, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (token, id) => fetchAuthApi(`/api/admin/blogs/${id}`, token, {
    method: 'DELETE',
  }),
  togglePublish: (token, id) => fetchAuthApi(`/api/admin/blogs/${id}/toggle-publish`, token, {
    method: 'PATCH',
  }),
};

// Authentication API
export const authApi = {
  login: (username, password) => fetchApi('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  }),
  logout: () => fetchApi('/api/auth/logout', {
    method: 'POST',
  }),
  refresh: (token) => fetchApi('/api/auth/refresh', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
  verify: (token) => fetchApi('/api/auth/verify', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
};

export default {
  // Public APIs
  getPublicTrainingPrograms,
  getPublicNewsEvents,
  getPublicTestimonials,
  getPublicBlogs,
  getPublicBlogBySlug,
  // Admin APIs
  trainingProgramsApi,
  newsEventsApi,
  testimonialsApi,
  blogsApi,
  authApi,
  // Error class
  ApiError,
};
