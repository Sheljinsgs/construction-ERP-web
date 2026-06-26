import { useState } from 'react';
import './AdminRenewals.css';

/* ─── Mock data ────────────────────────────────────────────────── */
const RENEWALS = [
  {
    id: 'REN-001', company: 'Apex Urban Devel...', fullName: 'Apex Urban Development Group',
    initials: 'AU', color: '#f59e0b', plan: 'Professional', duration: '12 months',
    renewalDate: 'Nov 22, 2025', amount: '$17,988', support: 'Standard',
    payment: 'pending', daysLeft: 4, overdue: false,
    renewalDetails: { date: 'Nov 22, 2025', amount: '$17,988', support: 'Standard', paymentStatus: 'Pending' },
    timeline: [
      { label: 'Contract Start',   date: 'Nov 22, 2022', active: false },
      { label: 'Current Renewal',  date: 'Nov 22, 2025', active: true  },
      { label: 'Next Renewal',     date: 'Nov 22, 2026', active: false },
    ],
    paymentHistory: [
      { period: 'Nov 2024 — Renewal', amount: '$17,988', status: 'Paid' },
      { period: 'Nov 2023 — Renewal', amount: '$14,988', status: 'Paid' },
      { period: 'Nov 2022 — Initial', amount: '$9,999',  status: 'Paid' },
    ],
    notes: 'Client has expressed intent to upgrade to Enterprise on next renewal. Account manager follow-up scheduled for Nov 15.',
  },
  {
    id: 'REN-002', company: 'NorthBridge Indus...', fullName: 'NorthBridge Industrial Systems',
    initials: 'NB', color: '#64748b', plan: 'Basic', duration: '12 months',
    renewalDate: 'Nov 30, 2025', amount: '$3,588', support: 'None',
    payment: 'pending', daysLeft: 12, overdue: false,
    renewalDetails: { date: 'Nov 30, 2025', amount: '$3,588', support: 'None', paymentStatus: 'Pending' },
    timeline: [
      { label: 'Contract Start',  date: 'Nov 30, 2023', active: false },
      { label: 'Current Renewal', date: 'Nov 30, 2025', active: true  },
      { label: 'Next Renewal',    date: 'Nov 30, 2026', active: false },
    ],
    paymentHistory: [
      { period: 'Nov 2024 — Renewal', amount: '$3,588', status: 'Paid' },
      { period: 'Nov 2023 — Initial', amount: '$2,988', status: 'Paid' },
    ],
    notes: 'Small firm, budget-conscious. Offer multi-year discount at renewal.',
  },
  {
    id: 'REN-003', company: 'Summit Structural ...', fullName: 'Summit Structural Engineering',
    initials: 'SS', color: '#3b82f6', plan: 'Professional', duration: '12 months',
    renewalDate: 'Dec 1, 2025', amount: '$17,988', support: 'Premium',
    payment: 'invoiced', daysLeft: 13, overdue: false,
    renewalDetails: { date: 'Dec 1, 2025', amount: '$17,988', support: 'Premium', paymentStatus: 'Invoiced' },
    timeline: [
      { label: 'Contract Start',  date: 'Dec 1, 2023',  active: false },
      { label: 'Current Renewal', date: 'Dec 1, 2025',  active: true  },
      { label: 'Next Renewal',    date: 'Dec 1, 2026',  active: false },
    ],
    paymentHistory: [
      { period: 'Dec 2024 — Renewal', amount: '$17,988', status: 'Paid' },
      { period: 'Dec 2023 — Initial', amount: '$14,988', status: 'Paid' },
    ],
    notes: 'Premium support contract. Ensure SLA compliance before renewal.',
  },
  {
    id: 'REN-004', company: 'Horizon Solar & Gr...', fullName: 'Horizon Solar & Green Tech',
    initials: 'HZ', color: '#0ea5e9', plan: 'Professional', duration: '12 months',
    renewalDate: 'Jan 8, 2026', amount: '$17,988', support: 'Standard',
    payment: 'scheduled', daysLeft: 51, overdue: false,
    renewalDetails: { date: 'Jan 8, 2026', amount: '$17,988', support: 'Standard', paymentStatus: 'Scheduled' },
    timeline: [
      { label: 'Contract Start',  date: 'Jan 8, 2024',  active: false },
      { label: 'Current Renewal', date: 'Jan 8, 2026',  active: true  },
      { label: 'Next Renewal',    date: 'Jan 8, 2027',  active: false },
    ],
    paymentHistory: [
      { period: 'Jan 2025 — Renewal', amount: '$17,988', status: 'Paid' },
      { period: 'Jan 2024 — Initial', amount: '$14,988', status: 'Paid' },
    ],
    notes: 'Auto-renewal enabled. Payment method on file.',
  },
  {
    id: 'REN-005', company: 'Vanguard Infrastru...', fullName: 'Vanguard Infrastructure Inc.',
    initials: 'VI', color: '#7c3aed', plan: 'Enterprise', duration: '24 months',
    renewalDate: 'Feb 4, 2026', amount: '$119,976', support: 'Enterprise+',
    payment: 'scheduled', daysLeft: 78, overdue: false,
    renewalDetails: { date: 'Feb 4, 2026', amount: '$119,976', support: 'Enterprise+', paymentStatus: 'Scheduled' },
    timeline: [
      { label: 'Contract Start',  date: 'Feb 4, 2024',  active: false },
      { label: 'Current Renewal', date: 'Feb 4, 2026',  active: true  },
      { label: 'Next Renewal',    date: 'Feb 4, 2028',  active: false },
    ],
    paymentHistory: [
      { period: 'Feb 2024 — Initial', amount: '$119,976', status: 'Paid' },
    ],
    notes: 'Enterprise+ support included. Dedicated account manager: Sarah Chen.',
  },
  {
    id: 'REN-006', company: 'RedBrick Civil Con...', fullName: 'RedBrick Civil Contractors',
    initials: 'RB', color: '#ef4444', plan: 'Basic', duration: '12 months',
    renewalDate: 'Oct 1, 2025', amount: '$3,588', support: 'None',
    payment: 'overdue', daysLeft: -30, overdue: true,
    renewalDetails: { date: 'Oct 1, 2025', amount: '$3,588', support: 'None', paymentStatus: 'Overdue' },
    timeline: [
      { label: 'Contract Start',  date: 'Oct 1, 2023',  active: false },
      { label: 'Current Renewal', date: 'Oct 1, 2025',  active: true  },
      { label: 'Next Renewal',    date: 'Oct 1, 2026',  active: false },
    ],
    paymentHistory: [
      { period: 'Oct 2024 — Renewal', amount: '$3,588', status: 'Paid' },
      { period: 'Oct 2023 — Initial', amount: '$2,988', status: 'Paid' },
    ],
    notes: 'Payment overdue by 30 days. Escalate to collections if not resolved by Nov 30.',
  },
];

const FILTER_TABS = [
  { key: 'all',    label: 'All',           count: 148 },
  { key: '30',     label: 'Due in 30 Days', count: 15  },
  { key: '60',     label: 'Due in 60 Days', count: 46  },
  { key: '90',     label: 'Due in 90 Days', count: 48  },
  { key: 'expired',label: 'Expired',        count: 4   },
];

const PAYMENT_CONFIG = {
  pending:   { label: 'Pending',   cls: 'ren-pay--pending'   },
  invoiced:  { label: 'Invoiced',  cls: 'ren-pay--invoiced'  },
  scheduled: { label: 'Scheduled', cls: 'ren-pay--scheduled' },
  overdue:   { label: 'Overdue',   cls: 'ren-pay--overdue'   },
  paid:      { label: 'Paid',      cls: 'ren-pay--paid'      },
};

const PLAN_COLORS = {
  Enterprise:   { bg: 'rgba(249,115,22,0.1)',  color: '#f97316' },
  Professional: { bg: 'rgba(59,130,246,0.1)',  color: '#3b82f6' },
  Basic:        { bg: 'rgba(100,116,139,0.1)', color: '#64748b' },
};

/* ─── Summary card ─────────────────────────────────────────────── */
function SummaryCard({ icon, count, label, sub, color }) {
  return (
    <div className="ren-summary-card" style={{ borderColor: color }}>
      <div className="ren-summary-icon" style={{ color }}>{icon}</div>
      <div className="ren-summary-count" style={{ color }}>{count}</div>
      <div className="ren-summary-label">{label}</div>
      <div className="ren-summary-sub">{sub}</div>
    </div>
  );
}

/* ─── Detail panel ─────────────────────────────────────────────── */
function RenewalDetail({ ren }) {
  if (!ren) return (
    <div className="ren-detail ren-detail--empty">
      <span style={{ fontSize: 36, opacity: 0.25 }}>🔄</span>
      <span style={{ fontSize: 13, color: '#94a3b8' }}>Select a renewal to view details</span>
    </div>
  );

  const planColor = PLAN_COLORS[ren.plan] || {};
  const urgent = ren.daysLeft <= 7 && !ren.overdue;

  return (
    <div className="ren-detail">
      {/* Header */}
      <div className="ren-detail-header">
        <div className="ren-detail-company-row">
          <div className="ren-detail-avatar" style={{ background: ren.color }}>{ren.initials}</div>
          <div>
            <div className="ren-detail-company-name">{ren.fullName}</div>
            <div className="ren-detail-plan-sub">{ren.plan} · {ren.duration}</div>
          </div>
        </div>
        <div className={`ren-countdown${ren.overdue ? ' ren-countdown--overdue' : urgent ? ' ren-countdown--urgent' : ''}`}>
          <div className="ren-countdown-num">
            {ren.overdue ? Math.abs(ren.daysLeft) : ren.daysLeft}
          </div>
          <div className="ren-countdown-lbl">
            {ren.overdue ? 'DAYS\nOVERDUE' : 'DAYS\nUNTIL RENEWAL'}
          </div>
        </div>
      </div>

      <div className="ren-detail-scroll">
        {/* Renewal Details */}
        <div className="ren-detail-section">
          <div className="ren-section-title">RENEWAL DETAILS</div>
          <div className="ren-info-grid">
            <div className="ren-info-row"><span className="ren-info-icon">🟠</span><span className="ren-info-label">Renewal Date</span><span className="ren-info-val">{ren.renewalDetails.date}</span></div>
            <div className="ren-info-row"><span className="ren-info-icon">🟠</span><span className="ren-info-label">Renewal Amount</span><span className="ren-info-val">{ren.renewalDetails.amount}</span></div>
            <div className="ren-info-row"><span className="ren-info-icon">🟠</span><span className="ren-info-label">Support Contract</span><span className="ren-info-val">{ren.renewalDetails.support}</span></div>
            <div className="ren-info-row">
              <span className="ren-info-icon">🟠</span>
              <span className="ren-info-label">Payment Status</span>
              <span className={`ren-pay-badge ${PAYMENT_CONFIG[ren.payment]?.cls}`}>{PAYMENT_CONFIG[ren.payment]?.label}</span>
            </div>
          </div>
        </div>

        {/* Contract Timeline */}
        <div className="ren-detail-section">
          <div className="ren-section-title">CONTRACT TIMELINE</div>
          <div className="ren-timeline">
            {ren.timeline.map((t, i) => (
              <div key={i} className={`ren-timeline-item${t.active ? ' ren-timeline-item--active' : ''}`}>
                <div className="ren-timeline-dot-wrap">
                  <div className={`ren-timeline-dot${t.active ? ' ren-timeline-dot--active' : i === 0 ? ' ren-timeline-dot--done' : ''}`}>
                    {!t.active && i === 0 ? '✓' : ''}
                  </div>
                  {i < ren.timeline.length - 1 && <div className="ren-timeline-connector" />}
                </div>
                <div className="ren-timeline-body">
                  <div className="ren-timeline-label">{t.label}</div>
                  <div className={`ren-timeline-date${t.active ? ' ren-timeline-date--active' : ''}`}>{t.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment History */}
        <div className="ren-detail-section">
          <div className="ren-section-title">PAYMENT HISTORY</div>
          <div className="ren-payment-history">
            {ren.paymentHistory.map((p, i) => (
              <div key={i} className="ren-payment-row">
                <div className="ren-payment-period">{p.period}</div>
                <div className="ren-payment-right">
                  <span className="ren-payment-amount">{p.amount}</span>
                  <span className={`ren-payment-status ren-payment-status--${p.status.toLowerCase()}`}>{p.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="ren-detail-section">
          <div className="ren-section-title">NOTES</div>
          <p className="ren-notes">{ren.notes}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="ren-detail-actions">
        <button className="ren-action-btn ren-action-btn--renew" id={`renew-${ren.id}`}>
          🔄 Renew License
        </button>
        <div className="ren-action-row">
          <button className="ren-action-btn ren-action-btn--invoice" id={`invoice-${ren.id}`}>
            🧾 Generate Invoice
          </button>
          <button className="ren-action-btn ren-action-btn--reminder" id={`reminder-${ren.id}`}>
            📧 Send Reminder
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ───────────────────────────────────────────── */
export default function AdminRenewals() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedId, setSelectedId]     = useState(RENEWALS[0].id);
  const [currentPage, setCurrentPage]   = useState(1);
  const [sortBy, setSortBy]             = useState('Days Remaining');

  const selectedRen = RENEWALS.find(r => r.id === selectedId) || null;

  const filtered = RENEWALS.filter(r => {
    if (activeFilter === 'all')     return true;
    if (activeFilter === 'expired') return r.overdue;
    if (activeFilter === '30')      return r.daysLeft > 0 && r.daysLeft <= 30;
    if (activeFilter === '60')      return r.daysLeft > 0 && r.daysLeft <= 60;
    if (activeFilter === '90')      return r.daysLeft > 0 && r.daysLeft <= 90;
    return true;
  });

  return (
    <div className="ren-container">
      {/* ── Page Header ──────────────────────────────────────── */}
      <div className="ren-page-header">
        <div>
          <div className="ren-breadcrumb">
            <span>🔑 Subscription Management</span>
            <span className="ren-bc-sep">›</span>
            <span>Renewals</span>
          </div>
          <h1 className="ren-page-title">Renewal Management</h1>
          <p className="ren-page-sub">Monitor upcoming contract renewals, extensions, and license lifecycle events.</p>
        </div>
        <button className="ren-export-btn" id="renewals-export-btn">⬇ Export Renewals Report</button>
      </div>

      {/* ── Summary cards ────────────────────────────────────── */}
      <div className="ren-summary-row">
        <SummaryCard icon="🔁" count="3"  label="RENEWALS THIS MONTH" sub="Nov 2025"          color="#f5a623" />
        <SummaryCard icon="⏰" count="7"  label="EXPIRING IN 30 DAYS"  sub="Action Required"  color="#f97316" />
        <SummaryCard icon="🎯" count="4"  label="EXPIRED LICENSES"    sub="Awaiting renewal"  color="#ef4444" />
        <SummaryCard icon="✅" count="8"  label="RENEWED THIS MONTH"  sub="$1,400 recovered"  color="#22c55e" />
      </div>

      {/* ── Filter bar ───────────────────────────────────────── */}
      <div className="ren-filter-bar">
        <div className="ren-filter-tabs">
          {FILTER_TABS.map(t => (
            <button
              key={t.key}
              className={`ren-filter-tab${activeFilter === t.key ? ' ren-filter-tab--active' : ''}`}
              onClick={() => { setActiveFilter(t.key); setCurrentPage(1); }}
            >
              {t.label}
              <span className={`ren-filter-count${activeFilter === t.key ? ' ren-filter-count--active' : ''}`}>{t.count}</span>
            </button>
          ))}
        </div>
        <div className="ren-toolbar">
          <div className="ren-sort">
            <span>↕ Sort:</span>
            <select className="ren-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option>Days Remaining</option>
              <option>Amount ↓</option>
              <option>Company A-Z</option>
            </select>
          </div>
          <button className="ren-toolbar-btn" id="renewals-filter-btn">⬇ Export</button>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────── */}
      <div className="ren-body">
        <div className="ren-left">
          <div className="ren-table-wrap">
            <table className="ren-table">
              <thead>
                <tr>
                  <th>COMPANY</th>
                  <th>PLAN</th>
                  <th>DURATION</th>
                  <th>RENEWAL DATE</th>
                  <th>AMOUNT</th>
                  <th>SUPPORT</th>
                  <th>PAYMENT</th>
                  <th>DAYS LEFT</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(ren => (
                  <tr
                    key={ren.id}
                    className={`ren-table-row${selectedId === ren.id ? ' ren-table-row--selected' : ''}`}
                    onClick={() => setSelectedId(ren.id)}
                  >
                    <td>
                      <div className="ren-company-cell">
                        <div className="ren-avatar" style={{ background: ren.color }}>{ren.initials}</div>
                        <span className="ren-company-name">{ren.company}</span>
                      </div>
                    </td>
                    <td>
                      <span className="ren-plan-badge" style={{ background: PLAN_COLORS[ren.plan]?.bg, color: PLAN_COLORS[ren.plan]?.color }}>
                        {ren.plan}
                      </span>
                    </td>
                    <td className="ren-duration">{ren.duration}</td>
                    <td className={`ren-renewal-date${ren.overdue ? ' ren-renewal-date--overdue' : ren.daysLeft <= 14 ? ' ren-renewal-date--warn' : ''}`}>
                      {ren.renewalDate}
                    </td>
                    <td className="ren-amount">{ren.amount}</td>
                    <td className="ren-support">{ren.support}</td>
                    <td>
                      <span className={`ren-pay-badge ${PAYMENT_CONFIG[ren.payment]?.cls}`}>
                        {PAYMENT_CONFIG[ren.payment]?.label}
                      </span>
                    </td>
                    <td>
                      {ren.overdue ? (
                        <span className="ren-days-overdue">{Math.abs(ren.daysLeft)}d overdue</span>
                      ) : (
                        <span className={`ren-days${ren.daysLeft <= 7 ? ' ren-days--urgent' : ren.daysLeft <= 30 ? ' ren-days--warn' : ''}`}>
                          {ren.daysLeft}d
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="ren-pagination">
            <div className="ren-pagination-info">Showing {filtered.length} of 148 records</div>
            <div className="ren-pagination-controls">
              <button className="ren-page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>‹</button>
              {[1, 2, 3, 4, 5].map(p => (
                <button key={p} className={`ren-page-btn${currentPage === p ? ' ren-page-btn--active' : ''}`} onClick={() => setCurrentPage(p)}>{p}</button>
              ))}
              <button className="ren-page-btn" onClick={() => setCurrentPage(p => p + 1)}>›</button>
            </div>
          </div>
        </div>

        {/* Detail panel */}
        <RenewalDetail ren={selectedRen} />
      </div>
    </div>
  );
}
