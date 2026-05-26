import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useUserAuth } from "../../contexts/UserAuthContext";
import { GoogleLogin } from "@react-oauth/google";
import SearchModal from "../SearchModal/SearchModal";
import "./Navbar.css";

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, loading, loginWithGoogle } = useUserAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
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
            <li><Link to="/topics">Topics</Link></li>
            <li><Link to="/bookmarks">Bookmarks</Link></li>
          </ul>

          <div className="navbar__actions">
            <button
              type="button"
              className="navbar__icon-btn"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
            <button
              type="button"
              className="navbar__icon-btn"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>

            {!loading && (
              user ? (
                <button
                  type="button"
                  className="navbar__avatar navbar__avatar--btn"
                  title={`${user.fullName} — view profile`}
                  onClick={() => navigate("/profile")}
                >
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.fullName} referrerPolicy="no-referrer" />
                  ) : (
                    <span className="navbar__avatar-initials">
                      {user.fullName.charAt(0).toUpperCase()}
                    </span>
                  )}
                </button>
              ) : (
                <div className="navbar__google-btn">
                  <GoogleLogin
                    onSuccess={(cred) => {
                      if (cred.credential) loginWithGoogle(cred.credential);
                    }}
                    onError={() => console.error("Google Sign-In failed")}
                    size="medium"
                    shape="pill"
                    text="signin"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </nav>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navbar;
