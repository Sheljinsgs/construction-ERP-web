import { useState } from 'react';
import './AdminSupportTickets.css';

const TICKETS = [
  { id: 'TKT-9912', title: 'Cannot assign new users to site', company: 'Apex Urban Developments', initials: 'AU', color: '#f59e0b', status: 'open', priority: 'high', date: '10 mins ago', desc: 'When I try to add workers to the Downtown Plaza site, it throws a 500 error.' },
  { id: 'TKT-9908', title: 'Billing discrepancy on invoice', company: 'Summit Structural', initials: 'SS', color: '#3b82f6', status: 'pending', priority: 'medium', date: '2 hours ago', desc: 'Our latest invoice shows $1,200 extra. We did not add any new users last month.' },
  { id: 'TKT-9892', title: 'Request to increase storage limit', company: 'Horizon Solar', initials: 'HZ', color: '#0ea5e9', status: 'resolved', priority: 'low', date: 'Yesterday', desc: 'We are hitting the 100GB limit on our current plan. Can we purchase an extra 50GB without upgrading the entire plan?' },
  { id: 'TKT-9871', title: 'API Integration failing', company: 'Maximus Global', initials: 'MX', color: '#f97316', status: 'open', priority: 'critical', date: '2 days ago', desc: 'Our custom integration with the payroll endpoint is failing with a 401 Unauthorized since the last update.' },
];

const FILTER_TABS = [
  { key: 'all', label: 'All Tickets' },
  { key: 'open', label: 'Open' },
  { key: 'pending', label: 'Pending' },
  { key: 'resolved', label: 'Resolved' },
];

export default function AdminSupportTickets() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedId, setSelectedId] = useState(TICKETS[0].id);
  const [reply, setReply] = useState('');

  const filtered = TICKETS.filter(t => activeTab === 'all' || t.status === activeTab);
  const selectedTkt = TICKETS.find(t => t.id === selectedId);

  return (
    <div className="ast-container">
      <div className="ast-header">
        <div>
          <div className="ast-breadcrumb">
            <span>🎫 Support Center</span>
            <span className="ast-bc-sep">›</span>
            <span>Support Tickets</span>
          </div>
          <h1 className="ast-title">Global Support Tickets</h1>
          <p className="ast-sub">Manage and resolve support requests from tenant administrators.</p>
        </div>
        <button className="ast-export-btn">⬇ Export</button>
      </div>

      <div className="ast-body">
        {/* Left List */}
        <div className="ast-list-pane">
          <div className="ast-filters">
            <div className="ast-tabs">
              {FILTER_TABS.map(tab => (
                <button
                  key={tab.key}
                  className={`ast-tab ${activeTab === tab.key ? 'ast-tab--active' : ''}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="ast-list">
            {filtered.map(tkt => (
              <div 
                key={tkt.id} 
                className={`ast-card ${selectedId === tkt.id ? 'ast-card--selected' : ''}`}
                onClick={() => setSelectedId(tkt.id)}
              >
                <div className="ast-card-top">
                  <div className="ast-card-id">{tkt.id}</div>
                  <span className={`ast-status ast-status--${tkt.status}`}>{tkt.status}</span>
                </div>
                <div className="ast-card-title">{tkt.title}</div>
                <div className="ast-card-company">
                  <div className="ast-avatar" style={{ background: tkt.color }}>{tkt.initials}</div>
                  <span className="ast-company-name">{tkt.company}</span>
                </div>
                <div className="ast-card-bottom">
                  <span className={`ast-priority ast-priority--${tkt.priority}`}>{tkt.priority}</span>
                  <span className="ast-date">{tkt.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Detail Pane */}
        {selectedTkt ? (
          <div className="ast-detail-pane">
            <div className="ast-detail-header">
              <div className="ast-detail-top">
                <h2 className="ast-detail-title">{selectedTkt.title}</h2>
                <div className="ast-detail-badges">
                  <span className={`ast-status ast-status--${selectedTkt.status}`}>{selectedTkt.status}</span>
                  <span className={`ast-priority ast-priority--${selectedTkt.priority}`}>{selectedTkt.priority}</span>
                </div>
              </div>
              <div className="ast-detail-meta">
                <span className="ast-detail-id">{selectedTkt.id}</span>
                <span>•</span>
                <span className="ast-detail-date">Reported {selectedTkt.date}</span>
              </div>
              <div className="ast-detail-company">
                <div className="ast-avatar" style={{ background: selectedTkt.color }}>{selectedTkt.initials}</div>
                <span className="ast-company-name">{selectedTkt.company}</span>
              </div>
            </div>

            <div className="ast-detail-chat">
              <div className="ast-msg ast-msg--them">
                <div className="ast-msg-avatar" style={{ background: selectedTkt.color }}>{selectedTkt.initials}</div>
                <div className="ast-msg-bubble">
                  <div className="ast-msg-text">{selectedTkt.desc}</div>
                </div>
              </div>
            </div>

            <div className="ast-reply-area">
              <textarea 
                className="ast-reply-input" 
                placeholder="Type your reply here..." 
                value={reply}
                onChange={e => setReply(e.target.value)}
              />
              <div className="ast-reply-actions">
                <button className="ast-btn ast-btn--secondary">Mark Resolved</button>
                <button className="ast-btn ast-btn--primary">Send Reply</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="ast-detail-empty">Select a ticket to view details</div>
        )}
      </div>
    </div>
  );
}
