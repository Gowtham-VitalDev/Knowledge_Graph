import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          NeonScroll
        </Link>

        <ul className="navbar__links">
          <li><Link to="/">Feed</Link></li>
          <li><a href="#">Topics</a></li>
          <li><a href="#">Bookmarks</a></li>
        </ul>

        <div className="navbar__actions">
          <button type="button" className="navbar__icon-btn" aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
          <div className="navbar__avatar" aria-hidden="true">
            <img src="https://i.pravatar.cc/64?u=neonscroll-user" alt="" />
          </div>
          <button type="button" className="navbar__cta">Subscribe</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
