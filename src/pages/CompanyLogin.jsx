import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { companyLogin } from '../api/client';
import './LoginScreen.css';

export default function CompanyLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ identifier: '', password: '', remember: true });
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
    if (!form.identifier.trim() || !form.password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      const { data } = await companyLogin({
        identifier: form.identifier,
        password: form.password,
        rememberDevice: form.remember,
      });
      localStorage.setItem('erp_token', data.token);
      localStorage.setItem('erp_user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-screen">
      {/* ── Left Panel ────────────────────────────────────────────── */}
      <div className="login-panel login-panel--left">
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

          <div className="panel-tag">APEXBUILD ENTERPRISE ERP</div>

          <h2 className="panel-heading">
            Manage Projects, Workforce,<br />
            Finance and Operations<br />
            Across Your Organization.
          </h2>
          <p className="panel-tagline">Secure access to your company ERP environment.</p>

          {/* Stats grid */}
          <div className="stats-grid">
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
              <div className="stat-crew">👷 48 Active Crew Members</div>
            </div>

            {/* Card 2 */}
            <div className="stat-card">
              <div className="stat-header">
                <span>Workforce Today</span>
                <span className="stat-pill stat-pill--teal">LIVE</span>
              </div>
              <div className="wf-bars">
                {[60, 75, 55, 80, 70, 90, 65].map((h, i) => (
                  <div
                    key={i}
                    className={`wf-bar${i === 6 ? ' wf-bar--active' : ''}`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="stat-crew">👷 342 / 360 Signed In</div>
            </div>

            {/* Card 3 */}
            <div className="stat-card">
              <div className="stat-header">
                <span>Budget Utilization</span>
              </div>
              <div className="budget-amt">$4.84M <span className="budget-of">of $6.2M</span></div>
              <div className="progress-track">
                <div className="progress-fill progress-fill--orange" style={{ width: '78%' }} />
              </div>
              <div className="budget-note">78% allocated &nbsp;·&nbsp; Q4 FY2025</div>
            </div>

            {/* Card 4 */}
            <div className="stat-card">
              <div className="stat-header">
                <span>Active Sites</span>
              </div>
              <div className="sites-wrap">
                <div className="sites-row">
                  <span className="site-pill site-pill--green">On Track <b>8</b></span>
                  <span className="site-pill site-pill--red">Delayed <b>2</b></span>
                </div>
                <div className="sites-row">
                  <span className="site-pill site-pill--blue">Planned <b>4</b></span>
                  <span className="site-pill site-pill--gray">Paused <b>1</b></span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer stats */}
          <div className="panel-footer-stats">
            <div className="fs-item">
              <div className="fs-value">1,420</div>
              <div className="fs-label">ACTIVE EMPLOYEES</div>
            </div>
            <div className="fs-item">
              <div className="fs-value">12</div>
              <div className="fs-label">PROJECT SITES</div>
            </div>
            <div className="fs-item">
              <div className="fs-value">$48.5M</div>
              <div className="fs-label">CONTRACT VALUE</div>
            </div>
            <div className="fs-item fs-cert">
              <span>🛡️ ISO 27001-CERTIFIED</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel ───────────────────────────────────────────── */}
      <div className="login-panel login-panel--right">
        {/* Top bar */}
        <div className="right-topbar">
          <div className="env-indicator">
            <span className="green-dot" />
            Production Environment
          </div>
          <div className="ssl-badge">🔒 SSL Encrypted</div>
        </div>

        {/* Company card */}
        <div className="company-card">
          <div className="company-avatar">CG</div>
          <div className="company-info">
            <div className="company-name">Classy Group Construction & In...</div>
            <div className="company-type">Construction &amp; Interior Solutions</div>
          </div>
          <div className="active-badge">+ Active</div>
        </div>

        {/* Form */}
        <div className="form-wrap">
          <div className="form-icon-ring">
            <span>🏢</span>
          </div>
          <h2 className="form-title">Company ERP Access</h2>
          <p className="form-desc">
            Access your organization workspace and manage construction operations securely.
          </p>

          <form id="company-login-form" onSubmit={handleSubmit} className="login-form" noValidate>
            <div className="field-group">
              <label className="field-label" htmlFor="identifier">
                Employee ID / Email / Mobile
              </label>
              <div className="input-wrap">
                <span className="input-icon">👤</span>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  className="field-input"
                  placeholder="Enter your ID, email, or mobile number"
                  value={form.identifier}
                  onChange={handleChange}
                  autoComplete="username"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="company-password">Password</label>
              <div className="input-wrap">
                <span className="input-icon">🔑</span>
                <input
                  id="company-password"
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
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                  className="check-input"
                />
                <span className="check-custom" />
                Remember this device
              </label>
              <button type="button" className="link-btn" id="company-forgot-pw">
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="submit-btn"
              id="company-signin-btn"
              disabled={loading}
            >
              {loading ? (
                <><span className="btn-spinner" /> Signing in...</>
              ) : (
                <><span>→</span> Sign In To Workspace</>
              )}
            </button>
          </form>

          <div className="security-note">
            <span>⚠️</span>
            <span>
              Authorized personnel only. All login sessions are monitored and logged for security compliance.
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="right-bottombar">
          <div className="authorized-badge">🔒 AUTHORIZED PERSONNEL ONLY</div>
          <div className="bottom-links">
            <a href="#" className="bottom-link">Privacy Policy</a>
            <span className="sep">|</span>
            <span className="version-tag">ConstructERP Company v9.4</span>
          </div>
        </div>
      </div>
    </div>
  );
}
