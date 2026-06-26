import axios from 'axios';

// Use relative path so Vite dev proxy handles it → no CORS
// In production set VITE_API_URL to your backend domain
const BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('erp_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Company login
export const companyLogin = (data) => api.post('/auth/login', data);

// Super admin login
export const adminLogin = (data) => api.post('/admin/login', data);

// Platform health
export const getHealth = () => api.get('/health');

// Platform stats
export const getPlatformStats = () => api.get('/admin/platform-stats');

// Admin dashboard data
export const getAdminCompanies     = () => api.get('/admin/companies');
export const getRecentActivity     = () => api.get('/admin/recent-activity');
export const getSupportTickets     = () => api.get('/admin/support-tickets');

export default api;
