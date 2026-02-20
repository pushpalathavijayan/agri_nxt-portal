import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
};

export const farmService = {
  createFarm: (data) => api.post('/farm', data),
  getFarms: () => api.get('/farm'),
  getFarmById: (id) => api.get(`/farm/${id}`),
  updateFarm: (id, data) => api.put(`/farm/${id}`, data),
  deleteFarm: (id) => api.delete(`/farm/${id}`),
  addCropHistory: (id, data) => api.post(`/farm/${id}/crop-history`, data),
};

export const aiService = {
  recommendCrop: (data) => api.post('/ai/recommend', data),
  calculateProfit: (data) => api.post('/ai/profit', data),
};

export const schemeService = {
  getSchemes: () => api.get('/schemes'),
  getSchemesByState: (state) => api.get(`/schemes/state/${state}`),
  checkEligibility: (data) => api.post('/schemes/check-eligibility', data),
};

export const sustainabilityService = {
  calculate: (data) => api.post('/sustainability/calculate', data),
  getData: () => api.get('/sustainability'),
};

export const dashboardService = {
  getDashboard: () => api.get('/dashboard'),
};

export default api;
