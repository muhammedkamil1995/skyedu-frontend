import { Link } from "react-router-dom";
import { useState } from "react";
import "@/assets/css/footer.css";

// Lucide Icons
import {
  Twitter,
  Linkedin,
  Github,
  Youtube,
  MessageCircle,
  ArrowUp,
  Lock,
  Star,
  ShieldCheck,
  Plane,
  Cloud,
  Radar,
  Satellite
} from "lucide-react";

export default function Footer() {
  const [year] = useState(new Date().getFullYear());
  const [email, setEmail] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
    alert("Thank you for subscribing to our newsletter!");
  };

  // Updated Footer Links with correct routes
  const footerLinks = {
    product: [
      { name: "Simulations", href: "/simulations" },
      { name: "Features", href: "/features" },
      { name: "Use Cases", href: "/usecases" },
      { name: "Pricing", href: "/pricing" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR", href: "/gdpr" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Documentation", href: "/docs" },
      { name: "Community", href: "/community" },
      { name: "Status", href: "/status" },
    ],
  };

  // Social Media Links
  const socialLinks = [
    { 
      name: "Twitter", 
      icon: <Twitter size={20} />, 
      href: "https://twitter.com/skyshieldedu",
      color: "hover:bg-[#1DA1F2]"
    },
    { 
      name: "LinkedIn", 
      icon: <Linkedin size={20} />, 
      href: "https://linkedin.com/company/skyshieldedu",
      color: "hover:bg-[#0A66C2]"
    },
    { 
      name: "GitHub", 
      icon: <Github size={20} />, 
      href: "https://github.com/skyshieldedu",
      color: "hover:bg-[#333] dark:hover:bg-[#f0f6fc] dark:hover:text-[#333]"
    },
    { 
      name: "YouTube", 
      icon: <Youtube size={20} />, 
      href: "https://youtube.com/c/skyshieldedu",
      color: "hover:bg-[#FF0000]"
    },
    { 
      name: "Discord", 
      icon: <MessageCircle size={20} />, 
      href: "https://discord.gg/skyshieldedu",
      color: "hover:bg-[#5865F2]"
    },
  ];

  // Additional Links
  const extraLinks = [
    { name: "Accessibility", href: "/accessibility" },
    { name: "Sitemap", href: "/sitemap" },
    { name: "Partners", href: "/partners" },
    { name: "Press Kit", href: "/press" },
    { name: "Investors", href: "/investors" },
  ];

  return (
    <footer className="footer" role="contentinfo">
      {/* 3D Waves Background */}
      <div className="footer-waves">
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="wave wave-3"></div>
      </div>

      {/* Back to Top Button */}
      <button 
        className="back-to-top" 
        onClick={scrollToTop} 
        aria-label="Scroll to top"
      >
        <ArrowUp size={26} />
      </button>

      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-icon">S</div>
              <div className="footer-logo-text">
                SkyShield <span>Edu</span>
              </div>
            </Link>

            <p className="footer-tagline">
              Empowering aviation professionals through immersive,
              realistic training simulations that prepare you for
              real-world challenges.
            </p>

            {/* Social Icons */}
            <div className="footer-social">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`social-link ${social.color}`}
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="social-icon">{social.icon}</span>
                  <span className="social-name">{social.name}</span>
                  <span className="social-hover-effect" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="footer-links-grid">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div className="footer-column" key={title}>
                <h3 className="footer-column-title">
                  {title.charAt(0).toUpperCase() + title.slice(1)}
                </h3>
                <ul className="footer-column-links">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.href} 
                        className="footer-link"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      >
                        <span className="footer-link-text">{link.name}</span>
                        <span className="footer-link-arrow">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="footer-newsletter">
          <div className="newsletter-content">
            <h3 className="newsletter-title">Stay Updated</h3>
            <p className="newsletter-description">
              Get the latest simulation updates, training tips,
              and aviation insights directly to your inbox.
            </p>
          </div>

          <form 
            className="newsletter-form" 
            onSubmit={handleNewsletterSubmit}
          >
            <div className="newsletter-input-group">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-button">
                <span className="flex items-center justify-center gap-2">
                  Subscribe
                </span>
                <span className="btn-icon">→</span>
              </button>
            </div>
            <p className="newsletter-note">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </div>

        {/* Footer Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            © {year} SkyShield Edu. All rights reserved.
            <span className="copyright-divider">•</span>
            <span className="copyright-region">
              Made with ❤️ for aviation security worldwide
            </span>
          </div>

          <div className="footer-extra">
            <div className="footer-extra-links">
              {extraLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  className="extra-link"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="footer-badges">
              <span className="badge">
                <Lock size={16} /> SSL Secure
              </span>
              <span className="badge">
                <ShieldCheck size={16} /> FAA Compliant
              </span>
              <span className="badge">
                <Star size={16} /> 4.9/5 Rating
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating 3D Elements */}
      <div className="footer-floating-elements">
        <div className="floating-plane"><Plane size={26} /></div>
        <div className="floating-cloud"><Cloud size={26} /></div>
        <div className="floating-radar"><Radar size={26} /></div>
        <div className="floating-satellite"><Satellite size={26} /></div>
      </div>
    </footer>
  );
}