import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

const PrivateRoutes = ({ children }) => {
  const { isLogged, initComplete } = useAuth();
  const navigate = useNavigate();
  console.log(initComplete);
  useEffect(() => {
    if (!isLogged && initComplete) {
      navigate('/login');
    }
  }, [initComplete, isLogged]);

  return <div>{initComplete && children}</div>;
};

export default PrivateRoutes;
