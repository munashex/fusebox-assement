import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/auth';


const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on app load
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = localStorage.getItem('batman_token');
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      
      if (response.status === 'success') {
        const { api_access_token } = response.data;
        
        // Store token securely
        localStorage.setItem('batman_token', api_access_token);
        setToken(api_access_token);
        
        return { success: true };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed. Please try again.' 
      };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('batman_token');
    setToken(null);
    setUser(null);
  };

  // Context value
  const value = {
    token,
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};