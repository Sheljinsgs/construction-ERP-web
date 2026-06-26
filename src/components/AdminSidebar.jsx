import './AdminSidebar.css';
import { 
  LayoutDashboard, Building2, PlusCircle, Inbox, Package, Contact, 
  RefreshCcw, Puzzle, Flag, BarChart3, TrendingUp, LineChart, 
  Ticket, Wrench, ClipboardList, Activity, Bell, Settings, 
  Shield, Plug, LogOut 
} from 'lucide-react';

const NAV_GROUPS = [
  {
    label: 'GENERAL',
    items: [
      { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    ],
  },
  {
    label: 'COMPANY MANAGEMENT',
    items: [
      { id: 'companies',        icon: Building2, label: 'Companies',        badge: null },
      { id: 'create-company',   icon: PlusCircle, label: 'Create Company',   badge: null },
      { id: 'company-requests', icon: Inbox, label: 'Company Requests', badge: 3 },
    ],
  },
  {
    label: 'SUBSCRIPTION',
    items: [
      { id: 'plans',    icon: Package, label: 'Plans',    badge: null },
      { id: 'licenses', icon: Contact, label: 'Licenses', badge: null },
      { id: 'renewals', icon: RefreshCcw, label: 'Renewals', badge: 2 },
    ],
  },
  {
    label: 'FEATURE MANAGEMENT',
    items: [
      { id: 'module-access', icon: Puzzle, label: 'Module Access', badge: null },
      { id: 'feature-flags', icon: Flag, label: 'Feature Flags',  badge: null },
    ],
  },
  {
    label: 'ANALYTICS',
    items: [
      { id: 'platform-analytics', icon: BarChart3, label: 'Platform Analytics', badge: null },
      { id: 'revenue-analytics',  icon: TrendingUp, label: 'Revenue Analytics',  badge: null },
      { id: 'usage-analytics',    icon: LineChart, label: 'Usage Analytics',    badge: null },
    ],
  },
  {
    label: 'SUPPORT CENTER',
    items: [
      { id: 'support-tickets', icon: Ticket, label: 'Support Tickets', badge: 14 },
      { id: 'maintenance',     icon: Wrench, label: 'Maintenance',     badge: null },
    ],
  },
  {
    label: 'SYSTEM LOGS',
    items: [
      { id: 'audit-logs',    icon: ClipboardList, label: 'Audit Logs',    badge: null },
      { id: 'activity-logs', icon: Activity, label: 'Activity Logs', badge: null },
      { id: 'notifications', icon: Bell, label: 'Notifications',  badge: 5 },
    ],
  },
  {
    label: 'CUSTOMER SETTINGS',
    items: [
      { id: 'general-settings',  icon: Settings,  label: 'General Settings',  badge: null },
      { id: 'security-settings', icon: Shield, label: 'Security Settings',  badge: null },
      { id: 'integrations',      icon: Plug, label: 'Integrations',       badge: null },
    ],
  },
];

export default function AdminSidebar({ activeNav, setActiveNav, admin, onLogout }) {
  const initials = admin?.name
    ? admin.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : 'SA';

  return (
    <aside className="admin-sidebar">
      {/* Brand */}
      <div className="asb-brand">
        <div className="asb-logo">
          <Building2 size={24} color="#3b82f6" />
        </div>
        <div className="asb-brand-text">
          <div className="asb-brand-name">DEMO BUILD</div>
          <div className="asb-brand-sub">ENTERPRISE ERP</div>
        </div>
      </div>

      {/* Nav scroll area */}
      <nav className="asb-nav">
        {NAV_GROUPS.map(group => (
          <div key={group.label} className="asb-group">
            <div className="asb-group-label">{group.label}</div>
            {group.items.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className={`asb-item${activeNav === item.id ? ' asb-item--active' : ''}`}
                  onClick={() => setActiveNav(item.id)}
                >
                  <span className="asb-item-icon"><Icon size={18} /></span>
                  <span className="asb-item-label">{item.label}</span>
                  {item.badge && (
                    <span className="asb-item-badge">{item.badge}</span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Platform Monitor */}
      <div className="asb-monitor">
        <div className="asb-monitor-inner">
          <div className="asb-monitor-dot" />
          <div>
            <div className="asb-monitor-label">Platform Monitor</div>
            <div className="asb-monitor-sub">All Systems Normal</div>
          </div>
        </div>
      </div>

      {/* User bottom */}
      <div className="asb-user">
        <div className="asb-user-row">
          <div className="asb-user-avatar">{initials}</div>
          <div className="asb-user-info">
            <div className="asb-user-name">{admin?.name || 'Super Admin'}</div>
            <div className="asb-user-role">
              <span className="asb-user-dot" />
              {admin?.level || 'GLOBAL'} Admin
            </div>
          </div>
          <button className="asb-logout-btn" onClick={onLogout} title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
