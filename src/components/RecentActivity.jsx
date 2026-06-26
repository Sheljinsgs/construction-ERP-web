import './RecentActivity.css';

const ACTIVITIES = [
  {
    icon: '📅',
    title: '14 New Labour Received',
    desc: 'Hudson Yards project – Roofing & Concrete work team',
    time: '10 min ago',
    color: '#3b82f6',
  },
  {
    icon: '📋',
    title: 'Attendance Submitted',
    desc: 'Site 06 of 52 section nearest present',
    time: '43 min ago',
    color: '#22c55e',
  },
  {
    icon: '🏪',
    title: 'Steel Rod Reserved',
    desc: 'Qty: 4 register · $1,232 by Kiger at stocking section',
    time: '2h ago',
    color: '#f5a623',
  },
  {
    icon: '💸',
    title: 'Expense Submitted',
    desc: 'Exp 4 register · $1,200 by Kiger at stocking section',
    time: '3h ago',
    color: '#f97316',
  },
  {
    icon: '🛒',
    title: 'PO Issued to Vendor',
    desc: 'POXO04 · $48,050 – JCC Steel Suppliers Pvt. Ltd',
    time: '5h ago',
    color: '#8b5cf6',
  },
];

export default function RecentActivity() {
  return (
    <div className="section-card">
      <div className="section-header">
        <div>
          <div className="section-title">Recent Activity</div>
          <div className="section-sub">Company wide – last 6hrs</div>
        </div>
        <button className="view-link">View Log ↗</button>
      </div>

      <div className="activity-list">
        {ACTIVITIES.map((a, i) => (
          <div key={i} className="activity-item">
            <div className="activity-icon-wrap" style={{ background: `${a.color}18`, border: `1px solid ${a.color}30` }}>
              <span>{a.icon}</span>
            </div>
            <div className="activity-body">
              <div className="activity-title">{a.title}</div>
              <div className="activity-desc">{a.desc}</div>
            </div>
            <div className="activity-time">{a.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
