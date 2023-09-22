import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const auth = getAuth();
  const isAuthenticated = auth.currentUser != null;
  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? (
          <Component {...rest} />
        ) : (
          <Navigate to="/login" replace state={{ from: rest.path }} />
        )
      }
    />
  );
};

export default ProtectedRoute;