import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

const GuestRoutes = ({ children }) => {
  const { isLogged } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      navigate('/dashboard');
    }
  }, [isLogged]);
  return <div>{children}</div>;
};

export default GuestRoutes;
