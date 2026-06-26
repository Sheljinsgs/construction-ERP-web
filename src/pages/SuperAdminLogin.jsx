import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../api/client';
import './LoginScreen.css';

export default function SuperAdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', stayVerified: true });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.trim() || !form.password.trim()) {
      setError('Please enter your administrator email and access key.');
      return;
    }
    setLoading(true);
    try {
      const { data } = await adminLogin({
        email: form.email,
        password: form.password,
        stayVerified: form.stayVerified,
      });
      localStorage.setItem('erp_token', data.token);
      localStorage.setItem('erp_admin', JSON.stringify(data.admin));
      navigate('/super-admin/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Access denied. Invalid administrator credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-screen">
      {/* ── Left Panel ────────────────────────────────────────────── */}
      <div className="login-panel login-panel--left admin-left">
        <div className="panel-bg">
          <img src="/blueprint_bg.png" alt="" className="panel-bg-img" />
          <div className="panel-bg-overlay" />
        </div>

        <div className="panel-inner">
          {/* Brand */}
          <div className="brand">
            <div className="brand-icon">🏗️</div>
            <div>
              <div className="brand-name">APEXBUILD</div>
              <div className="brand-sub">ENTERPRISE ERP</div>
            </div>
          </div>

          <div className="panel-tag orange-tag">NEXT-GENERATION ERP</div>

          <h2 className="panel-heading">
            Manage Construction Projects,<br />
            Workforce, Finance and<br />
            Operations in one platform.
          </h2>

          {/* Admin stats grid */}
          <div className="stats-grid admin-stats">
            {/* Card 1 */}
            <div className="stat-card">
              <div className="stat-header">
                <span>Project Progress</span>
                <span className="stat-pill stat-pill--orange">82%</span>
              </div>
              <div className="stat-project">Hudson Yards – Phase 3B</div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: '82%' }} />
              </div>
              <div className="stat-crew">👷 48 Active Crews</div>
            </div>

            {/* Card 2 */}
            <div className="stat-card">
              <div className="stat-header">
                <span>Machinery Status</span>
                <span className="stat-pill stat-pill--teal">OPTIMAL</span>
              </div>
              <div className="stat-project machinery">12 Active Cranes</div>
              <div className="machinery-note">✅ Zero Safety Incidents</div>
            </div>
          </div>

          {/* Footer stats */}
          <div className="panel-footer-stats">
            <div className="fs-item">
              <div className="fs-value">340k+</div>
              <div className="fs-label">DAILY WORKFORCE</div>
            </div>
            <div className="fs-item">
              <div className="fs-value">$4.2B</div>
              <div className="fs-label">PROJECTS MANAGED</div>
            </div>
            <div className="fs-item fs-cert">
              <span>🌐 Global Multi-Tenant</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel ───────────────────────────────────────────── */}
      <div className="login-panel login-panel--right super-right-panel">
        {/* Top bar */}
        <div className="right-topbar">
          <div className="authorized-top-badge">
            🔒 AUTHORIZED PERSONNEL ONLY
          </div>
          <div className="ssl-badge">🔒 SSL Encrypted</div>
        </div>

        {/* Form */}
        <div className="form-wrap admin-form-wrap">
          <div className="form-icon-ring admin-icon">
            <span>🛡️</span>
          </div>
          <h2 className="form-title">Super Admin Access</h2>
          <p className="form-desc">
            Welcome back. Provide your administrative credentials to manage global ERP instances and company accounts.
          </p>

          <form id="admin-login-form" onSubmit={handleSubmit} className="login-form" noValidate>
            <div className="field-group">
              <label className="field-label" htmlFor="admin-email">
                Administrator Email
              </label>
              <div className="input-wrap">
                <span className="input-icon">👤</span>
                <input
                  id="admin-email"
                  name="email"
                  type="email"
                  className="field-input"
                  placeholder="admin@constructerp.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="username"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="admin-password">
                Access Key / Password
              </label>
              <div className="input-wrap">
                <span className="input-icon">🔑</span>
                <input
                  id="admin-password"
                  name="password"
                  type={showPw ? 'text' : 'password'}
                  className="field-input"
                  placeholder="••••••••••"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="toggle-pw"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label="Toggle password visibility"
                >
                  {showPw ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {error && <div className="error-msg">⚠️ {error}</div>}

            <div className="form-row-spaced">
              <label className="check-label">
                <input
                  type="checkbox"
                  name="stayVerified"
                  checked={form.stayVerified}
                  onChange={handleChange}
                  className="check-input"
                />
                <span className="check-custom" />
                Stay verified on this device
              </label>
              <button type="button" className="link-btn orange-link" id="recover-credentials-btn">
                Recover Credentials
              </button>
            </div>

            <button
              type="submit"
              className="submit-btn admin-submit"
              id="admin-signin-btn"
              disabled={loading}
            >
              {loading ? (
                <><span className="btn-spinner" /> Initializing session...</>
              ) : (
                <><span>🔒</span> Initialize Safe Session</>
              )}
            </button>
          </form>

          <div className="security-note admin-security-note">
            <span>⚠️</span>
            <span>
              Access to this node is logged. Unauthorized entry attempts will trigger immediate credential lockdown and IP logging.
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="right-bottombar admin-bottombar">
          <div className="bottom-links">
            <a href="#" className="bottom-link" id="access-protocol-link">Access Protocol</a>
            <span className="sep">|</span>
            <a href="#" className="bottom-link" id="api-status-link">API Status</a>
          </div>
          <span className="version-tag">ConstructERP Node Admin v9.4</span>
        </div>
      </div>
    </div>
  );
}
