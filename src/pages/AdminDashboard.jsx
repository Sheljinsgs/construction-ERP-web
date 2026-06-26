import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminTopBar from '../components/AdminTopBar';
import AdminCompanies from './AdminCompanies';
import AdminCreateCompany from './AdminCreateCompany';
import AdminCompanyRequests from './AdminCompanyRequests';
import AdminLicenses from './AdminLicenses';
import AdminRenewals from './AdminRenewals';
import AdminPlans from './AdminPlans';
import AdminModuleAccess from './AdminModuleAccess';
import AdminFeatureFlags from './AdminFeatureFlags';
import AdminAuditLogs from './AdminAuditLogs';
import AdminActivityLogs from './AdminActivityLogs';
import AdminNotifications from './AdminNotifications';
import AdminUsageAnalytics from './AdminUsageAnalytics';
import AdminRevenueAnalytics from './AdminRevenueAnalytics';
import AdminSupportTickets from './AdminSupportTickets';
import AdminMaintenance from './AdminMaintenance';
import { getPlatformStats, getHealth, verifyAdminSession, adminLogout } from '../api/client';
import './AdminDashboard.css';

/* ─── Static mock data ─────────────────────────────────────────── */
const COMPANY_GROWTH = [
  { month: 'Jan', value: 60 },  { month: 'Feb', value: 72 },
  { month: 'Mar', value: 68 },  { month: 'Apr', value: 85 },
  { month: 'May', value: 78 },  { month: 'Jun', value: 95 },
  { month: 'Jul', value: 88 },  { month: 'Aug', value: 102 },
  { month: 'Sep', value: 115 }, { month: 'Oct', value: 108 },
  { month: 'Nov', value: 130 }, { month: 'Dec', value: 148 },
];

const SUBSCRIPTION_REV = [
  { month: 'May', enterprise: 55, pro: 35, basic: 20 },
  { month: 'Jun', enterprise: 60, pro: 38, basic: 22 },
  { month: 'Jul', enterprise: 58, pro: 40, basic: 19 },
  { month: 'Aug', enterprise: 65, pro: 42, basic: 23 },
  { month: 'Sep', enterprise: 70, pro: 45, basic: 25 },
  { month: 'Oct', enterprise: 80, pro: 50, basic: 28 },
  { month: 'Nov', enterprise: 85, pro: 55, basic: 30 },
  { month: 'Dec', enterprise: 100, pro: 62, basic: 35 },
];

const PLATFORM_USAGE = [
  { label: 'May', val: 55 }, { label: 'Jun', val: 65 },
  { label: 'Jul', val: 60 }, { label: 'Aug', val: 75 },
  { label: 'Sep', val: 72 }, { label: 'Oct', val: 82 },
  { label: 'Nov', val: 90 }, { label: 'Dec', val: 100 },
];

const RECENT_ACTIVITY = [
  { id: 1, color: 'blue',   title: 'New Company Created',       desc: 'Vanguard Infrastructure Inc. — 45 Employees | 12 managers activated.',      time: '2 min ago'  },
  { id: 2, color: 'green',  title: 'Company License Renewed',   desc: 'Classy Group Construction — Enterprise Plan renewed for 12 months.',         time: '34 min ago' },
  { id: 3, color: 'orange', title: 'License Expiry Warning',    desc: 'BuildRight Solutions — License expiring in 3 days. Notify admin.',           time: '2 hrs ago'  },
  { id: 4, color: 'red',    title: 'New Support Ticket',        desc: '#T-937: Payroll module not generating salary slips correctly.',              time: '3 hrs ago'  },
  { id: 5, color: 'purple', title: 'Plan Upgraded',             desc: 'Apex Urban Developments — Basic → Pro plan migration completed.',            time: '5 hrs ago'  },
];

const COMPANY_HEALTH = [
  { id: 1, rank: 1, name: 'Classy Group Construction...',  meta: '142 Users · Active', revenue: '$42,500', status: 'active',  color: '#3b82f6', initials: 'CG' },
  { id: 2, rank: 2, name: 'Vanguard Infrastructure...',    meta: '89 Users · Active',  revenue: '$31,200', status: 'active',  color: '#7c3aed', initials: 'VI' },
  { id: 3, rank: 3, name: 'Apex Urban Developments...',    meta: '65 Users · Active',  revenue: '$28,900', status: 'active',  color: '#f5a623', initials: 'AU' },
  { id: 4, rank: 4, name: 'RedBrick Civil Contractors',    meta: '38 Users · Trial',   revenue: '$8,100',  status: 'trial',   color: '#ef4444', initials: 'RC' },
];

const SUPPORT_TICKETS = [
  { label: 'Critical',      icon: '🔴', count: 4 },
  { label: 'High Priority', icon: '🟠', count: 5 },
  { label: 'Normal',        icon: '🟡', count: 4 },
  { label: 'Maintenance',   icon: '🔵', count: 2 },
];

/* ─── Mini bar chart ───────────────────────────────────────────── */
function MiniBarChart({ data, colorClass }) {
  const max = Math.max(...data.map(d => d.value ?? d.val));
  return (
    <div className="adm-bar-chart">
      {data.map((d, i) => (
        <div key={i} className="adm-bar-col">
          <div
            className={`adm-bar adm-bar--${colorClass}`}
            style={{ height: `${Math.round(((d.value ?? d.val) / max) * 80)}px` }}
          />
          <div className="adm-bar-label">{d.month || d.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ─── Subscription stacked bar chart ──────────────────────────── */
function SubRevChart({ data }) {
  const max = 200;
  const scale = v => Math.round((v / max) * 78);
  return (
    <div>
      <div className="adm-bar-chart" style={{ height: 90 }}>
        {data.map((d, i) => (
          <div key={i} className="adm-bar-col">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
              <div className="adm-bar adm-bar--dark"   style={{ height: `${scale(d.enterprise)}px`, width: '100%' }} />
              <div className="adm-bar adm-bar--blue"   style={{ height: `${scale(d.pro)}px`,        width: '100%' }} />
              <div className="adm-bar adm-bar--teal"   style={{ height: `${scale(d.basic)}px`,      width: '100%' }} />
            </div>
            <div className="adm-bar-label">{d.month}</div>
          </div>
        ))}
      </div>
      <div className="adm-chart-legend">
        <div className="adm-legend-item"><div className="adm-legend-dot" style={{ background: '#1e293b' }} /><span>Enterprise</span></div>
        <div className="adm-legend-item"><div className="adm-legend-dot" style={{ background: '#3b82f6' }} /><span>Pro</span></div>
        <div className="adm-legend-item"><div className="adm-legend-dot" style={{ background: '#00e5b0' }} /><span>Basic</span></div>
      </div>
    </div>
  );
}

/* ─── KPI Card ─────────────────────────────────────────────────── */
function KPICard({ icon, iconColor, label, value, sub, change, changeDir, highlight }) {
  return (
    <div className={`adm-kpi-card${highlight ? ' adm-kpi-card--highlight' : ''}`}>
      <div className="adm-kpi-top">
        <div className={`adm-kpi-icon-wrap adm-kpi-icon-wrap--${iconColor}`}>{icon}</div>
        {change && (
          <span className={`adm-kpi-change adm-kpi-change--${changeDir}`}>
            {changeDir === 'up' ? '▲' : '▼'} {change}
          </span>
        )}
      </div>
      <div className="adm-kpi-value">{value}</div>
      <div className="adm-kpi-label">{label}</div>
      {sub && <div className="adm-kpi-sub">{sub}</div>}
    </div>
  );
}

/* ─── Alert Card ───────────────────────────────────────────────── */
function AlertCard({ icon, label, value, sub, tag, tagColor }) {
  return (
    <div className="adm-alert-card">
      <div className="adm-alert-icon">{icon}</div>
      <div className="adm-alert-body">
        <div className="adm-alert-label">{label}</div>
        <div className="adm-alert-value">{value}</div>
        {sub && <div className="adm-alert-sub">{sub}</div>}
      </div>
      {tag && <span className={`adm-alert-tag adm-alert-tag--${tagColor}`}>{tag}</span>}
    </div>
  );
}

/* ─── Dashboard Overview ───────────────────────────────────────── */
function DashboardOverview({ stats, dateFilter, setDateFilter }) {
  return (
    <>
      {/* Page Header */}
      <div className="adm-page-header">
        <div>
          <div className="adm-breadcrumb">
            <span>🛡️ Super Admin</span>
            <span className="adm-breadcrumb-sep">›</span>
            <span>Dashboard</span>
          </div>
          <h1 className="adm-page-title">Platform Overview</h1>
          <p className="adm-page-sub">Real-time view across all enterprise tenants, subscriptions and platform health.</p>
        </div>
        <div className="adm-filter-group">
          {['This Month', 'Quarter', 'Annual'].map(f => (
            <button
              key={f}
              className={`adm-filter-btn${dateFilter === f ? ' active' : ''}`}
              onClick={() => setDateFilter(f)}
            >
              {f}
            </button>
          ))}
          <button className="adm-export-btn">⬇ Export</button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="adm-kpi-row">
        <KPICard icon="🏢" iconColor="blue"   label="TOTAL COMPANIES" value={stats?.totalCompanies ?? '148'} sub="Running accounts"      change="+12"  changeDir="up" />
        <KPICard icon="✅" iconColor="teal"   label="ACTIVE COMPANIES" value={stats?.activeRealms ?? '132'} sub="2 increases this week" change="+2"   changeDir="up" />
        <KPICard icon="🧪" iconColor="orange" label="TRIAL COMPANIES"  value="16"                           sub="Expiring in 7 days"    change="-2"   changeDir="down" />
        <KPICard icon="👥" iconColor="gold"   label="TOTAL USERS"      value={stats?.totalWorkforce ? Number(stats.totalWorkforce).toLocaleString() : '12,480'} sub="Across all tenants" change="+5.1%" changeDir="up" highlight />
      </div>

      {/* Revenue Row */}
      <div className="adm-alert-row">
        <AlertCard icon="💵" label="MONTHLY REVENUE"  value="$284.5K" sub="+$22.5K vs last month" tag="+88.2%" tagColor="green" />
        <AlertCard icon="📈" label="ANNUAL REVENUE"   value="$2.84M"  sub="ARR tracker"            tag="+31.4%" tagColor="green" />
        <AlertCard icon="🔗" label="ACTIVE SESSIONS"  value={stats?.activeSessions ?? '3,842'} sub="Real-time telemetry" tag="+820" tagColor="blue" />
        <AlertCard icon="🎫" label="SUPPORT TICKETS"  value="14"      sub="4 Critical, 5 High"     tag="+3"     tagColor="orange" />
      </div>

      {/* Charts Row */}
      <div className="adm-charts-row">
        <div className="adm-chart-card">
          <div className="adm-chart-header">
            <div>
              <div className="adm-chart-title">Company Growth Trend</div>
              <div className="adm-chart-sub">Get max volume per month</div>
            </div>
            <span className="adm-chart-badge adm-chart-badge--green">+6.5% MoM</span>
          </div>
          <MiniBarChart data={COMPANY_GROWTH} colorClass="gold" />
        </div>

        <div className="adm-chart-card">
          <div className="adm-chart-header">
            <div>
              <div className="adm-chart-title">Subscription Revenue</div>
              <div className="adm-chart-sub">Support per each month</div>
            </div>
            <button className="adm-view-link">View All ↗</button>
          </div>
          <SubRevChart data={SUBSCRIPTION_REV} />
        </div>

        <div className="adm-chart-card">
          <div className="adm-chart-header">
            <div><div className="adm-chart-title">Platform Usage &amp; Activity</div></div>
          </div>
          <MiniBarChart data={PLATFORM_USAGE} colorClass="gold" />
          <div className="adm-usage-stats">
            <div className="adm-usage-stat"><div className="adm-usage-stat-label">API Requests</div><div className="adm-usage-stat-value">8.4M</div></div>
            <div className="adm-usage-stat"><div className="adm-usage-stat-label">Avg Latency</div><div className="adm-usage-stat-value">24ms</div></div>
            <div className="adm-usage-stat"><div className="adm-usage-stat-label">Active Users</div><div className="adm-usage-stat-value">9,640</div></div>
            <div className="adm-usage-stat"><div className="adm-usage-stat-label">DB Queries</div><div className="adm-usage-stat-value">3,842</div></div>
          </div>
          <div className="adm-chart-trend">▲ {stats?.platformHealth ?? '99.98%'} Uptime</div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="adm-bottom-row">
        {/* Recent Activity */}
        <div className="adm-section-card">
          <div className="adm-section-header">
            <div>
              <div className="adm-section-title">Recent Platform Activity</div>
              <div className="adm-section-sub">Live event log</div>
            </div>
            <button className="adm-view-link">View All ↗</button>
          </div>
          <div className="adm-activity-list">
            {RECENT_ACTIVITY.map(item => (
              <div key={item.id} className="adm-activity-item">
                <div className="adm-activity-dot-wrap">
                  <div className={`adm-activity-dot adm-activity-dot--${item.color}`} />
                </div>
                <div className="adm-activity-body">
                  <div className="adm-activity-title">{item.title}</div>
                  <div className="adm-activity-desc">{item.desc}</div>
                </div>
                <div className="adm-activity-time">{item.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle col */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
          <div className="adm-section-card">
            <div className="adm-section-header">
              <div className="adm-section-title">Quick Actions</div>
            </div>
            <div className="adm-qa-grid">
              <button className="adm-qa-btn adm-qa-btn--gold"   id="qa-create-company"><span className="adm-qa-btn-icon">🏢</span>Create Company</button>
              <button className="adm-qa-btn adm-qa-btn--navy"   id="qa-configure-modules"><span className="adm-qa-btn-icon">🧩</span>Configure Modules</button>
              <button className="adm-qa-btn adm-qa-btn--teal"   id="qa-create-plan"><span className="adm-qa-btn-icon">📦</span>Create Plan</button>
              <button className="adm-qa-btn adm-qa-btn--purple" id="qa-view-analytics"><span className="adm-qa-btn-icon">📊</span>View Analytics</button>
            </div>
          </div>

          <div className="adm-section-card">
            <div className="adm-section-header">
              <div>
                <div className="adm-section-title">Support Center</div>
                <div className="adm-section-sub">Open ticket distribution</div>
              </div>
              <button className="adm-view-link">View All ↗</button>
            </div>
            <div className="adm-ticket-list">
              {SUPPORT_TICKETS.map(t => (
                <div key={t.label} className="adm-ticket-item">
                  <div className="adm-ticket-left">
                    <span className="adm-ticket-icon">{t.icon}</span>
                    <span className="adm-ticket-label">{t.label}</span>
                  </div>
                  <span className="adm-ticket-count">{t.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company Health Monitor */}
        <div className="adm-section-card">
          <div className="adm-section-header">
            <div>
              <div className="adm-section-title">Company Health Monitor</div>
              <div className="adm-section-sub">Top companies by usage</div>
            </div>
            <button className="adm-view-link">View All ↗</button>
          </div>
          <div className="adm-health-list">
            {COMPANY_HEALTH.map(c => (
              <div key={c.id} className="adm-health-item">
                <div className="adm-health-rank">#{c.rank}</div>
                <div className="adm-health-avatar" style={{ background: c.color }}>{c.initials}</div>
                <div className="adm-health-body">
                  <div className="adm-health-name">{c.name}</div>
                  <div className="adm-health-meta">{c.meta}</div>
                  <div className="adm-prog-track" style={{ marginTop: 4 }}>
                    <div className="adm-prog-fill" style={{ width: `${[90, 75, 65, 45][c.rank - 1] || 30}%` }} />
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div className="adm-health-revenue">{c.revenue}</div>
                  <span className={`adm-health-status adm-health-status--${c.status}`} style={{ display: 'inline-block', marginTop: 4 }} />
                </div>
              </div>
            ))}
            <div className="adm-health-footer">⚠️ 2 Renewals Due This Month — Terra Link · BuildSafe Ltd</div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Main Component ───────────────────────────────────────────── */
export default function AdminDashboard() {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem('erp_admin') || '{}');
  const [activeNav, setActiveNav] = useState('dashboard');
  const [dateFilter, setDateFilter] = useState('This Month');
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('erp_token');
    if (!token) {
      navigate('/super-admin/login', { replace: true });
      return;
    }
    // Verify session is still valid
    verifyAdminSession()
      .then(() => {
        // Session valid — load dashboard data
        getPlatformStats()
          .then(res => setStats(res.data.stats))
          .catch(() => setStats({
            totalCompanies: 148, activeRealms: 132, totalWorkforce: 12480,
            activeSessions: 3842, platformHealth: '99.98%',
          }));
        getHealth().catch(() => {});
      })
      .catch(() => {
        // Session expired or invalid
        localStorage.removeItem('erp_token');
        localStorage.removeItem('erp_admin');
        navigate('/super-admin/login', { replace: true });
      });
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await adminLogout();
    } catch (_) { /* ignore */ }
    localStorage.removeItem('erp_token');
    localStorage.removeItem('erp_admin');
    localStorage.removeItem('erp_stay_verified');
    navigate('/super-admin/login');
  };

  /* Render the correct sub-page based on sidebar nav */
  const renderContent = () => {
    switch (activeNav) {
      case 'companies':         return <AdminCompanies />;
      case 'create-company':    return <AdminCreateCompany />;
      case 'company-requests':  return <AdminCompanyRequests />;
      case 'plans':             return <AdminPlans />;
      case 'licenses':          return <AdminLicenses />;
      case 'renewals':          return <AdminRenewals />;
      case 'module-access':     return <AdminModuleAccess />;
      case 'feature-flags':     return <AdminFeatureFlags />;
      case 'audit-logs':        return <AdminAuditLogs />;
      case 'activity-logs':     return <AdminActivityLogs />;
      case 'notifications':     return <AdminNotifications />;
      case 'usage-analytics':   return <AdminUsageAnalytics />;
      case 'revenue-analytics': return <AdminRevenueAnalytics />;
      case 'support-tickets':   return <AdminSupportTickets />;
      case 'maintenance':       return <AdminMaintenance />;
      default:                  return <DashboardOverview stats={stats} dateFilter={dateFilter} setDateFilter={setDateFilter} />;
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        admin={admin}
        onLogout={handleLogout}
      />
      <div className="admin-main">
        <AdminTopBar admin={admin} onQuickAction={() => {}} />
        <div className="admin-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
