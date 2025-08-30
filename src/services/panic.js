import api from './api';

// Panic service
export const panicService = {
  // Send a panic
  send: (panicData) => {
    return api.post('/panic/send', panicData);
  },
  
  // Cancel a panic
  cancel: (panicId) => {
    return api.post('/panic/cancel', { panic_id: panicId });
  },
  
  // Get panic history
  getHistory: (statusId = null) => {
    const params = statusId ? { status_id: statusId } : {};
    return api.get('/panic/history', { params });
  }
};