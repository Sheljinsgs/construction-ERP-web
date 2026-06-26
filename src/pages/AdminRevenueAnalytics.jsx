import { useState } from 'react';
import './AdminRevenueAnalytics.css';

/* ─── Mock Data ────────────────────────────────────────────────── */
const KPI = [
  { id: 'kr1', title: 'TOTAL REVENUE', val: '$2.84M', sub: 'YTD 2025', delta: '+31.6%', up: true, icon: '🏛️', dark: true },
  { id: 'kr2', title: 'MONTHLY REVENUE', val: '$284.5K', sub: 'Nov 2025', delta: '+24.2%', up: true, icon: '💲' },
  { id: 'kr3', title: 'ANNUAL RECURRING', val: '$3.41M', sub: 'Projected ARR', delta: '+20.0%', up: true, icon: '📅' },
  { id: 'kr4', title: 'PENDING RENEWALS', val: '$142K', sub: 'Due this month', badge: '7 clients', warn: true, icon: '🔄' },
  { id: 'kr5', title: 'OUTSTANDING', val: '$48.5K', sub: 'Payment pending', badge: '4 overdue', danger: true, icon: '⏱️' },
  { id: 'kr6', title: 'AVG CLIENT VALUE', val: '$1,920', sub: 'Per month', delta: '+$240', up: true, icon: '👥' },
];

const MONTHLY_REVENUE = [150, 160, 140, 180, 200, 220, 210, 240, 260, 250, 270, 284]; // In K

const COUNTRY_REVENUE = [
  { code: 'US', name: 'USA', val: '$1.08M', pct: 38, color: '#0f172a' },
  { code: 'AE', name: 'UAE', val: '$682K', pct: 24, color: '#f5a623' },
  { code: 'UK', name: 'UK', val: '$512K', pct: 18, color: '#f5a623' },
  { code: 'IN', name: 'India', val: '$284K', pct: 10, color: '#22c55e' },
  { code: 'AU', name: 'AU', val: '$170K', pct: 6, color: '#fde68a' },
  { code: 'OT', name: 'Other', val: '$114K', pct: 4, color: '#e2e8f0' },
];

const TOP_PAYING_CLIENTS = [
  { initials: 'MX', name: 'Maximus Global Developments', plan: 'Enterprise', val: '$4,999', status: 'Paid', color: '#a855f7' },
  { initials: 'CG', name: 'Classy Group Construction', plan: 'Enterprise', val: '$4,999', status: 'Paid', color: '#f5a623' },
  { initials: 'VP', name: 'Vanguard Infrastructure Partners', plan: 'Enterprise', val: '$4,999', status: 'Paid', color: '#0f172a' },
  { initials: 'HZ', name: 'Horizon Solar & Green Tech', plan: 'Professional', val: '$1,499', status: 'Paid', color: '#22c55e' },
  { initials: 'AU', name: 'Apex Urban Development', plan: 'Professional', val: '$1,499', status: 'Overdue', color: '#f5a623' },
];

const UPCOMING_RENEWALS = [
  { name: 'Apex Urban Development', date: 'Nov 22 - 4d remaining', val: '$17,988' },
  { name: 'NorthBridge Industrial', date: 'Nov 30 - 12d remaining', val: '$3,588' },
  { name: 'Summit Structural Eng.', date: 'Dec 1 - 13d remaining', val: '$17,988' },
];

const OUTSTANDING_PAYMENTS = [
  { name: 'RedBrick Civil Contractors', inv: '#INV-2882 - 30 days overdue', val: '$3,588' },
  { name: 'Apex Urban Development', inv: '#INV-2891 - 7 days overdue', val: '$1,499' },
];

export default function AdminRevenueAnalytics() {
  const [timeRange, setTimeRange] = useState('Monthly');

  return (
    <div className="ara-container">
      {/* ── Header ────────────────────────────────────────────── */}
      <div className="ara-header">
        <div>
          <div className="ara-breadcrumb">
            <span>📈 Analytics</span>
            <span className="ara-bc-sep">›</span>
            <span>Revenue Analytics</span>
          </div>
          <h1 className="ara-title">Revenue Analytics</h1>
          <p className="ara-sub">Financial performance, subscription trends, and outstanding payment tracking.</p>
        </div>
        <div className="ara-header-actions">
          <div className="ara-tabs">
            {['Monthly', 'Quarterly', 'Annual'].map(t => (
              <button 
                key={t} 
                className={`ara-tab ${timeRange === t ? 'ara-tab--active' : ''}`}
                onClick={() => setTimeRange(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <button className="ara-btn-outline">⬇ Export Report</button>
        </div>
      </div>

      {/* ── KPI Grid ──────────────────────────────────────────── */}
      <div className="ara-kpi-grid">
        {KPI.map(k => (
          <div key={k.id} className={`ara-kpi-card ${k.dark ? 'ara-kpi-card--dark' : ''}`}>
            <div className="ara-kpi-icon-col">
              <div className="ara-kpi-icon" style={k.dark ? { background: 'rgba(245,166,35,0.15)', color: '#f5a623' } : {}}>{k.icon}</div>
            </div>
            <div className="ara-kpi-content">
              <div className="ara-kpi-val">{k.val}</div>
              <div className="ara-kpi-title">{k.title}</div>
              <div className="ara-kpi-sub">{k.sub}</div>
            </div>
            <div className="ara-kpi-right">
              {k.delta && (
                <span className={`ara-kpi-delta ${k.up ? 'ara-kpi-delta--up' : ''}`}>
                  {k.delta}
                </span>
              )}
              {k.badge && (
                <span className={`ara-kpi-badge ${k.danger ? 'ara-kpi-badge--danger' : 'ara-kpi-badge--warn'}`}>
                  {k.badge}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ── Charts Row 1 ──────────────────────────────────────── */}
      <div className="ara-row">
        {/* Monthly Revenue */}
        <div className="ara-card">
          <div className="ara-card-header">
            <div>
              <h3 className="ara-card-title">Monthly Revenue</h3>
              <div className="ara-card-sub">Rolling 12 months</div>
            </div>
            <span className="ara-kpi-delta ara-kpi-delta--up">+24.2%</span>
          </div>
          <div className="ara-chart-bars">
            {MONTHLY_REVENUE.map((val, i) => (
              <div key={i} className={`ara-bar ${i === 11 ? 'ara-bar--highlight' : ''}`} style={{ height: `${(val/300)*100}%` }} />
            ))}
          </div>
          <div className="ara-chart-labels">
            <span>D</span><span>M</span><span>J</span><span>S</span>
          </div>
          <div className="ara-chart-footer">
            <span className="ara-cf-lbl">Nov 2025</span>
            <span className="ara-cf-val">$284.5K</span>
          </div>
        </div>

        {/* Revenue by Plan */}
        <div className="ara-card">
          <div className="ara-card-header">
            <div>
              <h3 className="ara-card-title">Revenue by Plan</h3>
              <div className="ara-card-sub">Subscription tier breakdown</div>
            </div>
          </div>
          <div className="ara-stacked-chart">
            {['Jun','Jul','Aug','Sep','Oct','Nov'].map(m => (
              <div key={m} className="ara-st-col">
                <div className="ara-st-bars">
                  <div className="ara-st-bar ara-st-bar--ent" style={{ height: '40%' }} />
                  <div className="ara-st-bar ara-st-bar--pro" style={{ height: '35%' }} />
                  <div className="ara-st-bar ara-st-bar--bas" style={{ height: '25%' }} />
                </div>
                <div className="ara-st-lbl">{m}</div>
              </div>
            ))}
          </div>
          <div className="ara-legend">
            <div className="ara-lg-item"><span className="ara-lg-dot ara-lg-dot--ent"/> Enterprise</div>
            <div className="ara-lg-item"><span className="ara-lg-dot ara-lg-dot--pro"/> Pro</div>
            <div className="ara-lg-item"><span className="ara-lg-dot ara-lg-dot--bas"/> Basic</div>
          </div>
        </div>

        {/* Revenue by Country */}
        <div className="ara-card">
          <div className="ara-card-header">
            <div>
              <h3 className="ara-card-title">Revenue by Country</h3>
              <div className="ara-card-sub">Geographic breakdown</div>
            </div>
          </div>
          <div className="ara-country-list">
            {COUNTRY_REVENUE.map(c => (
              <div key={c.code} className="ara-c-row">
                <div className="ara-c-code">{c.code}</div>
                <div className="ara-c-name">{c.name}</div>
                <div className="ara-c-bar-wrap">
                  <div className="ara-c-bar" style={{ width: `${c.pct}%`, background: c.color }} />
                </div>
                <div className="ara-c-val">{c.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Charts Row 2 ──────────────────────────────────────── */}
      <div className="ara-row">
        {/* Top Paying Clients */}
        <div className="ara-card">
          <div className="ara-card-header">
            <div>
              <h3 className="ara-card-title">Top Paying Clients</h3>
              <div className="ara-card-sub">By monthly value</div>
            </div>
          </div>
          <div className="ara-tpc-list">
            {TOP_PAYING_CLIENTS.map(c => (
              <div key={c.name} className="ara-tpc-row">
                <div className="ara-tpc-avatar" style={{ background: `${c.color}20`, color: c.color }}>{c.initials}</div>
                <div className="ara-tpc-info">
                  <div className="ara-tpc-name">{c.name}</div>
                  <div className="ara-tpc-plan">{c.plan}</div>
                </div>
                <div className="ara-tpc-right">
                  <div className="ara-tpc-val">{c.val}</div>
                  <div className={`ara-tpc-status ${c.status === 'Overdue' ? 'ara-tpc-status--err' : ''}`}>{c.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Renewals */}
        <div className="ara-card">
          <div className="ara-card-header">
            <div>
              <h3 className="ara-card-title">Upcoming Renewals</h3>
              <div className="ara-card-sub">Next 30 days</div>
            </div>
          </div>
          <div className="ara-ur-list">
            {UPCOMING_RENEWALS.map(r => (
              <div key={r.name} className="ara-ur-row">
                <div className="ara-ur-info">
                  <div className="ara-ur-name">{r.name}</div>
                  <div className="ara-ur-date">{r.date}</div>
                </div>
                <div className="ara-ur-right">
                  <div className="ara-ur-val">{r.val}</div>
                  <button className="ara-btn-sm ara-btn-sm--outline">Remind</button>
                </div>
              </div>
            ))}
          </div>
          <div className="ara-ur-footer">
            <span className="ara-ur-f-lbl">Total renewals value</span>
            <span className="ara-ur-f-val">$142K</span>
          </div>
        </div>

        {/* Outstanding Payments */}
        <div className="ara-card">
          <div className="ara-card-header">
            <div>
              <h3 className="ara-card-title">Outstanding Payments</h3>
              <div className="ara-card-sub">Overdue invoices</div>
            </div>
            <span className="ara-kpi-badge ara-kpi-badge--danger-text">$48.5K total</span>
          </div>
          <div className="ara-op-list">
            {OUTSTANDING_PAYMENTS.map(o => (
              <div key={o.name} className="ara-op-row">
                <div className="ara-op-info">
                  <div className="ara-op-name">{o.name}</div>
                  <div className="ara-op-inv">{o.inv}</div>
                </div>
                <div className="ara-op-right">
                  <div className="ara-op-val">{o.val}</div>
                  <button className="ara-btn-sm ara-btn-sm--danger">Send Reminder</button>
                </div>
              </div>
            ))}
          </div>
          <div className="ara-op-alert">
            <span className="ara-op-alert-icon">⚠️</span> 
            RedBrick Civil license has been suspended. Restore upon payment confirmation.
          </div>
        </div>
      </div>
    </div>
  );
}
