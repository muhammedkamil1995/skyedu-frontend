import React from "react";
import { ArrowRight, TrendingUp, Linkedin, Sparkles, Star, Users, Rocket } from "lucide-react";
import "@/assets/css/SuccessStoriesSection.css";

// Avatar imports (use real assets later)
import avatarShaumaya from "@/assets/images/shaumaya-qha.png";
import avatarSubhangi from "@/assets/images/subhangi-duhan.png";
import avatarParas from "@/assets/images/paras-yadav.png";

// -------------------- COMPANY LOGOS (SVG INLINE) --------------------
const Logos = {
  AirFleetOne: (
    <svg width="90" height="30" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="28" fill="#94a3b8" fontSize="22" fontWeight="700" fontFamily="system-ui">
        AirFleet
      </text>
      <circle cx="105" cy="15" r="4" fill="#ef4444" opacity="0.8" />
    </svg>
  ),
  RegionalTower: (
    <svg width="90" height="30" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="28" fill="#94a3b8" fontSize="22" fontWeight="700" fontFamily="system-ui">
        Tower
      </text>
      <path d="M20 10 L25 20 L15 20 Z" fill="#8b5cf6" opacity="0.7" />
    </svg>
  ),
  CyberSecConsult: (
    <svg width="140" height="30" viewBox="0 0 180 40" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="28" fill="#94a3b8" fontSize="22" fontWeight="700" fontFamily="system-ui">
        CyberSec Co.
      </text>
      <rect x="130" y="10" width="6" height="20" rx="3" fill="#10b981" opacity="0.7" />
    </svg>
  ),
  GlobalAirTransit: (
    <svg width="150" height="30" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="28" fill="#4cc9f0" fontSize="22" fontWeight="800" fontFamily="system-ui">
        Global Air
      </text>
      <path d="M160 15 Q170 10 180 15 Q170 20 160 15" fill="#3b82f6" opacity="0.9" />
    </svg>
  ),
  LockheedMartin: (
    <svg width="160" height="30" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="28" fill="#08d9d6" fontSize="22" fontWeight="800" fontFamily="system-ui">
        Lockheed
      </text>
      <polygon points="170,15 175,20 170,25 165,20" fill="#0ea5e9" opacity="0.9" />
    </svg>
  ),
  RaytheonTech: (
    <svg width="160" height="30" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="28" fill="#e94560" fontSize="22" fontWeight="800" fontFamily="system-ui">
        Raytheon
      </text>
      <circle cx="175" cy="15" r="6" fill="#ef4444" opacity="0.8" />
    </svg>
  ),
};

// -------------------- TYPES --------------------
interface SuccessStory {
  id: number;
  name: string;
  role: string;
  avatar: string;
  hike: number;
  testimonial: string;
  prevCompany: keyof typeof Logos;
  newCompany: keyof typeof Logos;
  starRating: number;
  monthsToPlacement: number;
}

// -------------------- STATS DATA --------------------
const successStats = [
  { icon: <Users size={24} />, value: "2,500+", label: "Professionals Trained" },
  { icon: <Rocket size={24} />, value: "94%", label: "Placement Rate" },
  { icon: <Star size={24} />, value: "4.9/5", label: "Satisfaction Rating" },
  { icon: <TrendingUp size={24} />, value: "85%", label: "Average Salary Hike" },
];

// -------------------- SUCCESS STORY DATA --------------------
const successStories: SuccessStory[] = [
  {
    id: 1,
    name: "Aisha Khan",
    role: "Pilot (Captain)",
    avatar: avatarShaumaya,
    hike: 120,
    testimonial: "The real-time cyber attack simulations dramatically improved my threat recognition. The personalized mentorship was crucial for my transition to a major carrier.",
    prevCompany: "AirFleetOne",
    newCompany: "GlobalAirTransit",
    starRating: 5,
    monthsToPlacement: 3,
  },
  {
    id: 2,
    name: "David Chen",
    role: "ATC Officer",
    avatar: avatarSubhangi,
    hike: 90,
    testimonial: "My deep focus on GPS-spoofing defense helped me integrate into the R&D security team at Lockheed Martin. The practical exercises were invaluable!",
    prevCompany: "RegionalTower",
    newCompany: "LockheedMartin",
    starRating: 5,
    monthsToPlacement: 4,
  },
  {
    id: 3,
    name: "Jasmine Kaur",
    role: "Security Analyst",
    avatar: avatarParas,
    hike: 80,
    testimonial: "The daily challenge problems built my portfolio and helped me secure a lead cyber defense role. The community support was amazing!",
    prevCompany: "CyberSecConsult",
    newCompany: "RaytheonTech",
    starRating: 4,
    monthsToPlacement: 2,
  },
];

// -------------------- SUCCESS STORY CARD COMPONENT --------------------
const SuccessStoryCard: React.FC<{ story: SuccessStory }> = ({ story }) => {
  return (
    <div className="success-story-card">
      <div className="story-card__inner">
        {/* Header with avatar and hike badge */}
        <div className="story-card__header">
          <div className="story-avatar__wrapper">
            <img src={story.avatar} alt={story.name} className="story-avatar" />
            <div className="avatar-sparkle">
              <Sparkles size={12} />
            </div>
          </div>
          
          <div className="hike-badge">
            <TrendingUp size={14} />
            <span>+{story.hike}% Hike</span>
            <div className="badge-glow"></div>
          </div>
        </div>

        {/* Story Content */}
        <div className="story-content">
          <h3 className="story-name">{story.name}</h3>
          <p className="story-role">{story.role}</p>
          
          {/* Star Rating */}
          <div className="story-rating">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                fill={i < story.starRating ? "#fbbf24" : "none"}
                stroke={i < story.starRating ? "#fbbf24" : "#475569"}
                className="star-icon"
              />
            ))}
            <span className="rating-text">{story.monthsToPlacement} months to placement</span>
          </div>

          {/* Testimonial */}
          <div className="story-testimonial">
            <div className="quote-mark">"</div>
            <p>{story.testimonial}</p>
          </div>

          {/* Company Transition */}
          <div className="company-transition">
            <div className="company-wrapper old-company">
              <div className="company-logo">{Logos[story.prevCompany]}</div>
              <span className="company-label">Previous</span>
            </div>
            
            <div className="transition-arrow">
              <ArrowRight size={20} />
              <div className="arrow-trail"></div>
            </div>
            
            <div className="company-wrapper new-company">
              <div className="company-logo">{Logos[story.newCompany]}</div>
              <span className="company-label">Current</span>
            </div>
          </div>

          {/* Action Button */}
          <a href={`/alumni/${story.id}`} className="story-action">
            <Linkedin size={16} />
            <span>Read Full Journey</span>
            <div className="action-arrow">
              <ArrowRight size={14} />
            </div>
          </a>
        </div>
      </div>
      
      {/* Card Decorations */}
      <div className="card-glow"></div>
      <div className="card-corner-decoration"></div>
    </div>
  );
};

// -------------------- MAIN COMPONENT --------------------
export default function SuccessStoriesSection() {
  return (
    <section className="success-stories-section">
      {/* Background Decorations */}
      <div className="section-bg-decorations">
        <div className="floating-element el1">✨</div>
        <div className="floating-element el2">🎯</div>
        <div className="floating-element el3">🚀</div>
        <div className="floating-element el4">⭐</div>
        <div className="bg-gradient-spot spot1"></div>
        <div className="bg-gradient-spot spot2"></div>
      </div>

      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={14} />
            <span>Success Stories</span>
          </div>
          <h2 className="section-title">
            Our Stars Are Soaring <span className="highlight">Higher</span>
          </h2>
          <p className="section-subtitle">
            Join 2,500+ aviation professionals who transformed their careers with immersive cyber-security training
          </p>
        </div>

        {/* Stats Bar */}
        <div className="success-stats">
          {successStats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Success Stories Grid */}
        <div className="stories-grid">
          {successStories.map((story) => (
            <SuccessStoryCard key={story.id} story={story} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <div className="cta-content">
            <h3 className="cta-title">Ready to Write Your Success Story?</h3>
            <p className="cta-subtitle">Join our next cohort and start your transformation today</p>
          </div>
          <button className="cta-button">
            <span>Start Your Journey</span>
            <ArrowRight size={20} />
            <div className="button-glow"></div>
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="pagination">
          <div className="pagination-dot active"></div>
          <div className="pagination-dot"></div>
          <div className="pagination-dot"></div>
          <div className="pagination-dot"></div>
        </div>
      </div>
    </section>
  );
}