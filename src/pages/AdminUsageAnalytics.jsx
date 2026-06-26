import { useState } from 'react';
import './AdminUsageAnalytics.css';

/* ─── Mock Data ────────────────────────────────────────────────── */
const KPI = [
  { id: 'k1', title: 'DAILY ACTIVE USERS', val: '9,840', sub: 'Today vs yesterday', delta: '+12.4%', up: true, icon: '👥' },
  { id: 'k2', title: 'MONTHLY ACTIVE USERS', val: '12,480', sub: 'Nov 2025', delta: '+10.4%', up: true, icon: '📅', dark: true },
  { id: 'k3', title: 'API REQUESTS / HR', val: '8.4M', sub: 'Peak: 12.1M', delta: '+5.2%', up: true, icon: '⚡' },
  { id: 'k4', title: 'TOTAL STORAGE USED', val: '1.84 TB', sub: 'of 2.5 TB allocated', delta: '73.6%', warn: true, icon: '🖴' },
  { id: 'k5', title: 'BANDWIDTH TODAY', val: '248 GB', sub: 'vs 214 GB yesterday', delta: '+34GB', warn: true, icon: '📶' },
  { id: 'k6', title: 'LOGIN SESSIONS', val: '3,842', sub: 'Active right now', badge: 'Live', icon: '🚪' },
];

const MOST_ACTIVE_COMPANIES = [
  { initials: 'MX', name: 'Maximus Global Developments', dau: '840 DAU', api: '2.1M', usage: 340, max: 400, color: '#a855f7' },
  { initials: 'CG', name: 'Classy Group Construction', dau: '620 DAU', api: '1.4M', usage: 84, max: 100, color: '#f5a623' },
  { initials: 'VP', name: 'Vanguard Infrastructure', dau: '380 DAU', api: '980K', usage: 61, max: 100, color: '#0f172a' },
  { initials: 'HZ', name: 'Horizon Solar & Green Tech', dau: '224 DAU', api: '560K', usage: 44, max: 100, color: '#22c55e' },
  { initials: 'SS', name: 'Summit Structural Engineering', dau: '148 DAU', api: '220K', usage: 22, max: 100, color: '#3b82f6' },
];

const MOST_USED_MODULES = [
  { rank: 1, name: 'Attendance', requests: '2.4M', percent: 94 },
  { rank: 2, name: 'Labour', requests: '2.1M', percent: 88 },
  { rank: 3, name: 'Projects', requests: '1.8M', percent: 82 },
  { rank: 4, name: 'Expenses', requests: '1.4M', percent: 74 },
  { rank: 5, name: 'Inventory', requests: '980K', percent: 58 },
  { rank: 6, name: 'Payroll', requests: '720K', percent: 42 },
];

const SYSTEM_PERF = [
  { label: 'API Avg Response', val: '24ms', status: 'good' },
  { label: 'DB Query Time', val: '8ms', status: 'good' },
  { label: 'Error Rate', val: '0.02%', status: 'good' },
  { label: 'CDN Cache Hit', val: '96.4%', status: 'good' },
  { label: 'Server CPU', val: '42%', status: 'good' },
  { label: 'Memory Usage', val: '68%', status: 'warn' },
];

const LOGIN_TREND = [10,20,15,30,40,35,50,45,60,70,85,90,75,65,80,50,40,20,55,65,85,95,75,60];

export default function AdminUsageAnalytics() {
  const [timeRange, setTimeRange] = useState('Today');

  return (
    <div className="aua-container">
      {/* ── Header ────────────────────────────────────────────── */}
      <div className="aua-header">
        <div>
          <div className="aua-breadcrumb">
            <span>📈 Analytics</span>
            <span className="aua-bc-sep">›</span>
            <span>Usage Analytics</span>
          </div>
          <h1 className="aua-title">Usage Analytics</h1>
          <p className="aua-sub">Real-time platform consumption, module adoption, storage, and infrastructure performance metrics.</p>
        </div>
        <div className="aua-header-actions">
          <div className="aua-tabs">
            {['Today', 'Week', 'Month'].map(t => (
              <button 
                key={t} 
                className={`aua-tab ${timeRange === t ? 'aua-tab--active' : ''}`}
                onClick={() => setTimeRange(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <button className="aua-btn-outline">⬇ Export</button>
        </div>
      </div>

      {/* ── KPI Grid ──────────────────────────────────────────── */}
      <div className="aua-kpi-grid">
        {KPI.map(k => (
          <div key={k.id} className={`aua-kpi-card ${k.dark ? 'aua-kpi-card--dark' : ''}`}>
            <div className="aua-kpi-icon-col">
              <div className="aua-kpi-icon" style={k.dark ? { background: 'rgba(255,255,255,0.1)' } : {}}>{k.icon}</div>
            </div>
            <div className="aua-kpi-content">
              <div className="aua-kpi-val">{k.val}</div>
              <div className="aua-kpi-title">{k.title}</div>
              <div className="aua-kpi-sub">{k.sub}</div>
            </div>
            <div className="aua-kpi-right">
              {k.delta && (
                <span className={`aua-kpi-delta ${k.up ? 'aua-kpi-delta--up' : ''} ${k.warn ? 'aua-kpi-delta--warn' : ''}`}>
                  {k.delta}
                </span>
              )}
              {k.badge && <span className="aua-kpi-badge">{k.badge}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* ── Charts Row 1 ──────────────────────────────────────── */}
      <div className="aua-row">
        {/* Login Trend */}
        <div className="aua-card">
          <div className="aua-card-header">
            <div>
              <h3 className="aua-card-title">Login Trend</h3>
              <div className="aua-card-sub">Sessions last 24 hrs</div>
            </div>
            <span className="aua-live-badge">Live</span>
          </div>
          <div className="aua-chart-bars">
            {LOGIN_TREND.map((val, i) => (
              <div key={i} className={`aua-bar ${i > 18 ? 'aua-bar--highlight' : ''}`} style={{ height: `${val}%` }} />
            ))}
          </div>
          <div className="aua-chart-labels">
            <span>00:00</span>
            <strong>Peak: 3,842</strong>
            <span>Now</span>
          </div>
        </div>

        {/* API Usage */}
        <div className="aua-card">
          <div className="aua-card-header">
            <div>
              <h3 className="aua-card-title">API Usage</h3>
              <div className="aua-card-sub">Requests/hr — 7 days</div>
            </div>
          </div>
          <div className="aua-api-days">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
          <div className="aua-api-grid">
            <div className="aua-api-box">
              <div className="aua-api-lbl">AVG/HR</div>
              <div className="aua-api-val">8.4M</div>
            </div>
            <div className="aua-api-box">
              <div className="aua-api-lbl">PEAK/HR</div>
              <div className="aua-api-val">12.1M</div>
            </div>
            <div className="aua-api-box">
              <div className="aua-api-lbl">AVG LATENCY</div>
              <div className="aua-api-val">24ms</div>
            </div>
            <div className="aua-api-box">
              <div className="aua-api-lbl">ERROR RATE</div>
              <div className="aua-api-val">0.02%</div>
            </div>
          </div>
        </div>

        {/* Storage Growth */}
        <div className="aua-card">
          <div className="aua-card-header">
            <div>
              <h3 className="aua-card-title">Storage Growth</h3>
              <div className="aua-card-sub">Cumulative TB used</div>
            </div>
          </div>
          <div className="aua-storage-list">
            <div className="aua-st-row">
              <span className="aua-st-lbl">Total Allocated</span>
              <span className="aua-st-val">2.5 TB</span>
            </div>
            <div className="aua-st-row">
              <span className="aua-st-lbl">Used</span>
              <span className="aua-st-val aua-st-val--bold">1.84 TB</span>
            </div>
            <div className="aua-st-bar-wrap"><div className="aua-st-bar aua-st-bar--used" style={{ width: '73.6%' }} /></div>
            
            <div className="aua-st-row">
              <span className="aua-st-lbl">Backup Storage</span>
              <span className="aua-st-val aua-st-val--bold">620 GB</span>
            </div>
            <div className="aua-st-bar-wrap"><div className="aua-st-bar aua-st-bar--backup" style={{ width: '40%' }} /></div>

            <div className="aua-st-row">
              <span className="aua-st-lbl">Available</span>
              <span className="aua-st-val aua-st-val--bold">660 GB</span>
            </div>
            <div className="aua-st-bar-wrap"><div className="aua-st-bar aua-st-bar--avail" style={{ width: '26.4%' }} /></div>
          </div>
          <div className="aua-st-alert">
            <span className="aua-st-alert-icon">⚠️</span> 74% used — expansion recommended at 85%
          </div>
        </div>
      </div>

      {/* ── Charts Row 2 ──────────────────────────────────────── */}
      <div className="aua-row">
        {/* Most Active Companies */}
        <div className="aua-card">
          <div className="aua-card-header">
            <div>
              <h3 className="aua-card-title">Most Active Companies</h3>
              <div className="aua-card-sub">Daily active users + API calls</div>
            </div>
          </div>
          <div className="aua-mac-list">
            {MOST_ACTIVE_COMPANIES.map(comp => (
              <div key={comp.initials} className="aua-mac-row">
                <div className="aua-mac-avatar" style={{ color: comp.color, background: `${comp.color}20` }}>{comp.initials}</div>
                <div className="aua-mac-info">
                  <div className="aua-mac-name">{comp.name}</div>
                  <div className="aua-mac-stats">👤 {comp.dau} <span className="aua-mac-sep">◆</span> ⚡ {comp.api}</div>
                </div>
                <div className="aua-mac-right">
                  <span className="aua-mac-gb">{comp.usage} GB</span>
                  <div className="aua-mac-bar-bg"><div className="aua-mac-bar-fill" style={{ width: `${(comp.usage/comp.max)*100}%`, background: comp.color }} /></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Used Modules */}
        <div className="aua-card">
          <div className="aua-card-header">
            <div>
              <h3 className="aua-card-title">Most Used Modules</h3>
              <div className="aua-card-sub">By API request volume</div>
            </div>
          </div>
          <div className="aua-mum-list">
            {MOST_USED_MODULES.map(mod => (
              <div key={mod.rank} className="aua-mum-row">
                <div className="aua-mum-rank">{mod.rank}</div>
                <div className="aua-mum-info">
                  <div className="aua-mum-top">
                    <span className="aua-mum-name">{mod.name}</span>
                    <span className="aua-mum-val">{mod.requests} <span className="aua-mum-pct">{mod.percent}%</span></span>
                  </div>
                  <div className="aua-mum-bar-bg"><div className="aua-mum-bar-fill" style={{ width: `${mod.percent}%` }} /></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Performance */}
        <div className="aua-card">
          <div className="aua-card-header">
            <div>
              <h3 className="aua-card-title">System Performance</h3>
              <div className="aua-card-sub">Infrastructure health — real-time</div>
            </div>
          </div>
          <div className="aua-sp-list">
            {SYSTEM_PERF.map(perf => (
              <div key={perf.label} className="aua-sp-row">
                <div className="aua-sp-left">
                  <span className={`aua-sp-dot aua-sp-dot--${perf.status}`} />
                  <span className="aua-sp-lbl">{perf.label}</span>
                </div>
                <span className={`aua-sp-val aua-sp-val--${perf.status}`}>{perf.val}</span>
              </div>
            ))}
          </div>
          
          <div className="aua-sp-device">
            <div className="aua-sp-d-lbl">MOBILE VS WEB</div>
            <div className="aua-sp-d-bar">
              <div className="aua-sp-d-mobile" style={{ width: '38%' }} />
              <div className="aua-sp-d-web" style={{ width: '62%' }} />
            </div>
            <div className="aua-sp-d-labels">
              <span>38% Mobile</span>
              <span>62% Web</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
