// AdminRoute.js

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AdminRoute = ({ element, ...rest }) => {
  const { user } = useAuth();

  // Check if user is authenticated and has admin role
  if (!user || !user.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <Route {...rest} element={element} />;
};

export default AdminRoute; // Export as default
