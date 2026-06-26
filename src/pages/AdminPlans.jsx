import { useState } from 'react';
import './AdminPlans.css';

/* ─── Data ─────────────────────────────────────────────────────── */
const PLANS = [
  {
    id: 'PLAN-ENT-001', name: 'Enterprise', tag: 'POPULAR',
    status: 'active', price: 4999, unit: '/month', free: false,
    desc: 'Full-featured plan for large-scale construction enterprises with multi-site, multi-country operations.',
    maxUsers: null, maxSites: null, storage: 500, modules: 12,
    companiesUsing: 86, totalUsers: 14280, avgUsers: 166, monthlyRevenue: 429914,
    annualPrice: 47990, annualSaving: 20, setupFee: 'Waived',
    moduleList: ['Organisation','Labour','Attendance','Overtime','Inventory','Procurement','Vendors','Payroll','Finance','Reports','Analytics','HR'],
    color: '#f5a623', headerBg: '#0d1117',
  },
  {
    id: 'PLAN-PRO-002', name: 'Professional',
    status: 'active', price: 1499, unit: '/month', free: false,
    desc: 'Ideal for mid-size contractors managing multiple projects and sites with growing teams.',
    maxUsers: 500, maxSites: 20, storage: 100, modules: 8,
    companiesUsing: 42, totalUsers: 5040, avgUsers: 120, monthlyRevenue: 62958,
    annualPrice: 14390, annualSaving: 20, setupFee: '$299',
    moduleList: ['Organisation','Labour','Attendance','Inventory','Procurement','Payroll','Finance','Reports'],
    color: '#3b82f6', headerBg: '#1e3a5f',
  },
  {
    id: 'PLAN-BSC-003', name: 'Basic',
    status: 'active', price: 299, unit: '/month', free: false,
    desc: 'Ideal for small construction firms starting their digital operations journey.',
    maxUsers: 100, maxSites: 5, storage: 20, modules: 4,
    companiesUsing: 16, totalUsers: 960, avgUsers: 60, monthlyRevenue: 4784,
    annualPrice: 2870, annualSaving: 20, setupFee: '$99',
    moduleList: ['Organisation','Labour','Attendance','Payroll'],
    color: '#22c55e', headerBg: '#0f2d1f',
  },
  {
    id: 'PLAN-TRL-004', name: 'Trial',
    status: 'active', price: 0, unit: '30 days', free: true,
    desc: '30-day free trial with limited access to core modules. No credit card required.',
    maxUsers: 10, maxSites: 1, storage: 5, modules: 3,
    companiesUsing: 24, totalUsers: 128, avgUsers: 5, monthlyRevenue: 0,
    annualPrice: 0, annualSaving: 0, setupFee: 'None',
    moduleList: ['Organisation','Labour','Attendance'],
    color: '#10b981', headerBg: '#0a2a1e',
  },
  {
    id: 'PLAN-STR-005', name: 'Starter (Legacy)',
    status: 'archived', price: 99, unit: '/month', free: false,
    desc: 'Discontinued legacy plan. Existing companies remain on this plan until renewal.',
    maxUsers: 20, maxSites: 2, storage: 10, modules: 2,
    companiesUsing: 4, totalUsers: 56, avgUsers: 14, monthlyRevenue: 396,
    annualPrice: 950, annualSaving: 20, setupFee: '$49',
    moduleList: ['Organisation','Labour'],
    color: '#64748b', headerBg: '#1e2533',
  },
];

const FILTER_TABS = [
  { key: 'all',      label: 'All Plans', count: 5 },
  { key: 'active',   label: 'Active',    count: 4 },
  { key: 'draft',    label: 'Draft',     count: 0 },
  { key: 'archived', label: 'Archived',  count: 1 },
];

const STATUS_CFG = {
  active:   { label: 'Active',   cls: 'ap-status--active'   },
  draft:    { label: 'Draft',    cls: 'ap-status--draft'    },
  archived: { label: 'Archived', cls: 'ap-status--archived' },
};

const MODULE_COLOR_MAP = {
  Organisation: '#3b82f6', Labour: '#f5a623', Attendance: '#22c55e',
  Overtime: '#8b5cf6', Inventory: '#f97316', Procurement: '#06b6d4',
  Vendors: '#ec4899', Payroll: '#14b8a6', Finance: '#84cc16',
  Reports: '#64748b', Analytics: '#6366f1', HR: '#ef4444',
};

/* ─── Plan card ────────────────────────────────────────────────── */
function PlanCard({ plan, selected, onSelect }) {
  const isEnterprise = plan.name === 'Enterprise';

  return (
    <div
      className={`ap-card${selected ? ' ap-card--selected' : ''}${isEnterprise ? ' ap-card--enterprise' : ''}`}
      style={isEnterprise ? { borderColor: plan.color } : {}}
      onClick={() => onSelect(plan.id)}
    >
      {/* Card header */}
      <div className="ap-card-header">
        <div className="ap-card-name-row">
          <div>
            <span className="ap-card-name" style={isEnterprise ? { color: '#f5a623' } : {}}>{plan.name}</span>
            {plan.tag && <span className="ap-card-tag">{plan.tag}</span>}
          </div>
          <span className={`ap-status-badge ${STATUS_CFG[plan.status]?.cls}`}>
            {STATUS_CFG[plan.status]?.label}
          </span>
        </div>
        <div className="ap-plan-code">{plan.id}</div>
        <div className="ap-card-price">
          {plan.free
            ? <><span className="ap-price-big">Free</span><span className="ap-price-unit"> {plan.unit}</span></>
            : <><span className="ap-price-big">${plan.price.toLocaleString()}</span><span className="ap-price-unit"> {plan.unit}</span></>
          }
        </div>
      </div>

      {/* Desc */}
      <p className="ap-card-desc">{plan.desc}</p>

      {/* Specs */}
      <div className="ap-card-specs">
        <div className="ap-spec-item">
          <span className="ap-spec-icon">👥</span>
          <span className="ap-spec-label">Users</span>
          <span className="ap-spec-val" style={!plan.maxUsers ? { color: plan.color } : {}}>
            {plan.maxUsers ?? 'Unlimited'}
          </span>
        </div>
        <div className="ap-spec-item">
          <span className="ap-spec-icon">📍</span>
          <span className="ap-spec-label">Sites</span>
          <span className="ap-spec-val" style={!plan.maxSites ? { color: plan.color } : {}}>
            {plan.maxSites ?? 'Unlimited'}
          </span>
        </div>
        <div className="ap-spec-item">
          <span className="ap-spec-icon">💾</span>
          <span className="ap-spec-label">Storage</span>
          <span className="ap-spec-val">{plan.storage} GB</span>
        </div>
        <div className="ap-spec-item">
          <span className="ap-spec-icon">🧩</span>
          <span className="ap-spec-label">Modules</span>
          <span className="ap-spec-val">{plan.modules}</span>
        </div>
      </div>

      {/* Companies using */}
      <div className="ap-card-companies">
        Companies using
        <span className="ap-companies-count" style={{ color: plan.color }}>{plan.companiesUsing}</span>
      </div>

      {/* Action buttons */}
      <div className="ap-card-actions">
        <button className="ap-card-btn ap-card-btn--view"  id={`plan-view-${plan.id}`}  onClick={e => { e.stopPropagation(); onSelect(plan.id); }}>👁 View</button>
        <button className="ap-card-btn ap-card-btn--edit"  id={`plan-edit-${plan.id}`}  onClick={e => e.stopPropagation()}>✏ Edit</button>
        <button className="ap-card-btn ap-card-btn--dup"   id={`plan-dup-${plan.id}`}   onClick={e => e.stopPropagation()}>⧉ Dup.</button>
        {plan.status !== 'archived' && (
          <button className="ap-card-btn ap-card-btn--archive" id={`plan-arch-${plan.id}`} onClick={e => e.stopPropagation()} title="Archive">📦</button>
        )}
      </div>
    </div>
  );
}

/* ─── Detail panel ─────────────────────────────────────────────── */
function PlanDetail({ plan }) {
  if (!plan) return (
    <div className="ap-detail ap-detail--empty">
      <span style={{ fontSize: 36, opacity: 0.2 }}>📋</span>
      <span style={{ fontSize: 13, color: '#94a3b8' }}>Select a plan to view details</span>
    </div>
  );

  return (
    <div className="ap-detail">
      {/* Header */}
      <div className="ap-detail-header" style={{ background: plan.headerBg || '#0d1117' }}>
        <div className="ap-detail-header-top">
          <div className="ap-detail-plan-code">{plan.id}</div>
          <span className={`ap-status-badge ${STATUS_CFG[plan.status]?.cls}`}>{STATUS_CFG[plan.status]?.label}</span>
        </div>
        <div className="ap-detail-plan-name" style={{ color: plan.color }}>{plan.name}</div>
        <div className="ap-detail-price">
          {plan.free ? 'Free' : `$${plan.price.toLocaleString()}`}
          <span className="ap-detail-price-unit">{plan.free ? `  ${plan.unit}` : plan.unit}</span>
        </div>
      </div>

      <div className="ap-detail-scroll">
        {/* Plan Limits */}
        <div className="ap-detail-section">
          <div className="ap-section-title">PLAN LIMITS</div>
          <div className="ap-limits-grid">
            <div className="ap-limit-row">
              <span className="ap-limit-label">👥 Max Users</span>
              <span className="ap-limit-val" style={!plan.maxUsers ? { color: plan.color, fontWeight: 800 } : {}}>
                {plan.maxUsers ?? 'Unlimited'}
              </span>
            </div>
            <div className="ap-limit-row">
              <span className="ap-limit-label">📍 Max Sites</span>
              <span className="ap-limit-val" style={!plan.maxSites ? { color: plan.color, fontWeight: 800 } : {}}>
                {plan.maxSites ?? 'Unlimited'}
              </span>
            </div>
            <div className="ap-limit-row">
              <span className="ap-limit-label">💾 Storage</span>
              <span className="ap-limit-val">{plan.storage} GB</span>
            </div>
            <div className="ap-limit-row">
              <span className="ap-limit-label">🧩 Modules Included</span>
              <span className="ap-limit-val">{plan.modules} of 12</span>
            </div>
          </div>
        </div>

        {/* Included Modules */}
        <div className="ap-detail-section">
          <div className="ap-section-title">INCLUDED MODULES</div>
          <div className="ap-modules-chips">
            {plan.moduleList.map(m => (
              <span
                key={m}
                className="ap-module-chip"
                style={{ background: `${MODULE_COLOR_MAP[m] || '#64748b'}18`, color: MODULE_COLOR_MAP[m] || '#64748b' }}
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Usage Statistics */}
        <div className="ap-detail-section">
          <div className="ap-section-title">USAGE STATISTICS</div>
          <div className="ap-stats-list">
            <div className="ap-stat-row">
              <span className="ap-stat-icon">🏢</span>
              <span className="ap-stat-label">Companies on this plan</span>
              <span className="ap-stat-val">{plan.companiesUsing}</span>
            </div>
            <div className="ap-stat-row">
              <span className="ap-stat-icon">👥</span>
              <span className="ap-stat-label">Total active users</span>
              <span className="ap-stat-val">{plan.totalUsers.toLocaleString()}</span>
            </div>
            <div className="ap-stat-row">
              <span className="ap-stat-icon">📊</span>
              <span className="ap-stat-label">Avg users per company</span>
              <span className="ap-stat-val">{plan.avgUsers}</span>
            </div>
            <div className="ap-stat-row">
              <span className="ap-stat-icon">💵</span>
              <span className="ap-stat-label">Monthly revenue from plan</span>
              <span className="ap-stat-val ap-stat-val--rev">${plan.monthlyRevenue.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Pricing Information */}
        <div className="ap-detail-section">
          <div className="ap-section-title">PRICING INFORMATION</div>
          <div className="ap-pricing-list">
            <div className="ap-pricing-row">
              <span className="ap-pricing-label">Monthly price</span>
              <span className="ap-pricing-val">{plan.free ? 'Free' : `$${plan.price.toLocaleString()}`}</span>
            </div>
            <div className="ap-pricing-row">
              <span className="ap-pricing-label">Annual price</span>
              <span className="ap-pricing-val">{plan.annualPrice ? `$${plan.annualPrice.toLocaleString()}` : 'N/A'}</span>
            </div>
            <div className="ap-pricing-row">
              <span className="ap-pricing-label">Annual saving</span>
              <span className="ap-pricing-val ap-pricing-val--green">{plan.annualSaving ? `${plan.annualSaving}%` : '—'}</span>
            </div>
            <div className="ap-pricing-row">
              <span className="ap-pricing-label">Setup fee</span>
              <span className="ap-pricing-val ap-pricing-val--orange">{plan.setupFee}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="ap-detail-actions">
        <button className="ap-detail-btn ap-detail-btn--edit" id={`detail-edit-${plan.id}`}>
          ✏ Edit Plan
        </button>
        <button className="ap-detail-btn ap-detail-btn--dup" id={`detail-dup-${plan.id}`}>
          ⧉ Duplicate Plan
        </button>
      </div>
    </div>
  );
}

/* ─── Main Component ───────────────────────────────────────────── */
export default function AdminPlans() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedId, setSelectedId]     = useState(PLANS[0].id);
  const [sortBy, setSortBy]             = useState('Price High-Low');
  const [showCreate, setShowCreate]     = useState(false);

  const selectedPlan = PLANS.find(p => p.id === selectedId) || null;

  const filtered = PLANS.filter(p => {
    if (activeFilter === 'all') return true;
    return p.status === activeFilter;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'Price High-Low') return b.price - a.price;
    if (sortBy === 'Price Low-High') return a.price - b.price;
    if (sortBy === 'Name A-Z')       return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="ap-container">
      {/* ── Page Header ──────────────────────────────────────── */}
      <div className="ap-page-header">
        <div>
          <div className="ap-breadcrumb">
            <span>🔑 Subscription Management</span>
            <span className="ap-bc-sep">›</span>
            <span>Plans</span>
          </div>
          <h1 className="ap-page-title">Subscription Plans</h1>
          <p className="ap-page-sub">
            Create, configure and manage product plans available to client organizations on the platform.
          </p>
        </div>
        <button className="ap-create-btn" id="plans-create-btn" onClick={() => setShowCreate(true)}>
          ＋ Create Plan
        </button>
      </div>

      {/* ── Filter bar ───────────────────────────────────────── */}
      <div className="ap-filter-bar">
        <div className="ap-filter-tabs">
          {FILTER_TABS.map(t => (
            <button
              key={t.key}
              className={`ap-filter-tab${activeFilter === t.key ? ' ap-filter-tab--active' : ''}`}
              onClick={() => setActiveFilter(t.key)}
            >
              {t.label}
              <span className={`ap-filter-count${activeFilter === t.key ? ' ap-filter-count--active' : ''}`}>
                {t.count}
              </span>
            </button>
          ))}
        </div>
        <div className="ap-toolbar">
          <div className="ap-sort">
            <span>↕ Sort:</span>
            <select className="ap-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option>Price High-Low</option>
              <option>Price Low-High</option>
              <option>Name A-Z</option>
            </select>
          </div>
          <button className="ap-toolbar-btn" id="plans-export-btn">⬇ Export</button>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────── */}
      <div className="ap-body">
        {/* Plan cards grid */}
        <div className="ap-cards-area">
          <div className="ap-cards-grid">
            {sorted.map(plan => (
              <PlanCard
                key={plan.id}
                plan={plan}
                selected={selectedId === plan.id}
                onSelect={setSelectedId}
              />
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <PlanDetail plan={selectedPlan} />
      </div>
    </div>
  );
}
