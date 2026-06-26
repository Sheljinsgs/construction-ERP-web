const DATA = [
  { day: 'Mon', present: 88, absent: 12 },
  { day: 'Tue', present: 92, absent: 8 },
  { day: 'Wed', present: 78, absent: 22 },
  { day: 'Thu', present: 95, absent: 5 },
  { day: 'Fri', present: 89, absent: 11 },
  { day: 'Sat', present: 72, absent: 28 },
  { day: 'Sun', present: 55, absent: 45 },
  { day: 'Mon', present: 91, absent: 9 },
  { day: 'Tue', present: 94, absent: 6 },
  { day: 'Wed', present: 87, absent: 13 },
  { day: 'Thu', present: 96, absent: 4 },
  { day: 'Fri', present: 91, absent: 9 },
];

export default function AttendanceTrendChart() {
  const maxVal = 100;
  const h = 120;

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: `${h + 24}px`, minWidth: '100%' }}>
        {DATA.map((d, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
            {/* Absent (red) stacked on present (dark) */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, justifyContent: 'flex-end' }}>
              <div
                title={`Absent: ${d.absent}%`}
                style={{
                  height: `${(d.absent / maxVal) * h}px`,
                  background: 'rgba(239,68,68,0.7)',
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 0.5s ease',
                }}
              />
              <div
                title={`Present: ${d.present}%`}
                style={{
                  height: `${(d.present / maxVal) * h}px`,
                  background: i === 3 || i === 10 ? '#f5a623' : '#1e293b',
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 0.5s ease',
                }}
              />
            </div>
            <div style={{ fontSize: '9.5px', color: '#94a3b8', whiteSpace: 'nowrap' }}>{d.day}</div>
          </div>
        ))}
      </div>
      {/* Legend */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#64748b' }}>
          <div style={{ width: '10px', height: '10px', background: '#1e293b', borderRadius: '2px' }} />
          Present
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#64748b' }}>
          <div style={{ width: '10px', height: '10px', background: 'rgba(239,68,68,0.7)', borderRadius: '2px' }} />
          Absent
        </div>
      </div>
    </div>
  );
}
