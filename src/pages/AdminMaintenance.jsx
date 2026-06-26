import { useState } from 'react';
import './AdminMaintenance.css';

const SCHEDULE = [
  { id: 'MNT-891', title: 'Database Index Optimization', date: 'Sat, Nov 29, 2025', time: '02:00 AM - 04:00 AM UTC', status: 'scheduled', type: 'routine', impact: 'low', desc: 'Routine rebuilding of database indexes to maintain query performance. Minimal disruption expected.' },
  { id: 'MNT-890', title: 'Storage Node Expansion', date: 'Sun, Nov 30, 2025', time: '01:00 AM - 05:00 AM UTC', status: 'scheduled', type: 'infrastructure', impact: 'medium', desc: 'Adding 50TB to primary storage cluster. Read-only mode for files during the window.' },
  { id: 'MNT-882', title: 'Emergency Patch (CVE-2025-102)', date: 'Tue, Nov 25, 2025', time: '11:00 PM - 11:30 PM UTC', status: 'completed', type: 'security', impact: 'high', desc: 'Critical security patch for nginx reverse proxy. Complete service outage for 5 minutes.' },
];

export default function AdminMaintenance() {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <div className="amn-container">
      <div className="amn-header">
        <div>
          <div className="amn-breadcrumb">
            <span>🔧 Support Center</span>
            <span className="amn-bc-sep">›</span>
            <span>Maintenance</span>
          </div>
          <h1 className="amn-title">System Maintenance</h1>
          <p className="amn-sub">Schedule downtime, view maintenance logs, and broadcast system alerts.</p>
        </div>
        <button className="amn-create-btn">🗓 Schedule Maintenance</button>
      </div>

      <div className="amn-body">
        {/* Left: Health and Quick Actions */}
        <div className="amn-left">
          <div className="amn-card amn-health-card">
            <h3 className="amn-card-title">System Health Overview</h3>
            <div className="amn-health-status">
              <div className="amn-health-icon amn-health-icon--good">✓</div>
              <div className="amn-health-text">
                <div className="amn-health-main">All Systems Operational</div>
                <div className="amn-health-sub">Last checked 2 mins ago</div>
              </div>
            </div>
            <div className="amn-health-grid">
              <div className="amn-health-item">
                <span className="amn-health-lbl">Web App</span>
                <span className="amn-health-val amn-health-val--up">99.99%</span>
              </div>
              <div className="amn-health-item">
                <span className="amn-health-lbl">API Services</span>
                <span className="amn-health-val amn-health-val--up">99.98%</span>
              </div>
              <div className="amn-health-item">
                <span className="amn-health-lbl">Database</span>
                <span className="amn-health-val amn-health-val--up">100%</span>
              </div>
              <div className="amn-health-item">
                <span className="amn-health-lbl">Storage</span>
                <span className="amn-health-val amn-health-val--up">99.99%</span>
              </div>
            </div>
          </div>

          <div className="amn-card">
            <h3 className="amn-card-title">Broadcast Alert</h3>
            <p className="amn-card-desc">Send a global banner alert to all active users on the platform.</p>
            <div className="amn-alert-form">
              <select className="amn-input">
                <option>Info (Blue)</option>
                <option>Warning (Yellow)</option>
                <option>Critical (Red)</option>
              </select>
              <textarea className="amn-textarea" placeholder="Alert message..." rows="3" />
              <button className="amn-btn amn-btn--full">Broadcast Now</button>
            </div>
          </div>
        </div>

        {/* Right: Maintenance Schedule */}
        <div className="amn-right">
          <div className="amn-card amn-schedule-card">
            <div className="amn-schedule-header">
              <h3 className="amn-card-title">Maintenance Schedule</h3>
              <div className="amn-tabs">
                <button className={`amn-tab ${activeTab === 'upcoming' ? 'amn-tab--active' : ''}`} onClick={() => setActiveTab('upcoming')}>Upcoming</button>
                <button className={`amn-tab ${activeTab === 'history' ? 'amn-tab--active' : ''}`} onClick={() => setActiveTab('history')}>History</button>
              </div>
            </div>

            <div className="amn-schedule-list">
              {SCHEDULE.filter(s => activeTab === 'upcoming' ? s.status === 'scheduled' : s.status === 'completed').map(item => (
                <div key={item.id} className="amn-schedule-item">
                  <div className="amn-schedule-date-col">
                    <div className="amn-schedule-date">{item.date}</div>
                    <div className="amn-schedule-time">{item.time}</div>
                  </div>
                  <div className="amn-schedule-body">
                    <div className="amn-schedule-top">
                      <h4 className="amn-schedule-title">{item.title}</h4>
                      <span className={`amn-badge amn-badge--${item.type}`}>{item.type}</span>
                      <span className={`amn-badge amn-badge--impact-${item.impact}`}>Impact: {item.impact}</span>
                    </div>
                    <p className="amn-schedule-desc">{item.desc}</p>
                  </div>
                  <div className="amn-schedule-actions">
                    {item.status === 'scheduled' ? (
                      <>
                        <button className="amn-icon-btn">✏</button>
                        <button className="amn-icon-btn amn-icon-btn--danger">✕</button>
                      </>
                    ) : (
                      <button className="amn-btn amn-btn--sm">View Report</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
