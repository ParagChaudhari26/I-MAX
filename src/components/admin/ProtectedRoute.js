import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, sessionExpired, clearSessionExpired } = useAuth();
  const location = useLocation();

  // Clear session expired state when component unmounts or user navigates away
  useEffect(() => {
    return () => {
      if (sessionExpired) {
        clearSessionExpired();
      }
    };
  }, [sessionExpired, clearSessionExpired]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-purple-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated or session expired
  if (!isAuthenticated || sessionExpired) {
    // Save the attempted URL for redirecting after login
    // Pass sessionExpired flag to show appropriate message on login page
    return (
      <Navigate 
        to="/admin/login" 
        state={{ 
          from: location, 
          sessionExpired: sessionExpired 
        }} 
        replace 
      />
    );
  }

  // Render children if authenticated
  return children;
}

export default ProtectedRoute;
