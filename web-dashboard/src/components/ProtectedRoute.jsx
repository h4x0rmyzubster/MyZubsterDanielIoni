// src/components/ProtectedRoute.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCsrfToken } from '../services/api';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    fetchCsrfToken().catch(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    });
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return children;
};

export default ProtectedRoute;