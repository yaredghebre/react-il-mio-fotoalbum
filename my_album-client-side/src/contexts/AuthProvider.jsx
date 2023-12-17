import React, { useState, useEffect, useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [initComplete, setInitComplete] = useState(false);
  const navigate = useNavigate();

  // Log In and Registration
  const handleAuth = (resp) => {
    setUser(resp.user);
    setIsLogged(true);

    storeToken(resp.token);
  };

  const handleLogOut = () => {
    setUser(null);
    storeToken(null);

    localStorage.removeItem('token');

    setIsLogged(false);
  };

  const storeToken = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const fetchLoggedUser = async () => {
    try {
      const user = await axios.get('http://localhost:3000/users');
      setUser(user.data.users);
    } catch (error) {
      console.error('Something went wrong while fetching Users', error);
    }

    setUser(user);
    setIsLogged(true);
  };

  const initData = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      setToken(token);
      await fetchLoggedUser();
    }

    // console.log('render AuthContext useEffect');

    setInitComplete(true);
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <div>
      <AuthContext.Provider
        value={{
          user,
          isLogged,
          initComplete,
          handleAuth,
          handleLogOut,
        }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
