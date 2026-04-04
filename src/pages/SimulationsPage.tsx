// src/pages/SimulationsPage.tsx

import { PlayCircle, Shield, Zap, Target, BarChart3, Users, Clock, Award } from 'lucide-react';
import '@/assets/css/SimulationsPage.css';

// Import images
import simulationsHero from '@/assets/images/simulations-hero.jpg';
import scenario1 from '@/assets/images/scenario1.jpg';
import scenario2 from '@/assets/images/scenario2.jpg';
import scenario3 from '@/assets/images/scenario3.jpg';

const simulationsData = [
  {
    id: 1,
    title: "GPS Spoofing Attack",
    description: "Defend against manipulated GPS signals threatening flight navigation systems.",
    difficulty: "Advanced",
    duration: "45 min",
    participants: "1-5",
    category: "Navigation",
    icon: <Target size={24} />,
    image: scenario1,
    features: ["Real-time signal analysis", "Multi-vector attack simulation", "Emergency protocols"]
  },
  {
    id: 2,
    title: "ATC Communication Breach",
    description: "Protect air traffic control systems from unauthorized access and data tampering.",
    difficulty: "Intermediate",
    duration: "30 min",
    participants: "2-8",
    category: "Communication",
    icon: <Users size={24} />,
    image: scenario2,
    features: ["Encrypted comms training", "Spoof detection", "Backup systems activation"]
  },
  {
    id: 3,
    title: "Flight System Ransomware",
    description: "Respond to ransomware attacks targeting critical flight management systems.",
    difficulty: "Expert",
    duration: "60 min",
    participants: "3-10",
    category: "Systems",
    icon: <Shield size={24} />,
    image: scenario3,
    features: ["Incident response", "System isolation", "Data recovery protocols"]
  }
];

const simulationStats = [
  { icon: <Clock size={20} />, value: "5000+", label: "Training Hours" },
  { icon: <Users size={20} />, value: "2,500+", label: "Trained Professionals" },
  { icon: <BarChart3 size={20} />, value: "94%", label: "Success Rate" },
  { icon: <Award size={20} />, value: "10+", label: "Certifications" }
];

export default function SimulationsPage() {
  return (
    <div className="simulations-page">
      {/* Hero Section */}
      <section className="simulations-hero">
        <div className="hero-background" style={{ backgroundImage: `url(${simulationsHero})` }}></div>
        <div className="hero-overlay">
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge">
                <PlayCircle size={20} />
                <span>Interactive Training</span>
              </div>
              <h1 className="hero-title">
                Immersive Cybersecurity <span className="highlight">Simulations</span>
              </h1>
              <p className="hero-description">
                Experience real-world aviation cyber threats in our controlled, 
                high-fidelity simulation environment. Train like you fight.
              </p>
              <div className="hero-cta">
                <button className="btn-primary">
                  <PlayCircle size={20} />
                  <span>Start Free Demo</span>
                </button>
                <button className="btn-secondary">
                  <span>View All Scenarios</span>
                  <Zap size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="simulation-stats">
        <div className="container">
          <div className="stats-grid">
            {simulationStats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Simulations */}
      <section className="featured-simulations">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured <span className="highlight">Training Scenarios</span></h2>
            <p className="section-subtitle">
              Real-world cybersecurity challenges designed for aviation professionals
            </p>
          </div>

          <div className="simulations-grid">
            {simulationsData.map((simulation) => (
              <div key={simulation.id} className="simulation-card">
                <div className="card-image" style={{ backgroundImage: `url(${simulation.image})` }}>
                  <div className="card-badge">
                    {simulation.icon}
                    <span>{simulation.category}</span>
                  </div>
                </div>
                
                <div className="card-content">
                  <div className="card-meta">
                    <span className="difficulty-badge">{simulation.difficulty}</span>
                    <span className="duration">{simulation.duration}</span>
                    <span className="participants">{simulation.participants} participants</span>
                  </div>
                  
                  <h3 className="card-title">{simulation.title}</h3>
                  <p className="card-description">{simulation.description}</p>
                  
                  <div className="card-features">
                    <h4>Key Features:</h4>
                    <ul>
                      {simulation.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="card-actions">
                    <button className="btn-start">
                      <PlayCircle size={18} />
                      <span>Launch Simulation</span>
                    </button>
                    <button className="btn-details">
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="simulation-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Train in Realistic Scenarios?</h2>
            <p>
              Join thousands of aviation professionals who have enhanced their 
              cybersecurity skills through our immersive simulation platform.
            </p>
            <button className="btn-primary">
              <PlayCircle size={20} />
              <span>Start Free Training</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}