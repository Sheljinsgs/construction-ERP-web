const CATEGORIES = [
  { label: 'Skilled Workers',   value: 136, total: 200, color: '#f5a623' },
  { label: 'Semi-Skilled',      value: 98,  total: 200, color: '#3b82f6' },
  { label: 'Unskilled',         value: 65,  total: 200, color: '#64748b' },
  { label: 'Overtime',          value: 22,  total: 200, color: '#ef4444' },
];

export default function LabourCostChart() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {CATEGORIES.map((c, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#334155', fontWeight: '500' }}>{c.label}</span>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>${c.value}K</span>
          </div>
          <div style={{ height: '6px', background: '#f1f4f9', borderRadius: '99px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${(c.value / c.total) * 100}%`,
                background: c.color,
                borderRadius: '99px',
                transition: 'width 0.8s ease',
              }}
            />
          </div>
        </div>
      ))}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderTop: '1px solid #e8edf5', paddingTop: '10px', marginTop: '2px',
      }}>
        <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>Total Labour Cost</span>
        <span style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>$283K</span>
      </div>
    </div>
  );
}
