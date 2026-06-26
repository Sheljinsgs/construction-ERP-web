import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const NAV_GROUPS = [
  {
    label: 'GENERAL',
    items: [
      { id: 'dashboard', icon: '⊞', label: 'Dashboard' },
    ],
  },
  {
    label: 'ORGANIZATION',
    items: [
      { id: 'company',   icon: '🏢', label: 'Company Structure' },
      { id: 'countries', icon: '🌍', label: 'Countries' },
      { id: 'branches',  icon: '🏭', label: 'Branches' },
    ],
  },
  {
    label: 'USERS',
    items: [
      { id: 'users', icon: '👥', label: 'Users' },
      { id: 'roles', icon: '🔐', label: 'Roles' },
    ],
  },
  {
    label: 'PROJECTS',
    items: [
      { id: 'projects', icon: '📁', label: 'Projects' },
      { id: 'sites',    icon: '📍', label: 'Sites' },
    ],
  },
  {
    label: 'WORKFORCE',
    items: [
      { id: 'labour',     icon: '👷', label: 'Labour' },
      { id: 'attendance', icon: '📋', label: 'Attendance' },
      { id: 'overtime',   icon: '⏱️', label: 'Overtime' },
    ],
  },
  {
    label: 'PROCUREMENT',
    items: [
      { id: 'vendors',  icon: '🤝', label: 'Vendors' },
      { id: 'purchase', icon: '🛒', label: 'Purchase Orders' },
    ],
  },
  {
    label: 'INVENTORY',
    items: [
      { id: 'materials', icon: '🧱', label: 'Materials' },
      { id: 'stock',     icon: '📦', label: 'Stock Management' },
    ],
  },
  {
    label: 'FINANCE',
    items: [
      { id: 'expenses', icon: '💸', label: 'Expenses' },
      { id: 'payroll',  icon: '💰', label: 'Payroll' },
    ],
  },
  {
    label: 'SYSTEM',
    items: [
      { id: 'reports',       icon: '📊', label: 'Reports' },
      { id: 'notifications', icon: '🔔', label: 'Notifications' },
      { id: 'settings',      icon: '⚙️',  label: 'Settings' },
    ],
  },
];

export default function Sidebar({ activeNav, setActiveNav, user, navigate }) {
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('erp_token');
    localStorage.removeItem('erp_user');
    navigate('/login');
  };

  return (
    <aside className={`sidebar${collapsed ? ' sidebar--collapsed' : ''}`}>
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="brand-logo">🏗️</div>
        {!collapsed && (
          <div className="brand-text">
            <div className="brand-name">APEXBUILD</div>
            <div className="brand-sub">ENTERPRISE ERP</div>
          </div>
        )}
        <button className="collapse-btn" onClick={() => setCollapsed(c => !c)}>
          {collapsed ? '›' : '‹'}
        </button>
      </div>

      {/* Company badge */}
      {!collapsed && (
        <div className="sidebar-company">
          <div className="company-badge-s">
            <div className="cb-avatar">CG</div>
            <div className="cb-info">
              <div className="cb-name">Classy Group</div>
              <div className="cb-status"><span className="cb-dot" />Active</div>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="sidebar-nav">
        {NAV_GROUPS.map(group => (
          <div key={group.label} className="nav-group">
            {!collapsed && <div className="nav-group-label">{group.label}</div>}
            {group.items.map(item => (
              <button
                key={item.id}
                className={`nav-item${activeNav === item.id ? ' nav-item--active' : ''}`}
                onClick={() => setActiveNav(item.id)}
                title={collapsed ? item.label : ''}
              >
                <span className="nav-icon">{item.icon}</span>
                {!collapsed && <span className="nav-label">{item.label}</span>}
                {!collapsed && item.id === 'notifications' && (
                  <span className="nav-badge">3</span>
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* User bottom */}
      <div className="sidebar-user">
        {!collapsed ? (
          <div className="sidebar-user-row">
            <div className="su-avatar">{user?.avatar || 'JC'}</div>
            <div className="su-info">
              <div className="su-name">{user?.name || 'Jennifer Cole'}</div>
              <div className="su-role">{user?.role || 'Company Administrator'}</div>
            </div>
            <button className="su-logout" onClick={handleLogout} title="Logout">↪</button>
          </div>
        ) : (
          <button className="su-logout-mini" onClick={handleLogout} title="Logout">↪</button>
        )}
      </div>
    </aside>
  );
}
