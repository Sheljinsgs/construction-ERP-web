import './PendingApprovals.css';

const ITEMS = [
  { icon: '📋', label: 'Attendance Corrections', count: 14, action: 'Review' },
  { icon: '⏱️', label: 'Overtime Requests',       count: 8,  action: 'Review' },
  { icon: '💳', label: 'Expense Claims',           count: 22, action: 'Review' },
  { icon: '🛒', label: 'Purchase Approvals',       count: 5,  action: 'Review' },
];

export default function PendingApprovals() {
  return (
    <div className="section-card">
      <div className="section-header">
        <div>
          <div className="section-title">Pending Approvals</div>
          <div className="section-sub">Requires your action</div>
        </div>
        <span className="pa-count-badge">Review: 4 ↗</span>
      </div>

      <div className="pa-list">
        {ITEMS.map((item, i) => (
          <div key={i} className="pa-item">
            <span className="pa-icon">{item.icon}</span>
            <span className="pa-label">{item.label}</span>
            <span className="pa-count">{item.count}</span>
            <button className="pa-action">{item.action}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
