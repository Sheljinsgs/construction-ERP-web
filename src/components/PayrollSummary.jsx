const ROWS = [
  { label: 'Skilled Workers',   amount: '$136K', pct: 68 },
  { label: 'Semi-Skilled',      amount: '$98K',  pct: 49 },
  { label: 'Unskilled Labour',  amount: '$30K',  pct: 15 },
  { label: 'Overtime Claims',   amount: '$22K',  pct: 11 },
];

export default function PayrollSummary() {
  return (
    <div className="section-card">
      <div className="section-header">
        <div>
          <div className="section-title">Payroll Summary – Oct 2025</div>
        </div>
        <button className="view-link">View Payroll ↗</button>
      </div>

      {/* Summary boxes */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '14px' }}>
        {[
          { label: 'Labour Cost',    value: '$283K' },
          { label: 'Headcount',      value: '342'   },
          { label: 'Avg Wage/Day',   value: '$28.4' },
        ].map((s, i) => (
          <div key={i} style={{
            background: '#f8fafc', borderRadius: '10px', padding: '10px',
            textAlign: 'center', border: '1px solid #e8edf5',
          }}>
            <div style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>{s.value}</div>
            <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '600', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Category breakdown */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {ROWS.map((r, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: '#334155', fontWeight: '500' }}>{r.label}</span>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>{r.amount}</span>
            </div>
            <div className="prog-track">
              <div className="prog-fill prog-fill--gold" style={{ width: `${r.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
