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

// Auto-handle 401 responses (expired/invalid tokens)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isAdminRoute = error.config?.url?.includes('/admin/');
      // Don't auto-redirect on login attempts
      const isLoginRoute = error.config?.url?.includes('/login');
      if (!isLoginRoute && isAdminRoute) {
        localStorage.removeItem('erp_token');
        localStorage.removeItem('erp_admin');
        window.location.href = '/super-admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// ── Company Auth ─────────────────────────────────────────────────────
export const companyLogin = (data) => api.post('/auth/login', data);

// ── Super Admin Auth ─────────────────────────────────────────────────
export const adminLogin = (data) => api.post('/admin/login', data);
export const verifyAdminSession = () => api.get('/admin/verify-session');
export const adminLogout = () => api.post('/admin/logout');

// ── Platform ─────────────────────────────────────────────────────────
export const getHealth = () => api.get('/health');
export const getPlatformStats = () => api.get('/admin/platform-stats');

// ── Admin Dashboard Data ─────────────────────────────────────────────
export const getAdminCompanies     = () => api.get('/admin/companies');
export const getRecentActivity     = () => api.get('/admin/recent-activity');
export const getSupportTickets     = () => api.get('/admin/support-tickets');

export default api;

