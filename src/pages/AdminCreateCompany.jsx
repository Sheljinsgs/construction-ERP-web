import { useState } from 'react';
import './AdminCreateCompany.css';

/* ─── Constants ────────────────────────────────────────────────── */
const STEPS = [
  { id: 1, label: 'Company Info',   icon: '🏢' },
  { id: 2, label: 'Address',        icon: '📍' },
  { id: 3, label: 'Contact',        icon: '📞' },
  { id: 4, label: 'Licenses',       icon: '🪪' },
  { id: 5, label: 'Admin User',     icon: '👤' },
  { id: 6, label: 'Modules',        icon: '🧩' },
];

const COMPANY_TYPES = ['General Contractor', 'Sub-Contractor', 'Developer', 'Consultant', 'Infrastructure', 'Real Estate'];
const INDUSTRY_TYPES = ['Construction & Civil Engineering', 'Interior & Fit-Out', 'MEP (Mechanical Electrical Plumbing)', 'Roads & Highways', 'Real Estate Development', 'Industrial Construction'];
const COUNTRIES = ['United Arab Emirates', 'United States', 'United Kingdom', 'India', 'Saudi Arabia', 'Qatar', 'Australia', 'Germany', 'France', 'Canada'];
const PLAN_TYPES = ['Basic – $299/mo', 'Professional – $999/mo', 'Enterprise – $3,000/mo', 'Enterprise Plus – $5,000/mo'];
const BILLING_CYCLES = ['Monthly', 'Quarterly', 'Semi-Annual', 'Annual'];

const MODULES = [
  { id: 'organization', label: 'Organisation',   icon: '🏢', default: true  },
  { id: 'hr',           label: 'HR',             icon: '👥', default: true  },
  { id: 'attendance',   label: 'Attendance',     icon: '📋', default: true  },
  { id: 'inventory',    label: 'Inventory',      icon: '📦', default: false },
  { id: 'finance',      label: 'Finance',        icon: '💰', default: true  },
  { id: 'licenses',     label: 'Licenses',       icon: '🪪', default: true  },
  { id: 'directories',  label: 'Directories',    icon: '📁', default: false },
  { id: 'procurement',  label: 'Procurement',    icon: '🛒', default: true  },
  { id: 'payroll',      label: 'Payroll',        icon: '💵', default: false },
  { id: 'expenses',     label: 'Expenses',       icon: '🧾', default: true  },
];

/* ─── Initial form state ───────────────────────────────────────── */
const INIT = {
  // Step 1
  companyName: '', companyCode: '', companyType: '', industryFocus: '', logo: null,
  // Step 2
  country: '', state: '', city: '', registeredAddress: '', postalCode: '',
  // Step 3
  contactName: '', designation: '', fullAddress: '', mobile: '', email: '',
  // Step 4
  planType: '', maxUsers: '', maxProjects: '', maxSites: '', maxStorage: '', billingCycle: 'Monthly',
  // Step 5
  adminName: '', adminRole: 'Company Super Admin', adminEmail: '', adminMobile: '', tempPassword: '',
  // Step 6 — modules keyed by id
  modules: Object.fromEntries(MODULES.map(m => [m.id, m.default])),
};

/* ─── Helper: Label ────────────────────────────────────────────── */
function Label({ text, required }) {
  return (
    <label className="acc-label">
      {text} {required && <span className="acc-required">*</span>}
    </label>
  );
}

/* ─── Step 1 ───────────────────────────────────────────────────── */
function Step1({ form, setForm }) {
  const handleLogo = (e) => {
    const file = e.target.files[0];
    if (file) setForm(f => ({ ...f, logo: file }));
  };
  const logoURL = form.logo ? URL.createObjectURL(form.logo) : null;

  return (
    <div className="acc-step-body">
      <div className="acc-step-heading">
        <span className="acc-step-num">🏢</span>
        <div>
          <div className="acc-step-title">Step 1 — Company Information</div>
          <div className="acc-step-sub">Basic details to identify the company on the platform.</div>
        </div>
      </div>

      <div className="acc-field-row acc-field-row--logo">
        {/* Logo upload */}
        <div className="acc-field acc-field--logo">
          <Label text="Company Logo" />
          <label className="acc-logo-upload" htmlFor="acc-logo-input">
            {logoURL
              ? <img src={logoURL} alt="logo" className="acc-logo-preview" />
              : <div className="acc-logo-placeholder"><span>🏗️</span><span className="acc-logo-hint">Upload</span></div>
            }
          </label>
          <input id="acc-logo-input" type="file" accept="image/*" className="acc-hidden" onChange={handleLogo} />
        </div>

        <div className="acc-field-group">
          <div className="acc-field-row">
            <div className="acc-field">
              <Label text="Company Name" required />
              <input className="acc-input" placeholder="eg. Classy Group Construction Ltd." value={form.companyName} onChange={e => setForm(f => ({ ...f, companyName: e.target.value }))} />
            </div>
            <div className="acc-field acc-field--sm">
              <Label text="Company Code" required />
              <input className="acc-input" placeholder="eg. CGC-001" value={form.companyCode} onChange={e => setForm(f => ({ ...f, companyCode: e.target.value }))} />
            </div>
          </div>
          <div className="acc-field-row">
            <div className="acc-field">
              <Label text="Company Type" required />
              <select className="acc-select" value={form.companyType} onChange={e => setForm(f => ({ ...f, companyType: e.target.value }))}>
                <option value="">General Contractor</option>
                {COMPANY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="acc-field">
              <Label text="Industry Focus" />
              <select className="acc-select" value={form.industryFocus} onChange={e => setForm(f => ({ ...f, industryFocus: e.target.value }))}>
                <option value="">Construction & Civil Engineering</option>
                {INDUSTRY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 2 ───────────────────────────────────────────────────── */
function Step2({ form, setForm }) {
  return (
    <div className="acc-step-body">
      <div className="acc-step-heading">
        <span className="acc-step-num">📍</span>
        <div>
          <div className="acc-step-title">Step 2 — Address</div>
          <div className="acc-step-sub">Registered office address for this company.</div>
        </div>
      </div>

      <div className="acc-field-row">
        <div className="acc-field">
          <Label text="Country" />
          <select className="acc-select" value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))}>
            <option value="">Select country</option>
            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="acc-field">
          <Label text="State / Province" />
          <select className="acc-select" value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))}>
            <option value="">Select state</option>
            <option>Dubai</option><option>Abu Dhabi</option><option>Sharjah</option>
            <option>California</option><option>Texas</option><option>New York</option>
          </select>
        </div>
        <div className="acc-field">
          <Label text="District / City" />
          <input className="acc-input" placeholder="eg. Manhattan" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} />
        </div>
      </div>

      <div className="acc-field-row">
        <div className="acc-field acc-field--stretch">
          <Label text="Registered Address" />
          <textarea className="acc-textarea" rows={2} placeholder="Full registered address..." value={form.registeredAddress} onChange={e => setForm(f => ({ ...f, registeredAddress: e.target.value }))} />
        </div>
        <div className="acc-field acc-field--sm">
          <Label text="Postal Code" />
          <input className="acc-input" placeholder="eg. 10001" value={form.postalCode} onChange={e => setForm(f => ({ ...f, postalCode: e.target.value }))} />
        </div>
      </div>
    </div>
  );
}

/* ─── Step 3 ───────────────────────────────────────────────────── */
function Step3({ form, setForm }) {
  return (
    <div className="acc-step-body">
      <div className="acc-step-heading">
        <span className="acc-step-num">📞</span>
        <div>
          <div className="acc-step-title">Step 3 — Contact Details</div>
          <div className="acc-step-sub">Primary contact person for this company account.</div>
        </div>
      </div>

      <div className="acc-field-row">
        <div className="acc-field">
          <Label text="Contact Person Name" />
          <input className="acc-input" placeholder="Full Name" value={form.contactName} onChange={e => setForm(f => ({ ...f, contactName: e.target.value }))} />
        </div>
        <div className="acc-field">
          <Label text="Designation" />
          <input className="acc-input" placeholder="eg. Operations Director" value={form.designation} onChange={e => setForm(f => ({ ...f, designation: e.target.value }))} />
        </div>
      </div>

      <div className="acc-field-row">
        <div className="acc-field acc-field--stretch">
          <Label text="Full Address" />
          <input className="acc-input" placeholder="Contact person full address" value={form.fullAddress} onChange={e => setForm(f => ({ ...f, fullAddress: e.target.value }))} />
        </div>
        <div className="acc-field acc-field--sm">
          <Label text="Mobile Number" required />
          <input className="acc-input" placeholder="+1 (012) 000-0000" value={form.mobile} onChange={e => setForm(f => ({ ...f, mobile: e.target.value }))} />
        </div>
      </div>

      <div className="acc-field-row">
        <div className="acc-field">
          <Label text="Email Address" />
          <input className="acc-input" type="email" placeholder="contact@company.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        </div>
        <div className="acc-field">
          <Label text="Office Number" />
          <input className="acc-input" placeholder="+1 (012) 000-0000" />
        </div>
      </div>
    </div>
  );
}

/* ─── Step 4 ───────────────────────────────────────────────────── */
function Step4({ form, setForm }) {
  return (
    <div className="acc-step-body">
      <div className="acc-step-heading">
        <span className="acc-step-num">🪪</span>
        <div>
          <div className="acc-step-title">Step 4 — License Setup</div>
          <div className="acc-step-sub">Configure subscription plan and usage limits.</div>
        </div>
      </div>

      <div className="acc-field-row">
        <div className="acc-field acc-field--stretch">
          <Label text="Plan Type" required />
          <select className="acc-select" value={form.planType} onChange={e => setForm(f => ({ ...f, planType: e.target.value }))}>
            <option value="">Enterprise – $3,000/mo</option>
            {PLAN_TYPES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div className="acc-field">
          <Label text="Max Users" />
          <input className="acc-input" type="number" placeholder="eg. 1000" value={form.maxUsers} onChange={e => setForm(f => ({ ...f, maxUsers: e.target.value }))} />
        </div>
        <div className="acc-field">
          <Label text="Max Projects" />
          <input className="acc-input" type="number" placeholder="eg. 100" value={form.maxProjects} onChange={e => setForm(f => ({ ...f, maxProjects: e.target.value }))} />
        </div>
      </div>

      <div className="acc-field-row">
        <div className="acc-field">
          <Label text="Max Sites" />
          <input className="acc-input" type="number" placeholder="eg. 50" value={form.maxSites} onChange={e => setForm(f => ({ ...f, maxSites: e.target.value }))} />
        </div>
        <div className="acc-field">
          <Label text="Max Storage" />
          <input className="acc-input" placeholder="eg. 500 GB" value={form.maxStorage} onChange={e => setForm(f => ({ ...f, maxStorage: e.target.value }))} />
        </div>
        <div className="acc-field">
          <Label text="Billing Cycle" />
          <select className="acc-select" value={form.billingCycle} onChange={e => setForm(f => ({ ...f, billingCycle: e.target.value }))}>
            {BILLING_CYCLES.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      </div>

      {/* Plan summary card */}
      <div className="acc-plan-summary">
        <div className="acc-plan-summary-header">
          <span className="acc-plan-icon">🪪</span>
          <div>
            <div className="acc-plan-name">{form.planType || 'Enterprise – $3,000/mo'}</div>
            <div className="acc-plan-meta">
              {form.maxUsers || '1,000'} Users · {form.maxProjects || '100'} Projects · {form.maxSites || '50'} Sites · {form.billingCycle || 'Monthly'}
            </div>
          </div>
          <div className="acc-plan-price">$3,000<span>/mo</span></div>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 5 ───────────────────────────────────────────────────── */
function Step5({ form, setForm }) {
  const [showPw, setShowPw] = useState(false);
  return (
    <div className="acc-step-body">
      <div className="acc-step-heading">
        <span className="acc-step-num">👤</span>
        <div>
          <div className="acc-step-title">Step 5 — Create First Admin User</div>
          <div className="acc-step-sub">This user will be the primary Company Administrator.</div>
        </div>
      </div>

      <div className="acc-field-row">
        <div className="acc-field">
          <Label text="Full Name" />
          <input className="acc-input" placeholder="Admin full name" value={form.adminName} onChange={e => setForm(f => ({ ...f, adminName: e.target.value }))} />
        </div>
        <div className="acc-field">
          <Label text="Role" />
          <div className="acc-role-badge">
            <span>🛡️</span> Company Super Admin
          </div>
        </div>
      </div>

      <div className="acc-field-row">
        <div className="acc-field">
          <Label text="Email" required />
          <input className="acc-input" type="email" placeholder="admin@company.com" value={form.adminEmail} onChange={e => setForm(f => ({ ...f, adminEmail: e.target.value }))} />
        </div>
        <div className="acc-field">
          <Label text="Mobile Number" />
          <input className="acc-input" placeholder="+1 (012) 000-0000" value={form.adminMobile} onChange={e => setForm(f => ({ ...f, adminMobile: e.target.value }))} />
        </div>
      </div>

      <div className="acc-field-row">
        <div className="acc-field acc-field--stretch">
          <Label text="Temporary Password" required />
          <div className="acc-pw-wrap">
            <input
              className="acc-input"
              type={showPw ? 'text' : 'password'}
              placeholder="••••••••••"
              value={form.tempPassword}
              onChange={e => setForm(f => ({ ...f, tempPassword: e.target.value }))}
            />
            <button type="button" className="acc-pw-toggle" onClick={() => setShowPw(v => !v)}>
              {showPw ? '🙈' : '👁️'}
            </button>
          </div>
          <div className="acc-field-hint">User will be prompted to change this on first login.</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 6 ───────────────────────────────────────────────────── */
function Step6({ form, setForm }) {
  const toggle = (id) => setForm(f => ({ ...f, modules: { ...f.modules, [id]: !f.modules[id] } }));
  const half = Math.ceil(MODULES.length / 2);
  const col1 = MODULES.slice(0, half);
  const col2 = MODULES.slice(half);

  return (
    <div className="acc-step-body">
      <div className="acc-step-heading">
        <span className="acc-step-num">🧩</span>
        <div>
          <div className="acc-step-title">Step 6 — Initial Module Configuration</div>
          <div className="acc-step-sub">Enable or disable modules for this company. Can be changed after creation.</div>
        </div>
      </div>

      <div className="acc-modules-grid">
        <div className="acc-modules-col">
          {col1.map(m => (
            <div key={m.id} className="acc-module-row">
              <div className="acc-module-left">
                <span className="acc-module-icon">{m.icon}</span>
                <span className="acc-module-label">{m.label}</span>
              </div>
              <button
                type="button"
                className={`acc-toggle${form.modules[m.id] ? ' acc-toggle--on' : ''}`}
                onClick={() => toggle(m.id)}
                id={`module-toggle-${m.id}`}
              >
                <span className="acc-toggle-knob" />
              </button>
            </div>
          ))}
        </div>
        <div className="acc-modules-col">
          {col2.map(m => (
            <div key={m.id} className="acc-module-row">
              <div className="acc-module-left">
                <span className="acc-module-icon">{m.icon}</span>
                <span className="acc-module-label">{m.label}</span>
              </div>
              <button
                type="button"
                className={`acc-toggle${form.modules[m.id] ? ' acc-toggle--on' : ''}`}
                onClick={() => toggle(m.id)}
                id={`module-toggle-${m.id}`}
              >
                <span className="acc-toggle-knob" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modules enabled count */}
      <div className="acc-modules-summary">
        {Object.values(form.modules).filter(Boolean).length} of {MODULES.length} modules enabled
      </div>
    </div>
  );
}

/* ─── Preview Panel ────────────────────────────────────────────── */
function PreviewPanel({ form }) {
  const initials = form.companyName
    ? form.companyName.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
    : '?';

  return (
    <div className="acc-preview-card">
      <div className="acc-preview-avatar">
        {form.logo
          ? <img src={URL.createObjectURL(form.logo)} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 10 }} />
          : <span className="acc-preview-initials">{initials}</span>
        }
      </div>
      <div className="acc-preview-name">{form.companyName || 'Company Name'}</div>
      <div className="acc-preview-meta">
        {form.companyCode && <span className="acc-preview-code">{form.companyCode}</span>}
        {form.companyType && <span className="acc-preview-type">{form.companyType}</span>}
      </div>
      {form.planType && (
        <div className="acc-preview-plan">
          <span>🪪</span> {form.planType}
        </div>
      )}
      {form.country && (
        <div className="acc-preview-location">
          <span>📍</span> {form.city ? `${form.city}, ` : ''}{form.country}
        </div>
      )}
      {form.adminEmail && (
        <div className="acc-preview-admin">
          <span>👤</span> {form.adminName || form.adminEmail}
        </div>
      )}
    </div>
  );
}

/* ─── Main Component ───────────────────────────────────────────── */
export default function AdminCreateCompany() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INIT);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const goNext = () => { if (step < 6) setStep(s => s + 1); };
  const goPrev = () => { if (step > 1) setStep(s => s - 1); };

  const handleCreate = () => {
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1800);
  };

  const renderStep = () => {
    switch (step) {
      case 1: return <Step1 form={form} setForm={setForm} />;
      case 2: return <Step2 form={form} setForm={setForm} />;
      case 3: return <Step3 form={form} setForm={setForm} />;
      case 4: return <Step4 form={form} setForm={setForm} />;
      case 5: return <Step5 form={form} setForm={setForm} />;
      case 6: return <Step6 form={form} setForm={setForm} />;
      default: return null;
    }
  };

  if (submitted) {
    return (
      <div className="acc-success">
        <div className="acc-success-icon">🎉</div>
        <div className="acc-success-title">Company Created Successfully!</div>
        <div className="acc-success-sub">
          <strong>{form.companyName || 'The company'}</strong> has been added to the platform.
          The admin user has been notified at <strong>{form.adminEmail}</strong>.
        </div>
        <button className="acc-success-btn" onClick={() => { setForm(INIT); setStep(1); setSubmitted(false); }}>
          + Create Another Company
        </button>
      </div>
    );
  }

  return (
    <div className="acc-container">
      {/* ── Page Header ──────────────────────────────────────── */}
      <div className="acc-page-header">
        <div>
          <div className="acc-breadcrumb">
            <span>🛡️ Platform Admin</span>
            <span className="acc-bc-sep">›</span>
            <span>Create New Company</span>
          </div>
          <h1 className="acc-page-title">Create New Company</h1>
          <p className="acc-page-sub">
            Complete all steps to register and configure a new enterprise tenant on the platform.
          </p>
        </div>
      </div>

      {/* ── Stepper Bar ──────────────────────────────────────── */}
      <div className="acc-stepper">
        {STEPS.map((s, i) => (
          <div
            key={s.id}
            className={`acc-stepper-item${step === s.id ? ' acc-stepper-item--active' : step > s.id ? ' acc-stepper-item--done' : ''}`}
            onClick={() => setStep(s.id)}
          >
            <div className="acc-stepper-dot">
              {step > s.id ? '✓' : s.id}
            </div>
            <div className="acc-stepper-label">{s.label}</div>
            {i < STEPS.length - 1 && <div className={`acc-stepper-line${step > s.id ? ' acc-stepper-line--done' : ''}`} />}
          </div>
        ))}
      </div>

      {/* ── Body ─────────────────────────────────────────────── */}
      <div className="acc-body">
        {/* Main form area */}
        <div className="acc-main">
          <div className="acc-form-card">
            {renderStep()}
          </div>

          {/* Bottom action bar */}
          <div className="acc-action-bar">
            <button className="acc-btn acc-btn--ghost" id="create-company-cancel">✕ Cancel</button>
            <div className="acc-action-right">
              <button className="acc-btn acc-btn--outline" id="create-company-save-draft">💾 Save Draft</button>
              {step > 1 && (
                <button className="acc-btn acc-btn--secondary" id="create-company-prev" onClick={goPrev}>
                  ‹ Previous Step
                </button>
              )}
              {step < 6 ? (
                <button className="acc-btn acc-btn--primary" id="create-company-next" onClick={goNext}>
                  Next Step ›
                </button>
              ) : (
                <button
                  className="acc-btn acc-btn--primary acc-btn--create"
                  id="create-company-submit"
                  onClick={handleCreate}
                  disabled={submitting}
                >
                  {submitting ? <><span className="acc-spinner" /> Creating...</> : '🏢 Create Company'}
                </button>
              )}
            </div>
          </div>

          {/* Bottom toast hint */}
          {step === 6 && (
            <div className="acc-toast-hint">
              <span>💡</span>
              <span>Ready to create this company? Review the details above, then click the <strong>Create Company</strong> button to finalize.</span>
              <button className="acc-btn acc-btn--primary acc-btn--sm" id="create-company-toast-btn" onClick={handleCreate}>
                🏢 Create Company
              </button>
            </div>
          )}
        </div>

        {/* ── Right sidebar ─────────────────────────────────── */}
        <aside className="acc-sidebar">
          {/* Setup Progress */}
          <div className="acc-sidebar-card">
            <div className="acc-sidebar-title">Setup Progress</div>
            <div className="acc-progress-list">
              {STEPS.map(s => (
                <div
                  key={s.id}
                  className={`acc-progress-item${step === s.id ? ' acc-progress-item--active' : step > s.id ? ' acc-progress-item--done' : ''}`}
                  onClick={() => setStep(s.id)}
                >
                  <div className="acc-progress-dot">
                    {step > s.id ? '✓' : s.id}
                  </div>
                  <div className="acc-progress-info">
                    <div className="acc-progress-label">{s.label}</div>
                    <div className="acc-progress-status">
                      {step > s.id ? 'Completed' : step === s.id ? 'In progress...' : 'Pending'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Progress bar */}
            <div className="acc-overall-progress">
              <div className="acc-overall-track">
                <div className="acc-overall-fill" style={{ width: `${((step - 1) / 5) * 100}%` }} />
              </div>
              <div className="acc-overall-label">{Math.round(((step - 1) / 5) * 100)}% complete</div>
            </div>
          </div>

          {/* Preview */}
          <div className="acc-sidebar-card">
            <div className="acc-sidebar-title">Preview</div>
            <PreviewPanel form={form} />
          </div>

          {/* Onboarding Guide */}
          <div className="acc-sidebar-card acc-sidebar-card--warning">
            <div className="acc-onboarding-header">
              <span>💡</span>
              <div className="acc-sidebar-title">Onboarding Guide</div>
            </div>
            <p className="acc-onboarding-text">
              Company is ready to onboard. Ensure the admin user is notified. They will receive login credentials via email and can configure their company further.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
