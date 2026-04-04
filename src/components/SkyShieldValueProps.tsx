

// Assuming this path is correct for your global CSS
import "@/assets/css/SkyShieldValueProps.css"; 

export default function SkyShieldValueProps() {
  return (
    <section className="value-props-section">
      <div className="container">
        <div className="section-header">
          {/* UPDATED TAG: Focuses on the technological advantage */}
          <p className="related-courses-tag">TECHNOLOGY EDGE</p>
          {/* UPDATED TITLE: Focuses on the new experience */}
          <h2 className="section-title">Experience The Next Generation of Simulation</h2>
        </div>

        <div className="card-grid">

          {/* --- Card 1: Mission-Grade Immersion (Epic A) --- */}
          <div className="prop-card card-3d">
            <div className="prop-icon-circle sky-icon-bg">
              {/* Lucide icon: MonitorCheck for simulation/screen integrity */}
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-monitor-check text-sky-theme">
                <rect width="20" height="14" x="2" y="3" rx="2"/><path d="m9 10 2 2 4-4"/>
              </svg>
            </div>
            <h3 className="card-title">Mission-Grade Immersion</h3>
            <p className="card-description">
              Engage in high-fidelity, multi-step simulations of critical aviation threats (GPS spoofing, jamming, console breaches) tailored for pilots and ATC.
            </p>
          </div>

          {/* --- Card 2: Personalized Threat Tracking (Epic B) --- */}
          <div className="prop-card card-3d">
            <div className="prop-icon-circle orange-icon-bg">
              {/* Lucide icon: Target for adaptive learning/focus */}
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-target text-orange-theme">
                <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
              </svg>
            </div>
            <h3 className="card-title">Personalized Threat Tracking</h3>
            <p className="card-description">
              Our <strong>Aura Engine</strong> intelligently adapts scenarios and difficulty levels based on your real-time performance, guaranteeing focus on your specific weak areas.
            </p>
          </div>

          {/* --- Card 3: Certified Readiness (Epic C) --- */}
          <div className="prop-card card-3d">
            <div className="prop-icon-circle green-icon-bg">
              {/* Lucide icon: BarChart for analytics/scoring */}
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bar-chart-2 text-green-theme">
                <line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/>
              </svg>
            </div>
            <h3 className="card-title">Certified Readiness (MRI)</h3>
            <p className="card-description">
              Generate your official <strong>Mission Readiness Index (MRI)</strong> score and detailed <strong>After Action Reports (AAR)</strong> to prove competency and track precise progression.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}