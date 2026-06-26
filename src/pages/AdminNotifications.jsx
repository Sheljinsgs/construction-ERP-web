import { useState } from 'react';
import './AdminNotifications.css';

/* ─── Mock Data ────────────────────────────────────────────────── */
const CATEGORIES = [
  { id: 'all', label: 'All', count: 38, icon: '0' },
  { id: 'lic', label: 'License Expiry', count: 7, icon: '⏱️' },
  { id: 'srv', label: 'Server Alerts', count: 2, icon: '🖥️' },
  { id: 'sec', label: 'Security Alerts', count: 3, icon: '🛡️' },
  { id: 'sup', label: 'Support Tickets', count: 14, icon: '📞' },
  { id: 'req', label: 'Company Requests', count: 7, icon: '🏢' },
  { id: 'pay', label: 'Payment Alerts', count: 5, icon: '💳' },
];

const NOTIFICATIONS = [
  { id: 'n1', type: 'lic', icon: '⏱️', title: 'License Expiring in 4 Days', desc: 'Apex Urban Development Group — Professional plan expires Nov 22, 2025. Renewal amount: $17,988.', company: 'Apex Urban Development', time: '2 min ago', priority: 'critical', unread: true, actionBtn: 'Renew Now', color: '#f5a623' },
  { id: 'n2', type: 'sec', icon: '🛡️', title: 'Brute Force Attack Detected', desc: '16 failed login attempts from IP 45.122.122.68 in 10 minutes. Account auto-locked. Review required.', company: 'Platform Admin', time: '18 min ago', priority: 'critical', unread: true, actionBtn: 'View Details', color: '#ef4444' },
  { id: 'n3', type: 'srv', icon: '🖥️', title: 'Server Storage at 88%', desc: 'Production server disk usage has reached 88%. Auto-archive scheduled for midnight. No action needed if below 95%.', company: 'Infrastructure', time: '34 min ago', priority: 'high', unread: true, actionBtn: 'View Status', color: '#ef4444' },
  { id: 'n4', type: 'sup', icon: '📞', title: 'Critical Support Ticket — Unresolved 4hrs', desc: '#TKT-8831: Payroll module critical failure. Classy Group — 342 workers unable to process salaries.', company: 'Classy Group Construction', time: '4 hrs ago', priority: 'high', unread: true, actionBtn: 'Open Ticket', color: '#3b82f6' },
  { id: 'n5', type: 'req', icon: '🏢', title: '7 Company Requests Pending', desc: '7 new organization onboarding requests are awaiting review and approval. Oldest request: 3 days old.', company: 'Platform Admin', time: '6 hrs ago', priority: 'medium', unread: true, actionBtn: 'Review All', color: '#10b981' },
  { id: 'n6', type: 'pay', icon: '💳', title: 'Invoice Overdue — RedBrick Civil', desc: 'Invoice #INV-2882 for $3,588 is 30 days overdue. License has been suspended pending payment.', company: 'RedBrick Civil Contractors', time: '1 day ago', priority: 'medium', unread: false, actionBtn: 'Send Reminder', color: '#a855f7' },
  { id: 'n7', type: 'lic', icon: '⏱️', title: 'License Expiring in 12 Days', desc: 'NorthBridge Industrial Structures — Basic plan expires Nov 30, 2025. Renewal amount: $3,588.', company: 'NorthBridge Industrial', time: '1 day ago', priority: 'medium', unread: false, actionBtn: 'Send Reminder', color: '#f5a623' },
  { id: 'n8', type: 'sup', icon: '📞', title: 'New Support Ticket Assigned', desc: '#TKT-8835: Module configuration assistance requested by Horizon Solar & Green Tech admin team.', company: 'Horizon Solar & Green Tech', time: '2 days ago', priority: 'low', unread: false, actionBtn: 'View Ticket', color: '#3b82f6' },
];

export default function AdminNotifications() {
  const [activeCat, setActiveCat] = useState('all');

  const filtered = NOTIFICATIONS.filter(n => activeCat === 'all' || n.type === activeCat);

  return (
    <div className="an-container">
      {/* ── Header ────────────────────────────────────────────── */}
      <div className="an-header">
        <div>
          <div className="an-breadcrumb">
            <span>📋 System Administration</span>
            <span className="an-bc-sep">›</span>
            <span>Notifications</span>
          </div>
          <div className="an-title-row">
            <h1 className="an-title">Notification Center</h1>
            <span className="an-title-badge">5 unread</span>
          </div>
          <p className="an-sub">Platform-wide alerts, reminders and system events requiring your attention.</p>
        </div>
        <div className="an-header-actions">
          <button className="an-btn-outline">✓ Mark All Read</button>
          <button className="an-btn-outline an-btn-outline--danger">🗑️ Clear All</button>
          <button className="an-btn-primary">⚙️ Preferences</button>
        </div>
      </div>

      <div className="an-body">
        {/* Left Sidebar */}
        <div className="an-sidebar">
          <div className="an-cats">
            {CATEGORIES.map(cat => (
              <button 
                key={cat.id} 
                className={`an-cat-btn ${activeCat === cat.id ? 'an-cat-btn--active' : ''}`}
                onClick={() => setActiveCat(cat.id)}
              >
                <div className="an-cat-left">
                  {cat.id === 'all' ? <span className="an-cat-icon">0</span> : <span className="an-cat-icon">{cat.icon}</span>}
                  <span className="an-cat-lbl">{cat.label}</span>
                </div>
                <span className="an-cat-count">{cat.count}</span>
              </button>
            ))}
          </div>

          <div className="an-priority-breakdown">
            <h4 className="an-pb-title">BY PRIORITY</h4>
            <div className="an-pb-list">
              <div className="an-pb-row">
                <div className="an-pb-left"><span className="an-pb-dot an-pb-dot--crit" /> Critical</div>
                <div className="an-pb-bar-wrap"><div className="an-pb-bar an-pb-bar--crit" style={{ width: '40%' }} /></div>
                <div className="an-pb-val">2</div>
              </div>
              <div className="an-pb-row">
                <div className="an-pb-left"><span className="an-pb-dot an-pb-dot--high" /> High</div>
                <div className="an-pb-bar-wrap"><div className="an-pb-bar an-pb-bar--high" style={{ width: '40%' }} /></div>
                <div className="an-pb-val">2</div>
              </div>
              <div className="an-pb-row">
                <div className="an-pb-left"><span className="an-pb-dot an-pb-dot--med" /> Medium</div>
                <div className="an-pb-bar-wrap"><div className="an-pb-bar an-pb-bar--med" style={{ width: '60%' }} /></div>
                <div className="an-pb-val">3</div>
              </div>
              <div className="an-pb-row">
                <div className="an-pb-left"><span className="an-pb-dot an-pb-dot--low" /> Low</div>
                <div className="an-pb-bar-wrap"><div className="an-pb-bar an-pb-bar--low" style={{ width: '20%' }} /></div>
                <div className="an-pb-val">1</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main List */}
        <div className="an-main">
          <div className="an-list-toolbar">
            <div className="an-lt-left">
              <input type="checkbox" className="an-checkbox" /> Select all
              <button className="an-lt-btn">✓ Mark read</button>
              <button className="an-lt-btn an-lt-btn--danger">🗑️ Delete</button>
            </div>
            <div className="an-lt-right">
              <span className="an-lt-sort">Sort: Newest ▾</span>
              <span className="an-lt-sort">Priority: All ▾</span>
            </div>
          </div>

          <div className="an-list">
            {filtered.map(notif => (
              <div key={notif.id} className={`an-item ${notif.unread ? 'an-item--unread' : ''}`}>
                <div className="an-item-select">
                  <input type="checkbox" className="an-checkbox" />
                  {notif.unread && <div className="an-unread-dot" />}
                </div>
                
                <div className="an-item-icon-wrap" style={{ color: notif.color, backgroundColor: `${notif.color}15`, borderColor: `${notif.color}30` }}>
                  {notif.icon}
                </div>

                <div className="an-item-content">
                  <div className="an-ic-top">
                    <div className="an-ic-title-row">
                      <span className="an-ic-title">{notif.title}</span>
                      <span className={`an-badge an-badge--${notif.priority}`}>{notif.priority}</span>
                      {notif.unread && <span className="an-badge an-badge--blue">Unread</span>}
                    </div>
                    <span className="an-ic-time">{notif.time}</span>
                  </div>
                  <div className="an-ic-desc">{notif.desc}</div>
                  <div className="an-ic-bottom">
                    <span className="an-ic-company">🏢 {notif.company}</span>
                    <div className="an-ic-actions">
                      <button className="an-btn-text">Dismiss</button>
                      <button className="an-btn-action">{notif.actionBtn}</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <button className="an-load-more">⬇ Load Older Notifications</button>
          </div>
        </div>
      </div>
    </div>
  );
}
