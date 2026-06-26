import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashScreen.css';

const LOADING_STEPS = [
  { pct: 8,  msg: 'Initializing platform core...' },
  { pct: 20, msg: 'Loading security modules...' },
  { pct: 35, msg: 'Connecting to enterprise nodes...' },
  { pct: 50, msg: 'Authorizing cloud instances...' },
  { pct: 65, msg: 'Synchronizing global workforce data...' },
  { pct: 78, msg: 'Verifying SSL certificates...' },
  { pct: 90, msg: 'Establishing secure session...' },
  { pct: 100, msg: 'Platform ready. Redirecting...' },
];

export default function SplashScreen({ target }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [displayPct, setDisplayPct] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const intervalRef = useRef(null);
  const animRef = useRef(null);

  // Animate progress counter
  useEffect(() => {
    const current = LOADING_STEPS[step];
    if (!current) return;

    const target = current.pct;
    const start = step === 0 ? 0 : LOADING_STEPS[step - 1].pct;
    let cur = start;

    if (animRef.current) cancelAnimationFrame(animRef.current);

    const animate = () => {
      cur += 0.8;
      if (cur >= target) {
        setDisplayPct(target);
        return;
      }
      setDisplayPct(Math.floor(cur));
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animRef.current);
  }, [step]);

  // Step through loading messages
  useEffect(() => {
    const delays = [600, 800, 900, 1000, 900, 800, 700, 1200];
    intervalRef.current = setTimeout(() => {
      if (step < LOADING_STEPS.length - 1) {
        setStep((s) => s + 1);
      } else {
        // Done – fade out and navigate
        setFadeOut(true);
        setTimeout(() => {
          navigate(target === 'admin' ? '/super-admin/login' : '/login');
        }, 700);
      }
    }, delays[step] || 700);

    return () => clearTimeout(intervalRef.current);
  }, [step, navigate, target]);

  const isAdmin = target === 'admin';

  return (
    <div className={`splash ${fadeOut ? 'splash--fadeout' : ''}`}>
      {/* Grid overlay */}
      <div className="splash__grid-overlay" />

      {/* Top bar */}
      <header className="splash__topbar">
        <div className="splash__status">
          <span className="splash__pulse" />
          <span>SAAS PLATFORM CORE ACTIVE</span>
        </div>
        <div className="splash__node">ENTERPRISE NODE V9.4</div>
      </header>

      {/* Main */}
      <main className="splash__main">
        {/* LEFT */}
        <section className="splash__left">
          <div className={`splash__badge ${isAdmin ? 'splash__badge--admin' : ''}`}>
            <span>{isAdmin ? '🔒' : '🏢'}</span>
            <span>{isAdmin ? 'SUPER ADMIN PORTAL' : 'COMPANY ERP ACCESS'}</span>
          </div>

          <h1 className="splash__title">
            Construct<span className="splash__accent">ERP</span>
            <br />Platform
            <span className="splash__cursor">|</span>
          </h1>

          <p className="splash__subtitle">Unified Construction Management Platform</p>
          <p className="splash__desc">
            Initialize multi-company workspaces, synchronize global labor rosters,
            and manage operational expenditures through our centralized, premium ERP framework.
          </p>

          {/* Progress */}
          <div className="splash__progress-wrap">
            <div className="splash__progress-labels">
              <span className="splash__progress-msg">{LOADING_STEPS[step]?.msg}</span>
              <span className="splash__progress-pct">{displayPct}%</span>
            </div>
            <div className="splash__track">
              <div
                className="splash__fill"
                style={{ width: `${displayPct}%` }}
              />
              <div className="splash__fill-glow" style={{ left: `${displayPct}%` }} />
            </div>
          </div>
        </section>

        {/* RIGHT */}
        <section className="splash__right">
          {/* Health card */}
          <div className="splash__health-card">
            <div className="health-label">PLATFORM HEALTH:</div>
            <div className="health-value">99.98% uptime</div>
            <svg className="health-graph" viewBox="0 0 100 36" fill="none">
              <polyline
                points="0,30 14,24 28,27 42,10 56,18 70,6 84,12 100,8"
                stroke="#00e5b0"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="0,30 14,24 28,27 42,10 56,18 70,6 84,12 100,8"
                stroke="rgba(0,229,176,0.15)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Building visual */}
          <div className="splash__building">
            <img src="/blueprint_bg.png" alt="Construction Blueprint" className="splash__img" />
            <div className="splash__img-overlay" />
          </div>

          {/* Environments badge */}
          <div className="splash__env-badge">
            <span className="env-pulse">🌐</span>
            <div>
              <div className="env-label">ENVIRONMENTS</div>
              <div className="env-value">14 Active Realms</div>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom bar */}
      <footer className="splash__footer">
        <div className="footer-left">
          <span>DEMO BUILD SYSTEMS CO.</span>
          <span className="footer-sep">•</span>
          <span>SECURE PLATFORM ENCRYPTED</span>
        </div>
        <div className="footer-right">
          <span>Privacy standards</span>
          <span className="footer-sep">|</span>
          <span>Failover protocol</span>
        </div>
      </footer>
    </div>
  );
}
