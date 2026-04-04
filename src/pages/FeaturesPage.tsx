// src/pages/FeaturesPage.tsx

import { 
  Cpu, Shield, Zap, Cloud, Lock, BarChart3, 
  Users, Target, Globe, Database, RefreshCw, Bell
} from 'lucide-react';
import '@/assets/css/features.css';

// Import images
import featuresHero from '@/assets/images/features-hero.jpg';
import dashboardPreview from '@/assets/images/dashboard-preview.jpg';

const featuresData = [
  {
    category: "Simulation Engine",
    features: [
      {
        icon: <Cpu size={24} />,
        title: "High-Fidelity Simulation",
        description: "Real-time, physics-based simulation of aviation cyber threats",
        details: ["Real-time rendering", "Multiple threat vectors", "Dynamic scenario generation"]
      },
      {
        icon: <Zap size={24} />,
        title: "Adaptive Difficulty",
        description: "AI-powered difficulty adjustment based on trainee performance",
        details: ["Machine learning algorithms", "Personalized challenges", "Progressive learning"]
      },
      {
        icon: <Target size={24} />,
        title: "Scenario Library",
        description: "Extensive library of aviation-specific cyber threat scenarios",
        details: ["10+ pre-built scenarios", "Custom scenario creation", "Regular updates"]
      }
    ]
  },
  {
    category: "Security Features",
    features: [
      {
        icon: <Shield size={24} />,
        title: "Threat Detection",
        description: "Advanced anomaly detection for real-time threat identification",
        details: ["Pattern recognition", "Behavioral analysis", "Real-time alerts"]
      },
      {
        icon: <Lock size={24} />,
        title: "Data Encryption",
        description: "Military-grade encryption for all training data and communications",
        details: ["End-to-end encryption", "Secure data storage", "GDPR compliant"]
      },
      {
        icon: <Cloud size={24} />,
        title: "Cloud Infrastructure",
        description: "Secure, scalable cloud infrastructure for global accessibility",
        details: ["99.9% uptime", "Global CDN", "Auto-scaling"]
      }
    ]
  },
  {
    category: "Analytics & Reporting",
    features: [
      {
        icon: <BarChart3 size={24} />,
        title: "Performance Analytics",
        description: "Comprehensive analytics dashboard for skill assessment",
        details: ["Real-time metrics", "Skill gap analysis", "Progress tracking"]
      },
      {
        icon: <Users size={24} />,
        title: "Team Management",
        description: "Tools for training supervisors to manage and monitor teams",
        details: ["Role-based access", "Group performance", "Team reporting"]
      },
      {
        icon: <Bell size={24} />,
        title: "Real-time Alerts",
        description: "Instant notifications for critical incidents and milestones",
        details: ["Custom alerts", "Multiple channels", "Priority levels"]
      }
    ]
  }
];

const platformStats = [
  { value: "99.9%", label: "Platform Uptime" },
  { value: "<100ms", label: "Response Time" },
  { value: "256-bit", label: "Encryption" },
  { value: "ISO 27001", label: "Certified" }
];

export default function FeaturesPage() {
  return (
    <div className="features-page">
      {/* Hero Section */}
      <section className="features-hero">
        <div className="hero-background" style={{ backgroundImage: `url(${featuresHero})` }}></div>
        <div className="hero-overlay">
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge">
                <Shield size={20} />
                <span>Platform Features</span>
              </div>
              <h1 className="hero-title">
                Enterprise-Grade <span className="highlight">Security Platform</span>
              </h1>
              <p className="hero-description">
                Discover the powerful features that make SkyShield Edu the leading 
                cybersecurity training platform for aviation professionals worldwide.
              </p>
              <div className="platform-stats">
                {platformStats.map((stat, index) => (
                  <div key={index} className="platform-stat">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-grid-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Core <span className="highlight">Platform Features</span></h2>
            <p className="section-subtitle">
              Everything you need for effective aviation cybersecurity training
            </p>
          </div>

          <div className="features-container">
            {featuresData.map((category, categoryIndex) => (
              <div key={categoryIndex} className="feature-category">
                <h3 className="category-title">{category.category}</h3>
                <div className="category-features">
                  {category.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="feature-card">
                      <div className="feature-icon">{feature.icon}</div>
                      <h4 className="feature-title">{feature.title}</h4>
                      <p className="feature-description">{feature.description}</p>
                      <div className="feature-details">
                        {feature.details.map((detail, detailIndex) => (
                          <span key={detailIndex} className="detail-tag">{detail}</span>
                        ))}
                      </div>
                      <div className="feature-hover">
                        <button className="btn-learn-more">Learn More →</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="dashboard-preview">
        <div className="container">
          <div className="preview-content">
            <div className="preview-text">
              <h2>Intuitive <span className="highlight">Dashboard</span></h2>
              <p>
                Monitor performance, track progress, and manage training programs 
                through our comprehensive dashboard interface.
              </p>
              <ul className="preview-features">
                <li><span>✓</span> Real-time analytics</li>
                <li><span>✓</span> Custom reporting</li>
                <li><span>✓</span> Team management</li>
                <li><span>✓</span> Progress tracking</li>
              </ul>
              <button className="btn-primary">
                <BarChart3 size={20} />
                <span>Explore Dashboard</span>
              </button>
            </div>
            <div className="preview-image">
              <div className="image-wrapper">
                <img src={dashboardPreview} alt="Dashboard Preview" />
                <div className="image-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="integrations-section">
        <div className="container">
          <h2>Seamless <span className="highlight">Integrations</span></h2>
          <p className="integrations-subtitle">
            Connect with your existing aviation systems and security tools
          </p>
          <div className="integrations-grid">
            <div className="integration-card">
              <Globe size={32} />
              <h4>Flight Systems</h4>
              <p>Integration with major flight management systems</p>
            </div>
            <div className="integration-card">
              <Database size={32} />
              <h4>Security Tools</h4>
              <p>Compatible with industry-standard security solutions</p>
            </div>
            <div className="integration-card">
              <RefreshCw size={32} />
              <h4>API Access</h4>
              <p>RESTful APIs for custom integrations and automation</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}