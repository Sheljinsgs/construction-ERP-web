import './AlertCard.css';

const TAG_COLORS = {
  green:  { bg: 'rgba(34,197,94,0.1)',   color: '#22c55e' },
  orange: { bg: 'rgba(249,115,22,0.1)',  color: '#f97316' },
  blue:   { bg: 'rgba(59,130,246,0.1)',  color: '#3b82f6' },
  red:    { bg: 'rgba(239,68,68,0.1)',   color: '#ef4444' },
};

export default function AlertCard({ icon, label, value, sub, tag, tagColor = 'blue' }) {
  const tc = TAG_COLORS[tagColor] || TAG_COLORS.blue;
  return (
    <div className="alert-card">
      <div className="alert-card-top">
        <span className="alert-card-icon">{icon}</span>
        {tag && (
          <span className="alert-tag" style={{ background: tc.bg, color: tc.color }}>
            {tag}
          </span>
        )}
      </div>
      <div className="alert-card-label">{label}</div>
      <div className="alert-card-value">{value}</div>
      <div className="alert-card-sub">{sub}</div>
    </div>
  );
}
