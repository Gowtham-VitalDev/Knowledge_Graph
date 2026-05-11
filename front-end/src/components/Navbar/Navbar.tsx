import { Link } from "react-router-dom";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Feed", href: "/", active: true },
  { label: "AI & ML", href: "#" },
  { label: "Systems", href: "#" },
  { label: "Web", href: "#" },
  { label: "Data", href: "#" },
];

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">K</span>
          <span>KnowledgeGraph</span>
        </Link>

        <nav className="navbar__links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`navbar__link ${
                link.active ? "navbar__link--active" : ""
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="navbar__right">
          <button
            type="button"
            className="navbar__icon-btn"
            aria-label="Search"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="m20 20-3-3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button type="button" className="navbar__signin">
            Sign in
          </button>
          <button type="button" className="navbar__cta">
            Get started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
