const MATERIALS = [
  { label: 'Cement', color: '#0f172a', data: [40, 55, 35, 62, 48, 70, 55, 82, 65, 78] },
  { label: 'Steel',  color: '#f5a623', data: [30, 42, 28, 50, 38, 55, 45, 60, 50, 65] },
  { label: 'Sand',   color: '#64748b', data: [20, 28, 18, 35, 25, 40, 30, 45, 35, 50] },
  { label: 'Bricks', color: '#3b82f6', data: [15, 22, 12, 28, 18, 32, 22, 38, 28, 42] },
];

export default function MaterialTrendChart() {
  const max = 90;
  const h = 100;
  const weeks = Array.from({ length: 10 }, (_, i) => `W${i + 1}`);

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: `${h + 20}px` }}>
        {weeks.map((w, wi) => (
          <div key={wi} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', height: '100%', justifyContent: 'flex-end' }}>
            <div style={{ width: '100%', display: 'flex', gap: '1px', alignItems: 'flex-end', flex: 1, justifyContent: 'flex-end' }}>
              {MATERIALS.map((m, mi) => (
                <div
                  key={mi}
                  style={{
                    flex: 1,
                    height: `${(m.data[wi] / max) * h}px`,
                    background: m.color,
                    borderRadius: '2px 2px 0 0',
                    opacity: 0.9,
                    transition: 'height 0.6s ease',
                  }}
                />
              ))}
            </div>
            <div style={{ fontSize: '9px', color: '#94a3b8' }}>{w}</div>
          </div>
        ))}
      </div>
      {/* Legend */}
      <div style={{ display: 'flex', gap: '14px', marginTop: '10px', flexWrap: 'wrap' }}>
        {MATERIALS.map((m, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#64748b' }}>
            <div style={{ width: '10px', height: '10px', background: m.color, borderRadius: '2px' }} />
            {m.label}
          </div>
        ))}
      </div>
    </div>
  );
}
