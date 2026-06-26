import './AdminTopBar.css';

export default function AdminTopBar({ admin, onQuickAction }) {
  const initials = admin?.name
    ? admin.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : 'SA';

  return (
    <header className="admin-topbar">
      {/* Search */}
      <div className="atb-search">
        <span className="atb-search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search companies, licenses, tickets, deployments..."
          className="atb-search-input"
        />
        <kbd className="atb-search-kbd">⌘K</kbd>
      </div>

      <div className="atb-right">
        {/* System status */}
        <div className="atb-system-status">
          <span className="atb-status-dot" />
          <span>All Systems Normal</span>
        </div>

        {/* Quick Actions */}
        <button className="atb-quick-btn" id="admin-quick-actions" onClick={onQuickAction}>
          ⚡ Quick Actions
          <span className="atb-qa-arrow">▾</span>
        </button>

        {/* Notifications */}
        <button className="atb-icon-btn" id="admin-notifications" aria-label="Notifications">
          🔔
          <span className="atb-notif-badge">5</span>
        </button>

        {/* Admin user */}
        <div className="atb-user">
          <div className="atb-user-avatar">{initials}</div>
          <div className="atb-user-info">
            <div className="atb-user-name">{admin?.name || 'System Administrator'}</div>
            <div className="atb-user-role">
              <span className="atb-user-level">{admin?.level || 'GLOBAL'}</span>
            </div>
          </div>
          <span className="atb-arrow">▾</span>
        </div>
      </div>
    </header>
  );
}
