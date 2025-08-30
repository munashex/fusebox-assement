import api from './api';

// Auth service
export const authService = {
  // Login user
  login: (email, password) => {
    return api.post('/login', { email, password });
  },
  
  // Logout user 
  logout: () => {
    localStorage.removeItem('batman_token');
  },
  
  validateToken: () => {
    return api.get('/validate');
  }
};