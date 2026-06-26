const DATA = [
  { month: 'Jun', val: 210 },
  { month: 'Jul', val: 245 },
  { month: 'Aug', val: 195 },
  { month: 'Sep', val: 268 },
  { month: 'Oct', val: 290 },
  { month: 'Nov', val: 252 },
];

export default function ExpenseTrendChart() {
  const max = 320;
  const h = 120;

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', height: `${h + 24}px` }}>
        {DATA.map((d, i) => {
          const barH = (d.val / max) * h;
          const isLast = i === DATA.length - 1;
          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
              <div style={{ position: 'relative', width: '100%', height: `${barH}px` }}>
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: isLast
                      ? 'linear-gradient(180deg,#f5a623,#d97706)'
                      : 'linear-gradient(180deg,#334155,#1e293b)',
                    borderRadius: '6px 6px 0 0',
                    boxShadow: isLast ? '0 0 12px rgba(245,166,35,0.4)' : 'none',
                    transition: 'height 0.5s ease',
                  }}
                />
                {isLast && (
                  <div style={{
                    position: 'absolute', top: '-18px', left: '50%', transform: 'translateX(-50%)',
                    fontSize: '9.5px', fontWeight: '700', color: '#f5a623', whiteSpace: 'nowrap',
                  }}>
                    ${d.val}K
                  </div>
                )}
              </div>
              <div style={{ fontSize: '9.5px', color: '#94a3b8' }}>{d.month}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
