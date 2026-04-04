// src/pages/AboutPage.tsx

import { 
  Users, Target, Award, Globe, TrendingUp, 
  Shield, Heart, Zap, BookOpen, Star
} from 'lucide-react';
import '@/assets/css/AboutPage.css';

// Import images
import aboutHero from '@/assets/images/about-hero.jpg';
import teamPhoto from '@/assets/images/team-photo.jpg';
import missionImage from '@/assets/images/mission-image1.jpg';

const teamMembers = [
  {
    id: 1,
    name: "Dr. James Wilson",
    role: "Founder & CEO",
    experience: "25+ years in aviation security",
    bio: "Former Air Force cybersecurity expert with extensive experience in aviation threat analysis."
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Chief Technology Officer",
    experience: "15+ years in simulation tech",
    bio: "Expert in immersive training technologies and simulation engine development."
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    role: "Head of Training",
    experience: "20+ years in aviation training",
    bio: "Former airline training director with deep expertise in crew resource management."
  }
];

const valuesData = [
  {
    icon: <Target size={32} />,
    title: "Mission Focused",
    description: "Dedicated to enhancing aviation cybersecurity worldwide"
  },
  {
    icon: <Shield size={32} />,
    title: "Security First",
    description: "Uncompromising commitment to data protection and privacy"
  },
  {
    icon: <Users size={32} />,
    title: "Team Driven",
    description: "Collaborative approach to solving complex challenges"
  },
  {
    icon: <Zap size={32} />,
    title: "Innovation",
    description: "Continuous improvement and cutting-edge technology"
  }
];

const milestones = [
  { year: "2020", event: "Company Founded", description: "Initial research and development" },
  { year: "2021", event: "First Prototype", description: "Beta testing with aviation partners" },
  { year: "2022", event: "Platform Launch", description: "Public launch with 10 scenarios" },
  { year: "2023", event: "Global Expansion", description: "Partnerships with 50+ organizations" }
];

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-background" style={{ backgroundImage: `url(${aboutHero})` }}></div>
        <div className="hero-overlay">
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge">
                <Heart size={20} />
                <span>Our Story</span>
              </div>
              <h1 className="hero-title">
                Protecting Aviation's <span className="highlight">Digital Future</span>
              </h1>
              <p className="hero-description">
                SkyShield Edu was founded with a singular mission: to revolutionize 
                cybersecurity training for aviation professionals through immersive, 
                realistic simulations.
              </p>
              <div className="hero-stats">
                <div className="stat">
                  <div className="stat-icon"><Globe size={24} /></div>
                  <div className="stat-content">
                    <div className="stat-value">50+</div>
                    <div className="stat-label">Countries</div>
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-icon"><Users size={24} /></div>
                  <div className="stat-content">
                    <div className="stat-value">2,500+</div>
                    <div className="stat-label">Professionals Trained</div>
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-icon"><Award size={24} /></div>
                  <div className="stat-content">
                    <div className="stat-value">10+</div>
                    <div className="stat-label">Industry Awards</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our <span className="highlight">Mission</span></h2>
              <p>
                To provide the most advanced, realistic cybersecurity training platform 
                that prepares aviation professionals for the evolving digital threats 
                facing the industry today and tomorrow.
              </p>
              <div className="mission-values">
                <h3>Our Core Values</h3>
                <div className="values-grid">
                  {valuesData.map((value, index) => (
                    <div key={index} className="value-card">
                      <div className="value-icon">{value.icon}</div>
                      <h4>{value.title}</h4>
                      <p>{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mission-image">
              <img src={missionImage} alt="Our Mission" />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our <span className="highlight">Journey</span></h2>
            <p className="section-subtitle">Milestones in our mission to secure aviation</p>
          </div>
          
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{milestone.year}</div>
                <div className="timeline-content">
                  <h3>{milestone.event}</h3>
                  <p>{milestone.description}</p>
                </div>
                <div className="timeline-dot"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Meet Our <span className="highlight">Leadership</span></h2>
            <p className="section-subtitle">
              Experts with decades of combined experience in aviation and cybersecurity
            </p>
          </div>

          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-card">
                <div className="team-photo">
                  <div className="photo-placeholder">
                    <Users size={40} />
                  </div>
                </div>
                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <div className="team-experience">
                    <TrendingUp size={16} />
                    <span>{member.experience}</span>
                  </div>
                  <p className="team-bio">{member.bio}</p>
                  <button className="btn-connect">
                    <span>Connect with {member.name.split(' ')[0]}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="full-team">
            <div className="team-image">
              <img src={teamPhoto} alt="SkyShield Edu Team" />
            </div>
            <div className="team-description">
              <h3>Our Diverse Team</h3>
              <p>
                We bring together experts from aviation, cybersecurity, education, 
                and technology to create the most comprehensive training platform.
              </p>
              <div className="team-stats">
                <div className="stat">
                  <div className="stat-value">40+</div>
                  <div className="stat-label">Team Members</div>
                </div>
                <div className="stat">
                  <div className="stat-value">15+</div>
                  <div className="stat-label">Nationalities</div>
                </div>
                <div className="stat">
                  <div className="stat-value">100+</div>
                  <div className="stat-label">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="awards-section">
        <div className="container">
          <h2 className="section-title">Awards & <span className="highlight">Recognition</span></h2>
          <div className="awards-grid">
            <div className="award-card">
              <div className="award-icon"><Star size={32} /></div>
              <h4>Aviation Innovation Award</h4>
              <p>2023 - International Aviation Association</p>
            </div>
            <div className="award-card">
              <div className="award-icon"><Award size={32} /></div>
              <h4>Cybersecurity Excellence</h4>
              <p>2022 - Global Security Council</p>
            </div>
            <div className="award-card">
              <div className="award-icon"><BookOpen size={32} /></div>
              <h4>Best Training Platform</h4>
              <p>2023 - Education Technology Awards</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Join Our Mission</h2>
            <p>
              Whether you're looking to enhance your team's skills or partner with us, 
              we'd love to hear from you.
            </p>
            <div className="cta-actions">
              <button className="btn-primary">
                <Users size={20} />
                <span>Join Our Team</span>
              </button>
              <button className="btn-secondary">
                <span>Partner With Us</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}