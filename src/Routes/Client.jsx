import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

const ClientRoute = ({ children }) => {
  const token = localStorage.getItem('authorization');
  if (!token) return <Navigate to="/Login" />;

  try {
    const { role } = jwtDecode(token);
    if (role === 'CLIENT' || role === 'ADMIN') {
      return children;
    } else {
      return <Navigate to="/Login" />;
    }
  } catch (e) {
    return <Navigate to="/Login" />;
  }
};

export default ClientRoute;
