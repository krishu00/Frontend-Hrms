import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
         
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/check-auth`, {
          withCredentials: true
        });
        if (response.data.isAuthenticated) {
          setUser(response.data.user);
          setIsAuthenticated(true);
        } else {
          // Instead of setting isAuthenticated to false, we'll keep the previous state
          setIsAuthenticated(prev => prev);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // Keep the previous authentication state on error
        setIsAuthenticated(prev => prev);
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (user) => {
    try {
      setUser(user);
      setIsAuthenticated(true);
      // Store authentication state in localStorage
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
    setUser(null);
    setIsAuthenticated(false);
    // Remove authentication state from localStorage
    localStorage.removeItem('isAuthenticated');
  };

  // Check localStorage for authentication state on initial load
  useEffect(() => {
    const storedAuthState = localStorage.getItem('isAuthenticated');
    if (storedAuthState === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};




















