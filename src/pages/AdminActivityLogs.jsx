import { useState } from 'react';
import './AdminActivityLogs.css';

/* ─── Mock Data ────────────────────────────────────────────────── */
const KPI = [
  { id: 'k1', label: 'EVENTS TODAY', val: '1,284', delta: '+12%', icon: '⚡', color: '#f5a623' },
  { id: 'k2', label: 'ACTIVE SESSIONS', val: '3,842', badge: 'Live', icon: '👤', color: '#f5a623' },
  { id: 'k3', label: 'COMPANIES ACTIVE', val: '88', delta: '82%', icon: '🏢', color: '#f5a623' },
  { id: 'k4', label: 'ALERTS TODAY', val: '3', delta: '3', icon: '🔔', color: '#ef4444' },
];

const EVENTS = [
  { id: 'ev-1', type: 'Company Created', icon: '🏢', color: '#f5a623', title: 'New Company Onboarded', badge: 'New', time: 'Just now', desc: 'Alpine Construction Group has been successfully registered and provisioned on the platform.', company: 'Alpine Construction Group', user: 'Marcus Vance' },
  { id: 'ev-2', type: 'User Created', icon: '👤', color: '#3b82f6', title: '24 Users Bulk Imported', time: '4 min ago', desc: 'Jennifer Cole imported 24 employee accounts into Classy Group portal via CSV upload.', company: 'Classy Group Construction', user: 'Jennifer Cole' },
  { id: 'ev-3', type: 'License Renewed', icon: '🔄', color: '#22c55e', title: 'Enterprise License Renewed', time: '8 min ago', desc: 'Vanguard Infrastructure Partners renewed their 24-month enterprise contract. Amount: $119,976.', company: 'Vanguard Infrastructure', user: 'Marcus Vance' },
  { id: 'ev-4', type: 'Module Enabled', icon: '🧩', color: '#f5a623', title: 'Payroll Module Activated', time: '28 min ago', desc: 'Payroll & Salary Management module enabled for RockMount Engineering Services.', company: 'RockMount Engineering', user: 'Platform Admin' },
  { id: 'ev-5', type: 'Login Activity', icon: '🔈', color: '#64748b', title: 'Suspicious Login Detected', time: '44 min ago', desc: 'Multiple failed login attempts from IP 45.122.122.68 — account temporarily locked.', company: 'Platform Admin', user: 'Security System' },
  { id: 'ev-6', type: 'Subscription Updated', icon: '📦', color: '#a855f7', title: 'Plan Upgraded — Professional to Enterprise', time: '1 hr ago', desc: 'Apex Urban Development Group upgraded their subscription. Difference invoiced at $3,500.', company: 'Apex Urban Development', user: 'Marcus Vance' },
  { id: 'ev-7', type: 'Support Ticket Created', icon: '📞', color: '#ef4444', title: 'Critical Support Ticket Opened', time: '1 hr 12 min ago', desc: '#TKT-8831: Payroll module not processing salary slips for Contractor category.', company: 'Classy Group Construction', user: 'Daniel Osei' },
];

const EVENT_TYPES = [
  { label: 'Company Created', count: 184, color: '#22c55e', icon: '🏢' },
  { label: 'User Created', count: 320, color: '#3b82f6', icon: '👤' },
  { label: 'Module Enabled', count: 96, color: '#f5a623', icon: '🧩' },
  { label: 'License Renewed', count: 28, color: '#a855f7', icon: '🔄' },
  { label: 'Login Activity', count: 512, color: '#64748b', icon: '🔈' },
  { label: 'Subscription Updated', count: 14, color: '#ec4899', icon: '📦' },
  { label: 'Support Ticket Created', count: 7, color: '#ef4444', icon: '📞' },
];

const ACTIVE_COMPANIES = [
  { initials: 'MX', name: 'Maximus Global', count: 284, color: '#a855f7' },
  { initials: 'CG', name: 'Classy Group', count: 220, color: '#f5a623' },
  { initials: 'VP', name: 'Vanguard Infra', count: 168, color: '#f97316' },
  { initials: 'HZ', name: 'Horizon Solar', count: 102, color: '#22c55e' },
];

// Simple mock for the bar chart
const CHART_DATA = [10, 20, 15, 30, 40, 35, 50, 45, 60, 70, 85, 90, 75, 65, 80, 50, 40, 20];

export default function AdminActivityLogs() {
  const [activeTab, setActiveTab] = useState('All Activity');
  const tabs = ['All Activity', 'Company Events', 'User Events', 'Module Events', 'License Events', 'Security', 'Support'];

  return (
    <div className="act-container">
      {/* ── Header ────────────────────────────────────────────── */}
      <div className="act-header">
        <div>
          <div className="act-breadcrumb">
            <span>📋 System Administration</span>
            <span className="act-bc-sep">›</span>
            <span>Activity Logs</span>
          </div>
          <h1 className="act-title">Activity Logs</h1>
          <p className="act-sub">Live stream of all platform activity — companies, users, modules, subscriptions and security events.</p>
        </div>
        <div className="act-header-actions">
          <button className="act-btn-live">● Streaming Live</button>
          <button className="act-btn-outline">⬇ Export Logs</button>
        </div>
      </div>

      {/* ── KPI Strip ─────────────────────────────────────────── */}
      <div className="act-kpi-row">
        {KPI.map(k => (
          <div key={k.id} className="act-kpi-card">
            <div className="act-kpi-icon" style={{ color: k.color, backgroundColor: `${k.color}15` }}>{k.icon}</div>
            <div className="act-kpi-info">
              <div className="act-kpi-val">
                {k.val}
                {k.delta && <span className="act-kpi-delta">{k.delta}</span>}
                {k.badge && <span className="act-kpi-badge">{k.badge}</span>}
              </div>
              <div className="act-kpi-lbl">{k.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Filters ───────────────────────────────────────────── */}
      <div className="act-filters">
        <div className="act-tabs">
          {tabs.map(t => (
            <button 
              key={t} 
              className={`act-tab ${activeTab === t ? 'act-tab--active' : ''}`}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="act-filter-dropdowns">
          <button className="act-dropdown-btn">Date Range ▾</button>
          <button className="act-dropdown-btn">Company ▾</button>
          <button className="act-dropdown-btn act-dropdown-btn--gray">≡ More Filters</button>
        </div>
      </div>

      {/* ── Main Layout ───────────────────────────────────────── */}
      <div className="act-body">
        {/* Left Timeline Stream */}
        <div className="act-stream">
          <div className="act-stream-header">
            <div className="act-sh-title">TODAY — NOV 18, 2025</div>
            <div className="act-sh-count">1,284 events</div>
          </div>
          <div className="act-timeline">
            {EVENTS.map((ev, i) => (
              <div key={ev.id} className="act-event">
                <div className="act-event-icon-wrap">
                  <div className="act-event-icon" style={{ color: ev.color, borderColor: `${ev.color}40`, backgroundColor: '#fff' }}>
                    {ev.icon}
                  </div>
                  {i < EVENTS.length - 1 && <div className="act-event-line" />}
                </div>
                <div className="act-event-content">
                  <div className="act-ec-top">
                    <div className="act-ec-title-row">
                      <span className="act-ec-title">{ev.title}</span>
                      <span className="act-ec-type">{ev.type}</span>
                      {ev.badge && <span className="act-ec-badge">{ev.badge}</span>}
                    </div>
                    <span className="act-ec-time">{ev.time}</span>
                  </div>
                  <div className="act-ec-desc">{ev.desc}</div>
                  <div className="act-ec-meta">
                    <span className="act-ec-meta-item">🏢 {ev.company}</span>
                    <span className="act-ec-meta-item">👤 {ev.user}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="act-load-more">⬇ Load More Activity</button>
        </div>

        {/* Right Sidebar Widgets */}
        <div className="act-sidebar">
          {/* Event Types */}
          <div className="act-widget">
            <h3 className="act-widget-title">Event Types</h3>
            <div className="act-types-list">
              {EVENT_TYPES.map(type => (
                <div key={type.label} className="act-type-row">
                  <div className="act-type-left">
                    <span className="act-type-icon" style={{ color: type.color }}>{type.icon}</span>
                    <span className="act-type-lbl">{type.label}</span>
                  </div>
                  <span className="act-type-val">{type.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Events Per Hour */}
          <div className="act-widget">
            <h3 className="act-widget-title">Events Per Hour</h3>
            <div className="act-widget-sub">Last 24 hours</div>
            <div className="act-chart-area">
              <div className="act-chart-bars">
                {CHART_DATA.map((val, i) => (
                  <div 
                    key={i} 
                    className={`act-bar ${i > 14 ? 'act-bar--highlight' : ''}`}
                    style={{ height: `${val}%` }}
                  />
                ))}
              </div>
              <div className="act-chart-labels">
                <span>00:00</span>
                <span>12:00</span>
                <span>Now</span>
              </div>
            </div>
          </div>

          {/* Most Active Today */}
          <div className="act-widget">
            <h3 className="act-widget-title">Most Active Today</h3>
            <div className="act-active-list">
              {ACTIVE_COMPANIES.map(comp => (
                <div key={comp.name} className="act-active-row">
                  <div className="act-active-avatar" style={{ background: `${comp.color}20`, color: comp.color }}>
                    {comp.initials}
                  </div>
                  <div className="act-active-info">
                    <div className="act-active-name">{comp.name}</div>
                    <div className="act-active-bar-wrap">
                      <div className="act-active-bar" style={{ width: `${(comp.count / 300) * 100}%`, background: comp.color }} />
                    </div>
                  </div>
                  <span className="act-active-val">{comp.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
