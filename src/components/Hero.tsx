import { Link } from 'react-router-dom';
import '@/assets/css/hero.css';

// Student image used as full-page background
import studentImage from '@/assets/images/student-image2.png';

// Trust logos (PNG for natural colors and visibility)
import faaLogo from '@/assets/images/logos/faa-logo.png';
import natoLogo from '@/assets/images/logos/nato-logo.png';
import iataLogo from '@/assets/images/logos/iata-logo.png';
import usAirForceLogo from '@/assets/images/logos/us-air-force-logo.png';
import emiratesLogo from '@/assets/images/logos/emirates-logo.png';
import boeingLogo from '@/assets/images/logos/boeing-logo.png';

export default function Hero() {
  return (
    <section
      className="hero-section-new"
      style={{
        backgroundImage: `
          url(${studentImage}),
          radial-gradient(circle at 15% 50%, rgba(162, 89, 255, 0.15) 0%, transparent 25%),
          radial-gradient(circle at 85% 30%, rgba(24, 160, 251, 0.15) 0%, transparent 25%),
          linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%)
        `,
        backgroundPosition: 'center bottom, 15% 50%, 85% 30%, 0% 0%',
        backgroundSize: 'cover, auto, auto, cover',
        backgroundRepeat: 'no-repeat, no-repeat, no-repeat, no-repeat'
      }}
    >
      <div className="hero-content-container">

        {/* --- Left Content: Sky Edu Text and Features --- */}
        <div className="left-side">

          <div className="badge-pill">
            <span className="text-white font-medium">
              Trusted by Air Forces & Airlines Worldwide
            </span>
          </div>

          <h1 className="main-headline">
            Train Like
            <br />
            <span className="gradient-text-sky">
              The Sky Depends On You
            </span>
          </h1>

          <p className="subtitle-text">
            Interactive cybersecurity simulations for pilots, air traffic controllers, and ops teams.
            Spot GPS spoofing, jamming, and breaches before they become real disasters.
          </p>

          <div className="hero-buttons">
            <Link to="/signup" className="btn-primary-sky">
              Start Your First Simulation
            </Link>
          </div>

          <div className="trust-logos">
            <img src={faaLogo} alt="FAA" className="trust-org-logo" />
            <img src={natoLogo} alt="NATO" className="trust-org-logo" />
            <img src={iataLogo} alt="IATA" className="trust-org-logo" />
            <img src={usAirForceLogo} alt="US Air Force" className="trust-org-logo" />
            <img src={emiratesLogo} alt="Emirates" className="trust-org-logo" />
            <img src={boeingLogo} alt="Boeing" className="trust-org-logo" />
          </div>
        </div>

        {/* --- Right Content: Contact Form --- */}
        <div className="right-side">
          <div className="contact-form-card">
            <h2 className="form-headline">
              We're here to help!
            </h2>
            <p className="form-subtext">
              Please contact us in case of any query.
            </p>

            <form className="contact-form">
              <input 
                type="text" 
                placeholder="Your name" 
                className="form-input" 
              />
              <input 
                type="email" 
                placeholder="Your email address" 
                className="form-input" 
              />
              <input 
                type="tel" 
                placeholder="Your phone number" 
                className="form-input" 
              />

              <select className="select-course-dropdown">
                <option value="">Select Course</option>
                <option value="pilot-fundamentals">Pilot Cybersecurity Fundamentals</option>
                <option value="atc-threat-detection">Air Traffic Control Threat Detection</option>
                <option value="ops-breach-response">Operations Team Breach Response</option>
                <option value="gps-spoofing">GPS Spoofing Simulation</option>
                <option value="jamming-prevention">Jamming Prevention Training</option>
                <option value="advanced-breaches">Advanced Breach Scenarios</option>
                <option value="drone-security">Drone Cybersecurity Essentials</option>
                <option value="network-security">Aviation Network Security</option>
                <option value="incident-response">Incident Response for Aviation</option>
                <option value="compliance-training">Regulatory Compliance Simulations</option>
              </select>

              <button type="submit" className="btn-get-in-touch">
                <span className="flex items-center justify-center gap-2">
                  Get in Touch
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}