import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import "./BlogNavbar.css";

interface BlogNavbarProps {
  breadcrumb: string[];
}

const BlogNavbar = ({ breadcrumb }: BlogNavbarProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="blog-navbar">
      <div className="blog-navbar__inner">
        <Link to="/" className="blog-navbar__brand">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          NeonScroll
        </Link>

        <nav className="blog-navbar__breadcrumb" aria-label="Breadcrumb">
          {breadcrumb.map((item, index) => {
            const isLast = index === breadcrumb.length - 1;
            return (
              <span key={item} style={{ display: "inline-flex", gap: 6, alignItems: "center", minWidth: 0 }}>
                <span className={`blog-navbar__breadcrumb-item${isLast ? " blog-navbar__breadcrumb-item--active" : ""}`}>
                  {item}
                </span>
                {!isLast && <span className="blog-navbar__breadcrumb-sep">›</span>}
              </span>
            );
          })}
        </nav>

        <div className="blog-navbar__actions">
          <button
            type="button"
            className="blog-navbar__action"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
          <button type="button" className="blog-navbar__action" aria-label="Share">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98"/>
            </svg>
            Share
          </button>
          <button type="button" className="blog-navbar__action" aria-label="Bookmark">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
              <path d="M6 4h12v17l-6-4-6 4V4Z"/>
            </svg>
            Bookmark
          </button>
        </div>
      </div>
    </header>
  );
};

export default BlogNavbar;
