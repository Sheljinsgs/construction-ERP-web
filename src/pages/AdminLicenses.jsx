import { useState } from 'react';
import './AdminLicenses.css';

/* ─── Mock data ────────────────────────────────────────────────── */
const LICENSES = [
  {
    id: 'LIC-MGD-68812', company: 'Maximus Global D...', fullName: 'Maximus Global Developments',
    initials: 'MX', color: '#f97316', plan: 'Enterprise',
    startDate: 'Jan 15, 2025', expiryDate: 'Jan 15, 2026',
    users: 2100, maxUsers: null, sites: 24, maxSites: null,
    storage: 340, maxStorage: 500,
    status: 'active',
    history: [
      { icon: '🪪', label: 'License Issued',          date: 'Jan 15, 2025' },
      { icon: '⬆️', label: 'Upgraded to Enterprise', date: 'Jul 1, 2025'  },
      { icon: '💾', label: 'Storage expanded',        date: 'Aug 10, 2025' },
    ],
  },
  {
    id: 'LIC-MGT-00028', company: 'Classy Group Cons...', fullName: 'Classy Group Construction',
    initials: 'CG', color: '#22c55e', plan: 'Enterprise',
    startDate: 'Mar 12, 2025', expiryDate: 'Mar 12, 2026',
    users: 1420, maxUsers: null, sites: 12, maxSites: null,
    storage: 210, maxStorage: 500,
    status: 'active',
    history: [
      { icon: '🪪', label: 'License Issued',  date: 'Mar 12, 2025' },
      { icon: '💾', label: 'Storage upgraded', date: 'Jun 5, 2025' },
    ],
  },
  {
    id: 'LIC-PRO-44871', company: 'Apex Urban Devel...', fullName: 'Apex Urban Developments',
    initials: 'AU', color: '#f59e0b', plan: 'Professional',
    startDate: 'Aug 22, 2025', expiryDate: 'Nov 22, 2025',
    users: 440, maxUsers: 500, sites: 5, maxSites: 20,
    storage: 80, maxStorage: 200,
    status: 'expiring',
    history: [
      { icon: '🪪', label: 'License Issued', date: 'Aug 22, 2025' },
    ],
  },
  {
    id: 'LIC-PRO-88862', company: 'Summit Structural ...', fullName: 'Summit Structural Engineering',
    initials: 'SS', color: '#3b82f6', plan: 'Professional',
    startDate: 'Sep 1, 2025', expiryDate: 'Dec 1, 2025',
    users: 205, maxUsers: 500, sites: 4, maxSites: 30,
    storage: 55, maxStorage: 200,
    status: 'expiring',
    history: [
      { icon: '🪪', label: 'License Issued', date: 'Sep 1, 2025' },
    ],
  },
  {
    id: 'LIC-BAS-00028', company: 'RedBrick Civil Con...', fullName: 'RedBrick Civil Contractors',
    initials: 'RB', color: '#ef4444', plan: 'Basic',
    startDate: 'Jul 1, 2025', expiryDate: 'Oct 1, 2025',
    users: 95, maxUsers: 100, sites: 2, maxSites: 5,
    storage: 20, maxStorage: 50,
    status: 'suspended',
    history: [
      { icon: '🪪', label: 'License Issued',  date: 'Jul 1, 2025'  },
      { icon: '🚫', label: 'License Suspended', date: 'Oct 5, 2025' },
    ],
  },
  {
    id: 'LIC-PRO-88877', company: 'Horizon Solar & Gr...', fullName: 'Horizon Solar & Green Tech',
    initials: 'HZ', color: '#0ea5e9', plan: 'Professional',
    startDate: 'Jan 8, 2025', expiryDate: 'Jan 8, 2026',
    users: 310, maxUsers: 500, sites: 6, maxSites: 20,
    storage: 120, maxStorage: 200,
    status: 'active',
    history: [
      { icon: '🪪', label: 'License Issued',  date: 'Jan 8, 2025'  },
      { icon: '⬆️', label: 'Plan upgraded',    date: 'Apr 15, 2025' },
    ],
  },
];

const FILTER_TABS = [
  { key: 'all',        label: 'All',        count: 134 },
  { key: 'active',     label: 'Active',     count: 111 },
  { key: 'trial',      label: 'Trial',      count: 16  },
  { key: 'expiring',   label: 'Expiring',   count: 7   },
  { key: 'suspended',  label: 'Suspended',  count: 4   },
  { key: 'enterprise', label: 'Enterprise', count: 44  },
];

const STATUS_CONFIG = {
  active:    { label: 'Active',    cls: 'lic-status--active'    },
  trial:     { label: 'Trial',     cls: 'lic-status--trial'     },
  expiring:  { label: 'Expiring',  cls: 'lic-status--expiring'  },
  suspended: { label: 'Suspended', cls: 'lic-status--suspended' },
};

const PLAN_COLORS = {
  Enterprise:   { bg: 'rgba(249,115,22,0.1)',  color: '#f97316' },
  Professional: { bg: 'rgba(59,130,246,0.1)',  color: '#3b82f6' },
  Basic:        { bg: 'rgba(100,116,139,0.1)', color: '#64748b' },
};

/* ─── Progress bar ─────────────────────────────────────────────── */
function UsageBar({ value, max, label, icon, color }) {
  const pct = max ? Math.min(Math.round((value / max) * 100), 100) : 42;
  const displayMax = max ? max.toLocaleString() : 'Unlimited';
  return (
    <div className="lic-usage-row">
      <div className="lic-usage-top">
        <span className="lic-usage-icon" style={{ color }}>{icon}</span>
        <span className="lic-usage-val">{value.toLocaleString()}</span>
        <span className="lic-usage-of">of {displayMax}</span>
      </div>
      <div className="lic-usage-track">
        <div className="lic-usage-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <div className="lic-usage-pct">{pct}% utilized</div>
    </div>
  );
}

/* ─── Inline mini-bar (table cells) ────────────────────────────── */
function MiniBar({ value, max, color }) {
  const pct = max ? Math.min(Math.round((value / max) * 100), 100) : 40;
  return (
    <div className="lic-mini-bar-wrap">
      <div className="lic-mini-label">
        {value.toLocaleString()}/{max ? max.toLocaleString() : 'Unlimited'}
      </div>
      <div className="lic-mini-track">
        <div className="lic-mini-fill" style={{ width: `${pct}%`, background: color || '#f5a623' }} />
      </div>
    </div>
  );
}

/* ─── Detail panel ─────────────────────────────────────────────── */
function LicenseDetail({ lic, onClose }) {
  if (!lic) return (
    <div className="lic-detail lic-detail--empty">
      <span style={{ fontSize: 36, opacity: 0.25 }}>🪪</span>
      <span style={{ fontSize: 13, color: '#94a3b8' }}>Select a license to view details</span>
    </div>
  );

  const planColor = PLAN_COLORS[lic.plan] || {};

  return (
    <div className="lic-detail">
      {/* Header */}
      <div className="lic-detail-header">
        <div className="lic-detail-avatar" style={{ background: lic.color }}>{lic.initials}</div>
        <div className="lic-detail-company-info">
          <div className="lic-detail-company-name">{lic.fullName}</div>
          <div className="lic-detail-lic-id">{lic.id}</div>
        </div>
      </div>
      <div className="lic-detail-badges">
        <span className="lic-plan-badge" style={{ background: planColor.bg, color: planColor.color }}>
          PLAN {lic.plan}
        </span>
        <span className={`lic-status-badge ${STATUS_CONFIG[lic.status]?.cls}`}>
          STATUS {STATUS_CONFIG[lic.status]?.label}
        </span>
      </div>

      <div className="lic-detail-scroll">
        {/* Plan Info */}
        <div className="lic-detail-section">
          <div className="lic-section-title">PLAN INFORMATION</div>
          <div className="lic-plan-info-row">
            <span className="lic-plan-info-icon">🟠</span>
            <span className="lic-plan-info-label">Start Date</span>
            <span className="lic-plan-info-val">{lic.startDate}</span>
          </div>
          <div className="lic-plan-info-row">
            <span className="lic-plan-info-icon">🟠</span>
            <span className="lic-plan-info-label">Expiry Date</span>
            <span className="lic-plan-info-val">{lic.expiryDate}</span>
          </div>
        </div>

        {/* User Usage */}
        <div className="lic-detail-section">
          <div className="lic-section-title">USER USAGE</div>
          <UsageBar value={lic.users} max={lic.maxUsers} icon="👥" color="#f5a623" />
        </div>

        {/* Site Usage */}
        <div className="lic-detail-section">
          <div className="lic-section-title">SITE USAGE</div>
          <UsageBar value={lic.sites} max={lic.maxSites} icon="📍" color="#3b82f6" />
        </div>

        {/* Storage Usage */}
        <div className="lic-detail-section">
          <div className="lic-section-title">STORAGE USAGE</div>
          <UsageBar value={lic.storage} max={lic.maxStorage} icon="💾" label="GB" color="#8b5cf6"
            unit="GB" displayVal={`${lic.storage} GB`} displayMax={`${lic.maxStorage} GB`}
          />
        </div>

        {/* License History */}
        <div className="lic-detail-section">
          <div className="lic-section-title">LICENSE HISTORY</div>
          <div className="lic-history-list">
            {lic.history.map((h, i) => (
              <div key={i} className="lic-history-item">
                <div className={`lic-history-dot${i === 0 ? ' lic-history-dot--gold' : ''}`} />
                <div className="lic-history-body">
                  <div className="lic-history-label">{h.label}</div>
                  <div className="lic-history-date">{h.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="lic-detail-actions">
        <button className="lic-action-btn lic-action-btn--upgrade" id={`upgrade-${lic.id}`}>
          ⬆ Upgrade License
        </button>
        <div className="lic-action-row">
          <button className="lic-action-btn lic-action-btn--extend" id={`extend-${lic.id}`}>
            🔁 Extend
          </button>
          <button className="lic-action-btn lic-action-btn--suspend" id={`suspend-${lic.id}`}>
            🚫 Suspend
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ───────────────────────────────────────────── */
export default function AdminLicenses() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedId, setSelectedId]     = useState(LICENSES[0].id);
  const [currentPage, setCurrentPage]   = useState(1);

  const selectedLic = LICENSES.find(l => l.id === selectedId) || null;

  const filtered = LICENSES.filter(l => {
    if (activeFilter === 'all')        return true;
    if (activeFilter === 'enterprise') return l.plan === 'Enterprise';
    return l.status === activeFilter;
  });

  return (
    <div className="lic-container">
      {/* ── Page Header ──────────────────────────────────────── */}
      <div className="lic-page-header">
        <div>
          <div className="lic-breadcrumb">
            <span>🔑 Subscription Management</span>
            <span className="lic-bc-sep">›</span>
            <span>Licenses</span>
          </div>
          <h1 className="lic-page-title">License Management</h1>
          <p className="lic-page-sub">View, manage and control licenses assigned to all enterprise tenants.</p>
        </div>
        <div className="lic-stats-pills">
          <div className="lic-stat-pill lic-stat-pill--green"><div className="lic-stat-num">132</div><div className="lic-stat-lbl">ACTIVE</div></div>
          <div className="lic-stat-pill lic-stat-pill--orange"><div className="lic-stat-num">16</div><div className="lic-stat-lbl">TRIAL</div></div>
          <div className="lic-stat-pill lic-stat-pill--pink"><div className="lic-stat-num">7</div><div className="lic-stat-lbl">EXPIRING</div></div>
          <div className="lic-stat-pill lic-stat-pill--red"><div className="lic-stat-num">4</div><div className="lic-stat-lbl">SUSPENDED</div></div>
        </div>
      </div>

      {/* ── Filter bar ───────────────────────────────────────── */}
      <div className="lic-filter-bar">
        <div className="lic-filter-tabs">
          {FILTER_TABS.map(t => (
            <button
              key={t.key}
              className={`lic-filter-tab${activeFilter === t.key ? ' lic-filter-tab--active' : ''}`}
              onClick={() => { setActiveFilter(t.key); setCurrentPage(1); }}
            >
              {t.label}
              <span className={`lic-filter-count${activeFilter === t.key ? ' lic-filter-count--active' : ''}`}>{t.count}</span>
            </button>
          ))}
        </div>
        <div className="lic-toolbar">
          <button className="lic-toolbar-btn" id="licenses-filters-btn">⚙ Filters</button>
          <button className="lic-toolbar-btn lic-toolbar-btn--outline" id="licenses-export-btn">⬇ Export</button>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────── */}
      <div className="lic-body">
        {/* Table */}
        <div className="lic-left">
          <div className="lic-table-wrap">
            <table className="lic-table">
              <thead>
                <tr>
                  <th>COMPANY</th>
                  <th>LICENSE NO.</th>
                  <th>PLAN</th>
                  <th>DATES</th>
                  <th>USERS</th>
                  <th>SITES</th>
                  <th>STORAGE</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(lic => (
                  <tr
                    key={lic.id}
                    className={`lic-table-row${selectedId === lic.id ? ' lic-table-row--selected' : ''}`}
                    onClick={() => setSelectedId(lic.id)}
                  >
                    <td className="lic-td-company">
                      <div className="lic-company-cell">
                        <div className="lic-avatar" style={{ background: lic.color }}>{lic.initials}</div>
                        <div className="lic-company-name">{lic.company}</div>
                      </div>
                    </td>
                    <td>
                      <div className="lic-license-id">{lic.id}</div>
                    </td>
                    <td>
                      <span className="lic-plan-badge-sm" style={{ background: PLAN_COLORS[lic.plan]?.bg, color: PLAN_COLORS[lic.plan]?.color }}>
                        {lic.plan}
                      </span>
                    </td>
                    <td className="lic-td-dates">
                      <div className="lic-date-start">{lic.startDate}</div>
                      <div className="lic-date-expiry">{lic.expiryDate}</div>
                    </td>
                    <td><MiniBar value={lic.users} max={lic.maxUsers} color="#f5a623" /></td>
                    <td><MiniBar value={lic.sites} max={lic.maxSites} color="#3b82f6" /></td>
                    <td><MiniBar value={lic.storage} max={lic.maxStorage} color="#8b5cf6" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="lic-pagination">
            <div className="lic-pagination-info">Showing {filtered.length} of 150 licenses</div>
            <div className="lic-pagination-controls">
              <button className="lic-page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>‹</button>
              {[1, 2, 3, 4, 5].map(p => (
                <button key={p} className={`lic-page-btn${currentPage === p ? ' lic-page-btn--active' : ''}`} onClick={() => setCurrentPage(p)}>{p}</button>
              ))}
              <span className="lic-page-ellipsis">…</span>
              <button className="lic-page-btn" onClick={() => setCurrentPage(p => p + 1)}>›</button>
            </div>
          </div>
        </div>

        {/* Detail panel */}
        <LicenseDetail lic={selectedLic} />
      </div>
    </div>
  );
}
