export default function QuickActions() {
  const ACTIONS = [
    { icon: '➕', label: 'Add Project',    color: '#3b82f6', bg: 'rgba(59,130,246,0.1)'  },
    { icon: '👷', label: 'Add Labour',     color: '#22c55e', bg: 'rgba(34,197,94,0.1)'   },
    { icon: '👤', label: 'Add Site',       color: '#f5a623', bg: 'rgba(245,166,35,0.1)'  },
    { icon: '📋', label: 'Mark Attendance',color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)'  },
    { icon: '💸', label: 'Add Expense',    color: '#f97316', bg: 'rgba(249,115,22,0.1)'  },
    { icon: '🛒', label: 'Create PO',      color: '#ef4444', bg: 'rgba(239,68,68,0.1)'   },
  ];

  return (
    <div className="section-card">
      <div className="section-header">
        <div className="section-title">Quick Actions</div>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: '10px',
      }}>
        {ACTIONS.map((a, i) => (
          <button
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              background: a.bg,
              border: `1px solid ${a.color}30`,
              borderRadius: '12px',
              padding: '12px 6px',
              cursor: 'pointer',
              transition: 'all 0.15s',
              fontFamily: 'Inter, sans-serif',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 4px 12px ${a.color}30`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span style={{ fontSize: '22px' }}>{a.icon}</span>
            <span style={{ fontSize: '10.5px', fontWeight: '700', color: a.color, textAlign: 'center', lineHeight: 1.2 }}>
              {a.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
