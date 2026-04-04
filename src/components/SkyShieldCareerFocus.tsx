

// Assuming your CSS path is correct
import "@/assets/css/SkyShieldCareerFocus.css"; 

export default function SkyShieldCareerFocus() {
  return (
    <section className="career-focus-section">
      <div className="container">
        <div className="section-header">
          <p className="related-courses-tag">CAREER ACCELERATION</p>
          <h2 className="section-title">Why Join Our Mission-Ready Program?</h2>
        </div>

        <div className="card-grid">

          {/* --- Card 1: Real Mission Scenarios --- */}
          <div className="focus-card card-3d">
            <div className="icon-circle sky-icon-bg">
              {/* Lucide icon: Hourglass */}
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hourglass text-sky-theme">
                <path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.17c0-.57-.25-1.13-.7-1.55L9 9l-.7-.63A1 1 0 0 0 8 7.78V2"/><path d="m20 2-3 3-5 5"/>
              </svg>
            </div>
            <h3 className="card-title">Real Mission Scenarios</h3>
            <p className="card-description">
              Work directly with industry simulation experts on complex, real-world aviation security projects to master your skills and build a robust, mission-critical portfolio.
            </p>
          </div>

          {/* --- Card 2: Guaranteed MRI Uplift --- */}
          <div className="focus-card card-3d">
            <div className="icon-circle orange-icon-bg">
              {/* Lucide icon: TrendingUp for growth/uplift */}
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up text-orange-theme">
                <polyline points="22 7 13 16 9 12 2 19"/><line x1="16" x2="22" y1="7" y2="7"/><line x1="21" x2="22" y1="7" y2="11"/>
              </svg>
            </div>
            <h3 className="card-title">Guaranteed MRI Uplift</h3>
            <p className="card-description">
              Our program focuses intensely on performance metrics to eliminate skill gaps, backed by a commitment to improving your **Mission Readiness Index (MRI)** score.
            </p>
          </div>

          {/* --- Card 3: Aviation Career Mentors --- */}
          <div className="focus-card card-3d">
            <div className="icon-circle green-icon-bg">
              {/* Lucide icon: Users/Mentor */}
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users text-green-theme">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3 className="card-title">Aviation Career Mentors</h3>
            <p className="card-description">
              Interact and learn directly from Mentors—seasoned security and operations professionals working in major aviation and defense organizations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}