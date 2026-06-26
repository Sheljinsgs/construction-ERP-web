import { useState } from 'react';
import './AdminFeatureFlags.css';

/* ─── Mock Data ────────────────────────────────────────────────── */
const COMPANIES = [
  { id: 'c1', name: 'Clancy Group Construction & Interior', plan: 'Enterprise Plan' },
  { id: 'c2', name: 'Apex Urban Developments', plan: 'Professional Plan' },
  { id: 'c3', name: 'Summit Structural', plan: 'Basic Plan' },
];

const FLAG_CATEGORIES = [
  {
    id: 'cat-ai', title: 'AI Features', icon: '🧠', badge: 'Beta',
    flags: [
      { id: 'f-ai-1', name: 'AI Analytics', badge: 'Beta', desc: 'AI-powered insights across workforce and project data.', enabled: true },
      { id: 'f-ai-2', name: 'AI Forecasting', badge: 'Beta', desc: 'Predict project delays and budget overruns automatically.', enabled: false },
      { id: 'f-ai-3', name: 'AI Cost Prediction', badge: 'Experimental', desc: 'Real-time cost estimation based on historical patterns.', enabled: false },
    ]
  },
  {
    id: 'cat-int', title: 'Integrations', icon: '🔌',
    flags: [
      { id: 'f-int-1', name: 'WhatsApp Notifications', desc: 'Send alerts and reports via WhatsApp Business API.', enabled: true },
      { id: 'f-int-2', name: 'SMS Notifications', desc: 'Trigger SMS for critical workforce events.', enabled: true },
      { id: 'f-int-3', name: 'Email Integration', desc: 'Automated email workflows for approvals and reports.', enabled: true },
      { id: 'f-int-4', name: 'API Access', badge: 'Enterprise', desc: 'Allow third-party systems to connect via REST API.', enabled: false },
    ]
  },
  {
    id: 'cat-ent', title: 'Enterprise Features', icon: '🏢',
    flags: [
      { id: 'f-ent-1', name: 'Multi-Company Management', badge: 'Enterprise', desc: 'Manage multiple subsidiary companies under one umbrella.', enabled: true },
      { id: 'f-ent-2', name: 'Multi-Country Operations', badge: 'Enterprise', desc: 'Support compliance for operations across multiple countries.', enabled: true },
      { id: 'f-ent-3', name: 'Multi-Currency', badge: 'Enterprise', desc: 'Conduct operations in multiple currencies.', enabled: true },
      { id: 'f-ent-4', name: 'White Label', badge: 'Premium', desc: 'Rebrand the portal with custom logo, name and colors.', enabled: false },
    ]
  },
  {
    id: 'cat-sec', title: 'Security', icon: '🛡️',
    flags: [
      { id: 'f-sec-1', name: 'Two-Factor Authentication', desc: 'Require 2FA for all Admin and Manager logins.', enabled: true },
      { id: 'f-sec-2', name: 'IP Restriction', desc: 'Restrict access to whitelisted IP addresses.', enabled: false },
      { id: 'f-sec-3', name: 'Device Restriction', desc: 'Limit logins to registered and approved devices only.', enabled: false },
    ]
  },
  {
    id: 'cat-sys', title: 'System Features', icon: '⚙️',
    flags: [
      { id: 'f-sys-1', name: 'Beta Features', badge: 'Beta', desc: 'Early access to upcoming platform features.', enabled: true },
      { id: 'f-sys-2', name: 'Experimental Features', badge: 'Experimental', desc: 'Highly experimental features under active development.', enabled: false },
      { id: 'f-sys-3', name: 'Developer APIs', badge: 'New', desc: 'Unstable API endpoints and webhooks for developers.', enabled: false },
    ]
  }
];

export default function AdminFeatureFlags() {
  const [selectedCompany, setSelectedCompany] = useState(COMPANIES[0]);
  const [categories, setCategories] = useState(FLAG_CATEGORIES);
  const [hasChanges, setHasChanges] = useState(false);

  // Calculate stats
  let enabledCount = 0;
  let disabledCount = 0;
  let totalCount = 0;

  categories.forEach(cat => {
    cat.flags.forEach(f => {
      totalCount++;
      if (f.enabled) enabledCount++;
      else disabledCount++;
    });
  });

  const handleToggle = (catId, flagId) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id === catId) {
        return {
          ...cat,
          flags: cat.flags.map(f => {
            if (f.id === flagId) {
              return { ...f, enabled: !f.enabled };
            }
            return f;
          })
        };
      }
      return cat;
    }));
    setHasChanges(true);
  };

  const handleReset = () => {
    setCategories(FLAG_CATEGORIES);
    setHasChanges(false);
  };

  const handleSave = () => {
    setHasChanges(false);
  };

  return (
    <div className="aff-container">
      {/* ── Header ────────────────────────────────────────────── */}
      <div className="aff-header">
        <div>
          <div className="aff-breadcrumb">
            <span>🧩 Feature Management</span>
            <span className="aff-bc-sep">›</span>
            <span>Feature Flags</span>
          </div>
          <h1 className="aff-title">Feature Flags</h1>
          <p className="aff-sub">Control advanced platform capabilities and experimental features available per organization.</p>
        </div>
        <div className="aff-header-actions">
          <button className="aff-btn-outline" onClick={handleReset}>⟲ Reset Defaults</button>
          <button className="aff-btn-primary" onClick={handleSave}>💾 Save Changes</button>
        </div>
      </div>

      {/* ── Company Selector & Stats ──────────────────────────── */}
      <div className="aff-company-panel">
        <div className="aff-company-left">
          <div className="aff-company-dropdown">
            <div className="aff-company-avatar">CG</div>
            <div className="aff-company-info">
              <div className="aff-company-name">{selectedCompany.name}</div>
              <div className="aff-company-plan">{selectedCompany.plan}</div>
            </div>
            <div className="aff-dropdown-icon">▾</div>
          </div>
        </div>
        
        <div className="aff-company-right">
          <div className="aff-stat-pill aff-stat-pill--enabled">
            <div className="aff-stat-icon">🔋</div>
            <div className="aff-stat-text">
              <span className="aff-stat-val">{enabledCount}</span>
              <span className="aff-stat-lbl">ENABLED</span>
            </div>
          </div>
          <div className="aff-stat-pill aff-stat-pill--disabled">
            <div className="aff-stat-icon">🪫</div>
            <div className="aff-stat-text">
              <span className="aff-stat-val">{disabledCount}</span>
              <span className="aff-stat-lbl">DISABLED</span>
            </div>
          </div>
          <div className="aff-stat-pill aff-stat-pill--total">
            <div className="aff-stat-text">
              <span className="aff-stat-val">{totalCount}</span>
              <span className="aff-stat-lbl">TOTAL FLAGS</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Flags Grid ──────────────────────────────────────── */}
      <div className="aff-flags-grid">
        {categories.map(cat => (
          <div key={cat.id} className="aff-cat-card">
            <div className="aff-cat-header">
              <div className="aff-cat-title-wrap">
                <span className="aff-cat-icon">{cat.icon}</span>
                <h3 className="aff-cat-title">{cat.title}</h3>
                {cat.badge && <span className={`aff-badge aff-badge--${cat.badge.toLowerCase()}`}>{cat.badge}</span>}
              </div>
              <div className="aff-cat-progress">
                <span>{cat.flags.filter(f => f.enabled).length}/{cat.flags.length}</span>
              </div>
            </div>
            <div className="aff-flag-list">
              {cat.flags.map(flag => (
                <div key={flag.id} className="aff-flag-item">
                  <div className="aff-flag-info">
                    <div className="aff-flag-title-row">
                      <div className={`aff-flag-name ${!flag.enabled ? 'aff-flag-name--disabled' : ''}`}>{flag.name}</div>
                      {flag.badge && <span className={`aff-badge aff-badge--${flag.badge.toLowerCase()}`}>{flag.badge}</span>}
                    </div>
                    <div className="aff-flag-desc">{flag.desc}</div>
                  </div>
                  <div className="aff-flag-ctrl">
                    <button 
                      className={`aff-toggle ${flag.enabled ? 'aff-toggle--on' : ''}`}
                      onClick={() => handleToggle(cat.id, flag.id)}
                    >
                      <span className="aff-toggle-knob" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Floating Footer Banner ────────────────────────────── */}
      {hasChanges && (
        <div className="aff-footer-banner">
          <div className="aff-footer-info">
            <div className="aff-footer-icon">🚩</div>
            <div>
              <div className="aff-footer-title">Changes ready to deploy</div>
              <div className="aff-footer-desc">Feature changes apply instantly to the selected company workspace. Data loss or UI changes may affect platform stability.</div>
            </div>
          </div>
          <div className="aff-footer-actions">
            <button className="aff-btn-outline aff-btn-outline--dark" onClick={handleReset}>⟲ Reset</button>
            <button className="aff-btn-primary" onClick={handleSave}>💾 Save Changes</button>
          </div>
        </div>
      )}
    </div>
  );
}
