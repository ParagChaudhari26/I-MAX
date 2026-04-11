import React from 'react';
import { Navigate } from 'react-router-dom';

function UserProtectedRoute({ children }) {
  // Check if user is logged in via localStorage (existing auth system)
  const userToken = localStorage.getItem('userToken');
  const isAuthenticated = !!userToken;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default UserProtectedRoute;
