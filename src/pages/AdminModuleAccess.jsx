import { useState, useEffect } from 'react';
import './AdminModuleAccess.css';

/* ─── Mock Data ────────────────────────────────────────────────── */
const COMPANIES = [
  { id: 'c1', name: 'Clancy Group Construction & Interior', plan: 'Enterprise Plan' },
  { id: 'c2', name: 'Apex Urban Developments', plan: 'Professional Plan' },
  { id: 'c3', name: 'Summit Structural', plan: 'Basic Plan' },
];

const MODULE_CATEGORIES = [
  {
    id: 'cat-org', title: 'Organization', icon: '🏢',
    modules: [
      { id: 'm-org-1', name: 'Organization Structure', core: true, enabled: true },
      { id: 'm-org-2', name: 'Branch Management', core: false, enabled: true },
      { id: 'm-org-3', name: 'User Management', core: true, enabled: true },
      { id: 'm-org-4', name: 'Roles & Permissions', core: false, enabled: true },
    ]
  },
  {
    id: 'cat-pm', title: 'Project Management', icon: '🏗️',
    modules: [
      { id: 'm-pm-1', name: 'Projects', core: false, enabled: true },
      { id: 'm-pm-2', name: 'Sites', core: false, enabled: true },
      { id: 'm-pm-3', name: 'Progress Tracking', core: false, enabled: false },
    ]
  },
  {
    id: 'cat-wf', title: 'Workforce', icon: '👷',
    modules: [
      { id: 'm-wf-1', name: 'Labour', core: false, enabled: true },
      { id: 'm-wf-2', name: 'Attendance', core: false, enabled: true },
      { id: 'm-wf-3', name: 'Overtime', core: false, enabled: false },
    ]
  },
  {
    id: 'cat-pr', title: 'Procurement', icon: '🛒',
    modules: [
      { id: 'm-pr-1', name: 'Vendors', core: false, enabled: true },
      { id: 'm-pr-2', name: 'Purchase Orders', core: false, enabled: true },
      { id: 'm-pr-3', name: 'Procurement', core: false, enabled: false },
    ]
  },
  {
    id: 'cat-inv', title: 'Inventory', icon: '📦',
    modules: [
      { id: 'm-inv-1', name: 'Materials', core: false, enabled: true },
      { id: 'm-inv-2', name: 'Stock Management', core: false, enabled: true },
      { id: 'm-inv-3', name: 'Transfers', core: false, enabled: false },
    ]
  },
  {
    id: 'cat-fin', title: 'Finance', icon: '💸',
    modules: [
      { id: 'm-fin-1', name: 'Expenses', core: false, enabled: true },
      { id: 'm-fin-2', name: 'Payroll', core: false, enabled: false },
      { id: 'm-fin-3', name: 'Salary Management', core: false, enabled: false },
    ]
  },
  {
    id: 'cat-rep', title: 'Reports', icon: '📊',
    modules: [
      { id: 'm-rep-1', name: 'Dashboard Reports', core: true, enabled: true },
      { id: 'm-rep-2', name: 'Analytics Reports', core: false, enabled: false },
      { id: 'm-rep-3', name: 'Financial Reports', core: false, enabled: false },
    ]
  }
];

export default function AdminModuleAccess() {
  const [selectedCompany, setSelectedCompany] = useState(COMPANIES[0]);
  const [categories, setCategories] = useState(MODULE_CATEGORIES);
  const [hasChanges, setHasChanges] = useState(false);

  // Calculate stats
  let enabledCount = 0;
  let disabledCount = 0;
  let coreCount = 0;

  categories.forEach(cat => {
    cat.modules.forEach(m => {
      if (m.enabled) enabledCount++;
      else disabledCount++;
      if (m.core) coreCount++;
    });
  });

  const handleToggle = (catId, modId) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id === catId) {
        return {
          ...cat,
          modules: cat.modules.map(m => {
            if (m.id === modId) {
              if (m.core) return m; // Cannot toggle core
              return { ...m, enabled: !m.enabled };
            }
            return m;
          })
        };
      }
      return cat;
    }));
    setHasChanges(true);
  };

  const handleReset = () => {
    setCategories(MODULE_CATEGORIES);
    setHasChanges(false);
  };

  const handleSave = () => {
    setHasChanges(false);
    // Add toast notification logic here if needed
  };

  return (
    <div className="ama-container">
      {/* ── Header ────────────────────────────────────────────── */}
      <div className="ama-header">
        <div>
          <div className="ama-breadcrumb">
            <span>🧩 Feature Management</span>
            <span className="ama-bc-sep">›</span>
            <span>Module Access</span>
          </div>
          <h1 className="ama-title">Module Access Management</h1>
          <p className="ama-sub">Enable or disable ERP modules for each client organization based on their plan and requirements.</p>
        </div>
        <div className="ama-header-actions">
          <button className="ama-btn-outline" onClick={handleReset}>⟲ Reset to Plan Defaults</button>
          <button className="ama-btn-primary" onClick={handleSave}>💾 Save Configuration</button>
        </div>
      </div>

      {/* ── Company Selector & Stats ──────────────────────────── */}
      <div className="ama-company-panel">
        <div className="ama-company-left">
          <label className="ama-label">Select Company</label>
          <div className="ama-company-dropdown">
            <div className="ama-company-avatar">CG</div>
            <div className="ama-company-info">
              <div className="ama-company-name">{selectedCompany.name}</div>
              <div className="ama-company-plan">{selectedCompany.plan}</div>
            </div>
            <div className="ama-dropdown-icon">▾</div>
          </div>
          <div className="ama-stats-row">
            <div className="ama-stat-pill ama-stat-pill--enabled">
              <div className="ama-stat-icon">✓</div>
              <div className="ama-stat-text">
                <span className="ama-stat-val">{enabledCount}</span>
                <span className="ama-stat-lbl">ENABLED MODULES</span>
              </div>
            </div>
            <div className="ama-stat-pill ama-stat-pill--disabled">
              <div className="ama-stat-icon">✕</div>
              <div className="ama-stat-text">
                <span className="ama-stat-val">{disabledCount}</span>
                <span className="ama-stat-lbl">DISABLED MODULES</span>
              </div>
            </div>
            <div className="ama-stat-pill ama-stat-pill--core">
              <div className="ama-stat-icon">🔒</div>
              <div className="ama-stat-text">
                <span className="ama-stat-val">{coreCount}</span>
                <span className="ama-stat-lbl">CORE MODULES</span>
              </div>
            </div>
          </div>
        </div>
        <div className="ama-company-right">
          <div className="ama-cr-header">
            <div className="ama-cr-avatar">CG</div>
            <div>
              <div className="ama-cr-name">{selectedCompany.name}</div>
              <div className="ama-cr-plan">Enterprise</div>
            </div>
          </div>
          <div className="ama-cr-details">
            <div className="ama-cr-row"><span>👤 Active Users</span> <strong>1,450</strong></div>
            <div className="ama-cr-row"><span>📍 Active Sites</span> <strong>12</strong></div>
            <div className="ama-cr-row"><span>📅 Subscription</span> <strong>Mar 15, 2026</strong></div>
            <div className="ama-cr-row"><span>🟢 Status</span> <strong>Active</strong></div>
          </div>
        </div>
      </div>

      {/* ── Modules Grid ──────────────────────────────────────── */}
      <div className="ama-modules-grid">
        {categories.map(cat => (
          <div key={cat.id} className="ama-cat-card">
            <div className="ama-cat-header">
              <div className="ama-cat-title-wrap">
                <span className="ama-cat-icon">{cat.icon}</span>
                <h3 className="ama-cat-title">{cat.title}</h3>
              </div>
              <div className="ama-cat-progress">
                <span>{cat.modules.filter(m => m.enabled).length}/{cat.modules.length} ENABLED</span>
                <div className="ama-progress-bar">
                  <div 
                    className="ama-progress-fill" 
                    style={{ width: `${(cat.modules.filter(m => m.enabled).length / cat.modules.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="ama-mod-list">
              {cat.modules.map(mod => (
                <div key={mod.id} className="ama-mod-item">
                  <div className="ama-mod-info">
                    <div className="ama-mod-dot" style={{ background: mod.enabled ? '#22c55e' : '#cbd5e1' }} />
                    <div>
                      <div className={`ama-mod-name ${!mod.enabled ? 'ama-mod-name--disabled' : ''}`}>{mod.name}</div>
                      {mod.core ? (
                        <div className="ama-mod-badge ama-mod-badge--core">Core Module</div>
                      ) : (
                        <div className="ama-mod-badge ama-mod-badge--standard">Standard</div>
                      )}
                    </div>
                  </div>
                  <div className="ama-mod-ctrl">
                    {mod.core && <span className="ama-mod-lock">🔒 Static</span>}
                    <button 
                      className={`ama-toggle ${mod.enabled ? 'ama-toggle--on' : ''} ${mod.core ? 'ama-toggle--locked' : ''}`}
                      onClick={() => handleToggle(cat.id, mod.id)}
                    >
                      <span className="ama-toggle-knob" />
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
        <div className="ama-footer-banner">
          <div className="ama-footer-info">
            <div className="ama-footer-icon">⚠️</div>
            <div>
              <div className="ama-footer-title">Unsaved Changes</div>
              <div className="ama-footer-desc">Changes will take effect immediately upon saving. Disabled modules will be hidden from the company ERP portal.</div>
            </div>
          </div>
          <div className="ama-footer-actions">
            <button className="ama-btn-outline ama-btn-outline--dark" onClick={handleReset}>⟲ Reset</button>
            <button className="ama-btn-primary" onClick={handleSave}>💾 Save Configuration</button>
          </div>
        </div>
      )}
    </div>
  );
}
