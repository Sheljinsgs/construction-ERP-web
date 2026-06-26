import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { 
  LayoutDashboard, Building, Globe, Factory, Users, Lock, 
  FolderOpen, MapPin, HardHat, ClipboardCheck, Clock, 
  Handshake, ShoppingCart, PaintBucket, Box, 
  Banknote, Wallet, FileBarChart, Bell, Settings, LogOut 
} from 'lucide-react';

const NAV_GROUPS = [
  {
    label: 'GENERAL',
    items: [
      { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    ],
  },
  {
    label: 'ORGANIZATION',
    items: [
      { id: 'company',   icon: Building, label: 'Company Structure' },
      { id: 'countries', icon: Globe, label: 'Countries' },
      { id: 'branches',  icon: Factory, label: 'Branches' },
    ],
  },
  {
    label: 'USERS',
    items: [
      { id: 'users', icon: Users, label: 'Users' },
      { id: 'roles', icon: Lock, label: 'Roles' },
    ],
  },
  {
    label: 'PROJECTS',
    items: [
      { id: 'projects', icon: FolderOpen, label: 'Projects' },
      { id: 'sites',    icon: MapPin, label: 'Sites' },
    ],
  },
  {
    label: 'WORKFORCE',
    items: [
      { id: 'labour',     icon: HardHat, label: 'Labour' },
      { id: 'attendance', icon: ClipboardCheck, label: 'Attendance' },
      { id: 'overtime',   icon: Clock, label: 'Overtime' },
    ],
  },
  {
    label: 'PROCUREMENT',
    items: [
      { id: 'vendors',  icon: Handshake, label: 'Vendors' },
      { id: 'purchase', icon: ShoppingCart, label: 'Purchase Orders' },
    ],
  },
  {
    label: 'INVENTORY',
    items: [
      { id: 'materials', icon: PaintBucket, label: 'Materials' },
      { id: 'stock',     icon: Box, label: 'Stock Management' },
    ],
  },
  {
    label: 'FINANCE',
    items: [
      { id: 'expenses', icon: Wallet, label: 'Expenses' },
      { id: 'payroll',  icon: Banknote, label: 'Payroll' },
    ],
  },
  {
    label: 'SYSTEM',
    items: [
      { id: 'reports',       icon: FileBarChart, label: 'Reports' },
      { id: 'notifications', icon: Bell, label: 'Notifications' },
      { id: 'settings',      icon: Settings,  label: 'Settings' },
    ],
  },
];

export default function Sidebar({ activeNav, setActiveNav, user, navigate }) {
  const handleLogout = () => {
    localStorage.removeItem('erp_token');
    localStorage.removeItem('erp_user');
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="brand-logo">
          <Building size={24} color="#3b82f6" />
        </div>
        <div className="brand-text">
          <div className="brand-name">DEMO BUILD</div>
          <div className="brand-sub">ENTERPRISE ERP</div>
        </div>
      </div>

      {/* Company badge */}
      <div className="sidebar-company">
        <div className="company-badge-s">
          <div className="cb-avatar">CG</div>
          <div className="cb-info">
            <div className="cb-name">Classy Group</div>
            <div className="cb-status"><span className="cb-dot" />Active</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {NAV_GROUPS.map(group => (
          <div key={group.label} className="nav-group">
            <div className="nav-group-label">{group.label}</div>
            {group.items.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className={`nav-item${activeNav === item.id ? ' nav-item--active' : ''}`}
                  onClick={() => setActiveNav(item.id)}
                >
                  <span className="nav-icon"><Icon size={18} /></span>
                  <span className="nav-label">{item.label}</span>
                  {item.id === 'notifications' && (
                    <span className="nav-badge">3</span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User bottom */}
      <div className="sidebar-user">
        <div className="sidebar-user-row">
          <div className="su-avatar">{user?.avatar || 'JC'}</div>
          <div className="su-info">
            <div className="su-name">{user?.name || 'Jennifer Cole'}</div>
            <div className="su-role">{user?.role || 'Company Administrator'}</div>
          </div>
          <button className="su-logout" onClick={handleLogout} title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
