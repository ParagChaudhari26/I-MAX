import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext(null);

// Token refresh threshold - refresh when less than 5 minutes remaining
const TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes in milliseconds
// Check interval for token expiration
const TOKEN_CHECK_INTERVAL = 60 * 1000; // 1 minute in milliseconds

/**
 * Parse JWT token to extract payload
 * @param {string} token - JWT token
 * @returns {object|null} - Decoded payload or null if invalid
 */
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

/**
 * Check if token is expired or about to expire
 * @param {string} token - JWT token
 * @param {number} threshold - Time threshold in milliseconds
 * @returns {object} - { isExpired, isAboutToExpire, expiresIn }
 */
function checkTokenExpiration(token, threshold = TOKEN_REFRESH_THRESHOLD) {
  const payload = parseJwt(token);
  if (!payload || !payload.exp) {
    return { isExpired: true, isAboutToExpire: true, expiresIn: 0 };
  }

  const now = Date.now();
  const expiresAt = payload.exp * 1000; // Convert to milliseconds
  const expiresIn = expiresAt - now;

  return {
    isExpired: expiresIn <= 0,
    isAboutToExpire: expiresIn <= threshold,
    expiresIn,
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sessionExpired, setSessionExpired] = useState(false);
  
  // Refs for cleanup
  const tokenCheckIntervalRef = useRef(null);
  const isRefreshingRef = useRef(false);

  /**
   * Refresh the authentication token
   */
  const refreshToken = useCallback(async () => {
    const currentToken = localStorage.getItem('adminToken');
    if (!currentToken || isRefreshingRef.current) {
      return false;
    }

    isRefreshingRef.current = true;

    try {
      const data = await authApi.refresh(currentToken);

      // Update stored token and user data
      localStorage.setItem('adminToken', data.data.token);
      localStorage.setItem('adminUser', JSON.stringify(data.data.admin));
      
      setToken(data.data.token);
      setUser(data.data.admin);
      setSessionExpired(false);
      
      isRefreshingRef.current = false;
      return true;
    } catch (err) {
      console.error('Token refresh failed:', err);
      isRefreshingRef.current = false;
      return false;
    }
  }, []);

  /**
   * Handle session expiration - logout and show message
   */
  const handleSessionExpired = useCallback(() => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setToken(null);
    setUser(null);
    setSessionExpired(true);
    setError('Your session has expired. Please log in again.');
  }, []);

  /**
   * Check token status and refresh if needed
   */
  const checkAndRefreshToken = useCallback(async () => {
    const currentToken = localStorage.getItem('adminToken');
    if (!currentToken) {
      return;
    }

    const { isExpired, isAboutToExpire } = checkTokenExpiration(currentToken);

    if (isExpired) {
      // Token is expired, try to refresh
      const refreshed = await refreshToken();
      if (!refreshed) {
        handleSessionExpired();
      }
    } else if (isAboutToExpire) {
      // Token is about to expire, refresh proactively
      await refreshToken();
    }
  }, [refreshToken, handleSessionExpired]);

  // Check if user is authenticated on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    const storedUser = localStorage.getItem('adminUser');
    
    if (storedToken && storedUser) {
      const { isExpired } = checkTokenExpiration(storedToken);
      
      if (isExpired) {
        // Token is expired, try to refresh
        refreshToken().then(refreshed => {
          if (!refreshed) {
            handleSessionExpired();
          }
          setLoading(false);
        });
      } else {
        setToken(storedToken);
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          // Invalid stored user data, clear it
          localStorage.removeItem('adminUser');
          localStorage.removeItem('adminToken');
        }
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [refreshToken, handleSessionExpired]);

  // Set up periodic token check
  useEffect(() => {
    if (token) {
      // Initial check
      checkAndRefreshToken();

      // Set up interval for periodic checks
      tokenCheckIntervalRef.current = setInterval(checkAndRefreshToken, TOKEN_CHECK_INTERVAL);

      return () => {
        if (tokenCheckIntervalRef.current) {
          clearInterval(tokenCheckIntervalRef.current);
        }
      };
    }
  }, [token, checkAndRefreshToken]);

  const login = async (username, password) => {
    setError(null);
    setSessionExpired(false);
    setLoading(true);
    
    try {
      const data = await authApi.login(username, password);

      // Store token and user data
      localStorage.setItem('adminToken', data.data.token);
      localStorage.setItem('adminUser', JSON.stringify(data.data.admin));
      
      setToken(data.data.token);
      setUser(data.data.admin);
      setLoading(false);
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  const logout = useCallback(() => {
    // Clear interval
    if (tokenCheckIntervalRef.current) {
      clearInterval(tokenCheckIntervalRef.current);
    }
    
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setToken(null);
    setUser(null);
    setError(null);
    setSessionExpired(false);
  }, []);

  /**
   * Clear session expired state (for dismissing the message)
   */
  const clearSessionExpired = useCallback(() => {
    setSessionExpired(false);
    setError(null);
  }, []);

  const isAuthenticated = !!token && !!user;

  const value = {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    sessionExpired,
    login,
    logout,
    setError,
    refreshToken,
    clearSessionExpired,
    checkTokenExpiration: () => checkTokenExpiration(token),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
