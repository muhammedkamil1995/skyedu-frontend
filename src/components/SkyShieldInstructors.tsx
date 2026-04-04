// Import CSS
import "@/assets/css/SkyShieldInstructors.css";

// Import images from assets
import hernandezImg from "@/assets/images/instructor-hernandez.png";
import chenImg from "@/assets/images/instructor-chen.png";
import sharmaImg from "@/assets/images/instructor-sharma.png";

export default function SkyShieldInstructors() {
  const instructors = [
    {
      name: "Capt. R. Hernandez",
      title: "Cyber Warfare Specialist",
      avatarUrl: hernandezImg,
      experience: "15+ Yrs Field Exp.",
      quote: "His lessons on jamming protocols are essential for high-threat environments and air traffic control safety.",
      from: "FAA",
      to: "Lockheed Martin",
      bioLink: "#"
    },
    {
      name: "Dr. L. Chen",
      title: "Aviation Security Analyst",
      avatarUrl: chenImg,
      experience: "Authored 4 Papers",
      quote: "Dr. Chen's deep dives into GPS spoofing techniques provided critical, actionable insights.",
      from: "Boeing",
      to: "MITRE Corp.",
      bioLink: "#"
    },
    {
      name: "P. Sharma",
      title: "ATC Operations Veteran",
      avatarUrl: sharmaImg,
      experience: "12,000+ Flight Hrs",
      quote: "The best part was learning real-time console breach response directly from a veteran controller.",
      from: "USAF",
      to: "Major Regional ATC",
      bioLink: "#"
    }
  ];

  return (
    <section className="instructors-section">
      <div className="container">
        <div className="section-header">
          <p className="tag">INSTRUCTOR PROFILES</p>
          <h2 className="section-title">Meet Your Mission Control</h2>
        </div>

        <div className="instructor-card-grid">
          {instructors.map((instructor, index) => (
            <div key={index} className="instructor-card card-3d">
              <div className="card-header">
                <img
                  src={instructor.avatarUrl}
                  alt={instructor.name}
                  className="instructor-avatar"
                />
                <div className="experience-badge">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-zap text-green-theme"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                  <span className="badge-text">{instructor.experience}</span>
                </div>
              </div>

              <h3 className="instructor-name">{instructor.name}</h3>
              <p className="instructor-title">{instructor.title}</p>
              <p className="instructor-quote">"{instructor.quote}"</p>

              <div className="company-transfer">
                <span className="company-logo">{instructor.from}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right text-aviation-blue-theme"
                >
                  <path d="M5 12h14"/>
                  <path d="m12 5 7 7-7 7"/>
                </svg>
                <span className="company-logo">{instructor.to}</span>
              </div>

              <a href={instructor.bioLink} className="read-bio-link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect width="4" height="12" x="2" y="9"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
                View Full Bio
              </a>
            </div>
          ))}
        </div>

        <div className="cta-dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>

        <div className="bottom-cta">
          <button className="connect-btn">Connect With Instructors Now &rarr;</button>
        </div>
      </div>
    </section>
  );
}
