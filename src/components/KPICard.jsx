import './KPICard.css';

const COLOR_MAP = {
  blue:   { bg: 'rgba(59,130,246,0.08)',  border: 'rgba(59,130,246,0.18)',  icon: '#3b82f6' },
  teal:   { bg: 'rgba(0,229,176,0.08)',   border: 'rgba(0,229,176,0.18)',   icon: '#00b890' },
  orange: { bg: 'rgba(249,115,22,0.08)',  border: 'rgba(249,115,22,0.18)',  icon: '#f97316' },
  red:    { bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.18)',   icon: '#ef4444' },
};

export default function KPICard({ icon, label, value, sub, color = 'blue', change, highlight }) {
  const c = COLOR_MAP[color];
  const isPositive = change?.startsWith('+');
  const isNegative = change?.startsWith('-');

  return (
    <div
      className={`kpi-card${highlight ? ' kpi-card--highlight' : ''}`}
      style={{ '--kpi-bg': c.bg, '--kpi-border': c.border }}
    >
      <div className="kpi-top">
        <div className="kpi-icon-wrap" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
          <span className="kpi-icon">{icon}</span>
        </div>
        {change && (
          <div className={`kpi-change${isPositive ? ' kpi-change--pos' : isNegative ? ' kpi-change--neg' : ''}`}>
            {change}
          </div>
        )}
      </div>
      <div className="kpi-value">{value}</div>
      <div className="kpi-label">{label}</div>
      <div className="kpi-sub">{sub}</div>
    </div>
  );
}
