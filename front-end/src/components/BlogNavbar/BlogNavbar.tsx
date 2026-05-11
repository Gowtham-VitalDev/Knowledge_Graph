import { Link } from "react-router-dom";
import "./BlogNavbar.css";

interface BlogNavbarProps {
  breadcrumb: string[];
}

const BlogNavbar = ({ breadcrumb }: BlogNavbarProps) => {
  return (
    <header className="blog-navbar">
      <div className="blog-navbar__inner">
        <Link to="/" className="blog-navbar__brand">
          <span className="blog-navbar__brand-icon">K</span>
          <span>KnowledgeGraph</span>
        </Link>

        <nav className="blog-navbar__breadcrumb" aria-label="Breadcrumb">
          {breadcrumb.map((item, index) => {
            const isLast = index === breadcrumb.length - 1;
            return (
              <span key={item} style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
                <span
                  className={`blog-navbar__breadcrumb-item ${
                    isLast ? "blog-navbar__breadcrumb-item--active" : ""
                  }`}
                >
                  {item}
                </span>
                {!isLast && (
                  <span className="blog-navbar__breadcrumb-sep">›</span>
                )}
              </span>
            );
          })}
        </nav>

        <div className="blog-navbar__actions">
          <button type="button" className="blog-navbar__action" aria-label="Share">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 4v12m0-12 4 4m-4-4-4 4M5 16v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Share
          </button>
          <button
            type="button"
            className="blog-navbar__action"
            aria-label="Bookmark"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 4h12v17l-6-4-6 4V4Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            Bookmark
          </button>
        </div>
      </div>
    </header>
  );
};

export default BlogNavbar;
