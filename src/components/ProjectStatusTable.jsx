import './ProjectStatusTable.css';

const PROJECTS = [
  {
    name: 'Hudson Yards Tower 28',
    progress: 62,
    budget: 74,
    status: 'On Track',
    statusColor: 'green',
    crews: 3,
    manager: 'JD',
  },
  {
    name: 'Queens Underpass Rd.1',
    progress: 85,
    budget: 42,
    status: 'Delayed',
    statusColor: 'red',
    crews: 2,
    manager: 'SR',
  },
  {
    name: 'Brooklyn Logistics Hub',
    progress: 28,
    budget: 21,
    status: 'Active',
    statusColor: 'blue',
    crews: 4,
    manager: 'TM',
  },
  {
    name: 'Barratt Tower – Ph.1',
    progress: 90,
    budget: 95,
    status: 'Finishing',
    statusColor: 'orange',
    crews: 1,
    manager: 'PK',
  },
];

export default function ProjectStatusTable() {
  return (
    <div className="section-card">
      <div className="section-header">
        <div>
          <div className="section-title">Project Status</div>
          <div className="section-sub">Live progress in-progress projects</div>
        </div>
        <button className="view-link">View All ↗</button>
      </div>

      <div className="proj-table">
        {PROJECTS.map((p, i) => (
          <div key={i} className="proj-row">
            <div className="proj-info">
              <div className="proj-name">{p.name}</div>
              <div className="proj-meta">
                <span className="proj-crews">👤 {p.crews} Crews</span>
              </div>
            </div>

            <div className="proj-progress-col">
              <div className="proj-prog-row">
                <span className="proj-prog-label">Progress</span>
                <span className="proj-prog-val">{p.progress}%</span>
              </div>
              <div className="prog-track">
                <div className="prog-fill prog-fill--gold" style={{ width: `${p.progress}%` }} />
              </div>
            </div>

            <div className="proj-budget-col">
              <div className="proj-prog-row">
                <span className="proj-prog-label">Budget</span>
                <span className="proj-prog-val">{p.budget}%</span>
              </div>
              <div className="prog-track">
                <div
                  className={`prog-fill ${p.budget > 90 ? 'prog-fill--red' : p.budget > 70 ? 'prog-fill--orange' : 'prog-fill--teal'}`}
                  style={{ width: `${p.budget}%` }}
                />
              </div>
            </div>

            <div className="proj-status-col">
              <span className={`status-pill status-pill--${p.statusColor}`}>{p.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
