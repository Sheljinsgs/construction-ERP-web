import { useState } from 'react';
import './AdminCompanyRequests.css';

/* ─── Mock data ────────────────────────────────────────────────── */
const REQUESTS = [
  {
    id: 'REQ-2024-0642',
    name: 'Alpine Construction Group',
    nameShort: 'Alpine Construction ...',
    initials: 'AL', color: '#3b82f6',
    contact: 'Daniel Osel',
    contactEmail: 'dosel@alpine.com',
    contactPhone: '+1 (408) 882-3410',
    country: 'United States',
    modules: ['Labour', 'Attendance', 'Inventory', 'Payroll', 'Finance', 'Reports'],
    users: 320, projects: 18, sites: 24,
    date: 'Nov 19, 2025',
    status: 'pending',
    notes: 'We are a mid-size construction firm looking to digitalise our full workforce and procurement cycle. We expect to onboard 300+ workers from day one.',
    timeline: [
      { label: 'Request Submitted',      time: 'Nov 18, 2025 – 10:22 AM', done: true },
      { label: 'Under Admin Review',     time: 'Nov 19, 2025 – 11:45 AM', done: true },
      { label: 'Documentation Verified', time: 'Pending',                  done: false },
      { label: 'Approved & Provisioned', time: 'Pending',                  done: false },
    ],
  },
  {
    id: 'REQ-2024-0639',
    name: 'Kiran Roads & Bridge Corp.',
    nameShort: 'Kiran Roads & Bridge...',
    initials: 'KR', color: '#7c3aed',
    contact: 'Aarav Mehta',
    contactEmail: 'aarav@kiranroads.in',
    contactPhone: '+91 98765 43210',
    country: 'India',
    modules: ['Organisation', 'Labour', 'Finance', 'Procurement'],
    users: 140, projects: 8, sites: 12,
    date: 'Nov 16, 2025',
    status: 'under-review',
    notes: 'Large-scale road construction projects across multiple states. Need centralised workforce and finance tracking.',
    timeline: [
      { label: 'Request Submitted',      time: 'Nov 15, 2025 – 09:00 AM', done: true },
      { label: 'Under Admin Review',     time: 'Nov 16, 2025 – 02:15 PM', done: true },
      { label: 'Documentation Verified', time: 'Pending',                  done: false },
      { label: 'Approved & Provisioned', time: 'Pending',                  done: false },
    ],
  },
  {
    id: 'REQ-2024-0631',
    name: 'Flux Industrial Developments',
    nameShort: 'Flux Industrial Develo...',
    initials: 'FX', color: '#f97316',
    contact: 'Sarah Kim',
    contactEmail: 'sarah@fluxind.in',
    contactPhone: '+91 87654 32109',
    country: 'India',
    modules: ['Organisation', 'Attendance', 'Procurement', 'Payroll'],
    users: 480, projects: 22, sites: 30,
    date: 'Nov 14, 2025',
    status: 'approved',
    notes: 'Industrial construction firm expanding into multiple verticals. Full ERP onboarding required.',
    timeline: [
      { label: 'Request Submitted',      time: 'Nov 12, 2025 – 08:30 AM', done: true },
      { label: 'Under Admin Review',     time: 'Nov 13, 2025 – 10:00 AM', done: true },
      { label: 'Documentation Verified', time: 'Nov 13, 2025 – 04:45 PM', done: true },
      { label: 'Approved & Provisioned', time: 'Nov 14, 2025 – 11:00 AM', done: true },
    ],
  },
  {
    id: 'REQ-2024-0628',
    name: 'GoldTrack Construction LLC',
    nameShort: 'GoldTrack Constructi...',
    initials: 'GT', color: '#d97706',
    contact: 'Marcus Brown',
    contactEmail: 'marcus@goldtrack.ae',
    contactPhone: '+971 50 123 4567',
    country: 'United Arab Emirates',
    modules: ['Labour', 'Attendance', 'Payroll', 'Finance'],
    users: 210, projects: 11, sites: 15,
    date: 'Nov 12, 2025',
    status: 'rejected',
    notes: 'Small-to-mid contractor. Request rejected due to incomplete documentation and mismatch in plan selection.',
    timeline: [
      { label: 'Request Submitted',      time: 'Nov 10, 2025 – 09:15 AM', done: true },
      { label: 'Under Admin Review',     time: 'Nov 11, 2025 – 01:30 PM', done: true },
      { label: 'Documentation Verified', time: 'Rejected – Nov 12, 2025', done: false, rejected: true },
      { label: 'Approved & Provisioned', time: 'N/A',                      done: false },
    ],
  },
  {
    id: 'REQ-2024-0619',
    name: 'RocMount Engineering Co.',
    nameShort: 'RocMount Engineeri...',
    initials: 'RM', color: '#10b981',
    contact: 'Priya Singh',
    contactEmail: 'priya@rockmount.ca',
    contactPhone: '+1 (604) 555-0192',
    country: 'Canada',
    modules: ['Organisation', 'Labour', 'Attendance', 'Finance'],
    users: 95, projects: 6, sites: 8,
    date: 'Nov 10, 2025',
    status: 'pending',
    notes: 'Growing engineering firm in western Canada. Looking to centralise project and labour management.',
    timeline: [
      { label: 'Request Submitted',      time: 'Nov 10, 2025 – 07:45 AM', done: true },
      { label: 'Under Admin Review',     time: 'Pending',                  done: false },
      { label: 'Documentation Verified', time: 'Pending',                  done: false },
      { label: 'Approved & Provisioned', time: 'Pending',                  done: false },
    ],
  },
];

const FILTER_TABS = [
  { key: 'all',          label: 'All Requests', count: 24 },
  { key: 'pending',      label: 'Pending',      count: 7  },
  { key: 'under-review', label: 'Under Review', count: 4  },
  { key: 'approved',     label: 'Approved',     count: 8  },
  { key: 'rejected',     label: 'Rejected',     count: 4  },
];

const STATUS_CONFIG = {
  'pending':      { label: 'Pending',      cls: 'acr-status--pending'  },
  'under-review': { label: 'Under Review', cls: 'acr-status--review'   },
  'approved':     { label: 'Approved',     cls: 'acr-status--approved' },
  'rejected':     { label: 'Rejected',     cls: 'acr-status--rejected' },
};

const MODULE_COLORS = {
  Labour:       { bg: 'rgba(59,130,246,0.1)',  color: '#3b82f6' },
  Attendance:   { bg: 'rgba(16,185,129,0.1)',  color: '#10b981' },
  Inventory:    { bg: 'rgba(245,166,35,0.1)',  color: '#d97706' },
  Payroll:      { bg: 'rgba(139,92,246,0.1)',  color: '#7c3aed' },
  Finance:      { bg: 'rgba(249,115,22,0.1)',  color: '#f97316' },
  Reports:      { bg: 'rgba(100,116,139,0.1)', color: '#64748b' },
  Organisation: { bg: 'rgba(59,130,246,0.12)', color: '#2563eb' },
  Procurement:  { bg: 'rgba(34,197,94,0.1)',   color: '#16a34a' },
};

/* ─── Status badge ─────────────────────────────────────────────── */
function StatusBadge({ status, large }) {
  const cfg = STATUS_CONFIG[status] || {};
  return (
    <span className={`acr-status-badge ${cfg.cls}${large ? ' acr-status-badge--lg' : ''}`}>
      {cfg.label}
    </span>
  );
}

/* ─── Module chips ─────────────────────────────────────────────── */
function ModuleChips({ modules, max = 3 }) {
  const visible = modules.slice(0, max);
  const extra   = modules.length - max;
  return (
    <div className="acr-chips">
      {visible.map(m => {
        const c = MODULE_COLORS[m] || { bg: '#f1f4f9', color: '#64748b' };
        return (
          <span key={m} className="acr-chip" style={{ background: c.bg, color: c.color }}>
            {m}
          </span>
        );
      })}
      {extra > 0 && <span className="acr-chip acr-chip--more">+{extra}</span>}
    </div>
  );
}

/* ─── Detail panel ─────────────────────────────────────────────── */
function DetailPanel({ req, onApprove, onReject, onClose }) {
  if (!req) return (
    <div className="acr-detail acr-detail--empty">
      <div className="acr-detail-empty-icon">📋</div>
      <div className="acr-detail-empty-text">Select a request to view details</div>
    </div>
  );

  const cfg = STATUS_CONFIG[req.status] || {};

  return (
    <div className="acr-detail">
      {/* Header */}
      <div className="acr-detail-header">
        <div className="acr-detail-company-row">
          <div className="acr-detail-avatar" style={{ background: req.color }}>
            {req.initials}
          </div>
          <div className="acr-detail-company-info">
            <div className="acr-detail-company-name">{req.name}</div>
            <div className="acr-detail-company-id">{req.id}</div>
          </div>
          <StatusBadge status={req.status} large />
        </div>
      </div>

      <div className="acr-detail-scroll">
        {/* Company Info */}
        <div className="acr-detail-section">
          <div className="acr-detail-section-title">COMPANY INFORMATION</div>
          <div className="acr-info-list">
            <div className="acr-info-item"><span className="acr-info-icon">👤</span><span>{req.contact}</span></div>
            <div className="acr-info-item"><span className="acr-info-icon">✉️</span><span>{req.contactEmail}</span></div>
            <div className="acr-info-item"><span className="acr-info-icon">📞</span><span>{req.contactPhone}</span></div>
            <div className="acr-info-item"><span className="acr-info-icon">🌍</span><span>{req.country}</span></div>
          </div>
        </div>

        {/* Requested Modules */}
        <div className="acr-detail-section">
          <div className="acr-detail-section-title">REQUESTED MODULES</div>
          <div className="acr-chips acr-chips--wrap">
            {req.modules.map(m => {
              const c = MODULE_COLORS[m] || { bg: '#f1f4f9', color: '#64748b' };
              return <span key={m} className="acr-chip" style={{ background: c.bg, color: c.color }}>{m}</span>;
            })}
          </div>
        </div>

        {/* Requirements */}
        <div className="acr-detail-section">
          <div className="acr-detail-section-title">REQUIREMENTS</div>
          <div className="acr-requirements">
            <div className="acr-req-item">
              <div className="acr-req-icon">👥</div>
              <div className="acr-req-value">{req.users}</div>
              <div className="acr-req-label">USERS</div>
            </div>
            <div className="acr-req-item">
              <div className="acr-req-icon">📁</div>
              <div className="acr-req-value">{req.projects}</div>
              <div className="acr-req-label">PROJECTS</div>
            </div>
            <div className="acr-req-item">
              <div className="acr-req-icon">📍</div>
              <div className="acr-req-value">{req.sites}</div>
              <div className="acr-req-label">SITES</div>
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="acr-detail-section">
          <div className="acr-detail-section-title">ADDITIONAL NOTES</div>
          <p className="acr-notes">{req.notes}</p>
        </div>

        {/* Approval Timeline */}
        <div className="acr-detail-section">
          <div className="acr-detail-section-title">APPROVAL TIMELINE</div>
          <div className="acr-timeline">
            {req.timeline.map((t, i) => (
              <div key={i} className={`acr-timeline-item${t.done ? ' acr-timeline-item--done' : ''}${t.rejected ? ' acr-timeline-item--rejected' : ''}`}>
                <div className="acr-timeline-dot">
                  {t.done && !t.rejected ? '✓' : t.rejected ? '✕' : ''}
                </div>
                {i < req.timeline.length - 1 && (
                  <div className={`acr-timeline-line${t.done ? ' acr-timeline-line--done' : ''}`} />
                )}
                <div className="acr-timeline-body">
                  <div className="acr-timeline-label">{t.label}</div>
                  <div className={`acr-timeline-time${!t.done ? ' acr-timeline-time--pending' : t.rejected ? ' acr-timeline-time--rejected' : ''}`}>
                    {t.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      {req.status !== 'approved' && req.status !== 'rejected' && (
        <div className="acr-detail-actions">
          <button className="acr-action-btn acr-action-btn--approve" id={`approve-${req.id}`} onClick={() => onApprove(req.id)}>
            <span>✓</span> Approve Request
          </button>
          <div className="acr-action-row">
            <button className="acr-action-btn acr-action-btn--clarify" id={`clarify-${req.id}`}>
              <span>💬</span> Request Clarification
            </button>
            <button className="acr-action-btn acr-action-btn--reject" id={`reject-${req.id}`} onClick={() => onReject(req.id)}>
              <span>✕</span> Reject
            </button>
          </div>
        </div>
      )}
      {req.status === 'approved' && (
        <div className="acr-detail-actions">
          <div className="acr-approved-note"><span>✓</span> This request has been approved and provisioned.</div>
        </div>
      )}
      {req.status === 'rejected' && (
        <div className="acr-detail-actions">
          <div className="acr-rejected-note"><span>✕</span> This request was rejected.</div>
        </div>
      )}
    </div>
  );
}

/* ─── Main Component ───────────────────────────────────────────── */
export default function AdminCompanyRequests() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedId, setSelectedId]     = useState(REQUESTS[0].id);
  const [requests, setRequests]         = useState(REQUESTS);
  const [currentPage, setCurrentPage]   = useState(1);
  const [sortBy, setSortBy]             = useState('Newest');

  const selectedReq = requests.find(r => r.id === selectedId) || null;

  const filtered = requests.filter(r => {
    if (activeFilter === 'all') return true;
    return r.status === activeFilter;
  });

  const handleApprove = (id) => {
    setRequests(rs => rs.map(r => r.id === id
      ? { ...r, status: 'approved', timeline: r.timeline.map((t, i) => ({ ...t, done: true })) }
      : r
    ));
  };

  const handleReject = (id) => {
    setRequests(rs => rs.map(r => r.id === id
      ? { ...r, status: 'rejected', timeline: r.timeline.map((t, i) => i < 2 ? { ...t, done: true } : { ...t, rejected: i === 2 }) }
      : r
    ));
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;

  return (
    <div className="acr-container">
      {/* ── Page Header ──────────────────────────────────────── */}
      <div className="acr-page-header">
        <div>
          <div className="acr-breadcrumb">
            <span>🏢 Company Management</span>
            <span className="acr-bc-sep">›</span>
            <span>Company Requests</span>
          </div>
          <h1 className="acr-page-title">Onboarding Requests</h1>
          <p className="acr-page-sub">Review, approve, or reject new organization onboarding requests.</p>
        </div>
        {pendingCount > 0 && (
          <div className="acr-pending-badge">
            🔔 {pendingCount} Pending Requests
          </div>
        )}
      </div>

      {/* ── Content ───────────────────────────────────────────── */}
      <div className="acr-body">
        {/* Left: table area */}
        <div className="acr-left">
          {/* Filter tabs + toolbar */}
          <div className="acr-filter-bar">
            <div className="acr-filter-tabs">
              {FILTER_TABS.map(t => (
                <button
                  key={t.key}
                  className={`acr-filter-tab${activeFilter === t.key ? ' acr-filter-tab--active' : ''}`}
                  onClick={() => { setActiveFilter(t.key); setCurrentPage(1); }}
                >
                  {t.label}
                  <span className={`acr-filter-count${activeFilter === t.key ? ' acr-filter-count--active' : ''}`}>
                    {t.count}
                  </span>
                </button>
              ))}
            </div>
            <div className="acr-toolbar">
              <div className="acr-sort">
                <span>↕ Sort:</span>
                <select className="acr-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                  <option>Newest</option>
                  <option>Oldest</option>
                  <option>Name A-Z</option>
                </select>
              </div>
              <button className="acr-toolbar-btn" id="requests-filters-btn">⚙ Filters</button>
            </div>
          </div>

          {/* Table */}
          <div className="acr-table-wrap">
            <table className="acr-table">
              <thead>
                <tr>
                  <th>COMPANY</th>
                  <th>CONTACT</th>
                  <th>MODULES REQUESTED</th>
                  <th>USERS / PROJECTS</th>
                  <th>DATE</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(req => (
                  <tr
                    key={req.id}
                    className={`acr-table-row${selectedId === req.id ? ' acr-table-row--selected' : ''}`}
                    onClick={() => setSelectedId(req.id)}
                  >
                    {/* Company */}
                    <td className="acr-td-company">
                      <div className="acr-company-cell">
                        <div className="acr-company-avatar" style={{ background: req.color }}>
                          {req.initials}
                        </div>
                        <div className="acr-company-info">
                          <div className="acr-company-name">{req.nameShort}</div>
                          {selectedId === req.id && (
                            <div className="acr-selected-badge">Selected</div>
                          )}
                        </div>
                      </div>
                    </td>
                    {/* Contact */}
                    <td className="acr-td-contact">
                      <div className="acr-contact-name">{req.contact}</div>
                      <div className="acr-contact-email">{req.contactEmail}</div>
                    </td>
                    {/* Modules */}
                    <td><ModuleChips modules={req.modules} max={3} /></td>
                    {/* Users / Projects */}
                    <td>
                      <div className="acr-users-projects">
                        <div className="acr-users-val">
                          <span className="acr-users-icon">👥</span>
                          {req.users.toLocaleString()} users
                        </div>
                        <div className="acr-proj-val">
                          <span className="acr-proj-icon">📁</span>
                          {req.projects} projects
                        </div>
                      </div>
                    </td>
                    {/* Date */}
                    <td className="acr-td-date">{req.date}</td>
                    {/* Status */}
                    <td><StatusBadge status={req.status} /></td>
                    {/* Actions */}
                    <td>
                      <button
                        className="acr-view-btn"
                        id={`view-request-${req.id}`}
                        onClick={e => { e.stopPropagation(); setSelectedId(req.id); }}
                      >
                        👁 View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="acr-pagination">
            <div className="acr-pagination-info">
              Showing {filtered.length} of 24 requests
            </div>
            <div className="acr-pagination-controls">
              <button className="acr-page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>‹</button>
              {[1, 2, 3].map(p => (
                <button
                  key={p}
                  className={`acr-page-btn${currentPage === p ? ' acr-page-btn--active' : ''}`}
                  onClick={() => setCurrentPage(p)}
                >
                  {p}
                </button>
              ))}
              <span className="acr-page-ellipsis">…</span>
              <button className="acr-page-btn" onClick={() => setCurrentPage(p => p + 1)}>›</button>
            </div>
          </div>
        </div>

        {/* Right: detail panel */}
        <DetailPanel
          req={selectedReq}
          onApprove={handleApprove}
          onReject={handleReject}
          onClose={() => setSelectedId(null)}
        />
      </div>
    </div>
  );
}
