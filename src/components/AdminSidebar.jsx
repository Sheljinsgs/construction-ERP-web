import { useState } from 'react';
import './AdminSidebar.css';

const NAV_GROUPS = [
  {
    label: 'GENERAL',
    items: [
      { id: 'dashboard', icon: '⊞', label: 'Dashboard' },
    ],
  },
  {
    label: 'COMPANY MANAGEMENT',
    items: [
      { id: 'companies',        icon: '🏢', label: 'Companies',        badge: null },
      { id: 'create-company',   icon: '➕', label: 'Create Company',   badge: null },
      { id: 'company-requests', icon: '📬', label: 'Company Requests', badge: 3 },
    ],
  },
  {
    label: 'SUBSCRIPTION',
    items: [
      { id: 'plans',    icon: '📦', label: 'Plans',    badge: null },
      { id: 'licenses', icon: '🪪', label: 'Licenses', badge: null },
      { id: 'renewals', icon: '🔄', label: 'Renewals', badge: 2 },
    ],
  },
  {
    label: 'FEATURE MANAGEMENT',
    items: [
      { id: 'module-access', icon: '🧩', label: 'Module Access', badge: null },
      { id: 'feature-flags', icon: '🚩', label: 'Feature Flags',  badge: null },
    ],
  },
  {
    label: 'ANALYTICS',
    items: [
      { id: 'platform-analytics', icon: '📊', label: 'Platform Analytics', badge: null },
      { id: 'revenue-analytics',  icon: '💹', label: 'Revenue Analytics',  badge: null },
      { id: 'usage-analytics',    icon: '📈', label: 'Usage Analytics',    badge: null },
    ],
  },
  {
    label: 'SUPPORT CENTER',
    items: [
      { id: 'support-tickets', icon: '🎫', label: 'Support Tickets', badge: 14 },
      { id: 'maintenance',     icon: '🔧', label: 'Maintenance',     badge: null },
    ],
  },
  {
    label: 'SYSTEM LOGS',
    items: [
      { id: 'audit-logs',    icon: '📋', label: 'Audit Logs',    badge: null },
      { id: 'activity-logs', icon: '🗒️', label: 'Activity Logs', badge: null },
      { id: 'notifications', icon: '🔔', label: 'Notifications',  badge: 5 },
    ],
  },
  {
    label: 'CUSTOMER SETTINGS',
    items: [
      { id: 'general-settings',  icon: '⚙️',  label: 'General Settings',  badge: null },
      { id: 'security-settings', icon: '🔐', label: 'Security Settings',  badge: null },
      { id: 'integrations',      icon: '🔌', label: 'Integrations',       badge: null },
    ],
  },
];

export default function AdminSidebar({ activeNav, setActiveNav, admin, onLogout }) {
  const [collapsed, setCollapsed] = useState(false);

  const initials = admin?.name
    ? admin.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : 'SA';

  return (
    <aside className={`admin-sidebar${collapsed ? ' admin-sidebar--collapsed' : ''}`}>
      {/* Brand */}
      <div className="asb-brand">
        <div className="asb-logo">🏗️</div>
        {!collapsed && (
          <div className="asb-brand-text">
            <div className="asb-brand-name">APEXBUILD</div>
            <div className="asb-brand-sub">ENTERPRISE ERP</div>
          </div>
        )}
        <button className="asb-collapse-btn" onClick={() => setCollapsed(c => !c)} title={collapsed ? 'Expand' : 'Collapse'}>
          {collapsed ? '›' : '‹'}
        </button>
      </div>

      {/* Nav scroll area */}
      <nav className="asb-nav">
        {NAV_GROUPS.map(group => (
          <div key={group.label} className="asb-group">
            {!collapsed && <div className="asb-group-label">{group.label}</div>}
            {group.items.map(item => (
              <button
                key={item.id}
                className={`asb-item${activeNav === item.id ? ' asb-item--active' : ''}`}
                onClick={() => setActiveNav(item.id)}
                title={collapsed ? item.label : ''}
              >
                <span className="asb-item-icon">{item.icon}</span>
                {!collapsed && <span className="asb-item-label">{item.label}</span>}
                {!collapsed && item.badge && (
                  <span className="asb-item-badge">{item.badge}</span>
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* Platform Monitor */}
      {!collapsed && (
        <div className="asb-monitor">
          <div className="asb-monitor-inner">
            <div className="asb-monitor-dot" />
            <div>
              <div className="asb-monitor-label">Platform Monitor</div>
              <div className="asb-monitor-sub">All Systems Normal</div>
            </div>
          </div>
        </div>
      )}

      {/* User bottom */}
      <div className="asb-user">
        {!collapsed ? (
          <div className="asb-user-row">
            <div className="asb-user-avatar">{initials}</div>
            <div className="asb-user-info">
              <div className="asb-user-name">{admin?.name || 'Super Admin'}</div>
              <div className="asb-user-role">
                <span className="asb-user-dot" />
                {admin?.level || 'GLOBAL'} Admin
              </div>
            </div>
            <button className="asb-logout-btn" onClick={onLogout} title="Logout">↪</button>
          </div>
        ) : (
          <button className="asb-logout-mini" onClick={onLogout} title="Logout">↪</button>
        )}
      </div>
    </aside>
  );
}
