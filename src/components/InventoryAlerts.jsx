const ALERTS = [
  { material: 'Cement (OPC 53)', qty: '12 Bags',  level: 'critical', sites: 'Barratt Tower 20' },
  { material: 'Steel Rod – 16mm', qty: '0.8 MT',  level: 'warning',  sites: '--' },
  { material: 'River Sand',        qty: '4 m3',   level: 'info',     sites: '--' },
];

const LEVEL_MAP = {
  critical: { bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.2)',  color: '#ef4444', label: '🔴 Critical' },
  warning:  { bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.2)', color: '#f97316', label: '🟡 Low Stock' },
  info:     { bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)', color: '#3b82f6', label: '🔵 Monitor' },
};

export default function InventoryAlerts() {
  return (
    <div className="section-card" style={{ borderLeft: '3px solid #ef4444' }}>
      <div className="section-header">
        <div>
          <div className="section-title" style={{ color: '#ef4444' }}>🚨 Critical Inventory Alerts</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {ALERTS.map((a, i) => {
          const lv = LEVEL_MAP[a.level];
          return (
            <div
              key={i}
              style={{
                background: lv.bg,
                border: `1px solid ${lv.border}`,
                borderRadius: '8px',
                padding: '9px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>{a.material}</div>
                {a.sites !== '--' && <div style={{ fontSize: '10.5px', color: '#94a3b8', marginTop: '1px' }}>{a.sites}</div>}
              </div>
              <span
                style={{
                  fontSize: '11px', fontWeight: '800', color: lv.color,
                  background: `${lv.color}15`, borderRadius: '6px', padding: '3px 8px',
                  whiteSpace: 'nowrap',
                }}
              >
                {a.qty}
              </span>
            </div>
          );
        })}
        <button className="view-link" style={{ alignSelf: 'flex-start', marginTop: '4px' }}>
          View All Alerts ↗
        </button>
      </div>
    </div>
  );
}
