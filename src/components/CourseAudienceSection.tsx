import React from "react";
import { Shield, Target, Plane, Users, Award, Zap, TrendingUp, BookOpen } from "lucide-react";
import "@/assets/css/CourseAudienceSection.css";

// -------------------- AUDIENCE TYPES --------------------
interface AudienceType {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
  cta: string;
}

// -------------------- MAIN COMPONENT --------------------
export default function CourseAudienceSection() {
  const audienceTypes: AudienceType[] = [
    {
      id: 1,
      title: "Aviation Professionals",
      description: "Pilots, ATC officers, and ground crew seeking hands-on cybersecurity training for real-world aviation threats",
      icon: <Plane size={32} />,
      color: "#1e40af",
      features: [
        "Practical threat recognition exercises",
        "Real-time communication security",
        "Emergency protocol training",
        "Aviation-specific scenarios"
      ],
      cta: "Start Aviation Training"
    },
    {
      id: 2,
      title: "Cybersecurity Analysts",
      description: "Security professionals looking to specialize in aviation and critical infrastructure protection",
      icon: <Shield size={32} />,
      color: "#8b5cf6",
      features: [
        "Advanced threat analysis",
        "Industry-specific security frameworks",
        "Real-time monitoring techniques",
        "Incident response protocols"
      ],
      cta: "Specialize in Aviation Security"
    },
    {
      id: 3,
      title: "IT & Network Engineers",
      description: "Technical professionals responsible for securing aviation communication and navigation systems",
      icon: <Zap size={32} />,
      color: "#06b6d4",
      features: [
        "Secure network architecture",
        "Encryption protocols for aviation",
        "System integrity monitoring",
        "Redundancy planning"
      ],
      cta: "Master Aviation Systems Security"
    },
    {
      id: 4,
      title: "Training Supervisors",
      description: "Managers and educators developing cybersecurity training programs for aviation personnel",
      icon: <Users size={32} />,
      color: "#10b981",
      features: [
        "Team performance analytics",
        "Custom training modules",
        "Progress tracking dashboards",
        "Certification management"
      ],
      cta: "Build Training Programs"
    }
  ];

  return (
    <section className="course-audience-section">
      {/* Background Decorations */}
      <div className="section-bg-decorations">
        <div className="floating-element el1">🛡️</div>
        <div className="floating-element el2">✈️</div>
        <div className="floating-element el3">🔒</div>
        <div className="floating-element el4">📡</div>
        <div className="bg-gradient-spot spot1"></div>
        <div className="bg-gradient-spot spot2"></div>
      </div>

      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Target size={16} />
            <span>Designed For</span>
          </div>
          
          <div className="header-content">
            <h2 className="section-title">
              This Course Is <span className="highlight-text">Made For You</span>
            </h2>
            
            <p className="section-quote">
              "The greatest risk in aviation cybersecurity is believing you're prepared without realistic training."
              <span className="quote-author">— SkyShield Training Philosophy</span>
            </p>
          </div>

          <div className="stats-bar">
            <div className="stat-item">
              <div className="stat-icon"><TrendingUp size={24} /></div>
              <div className="stat-content">
                <div className="stat-value">94%</div>
                <div className="stat-label">Career Impact</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon"><Award size={24} /></div>
              <div className="stat-content">
                <div className="stat-value">FAA</div>
                <div className="stat-label">Compliant</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon"><BookOpen size={24} /></div>
              <div className="stat-content">
                <div className="stat-value">500+</div>
                <div className="stat-label">Hours Content</div>
              </div>
            </div>
          </div>
        </div>

        {/* Audience Grid */}
        <div className="audience-grid">
          {audienceTypes.map((audience) => (
            <div key={audience.id} className="audience-card">
              <div className="card-decoration" style={{ background: audience.color }}></div>
              
              <div className="card-header">
                <div 
                  className="audience-icon" 
                  style={{ 
                    background: `linear-gradient(135deg, ${audience.color}, ${audience.color}80)`,
                    borderColor: audience.color
                  }}
                >
                  {audience.icon}
                </div>
                <div className="audience-meta">
                  <h3 className="audience-title">{audience.title}</h3>
                  <div className="audience-tag">Perfect Match</div>
                </div>
              </div>

              <p className="audience-description">{audience.description}</p>

              <div className="audience-features">
                <div className="features-header">
                  <span className="features-title">You'll Master:</span>
                  <div className="features-count">{audience.features.length} Key Areas</div>
                </div>
                <ul className="features-list">
                  {audience.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      <div className="feature-dot"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                className="audience-cta"
                style={{ background: audience.color }}
              >
                <span>{audience.cta}</span>
                <div className="cta-arrow">→</div>
              </button>

              <div className="card-glow"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="global-cta">
          <div className="cta-content">
            <h3 className="cta-title">Not Sure Which Path Is Right?</h3>
            <p className="cta-description">
              Take our 2-minute assessment to discover the perfect training path for your career goals
            </p>
          </div>
          <button className="assessment-button">
            <Target size={20} />
            <span>Take Career Assessment</span>
            <div className="button-sparkle">✨</div>
          </button>
        </div>
      </div>
    </section>
  );
}