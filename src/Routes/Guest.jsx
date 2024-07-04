import React from 'react';
import { Navigate } from 'react-router-dom';

const GuestRoute = ({ children }) => {
  const token = localStorage.getItem('authorization');
  if (!token) {
    return children;
  } else {
    return <Navigate to="/Main" />;
  }
};

export default GuestRoute;
