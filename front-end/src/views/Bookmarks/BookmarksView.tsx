import { useEffect, useState } from "react";
import { usePageMeta } from "../../hooks/usePageMeta";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useUserAuth } from "../../contexts/UserAuthContext";
import client from "../../api/client";
import { adaptArticle } from "../../api/adapters";
import type { Article } from "../../types/article";
import "./BookmarksView.css";

const BookmarksView = () => {
  usePageMeta("Bookmarks", "Your saved articles on NeonScroll.");
  const { user, loading: authLoading } = useUserAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    client.get("/api/user/bookmarks", { withCredentials: true })
      .then((res) => {
        const adapted = (res.data.bookmarks as any[]).map(adaptArticle);
        setArticles(adapted);
      })
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="bookmarks-view">
      <Navbar />
      <main className="bookmarks-view__main">
        <header className="bookmarks-view__header">
          <h1 className="bookmarks-view__title">Bookmarks</h1>
          {user && (
            <p className="bookmarks-view__sub">
              Saved articles for {user.fullName}
            </p>
          )}
        </header>

        {authLoading || loading ? (
          <p className="bookmarks-view__empty">Loading…</p>
        ) : !user ? (
          <div className="bookmarks-view__signin">
            <p>Sign in with Google to save and view your bookmarks.</p>
          </div>
        ) : articles.length === 0 ? (
          <p className="bookmarks-view__empty">No bookmarks yet. Save articles from the feed.</p>
        ) : (
          <ul className="bookmarks-view__list">
            {articles.map((a) => (
              <li key={a.slug} className="bookmarks-card">
                {a.thumbnailUrl && (
                  <img
                    className="bookmarks-card__img"
                    src={a.thumbnailUrl}
                    alt=""
                  />
                )}
                <div className="bookmarks-card__body">
                  <span className="bookmarks-card__category">{a.category}</span>
                  <Link to={`/article/${a.slug}`} className="bookmarks-card__title">
                    {a.title}
                  </Link>
                  <p className="bookmarks-card__excerpt">{a.excerpt}</p>
                  <div className="bookmarks-card__meta">
                    <span>{a.author.name}</span>
                    <span>{a.publishedAt}</span>
                    <span>{a.readTimeMinutes} min read</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BookmarksView;
