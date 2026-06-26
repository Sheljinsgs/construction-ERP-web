import { useState } from 'react';
import './AdminAuditLogs.css';

/* ─── Mock Data ────────────────────────────────────────────────── */
const LOGS = [
  { id: 'al-01', time: 'Nov 18, 2025 - 11:42:08', user: 'Marcus Vance', userRole: 'Platform Owner', company: 'Platform Admin', action: 'Company Suspended', module: 'Company Management', ip: '192.168.4.21', device: 'Chrome - macOS', severity: 'critical', before: '"status": "Active"', after: '"status": "Suspended"', reason: 'Non payment', securityFlag: true },
  { id: 'al-02', time: 'Nov 18, 2025 - 11:38:52', user: 'Jennifer Cole', userRole: 'Company Admin', company: 'Classy Group', action: 'Payroll Module Disabled', module: 'Feature Management', ip: '10.0.2.145', device: 'Firefox - Windows', severity: 'high', securityFlag: false },
  { id: 'al-03', time: 'Nov 18, 2025 - 11:22:14', user: 'Daniel Osei', userRole: 'Operations Head', company: 'Alpine Construction', action: 'Bulk Labour Import', module: 'Labour', ip: '203.0.113.88', device: 'Chrome - Ubuntu', severity: 'medium', securityFlag: false },
  { id: 'al-04', time: 'Nov 18, 2025 - 11:05:35', user: 'Unknown', userRole: '', company: 'Platform Admin', action: 'Failed Login Attempt', module: 'Authentication', ip: '45.122.122.68', device: 'curl - Unknown', severity: 'high', securityFlag: true },
  { id: 'al-05', time: 'Nov 18, 2025 - 10:54:20', user: 'Sarah Kim', userRole: 'Finance Manager', company: 'Flux Industrial', action: 'Expense Report Exported', module: 'Finance', ip: '10.1.0.55', device: 'Safari - iOS', severity: 'low', securityFlag: false },
  { id: 'al-06', time: 'Nov 18, 2025 - 10:41:05', user: 'Marcus Vance', userRole: 'Platform Owner', company: 'Platform Admin', action: 'New License Issued', module: 'License Management', ip: '192.168.4.21', device: 'Chrome - macOS', severity: 'info', securityFlag: false },
  { id: 'al-07', time: 'Nov 18, 2025 - 10:22:30', user: 'Priya Singh', userRole: 'HR Manager', company: 'RockMount Eng...', action: 'Payroll Config Changed', module: 'Payroll', ip: '172.16.0.12', device: 'Edge - Windows', severity: 'medium', securityFlag: false },
  { id: 'al-08', time: 'Nov 18, 2025 - 09:00:11', user: 'System', userRole: 'Automated', company: 'Platform', action: 'Scheduled Backup Completed', module: 'System', ip: '127.0.0.1', device: 'Server - Linux', severity: 'info', securityFlag: false },
];

export default function AdminAuditLogs() {
  const [selectedId, setSelectedId] = useState(LOGS[0].id);
  const selectedLog = LOGS.find(l => l.id === selectedId);

  return (
    <div className="aal-container">
      {/* ── Header ────────────────────────────────────────────── */}
      <div className="aal-header">
        <div>
          <div className="aal-breadcrumb">
            <span>📋 System Administration</span>
            <span className="aal-bc-sep">›</span>
            <span>Audit Logs</span>
          </div>
          <h1 className="aal-title">Audit Logs</h1>
          <p className="aal-sub">Immutable record of all critical system actions, access events, and administrative operations.</p>
        </div>
        <div className="aal-header-actions">
          <button className="aal-btn-outline">⬇ Export Logs</button>
          <button className="aal-btn-primary">🗄️ Archive All</button>
        </div>
      </div>

      {/* ── Top Filters & Stats ───────────────────────────────── */}
      <div className="aal-toolbar">
        <div className="aal-stats">
          <div className="aal-stat-pill aal-stat-pill--critical">
            <div className="aal-stat-dot" /> Critical <strong>2</strong>
          </div>
          <div className="aal-stat-pill aal-stat-pill--high">
            <div className="aal-stat-dot" /> High <strong>5</strong>
          </div>
          <div className="aal-stat-pill aal-stat-pill--medium">
            <div className="aal-stat-dot" /> Medium <strong>14</strong>
          </div>
          <div className="aal-stat-pill aal-stat-pill--low">
            <div className="aal-stat-dot" /> Low <strong>38</strong>
          </div>
          <div className="aal-stat-pill aal-stat-pill--info">
            <div className="aal-stat-dot" /> Info <strong>102</strong>
          </div>
        </div>
        <div className="aal-filters">
          <button className="aal-filter-btn">Date Range ▾</button>
          <button className="aal-filter-btn">Company ▾</button>
          <button className="aal-filter-btn">Module ▾</button>
          <button className="aal-filter-btn">Severity ▾</button>
          <button className="aal-filter-btn">⚙️ More</button>
        </div>
      </div>

      {/* ── Body Layout ───────────────────────────────────────── */}
      <div className="aal-body">
        {/* Left Table Area */}
        <div className="aal-table-wrapper">
          <div className="aal-table-header-row">
            <div className="aal-table-info">
              <input type="checkbox" className="aal-checkbox" />
              <span>1,284 total log entries today</span>
            </div>
            <div className="aal-live-toggle">
              ⟲ Auto-refresh: ON <span className="aal-live-badge">Live •</span>
            </div>
          </div>
          
          <div className="aal-table-scroll">
            <table className="aal-table">
              <thead>
                <tr>
                  <th width="40"></th>
                  <th>TIMESTAMP</th>
                  <th>USER</th>
                  <th>COMPANY</th>
                  <th>ACTION</th>
                  <th>MODULE</th>
                  <th>IP ADDRESS</th>
                  <th>DEVICE</th>
                </tr>
              </thead>
              <tbody>
                {LOGS.map(log => (
                  <tr 
                    key={log.id} 
                    className={`aal-tr ${selectedId === log.id ? 'aal-tr--selected' : ''}`}
                    onClick={() => setSelectedId(log.id)}
                  >
                    <td><input type="checkbox" className="aal-checkbox" /></td>
                    <td className="aal-td-time">{log.time}</td>
                    <td>
                      <div className="aal-td-user">{log.user}</div>
                      <div className="aal-td-sub">{log.userRole}</div>
                    </td>
                    <td className="aal-td-company">{log.company}</td>
                    <td>
                      <div className="aal-td-action">{log.action}</div>
                    </td>
                    <td><span className="aal-td-module">{log.module}</span></td>
                    <td className="aal-td-ip">{log.ip}</td>
                    <td className="aal-td-device">{log.device}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="aal-pagination">
            <span className="aal-page-info">Showing 8 of 1,284 entries</span>
            <div className="aal-page-ctrls">
              <button className="aal-page-btn">‹</button>
              <button className="aal-page-btn aal-page-btn--active">1</button>
              <button className="aal-page-btn">2</button>
              <button className="aal-page-btn">3</button>
              <button className="aal-page-btn">4</button>
              <button className="aal-page-btn">5</button>
              <span className="aal-page-ellipsis">...</span>
              <button className="aal-page-btn">161</button>
              <button className="aal-page-btn">›</button>
            </div>
          </div>
        </div>

        {/* Right Detail Pane */}
        {selectedLog && (
          <div className="aal-detail-pane">
            <div className="aal-detail-header">
              <div className="aal-dh-top">
                <span className={`aal-severity-badge aal-severity--${selectedLog.severity}`}>
                  {selectedLog.severity}
                </span>
                <span className="aal-dh-success">Success</span>
              </div>
              <h2 className="aal-dh-action">{selectedLog.action}</h2>
              <div className="aal-dh-time">{selectedLog.time}</div>
            </div>

            <div className="aal-detail-scroll">
              <div className="aal-section">
                <div className="aal-section-title">AUDIT INFORMATION</div>
                <div className="aal-info-grid">
                  <div className="aal-info-row">
                    <span className="aal-info-lbl">👤 User</span>
                    <span className="aal-info-val">{selectedLog.user}</span>
                  </div>
                  <div className="aal-info-row">
                    <span className="aal-info-lbl">🔑 Role</span>
                    <span className="aal-info-val">{selectedLog.userRole}</span>
                  </div>
                  <div className="aal-info-row">
                    <span className="aal-info-lbl">🏢 Company</span>
                    <span className="aal-info-val">{selectedLog.company}</span>
                  </div>
                  <div className="aal-info-row">
                    <span className="aal-info-lbl">🧩 Module</span>
                    <span className="aal-info-val">{selectedLog.module}</span>
                  </div>
                </div>
              </div>

              <div className="aal-section">
                <div className="aal-section-title">REQUEST DETAILS</div>
                <div className="aal-code-box">
                  <div className="aal-cb-row"><span>IP</span> <span className="aal-cb-val aal-cb-ip">{selectedLog.ip}</span></div>
                  <div className="aal-cb-row"><span>Device</span> <span className="aal-cb-val aal-cb-green">{selectedLog.device}</span></div>
                  <div className="aal-cb-row"><span>Method</span> <span className="aal-cb-val aal-cb-blue">POST</span></div>
                  <div className="aal-cb-row"><span>Endpoint</span> <span className="aal-cb-val aal-cb-orange">/api/v1/companies/suspend</span></div>
                  <div className="aal-cb-row"><span>Response</span> <span className="aal-cb-val aal-cb-green">200 OK</span></div>
                  <div className="aal-cb-row"><span>Latency</span> <span className="aal-cb-val">42ms</span></div>
                </div>
              </div>

              {selectedLog.before && (
                <div className="aal-section">
                  <div className="aal-section-title">CHANGES MADE</div>
                  <div className="aal-diff-box">
                    <div className="aal-diff-row">
                      <span className="aal-diff-lbl">Before</span>
                      <div className="aal-diff-val aal-diff--red">
                        <span className="aal-diff-sign">-</span> {selectedLog.before}
                      </div>
                    </div>
                    <div className="aal-diff-row">
                      <span className="aal-diff-lbl">After</span>
                      <div className="aal-diff-val aal-diff--green">
                        <span className="aal-diff-sign">+</span> {selectedLog.after}
                      </div>
                    </div>
                    <div className="aal-diff-reason">
                      <span className="aal-diff-lbl">Reason:</span> {selectedLog.reason}
                    </div>
                  </div>
                </div>
              )}

              {selectedLog.securityFlag && (
                <div className="aal-security-alert">
                  <div className="aal-alert-header">
                    <span className="aal-alert-icon">🛡️</span> Security Flag
                  </div>
                  <div className="aal-alert-body">
                    This action triggered a critical security audit record and has been flagged for compliance review.
                  </div>
                </div>
              )}
            </div>

            <div className="aal-detail-actions">
              <button className="aal-btn-full aal-btn-full--dark">⬇ Export This Log</button>
              <button className="aal-btn-full aal-btn-full--light">🚩 Mark for Review</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
