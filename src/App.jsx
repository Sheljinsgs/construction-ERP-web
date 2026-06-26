import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import CompanyLogin from './pages/CompanyLogin';
import SuperAdminLogin from './pages/SuperAdminLogin';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Splash → auto-routes based on path */}
        <Route path="/" element={<SplashScreen target="company" />} />
        <Route path="/super-admin" element={<SplashScreen target="admin" />} />

        {/* Login screens */}
        <Route path="/login" element={<CompanyLogin />} />
        <Route path="/super-admin/login" element={<SuperAdminLogin />} />

        {/* Post-login dashboards (placeholder) */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/super-admin/dashboard" element={<AdminDashboard />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
