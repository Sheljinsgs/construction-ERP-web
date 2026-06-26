import { useState, useRef, useEffect } from 'react';
import './AdminCompanies.css';

/* ─── Mock data – 148 companies (showing first page) ──────────────── */
const ALL_COMPANIES = [
  { id:'c001', name:'Maximus Global Develop...',  code:'MGD-001', country:'UAE', flag:'🇦🇪', plan:'Enterprise', users:2100, sites:24, status:'active',    renewal:'Jan 15, 2026', initials:'MX', color:'#f97316' },
  { id:'c002', name:'Classy Group Constructi...',  code:'CGC-001', country:'USA', flag:'🇺🇸', plan:'Enterprise', users:1420, sites:12, status:'active',    renewal:'Mar 12, 2026', initials:'CG', color:'#22c55e' },
  { id:'c003', name:'Vanguard Infrastructure ...',  code:'VIP-003', country:'USA', flag:'🇺🇸', plan:'Enterprise', users:882,  sites:8,  status:'active',    renewal:'Feb 4, 2026',  initials:'VI', color:'#7c3aed' },
  { id:'c004', name:'Apex Urban Developmen...',  code:'AUD-007', country:'UK',  flag:'🇬🇧', plan:'Professional',users:440,  sites:5,  status:'trial',     renewal:'Nov 22, 2025', initials:'AU', color:'#f59e0b', expiring: true },
  { id:'c005', name:'Summit Structural Engin...',  code:'SSE-012', country:'CA',  flag:'🇨🇦', plan:'Professional',users:205,  sites:4,  status:'trial',     renewal:'Dec 1, 2025',  initials:'SS', color:'#3b82f6', expiring: true },
  { id:'c006', name:'Horizon Solar & Green Te...', code:'HGT-009', country:'AU',  flag:'🇦🇺', plan:'Professional',users:310,  sites:6,  status:'active',    renewal:'Jan 8, 2026',  initials:'HZ', color:'#0ea5e9' },
  { id:'c007', name:'RedBrick Civil Contracto...',  code:'RBC-022', country:'DE',  flag:'🇩🇪', plan:'Basic',       users:95,   sites:2,  status:'suspended', renewal:null,           initials:'RB', color:'#ef4444' },
  { id:'c008', name:'NorthBridge Industrial S...',  code:'NBI-018', country:'FR',  flag:'🇫🇷', plan:'Basic',       users:74,   sites:2,  status:'trial',     renewal:'Nov 30, 2025', initials:'NB', color:'#64748b', expiring: true },
  { id:'c009', name:'TerraLink Construction',      code:'TLC-031', country:'IN',  flag:'🇮🇳', plan:'Basic',       users:58,   sites:1,  status:'expiring',  renewal:'Dec 5, 2025',  initials:'TL', color:'#f97316', expiring: true },
  { id:'c010', name:'BuildSafe Ltd',               code:'BSL-044', country:'UK',  flag:'🇬🇧', plan:'Professional',users:187,  sites:3,  status:'active',    renewal:'Feb 20, 2026', initials:'BS', color:'#10b981' },
  { id:'c011', name:'Orion Construction Group',    code:'OCG-055', country:'USA', flag:'🇺🇸', plan:'Enterprise',  users:760,  sites:9,  status:'active',    renewal:'Mar 30, 2026', initials:'OC', color:'#8b5cf6' },
  { id:'c012', name:'Pacific Build Works',         code:'PBW-067', country:'AU',  flag:'🇦🇺', plan:'Basic',       users:42,   sites:1,  status:'suspended', renewal:null,           initials:'PB', color:'#ef4444' },
];

const PLAN_COLORS = {
  Enterprise:   { bg: 'rgba(249,115,22,0.12)',  color: '#f97316' },
  Professional: { bg: 'rgba(59,130,246,0.12)',  color: '#3b82f6' },
  Basic:        { bg: 'rgba(100,116,139,0.12)', color: '#64748b' },
};

const STATUS_CONFIG = {
  active:    { label: 'Active',     cls: 'status--active'    },
  trial:     { label: 'Trial',      cls: 'status--trial'     },
  suspended: { label: 'Suspended',  cls: 'status--suspended' },
  expiring:  { label: 'Expiring',   cls: 'status--expiring'  },
};

const FILTER_TABS = [
  { key: 'all',           label: 'All',           count: 148 },
  { key: 'active',        label: 'Active',        count: 132 },
  { key: 'trial',         label: 'Trial',         count: 16  },
  { key: 'suspended',     label: 'Suspended',     count: 4   },
  { key: 'enterprise',    label: 'Enterprise',    count: 44  },
  { key: 'expiring-soon', label: 'Expiring Soon', count: 7   },
];

const PAGE_SIZE = 8;

export default function AdminCompanies() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy]             = useState('Newest');
  const [currentPage, setCurrentPage]   = useState(1);
  const [openMenu, setOpenMenu]         = useState(null);
  const [searchQuery, setSearchQuery]   = useState('');
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Filter companies
  const filtered = ALL_COMPANIES.filter(c => {
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || c.country.toLowerCase().includes(q);
    if (!matchSearch) return false;
    if (activeFilter === 'all')           return true;
    if (activeFilter === 'enterprise')    return c.plan === 'Enterprise';
    if (activeFilter === 'expiring-soon') return c.expiring;
    return c.status === activeFilter;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged      = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleFilterChange = (key) => {
    setActiveFilter(key);
    setCurrentPage(1);
  };

  return (
    <div className="acp-container">
      {/* ── Page Header ──────────────────────────────────────────── */}
      <div className="acp-header">
        <div className="acp-header-left">
          <div className="acp-breadcrumb">
            <span>🛡️ Platform Admin</span>
            <span className="acp-bc-sep">›</span>
            <span>Company Management</span>
          </div>
          <h1 className="acp-title">Companies</h1>
          <p className="acp-sub">
            Manage all enterprise tenants, subscriptions, module access and deployment settings.
          </p>
        </div>

        {/* Stats pills */}
        <div className="acp-stats-pills">
          <div className="acp-stat-pill acp-stat-pill--dark">
            <div className="acp-stat-num">148</div>
            <div className="acp-stat-lbl">TOTAL</div>
          </div>
          <div className="acp-stat-pill acp-stat-pill--green">
            <div className="acp-stat-num">132</div>
            <div className="acp-stat-lbl">ACTIVE</div>
          </div>
          <div className="acp-stat-pill acp-stat-pill--orange">
            <div className="acp-stat-num">16</div>
            <div className="acp-stat-lbl">TRIAL</div>
          </div>
          <div className="acp-stat-pill acp-stat-pill--red">
            <div className="acp-stat-num">4</div>
            <div className="acp-stat-lbl">SUSPENDED</div>
          </div>
        </div>
      </div>

      {/* ── Filter bar ───────────────────────────────────────────── */}
      <div className="acp-filter-bar">
        <div className="acp-filter-tabs">
          {FILTER_TABS.map(t => (
            <button
              key={t.key}
              className={`acp-filter-tab${activeFilter === t.key ? ' acp-filter-tab--active' : ''}`}
              onClick={() => handleFilterChange(t.key)}
            >
              {t.label}
              <span className={`acp-filter-count${activeFilter === t.key ? ' acp-filter-count--active' : ''}`}>
                {t.count}
              </span>
            </button>
          ))}
        </div>

        <div className="acp-toolbar">
          <div className="acp-view-toggle">
            <button className="acp-view-btn acp-view-btn--active" title="Table view">⊞</button>
            <button className="acp-view-btn" title="Grid view">☰</button>
          </div>
          <div className="acp-sort-select">
            <span>Sort:</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="acp-select">
              <option>Newest</option>
              <option>Oldest</option>
              <option>Name A-Z</option>
              <option>Users ↓</option>
              <option>Revenue ↓</option>
            </select>
          </div>
          <button className="acp-toolbar-btn" id="companies-filters-btn">⚙ Filters</button>
          <button className="acp-toolbar-btn acp-toolbar-btn--outline" id="companies-export-btn">⬇ Export</button>
        </div>
      </div>

      {/* ── Table ────────────────────────────────────────────────── */}
      <div className="acp-table-wrap">
        <table className="acp-table">
          <thead>
            <tr>
              <th>COMPANY</th>
              <th>CODE</th>
              <th>COUNTRY</th>
              <th>PLAN</th>
              <th>USERS</th>
              <th>SITES</th>
              <th>STATUS</th>
              <th>RENEWAL DATE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paged.map(c => (
              <tr key={c.id} className="acp-table-row">
                {/* Company */}
                <td className="acp-td-company">
                  <div className="acp-company-cell">
                    <div className="acp-company-avatar" style={{ background: c.color }}>
                      {c.initials}
                    </div>
                    <div className="acp-company-info">
                      <div className="acp-company-name">{c.name}</div>
                      {c.expiring && (
                        <div className="acp-expiring-badge">⚠ Expiring soon</div>
                      )}
                    </div>
                  </div>
                </td>
                {/* Code */}
                <td><span className="acp-code-badge">{c.code}</span></td>
                {/* Country */}
                <td>
                  <span className="acp-country">
                    <span>{c.flag}</span>
                    <span>{c.country}</span>
                  </span>
                </td>
                {/* Plan */}
                <td>
                  <span
                    className="acp-plan-badge"
                    style={{ background: PLAN_COLORS[c.plan]?.bg, color: PLAN_COLORS[c.plan]?.color }}
                  >
                    {c.plan}
                  </span>
                </td>
                {/* Users */}
                <td>
                  <span className="acp-users-cell">
                    <span className="acp-users-icon">👥</span>
                    {c.users.toLocaleString()}
                  </span>
                </td>
                {/* Sites */}
                <td>
                  <span className="acp-sites-cell">
                    <span className="acp-sites-icon">📍</span>
                    {c.sites}
                  </span>
                </td>
                {/* Status */}
                <td>
                  <span className={`acp-status-pill ${STATUS_CONFIG[c.status]?.cls}`}>
                    {STATUS_CONFIG[c.status]?.label}
                  </span>
                </td>
                {/* Renewal */}
                <td>
                  {c.renewal ? (
                    <span className={`acp-renewal${c.expiring ? ' acp-renewal--warn' : ''}`}>
                      {c.expiring ? '⚠ ' : ''}{c.renewal}
                    </span>
                  ) : (
                    <span className="acp-renewal acp-renewal--none">—</span>
                  )}
                </td>
                {/* Actions */}
                <td className="acp-td-actions">
                  <div className="acp-row-actions">
                    <button
                      className="acp-view-btn-sm"
                      id={`view-company-${c.id}`}
                    >
                      @ View
                    </button>
                    <span className="acp-erp-badge">🔗 ERP</span>
                    <div className="acp-menu-wrap" ref={openMenu === c.id ? menuRef : null}>
                      <button
                        className="acp-menu-trigger"
                        id={`menu-trigger-${c.id}`}
                        onClick={() => setOpenMenu(openMenu === c.id ? null : c.id)}
                      >
                        ⋮
                      </button>
                      {openMenu === c.id && (
                        <div className="acp-dropdown">
                          <button className="acp-dropdown-item" onClick={() => setOpenMenu(null)}>
                            <span>📋</span> View Details
                          </button>
                          <button className="acp-dropdown-item" onClick={() => setOpenMenu(null)}>
                            <span>🧩</span> Configure Modules
                          </button>
                          <button className="acp-dropdown-item" onClick={() => setOpenMenu(null)}>
                            <span>⚙️</span> Configure Limits
                          </button>
                          <button className="acp-dropdown-item" onClick={() => setOpenMenu(null)}>
                            <span>📊</span> View Usage
                          </button>
                          <div className="acp-dropdown-divider" />
                          <button className="acp-dropdown-item" onClick={() => setOpenMenu(null)}>
                            <span>🔗</span> Open ERP Preview
                          </button>
                          <button className="acp-dropdown-item acp-dropdown-item--danger" onClick={() => setOpenMenu(null)}>
                            <span>🚫</span> Suspend Company
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ───────────────────────────────────────────── */}
      <div className="acp-pagination">
        <div className="acp-pagination-info">
          Showing {Math.min((currentPage - 1) * PAGE_SIZE + 1, filtered.length)}–
          {Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length} companies
        </div>
        <div className="acp-pagination-controls">
          <button
            className="acp-page-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >‹</button>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              className={`acp-page-btn${currentPage === p ? ' acp-page-btn--active' : ''}`}
              onClick={() => setCurrentPage(p)}
            >
              {p}
            </button>
          ))}
          {totalPages > 5 && <span className="acp-page-ellipsis">…</span>}
          {totalPages > 5 && (
            <button
              className={`acp-page-btn${currentPage === totalPages ? ' acp-page-btn--active' : ''}`}
              onClick={() => setCurrentPage(totalPages)}
            >
              {totalPages}
            </button>
          )}
          <button
            className="acp-page-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          >›</button>
        </div>
        <div className="acp-page-size">
          Rows per page
          <select className="acp-select acp-select--sm">
            <option>8</option>
            <option>16</option>
            <option>32</option>
          </select>
        </div>
      </div>

      {/* ── Floating Create Button ───────────────────────────────── */}
      <button className="acp-fab" id="companies-create-fab">
        <span>➕</span> Create Company
      </button>
    </div>
  );
}
