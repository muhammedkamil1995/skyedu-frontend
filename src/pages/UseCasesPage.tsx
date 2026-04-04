// src/pages/UseCasesPage.tsx

import { 
  Plane, Users, Building, Shield, Target, 
  BarChart3, Globe, Award, Clock, CheckCircle
} from 'lucide-react';
import '@/assets/css/UseCasesPage.css';

// Import images
import useCasesHero from '@/assets/images/use-cases-hero.jpg';
import airlineTraining from '@/assets/images/airline-training.jpg';
import militaryTraining from '@/assets/images/military-training.jpg';
import governmentTraining from '@/assets/images/government-training.jpg';

const useCasesData = [
  {
    id: 1,
    title: "Commercial Airlines",
    description: "Enhance cybersecurity readiness for airline pilots, crew, and ground staff",
    icon: <Plane size={32} />,
    image: airlineTraining,
    benefits: [
      "Reduced cyber incident response time",
      "Improved threat recognition skills",
      "Compliance with aviation security standards"
    ],
    caseStudy: "Major international airline reduced cybersecurity incidents by 75%"
  },
  {
    id: 2,
    title: "Military Aviation",
    description: "Specialized training for military pilots and defense personnel",
    icon: <Shield size={32} />,
    image: militaryTraining,
    benefits: [
      "Enhanced mission security protocols",
      "Advanced threat simulation",
      "Classified scenario handling"
    ],
    caseStudy: "Air force unit improved threat detection accuracy by 92%"
  },
  {
    id: 3,
    title: "Government Agencies",
    description: "Training for aviation authorities and regulatory bodies",
    icon: <Building size={32} />,
    image: governmentTraining,
    benefits: [
      "Standardized security protocols",
      "Cross-agency collaboration",
      "Policy development support"
    ],
    caseStudy: "Aviation authority achieved 100% compliance across all agencies"
  }
];

const industriesData = [
  {
    name: "Air Traffic Control",
    users: "1,200+ trained",
    impact: "40% faster incident response",
    icon: <Target size={24} />
  },
  {
    name: "Airport Operations",
    users: "850+ trained",
    impact: "60% reduction in security breaches",
    icon: <Globe size={24} />
  },
  {
    name: "Aviation Security",
    users: "2,500+ trained",
    impact: "94% threat detection rate",
    icon: <Shield size={24} />
  },
  {
    name: "Flight Crews",
    users: "3,000+ trained",
    impact: "85% skill improvement",
    icon: <Users size={24} />
  }
];

export default function UseCasesPage() {
  return (
    <div className="use-cases-page">
      {/* Hero Section */}
      <section className="use-cases-hero">
        <div className="hero-background" style={{ backgroundImage: `url(${useCasesHero})` }}></div>
        <div className="hero-overlay">
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge">
                <Target size={20} />
                <span>Industry Applications</span>
              </div>
              <h1 className="hero-title">
                Real-World <span className="highlight">Applications</span>
              </h1>
              <p className="hero-description">
                Discover how aviation organizations worldwide are transforming their 
                cybersecurity posture with SkyShield Edu's immersive training platform.
              </p>
              <div className="hero-stats">
                <div className="stat">
                  <div className="stat-value">50+</div>
                  <div className="stat-label">Organizations</div>
                </div>
                <div className="stat">
                  <div className="stat-value">10,000+</div>
                  <div className="stat-label">Hours Trained</div>
                </div>
                <div className="stat">
                  <div className="stat-value">98%</div>
                  <div className="stat-label">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="industries-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Trusted by <span className="highlight">Industry Leaders</span></h2>
            <p className="section-subtitle">
              Our platform serves diverse aviation sectors with specialized training solutions
            </p>
          </div>

          <div className="industries-grid">
            {industriesData.map((industry, index) => (
              <div key={index} className="industry-card">
                <div className="industry-icon">{industry.icon}</div>
                <h3 className="industry-name">{industry.name}</h3>
                <div className="industry-stats">
                  <div className="stat-item">
                    <Users size={16} />
                    <span>{industry.users}</span>
                  </div>
                  <div className="stat-item">
                    <BarChart3 size={16} />
                    <span>{industry.impact}</span>
                  </div>
                </div>
                <button className="btn-view-case">View Case Study →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="use-cases-grid">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Primary <span className="highlight">Use Cases</span></h2>
            <p className="section-subtitle">
              Tailored solutions for different aviation sectors and requirements
            </p>
          </div>

          <div className="use-cases-container">
            {useCasesData.map((useCase) => (
              <div key={useCase.id} className="use-case-card">
                <div className="case-image" style={{ backgroundImage: `url(${useCase.image})` }}>
                  <div className="case-overlay"></div>
                  <div className="case-icon">{useCase.icon}</div>
                </div>
                
                <div className="case-content">
                  <h3 className="case-title">{useCase.title}</h3>
                  <p className="case-description">{useCase.description}</p>
                  
                  <div className="case-benefits">
                    <h4>Key Benefits:</h4>
                    <ul>
                      {useCase.benefits.map((benefit, index) => (
                        <li key={index}>
                          <CheckCircle size={16} />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="case-study">
                    <div className="study-badge">
                      <Award size={16} />
                      <span>Case Study</span>
                    </div>
                    <p className="study-text">{useCase.caseStudy}</p>
                  </div>
                  
                  <div className="case-actions">
                    <button className="btn-primary">
                      <Clock size={18} />
                      <span>Schedule Demo</span>
                    </button>
                    <button className="btn-secondary">
                      <span>Read Full Story</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our <span className="highlight">Clients Say</span></h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"SkyShield Edu transformed our cybersecurity training program. Our response times improved dramatically."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4>John McAllister</h4>
                  <p>Chief Security Officer, Global Airlines</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The military-grade simulations are incredibly realistic. Our pilots are better prepared than ever."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4>Sarah Johnson</h4>
                  <p>Training Director, Air Force Command</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="use-cases-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Organization?</h2>
            <p>
              Schedule a personalized demo to see how SkyShield Edu can address 
              your specific aviation cybersecurity training needs.
            </p>
            <div className="cta-actions">
              <button className="btn-primary">
                <Clock size={20} />
                <span>Schedule Demo</span>
              </button>
              <button className="btn-secondary">
                <span>Download White Paper</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}