/**
 * Input Sanitization Middleware
 * Provides protection against XSS attacks and NoSQL injection
 * Requirements: 10.4
 */

/**
 * Recursively sanitize an object by escaping HTML entities
 * @param {any} obj - Object to sanitize
 * @returns {any} - Sanitized object
 */
function sanitizeObject(obj) {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === 'string') {
    return sanitizeString(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }

  if (typeof obj === 'object') {
    const sanitized = {};
    for (const key of Object.keys(obj)) {
      // Skip MongoDB operators that start with $
      if (key.startsWith('$')) {
        continue; // Remove potential NoSQL injection operators
      }
      sanitized[sanitizeString(key)] = sanitizeObject(obj[key]);
    }
    return sanitized;
  }

  return obj;
}

/**
 * Sanitize a string by escaping HTML entities
 * @param {string} str - String to sanitize
 * @returns {string} - Sanitized string
 */
function sanitizeString(str) {
  if (typeof str !== 'string') {
    return str;
  }

  // Remove null bytes
  str = str.replace(/\0/g, '');

  // Escape HTML entities to prevent XSS
  const htmlEntities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };

  return str.replace(/[&<>"'/]/g, char => htmlEntities[char]);
}

/**
 * Middleware to sanitize request body, query, and params
 */
function sanitizeInput(req, res, next) {
  // Sanitize body
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }

  // Sanitize query parameters
  if (req.query) {
    req.query = sanitizeObject(req.query);
  }

  // Sanitize URL parameters
  if (req.params) {
    req.params = sanitizeObject(req.params);
  }

  next();
}

/**
 * Middleware to prevent NoSQL injection by removing $ operators from input
 */
function preventNoSQLInjection(req, res, next) {
  const removeOperators = (obj) => {
    if (obj === null || obj === undefined) {
      return obj;
    }

    if (typeof obj === 'string') {
      // Check for potential injection patterns
      if (obj.includes('$') && (obj.includes('{') || obj.includes('['))) {
        return obj.replace(/\$/g, '');
      }
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(item => removeOperators(item));
    }

    if (typeof obj === 'object') {
      const cleaned = {};
      for (const key of Object.keys(obj)) {
        // Remove keys that start with $ (MongoDB operators)
        if (!key.startsWith('$')) {
          cleaned[key] = removeOperators(obj[key]);
        }
      }
      return cleaned;
    }

    return obj;
  };

  if (req.body) {
    req.body = removeOperators(req.body);
  }

  if (req.query) {
    req.query = removeOperators(req.query);
  }

  next();
}

/**
 * Validate content type for POST/PUT/PATCH requests
 */
function validateContentType(req, res, next) {
  const methodsRequiringBody = ['POST', 'PUT', 'PATCH'];
  
  if (methodsRequiringBody.includes(req.method)) {
    const contentType = req.headers['content-type'];
    
    // Allow requests without body (content-length: 0)
    if (req.headers['content-length'] === '0') {
      return next();
    }

    // Allow multipart/form-data for file uploads
    if (contentType && contentType.includes('multipart/form-data')) {
      return next();
    }

    // Require JSON content type for API requests
    if (contentType && !contentType.includes('application/json')) {
      return res.status(415).json({
        success: false,
        error: {
          code: 'UNSUPPORTED_MEDIA_TYPE',
          message: 'Content-Type must be application/json or multipart/form-data'
        }
      });
    }
  }

  next();
}

module.exports = {
  sanitizeInput,
  preventNoSQLInjection,
  validateContentType,
  sanitizeString,
  sanitizeObject
};
