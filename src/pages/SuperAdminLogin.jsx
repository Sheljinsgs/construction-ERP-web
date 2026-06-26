import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin, verifyAdminSession } from '../api/client';
import './LoginScreen.css';

export default function SuperAdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '', stayVerified: true });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkingSession, setCheckingSession] = useState(true);
  const [lockout, setLockout] = useState(null);
  const [lockTimer, setLockTimer] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);

  // ── On mount: check if an existing session is still valid ──────────
  useEffect(() => {
    const token = localStorage.getItem('erp_token');
    const adminData = localStorage.getItem('erp_admin');
    if (token && adminData) {
      verifyAdminSession()
        .then((res) => {
          if (res.data.success) {
            navigate('/super-admin/dashboard', { replace: true });
          } else {
            clearSession();
          }
        })
        .catch(() => {
          clearSession();
        })
        .finally(() => setCheckingSession(false));
    } else {
      setCheckingSession(false);
    }
  }, [navigate]);

  // ── Lockout countdown timer ────────────────────────────────────────
  useEffect(() => {
    if (!lockout) return;
    setLockTimer(lockout.retryAfterSec);
    const interval = setInterval(() => {
      setLockTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setLockout(null);
          setError('');
          setAttemptCount(0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockout]);

  function clearSession() {
    localStorage.removeItem('erp_token');
    localStorage.removeItem('erp_admin');
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username.trim()) {
      setError('Please enter your administrator username.');
      return;
    }
    if (!form.password.trim()) {
      setError('Please enter your access key.');
      return;
    }
    if (form.password.length < 6) {
      setError('Access key must be at least 6 characters.');
      return;
    }
    if (lockout) {
      setError(`Account locked. Try again in ${Math.ceil(lockTimer / 60)} minute(s).`);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data } = await adminLogin({
        username: form.username,
        password: form.password,
        stayVerified: form.stayVerified,
      });

      localStorage.setItem('erp_token', data.token);
      localStorage.setItem('erp_admin', JSON.stringify(data.admin));

      if (form.stayVerified) {
        localStorage.setItem('erp_stay_verified', 'true');
      } else {
        localStorage.removeItem('erp_stay_verified');
      }

      setAttemptCount(0);
      navigate('/super-admin/dashboard');
    } catch (err) {
      const resp = err.response;
      if (resp?.status === 429 && resp.data?.locked) {
        setLockout({ retryAfterSec: resp.data.retryAfterSec });
        setError(resp.data.message);
      } else if (resp?.status === 422) {
        const msgs = resp.data.errors?.map((e) => e.msg).join(' ');
        setError(msgs || 'Please check your input.');
      } else {
        setAttemptCount((c) => c + 1);
        setError(
          resp?.data?.message ||
          'Access denied. Invalid administrator credentials.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Show spinner while checking existing session
  if (checkingSession) {
    return (
      <div className="login-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: '#94a3b8' }}>
          <div className="btn-spinner" style={{ width: 32, height: 32, margin: '0 auto 12px' }} />
          <div>Verifying session…</div>
        </div>
      </div>
    );
  }

  const isLocked = !!lockout;
  const formatTime = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="login-screen">
      {/* ── Left Panel ────────────────────────────────────────────── */}
      <div className="login-panel login-panel--left admin-left">
        <div className="panel-bg">
          <img src="/blueprint_bg.png" alt="" className="panel-bg-img" />
          <div className="panel-bg-overlay" />
        </div>

        <div className="panel-inner">
          <div className="brand">
            <div className="brand-icon">🏗️</div>
            <div>
              <div className="brand-name">DEMO BUILD</div>
              <div className="brand-sub">ENTERPRISE ERP</div>
            </div>
          </div>

          <div className="panel-tag orange-tag">NEXT-GENERATION ERP</div>

          <h2 className="panel-heading">
            Manage Construction Projects,<br />
            Workforce, Finance and<br />
            Operations in one platform.
          </h2>

          <div className="stats-grid admin-stats">
            <div className="stat-card">
              <div className="stat-header">
                <span>Platform Tenants</span>
                <span className="stat-pill stat-pill--teal">LIVE</span>
              </div>
              <div className="stat-project machinery">148 Active Companies</div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: '89%' }} />
              </div>
              <div className="stat-crew">🏢 12,480 Users Across Tenants</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span>System Uptime &amp; SLA</span>
                <span className="stat-pill stat-pill--teal">99.98%</span>
              </div>
              <div className="stat-project machinery">$2.84M Annual Revenue</div>
              <div className="machinery-note">✅ All Services Operational</div>
            </div>
          </div>

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
        <div className="right-topbar">
          <div className="authorized-top-badge">
            🔒 AUTHORIZED PERSONNEL ONLY
          </div>
          <div className="ssl-badge">🔒 SSL Encrypted</div>
        </div>

        <div className="form-wrap admin-form-wrap">
          <div className="form-icon-ring admin-icon">
            <span>🛡️</span>
          </div>
          <h2 className="form-title">Super Admin Access</h2>
          <p className="form-desc">
            Provide your administrator credentials to manage global ERP instances and company accounts.
          </p>

          <form id="admin-login-form" onSubmit={handleSubmit} className="login-form" noValidate>
            <div className="field-group">
              <label className="field-label" htmlFor="admin-username">
                Administrator Username
              </label>
              <div className="input-wrap">
                <span className="input-icon">👤</span>
                <input
                  id="admin-username"
                  name="username"
                  type="text"
                  className="field-input"
                  placeholder="Enter admin username"
                  value={form.username}
                  onChange={handleChange}
                  autoComplete="username"
                  disabled={loading || isLocked}
                  autoFocus
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
                  disabled={loading || isLocked}
                />
                <button
                  type="button"
                  className="toggle-pw"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label="Toggle password visibility"
                  disabled={isLocked}
                >
                  {showPw ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {error && (
              <div className="error-msg">
                ⚠️ {error}
                {isLocked && (
                  <div style={{ marginTop: 6, fontSize: '13px', fontWeight: 700, color: '#ef4444' }}>
                    🔒 Lockout expires in: {formatTime(lockTimer)}
                  </div>
                )}
              </div>
            )}

            {attemptCount > 0 && attemptCount < 5 && !isLocked && (
              <div style={{
                fontSize: '11.5px',
                color: attemptCount >= 3 ? '#ef4444' : '#f59e0b',
                fontWeight: 600,
                padding: '4px 0',
              }}>
                ⚠️ {5 - attemptCount} attempt(s) remaining before lockout
              </div>
            )}

            <div className="form-row-spaced">
              <label className="check-label">
                <input
                  type="checkbox"
                  name="stayVerified"
                  checked={form.stayVerified}
                  onChange={handleChange}
                  className="check-input"
                  disabled={isLocked}
                />
                <span className="check-custom" />
                Stay verified for 7 days
              </label>
            </div>

            <button
              type="submit"
              className="submit-btn admin-submit"
              id="admin-signin-btn"
              disabled={loading || isLocked}
            >
              {loading ? (
                <><span className="btn-spinner" /> Authenticating…</>
              ) : isLocked ? (
                <><span>🔒</span> Account Locked</>
              ) : (
                <><span>🔒</span> Initialize Secure Session</>
              )}
            </button>
          </form>

          <div className="security-note admin-security-note">
            <span>⚠️</span>
            <span>
              Access to this node is logged and monitored. Unauthorized entry attempts will trigger immediate credential lockdown and IP logging. Max 5 attempts allowed.
            </span>
          </div>
        </div>

        <div className="right-bottombar admin-bottombar">
          <span className="version-tag">Demo Build Admin v9.4</span>
        </div>
      </div>
    </div>
  );
}
