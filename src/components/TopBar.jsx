import './TopBar.css';

export default function TopBar({ user }) {
  return (
    <header className="topbar">
      {/* Search */}
      <div className="topbar-search">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search projects, labour, materials, expenses..."
          className="search-input"
        />
        <kbd className="search-kbd">⌘K</kbd>
      </div>

      <div className="topbar-right">
        {/* Sites status */}
        <div className="sites-status">
          <span className="sites-dot" />
          <span>12 Sites Operational</span>
        </div>

        {/* Quick Actions */}
        <button className="quick-actions-btn" id="quick-actions-topbar">
          ⚡ Quick Actions
          <span className="qa-arrow">▾</span>
        </button>

        {/* Notification */}
        <button className="icon-btn" id="notifications-btn" aria-label="Notifications">
          🔔
          <span className="notif-badge">3</span>
        </button>

        {/* User */}
        <div className="topbar-user">
          <div className="tu-avatar">{user?.avatar || 'JC'}</div>
          <div className="tu-info">
            <div className="tu-name">{user?.name || 'Jennifer Cole'}</div>
            <div className="tu-role">{user?.role || 'Company Administrator'}</div>
          </div>
          <span className="tu-arrow">▾</span>
        </div>
      </div>
    </header>
  );
}
