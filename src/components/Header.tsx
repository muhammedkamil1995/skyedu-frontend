// src/components/Header.tsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "@/assets/css/header.css";

// Import the logo image (adjust filename if needed, e.g., logo.png in src/assets/images/)
import logoIcon from "@/assets/images/logo.png";

type NavLink = { href: string; label: string };

export default function Header() {
  const [open, setOpen] = useState(false);

  // ✅ FIXED: theme initialization without setState inside effect
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) return saved;

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });

  const location = useLocation();

  const links: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/simulations", label: "Simulations" },
    { href: "/features", label: "Features" }, // ✅ FIXED: Added leading "/" for absolute path
    { href: "/usecases", label: "Use Cases" }, // ✅ FIXED: Added leading "/" for absolute path
    { href: "/about", label: "About" }, // ✅ FIXED: Added leading "/" for absolute path
  ];

  // ✅ Update DOM + localStorage when theme changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleMobile = () => setOpen((prev) => !prev);

  // Smooth scroll for anchor links
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location]);

  const NavItem = ({ href, label }: NavLink) => {
    const isActive =
      location.pathname === href ||
      (href.startsWith("#") && location.hash === href);

    const handleClick = () => setOpen(false);

    return href.startsWith("#") ? (
      <a
        href={href}
        className={`nav__link ${isActive ? "nav__link--active" : ""}`}
        onClick={handleClick}
      >
        {label}
      </a>
    ) : (
      <Link
        to={href}
        className={`nav__link ${isActive ? "nav__link--active" : ""}`}
        onClick={handleClick}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="header" role="banner">
      <div className="header__container">
        <Link to="/" className="logo" aria-label="SkyShield Edu Home">
          <img src={logoIcon} alt="SkyShield Edu Logo" className="logo__icon" />
          <span className="logo__text">
            SkyShield <span>Edu</span>
          </span>
        </Link>

        <nav className="nav" aria-label="Primary navigation">
          {links.map((link) => (
            <NavItem key={link.href} {...link} />
          ))}
        </nav>

        <div className="actions">
          <Link to="/login" className="btn btn--secondary">
            Sign In
          </Link>
          <Link to="/signup" className="btn btn--primary">
            Start Training
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } mode`}
          >
            <svg
              className="theme-toggle__icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="5"
                className="sun"
                stroke="currentColor"
                strokeWidth="2"
              />
              <g className="sun-rays">
                {[...Array(8)].map((_, i) => (
                  <line
                    key={i}
                    x1="12"
                    y1="1"
                    x2="12"
                    y2="4"
                    transform={`rotate(${i * 45} 12 12)`}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                ))}
              </g>
              <path
                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                className="moon"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        <button
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={toggleMobile}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className={`mobile-menu ${open ? "mobile-menu--open" : ""}`}>
        <nav className="mobile-nav">
          {links.map((link) => (
            <NavItem key={link.href} {...link} />
          ))}

          <div className="mobile-actions">
            <Link
              to="/login"
              className="btn btn--secondary"
              onClick={toggleMobile}
            >
              Sign In
            </Link>
            <Link
              to="/simulations"
              className="btn btn--primary"
              onClick={toggleMobile}
            >
              Start Training
            </Link>

            {/* Mobile Theme Toggle */}
            <button onClick={toggleTheme} className="mobile-theme-toggle">
              {theme === "light" ? "Dark Mode" : "Light Mode"}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                {theme === "light" ? (
                  <path
                    d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                    fill="currentColor"
                  />
                ) : (
                  <>
                    <circle
                      cx="12"
                      cy="12"
                      r="5"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    {[...Array(8)].map((_, i) => (
                      <line
                        key={i}
                        x1="12"
                        y1="1"
                        x2="12"
                        y2="4"
                        transform={`rotate(${i * 45} 12 12)`}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    ))}
                  </>
                )}
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}