
import "@/assets/css/SkyShieldStatsBar.css";

export default function SkyShieldStatsBar() {
  return (
    <div className="stats-bar-container">
      <div className="stats-bar-card">

        {/* Incident Accuracy */}
        <div className="stat-item">
          <div className="icon-wrapper sky-icon-bg">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </div>

          <div className="stat-content">
            <p className="stat-value text-sky-theme">92%</p>
            <p className="stat-label">Average Detection Accuracy</p>
          </div>
        </div>

        {/* Scenarios */}
        <div className="stat-item">
          <div className="icon-wrapper orange-icon-bg">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 1.5 8 4.5v9L12 22l-8-4.5v-9L12 1.5Z"/>
              <path d="m12 1.5v20.5"/>
              <path d="m19.5 6-7.5 4.5"/>
              <path d="m4.5 6 7.5 4.5"/>
            </svg>
          </div>

          <div className="stat-content">
            <p className="stat-value text-orange-theme">10+</p>
            <p className="stat-label">Aviation Threat Scenarios</p>
          </div>
        </div>

        {/* Hours */}
        <div className="stat-item">
          <div className="icon-wrapper green-icon-bg">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>

          <div className="stat-content">
            <p className="stat-value text-green-theme">5000+</p>
            <p className="stat-label">Hours of Simulated Training</p>
          </div>
        </div>

      </div>
    </div>
  );
}
