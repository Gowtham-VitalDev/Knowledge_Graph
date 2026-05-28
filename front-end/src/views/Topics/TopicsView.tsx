import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { fetchCategories, type ApiCategoryFull } from "../../api/categories";
import { usePageMeta } from "../../hooks/usePageMeta";
import "./TopicsView.css";

const TopicsView = () => {
  usePageMeta("Topics", "Browse all article categories on NeonScroll.");
  const [categories, setCategories] = useState<ApiCategoryFull[]>([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="topics-view">
      <Navbar />
      <main className="topics-view__main">
        <header className="topics-view__header">
          <p className="topics-view__label">Browse</p>
          <h1 className="topics-view__title">All Topics</h1>
          <p className="topics-view__sub">
            Explore articles by category — click any topic to filter the feed.
          </p>
        </header>

        {loading ? (
          <p className="topics-view__empty">Loading…</p>
        ) : (
          <ul className="topics-grid">
            {categories.map((cat) => (
              <li key={cat._id}>
                <Link
                  to={`/?category=${cat.slug}`}
                  className="topic-card"
                  style={{ "--card-color": cat.colorCode } as React.CSSProperties}
                >
                  {cat.icon && (
                    <span className="topic-card__icon" aria-hidden="true">
                      {cat.icon}
                    </span>
                  )}
                  <h2 className="topic-card__name">{cat.name}</h2>
                  {cat.description && (
                    <p className="topic-card__desc">{cat.description}</p>
                  )}
                  <span className="topic-card__count">
                    {cat.articleCount ?? 0} articles
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TopicsView;
