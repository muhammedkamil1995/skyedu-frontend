// Import CSS
import "@/assets/css/SkyShieldHowItWorks.css";

// Import image properly
import howItWorksImage from "@/assets/images/skyShield-howitworks.png";

export default function SkyShieldHowItWorks() {
  return (
    <section className="how-it-works-section">
      {/* Floating Elements */}
      <div className="floating-element floating-1">✈️</div>
      <div className="floating-element floating-2">🛡️</div>
      <div className="floating-element floating-3">🚀</div>
      
      <div className="container grid-layout">
        
        {/* --- Left Column: Steps --- */}
        <div className="steps-container">
          <h2 className="section-title">How It Works</h2>

          <div className="step-list">

            {/* Step 1: Sign Up */}
            <div className="step step-1">
              <span className="step-number">01</span>
              <div className="step-content">
                <div className="step-card">
                  <div className="icon-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-plus">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <line x1="19" x2="19" y1="8" y2="14"/>
                      <line x1="22" x2="16" y1="11" y2="11"/>
                    </svg>
                  </div>
                  <div className="text-content">
                    <h3 className="step-title">Sign Up and Create Profile</h3>
                    <p className="step-description">Fill out your details and define your role (Pilot, ATC, Officer) in our secure system.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Simulate Incident */}
            <div className="step step-2">
              <span className="step-number">02</span>
              <div className="step-content">
                <div className="step-card">
                  <div className="icon-wrapper orange-icon-bg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                    </svg>
                  </div>
                  <div className="text-content">
                    <h3 className="step-title">Simulate Critical Incident</h3>
                    <p className="step-description">Select aviation-specific cyber threats and launch interactive simulations in real-time scenarios.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Analyze Performance */}
            <div className="step step-3">
              <span className="step-number">03</span>
              <div className="step-content">
                <div className="step-card">
                  <div className="icon-wrapper green-icon-bg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bar-chart-2">
                      <line x1="18" x2="18" y1="20" y2="10"/>
                      <line x1="12" x2="12" y1="20" y2="4"/>
                      <line x1="6" x2="6" y1="20" y2="14"/>
                    </svg>
                  </div>
                  <div className="text-content">
                    <h3 className="step-title">Analyze Performance</h3>
                    <p className="step-description">Get your Mission Readiness Index and detailed After Action Report for skill progression tracking.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* --- Right Column: Image and Overlay --- */}
        <div className="image-container" style={{ backgroundImage: `url(${howItWorksImage})` }}>
          <div className="image-overlay-info">
            <div className="avatar-bar">
              <div className="avatars">
                <div className="avatar">JP</div>
                <div className="avatar">AS</div>
                <div className="avatar">MR</div>
              </div>
              <div className="trainee-count">
                <strong>2,500+</strong>
                Aviation Professionals Trained
              </div>
            </div>
            <div className="rating-badge">
              <div className="stars">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <span className="rating-text">4.9/5 Average Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}