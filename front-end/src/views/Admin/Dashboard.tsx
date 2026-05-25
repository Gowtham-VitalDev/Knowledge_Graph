import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import {
  listAdminArticles,
  togglePublish,
  deleteArticle,
  type AdminArticle,
} from "../../api/admin";
import "./Admin.css";

export default function Dashboard() {
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();

  const [articles, setArticles] = useState<AdminArticle[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  useEffect(() => {
    listAdminArticles()
      .then(setArticles)
      .catch(() => setError("Failed to load articles."))
      .finally(() => setLoading(false));
  }, []);

  const handleToggle = async (id: string) => {
    try {
      const updated = await togglePublish(id);
      setArticles((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: (updated as any).status } : a))
      );
    } catch {
      alert("Failed to toggle status.");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await deleteArticle(id);
      setArticles((prev) => prev.filter((a) => a._id !== id));
    } catch {
      alert("Failed to delete article.");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  return (
    <div className="admin-shell">
      {/* Nav */}
      <nav className="admin-nav">
        <Link to="/admin" className="admin-nav__brand">
          <span className="admin-nav__kg">KG</span>
          <span className="admin-nav__label">Admin</span>
        </Link>
        <div className="admin-nav__actions">
          <span className="admin-nav__user">{user?.email}</span>
          <button className="admin-btn admin-btn--ghost" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </nav>

      {/* Page */}
      <main className="admin-page">
        <div className="admin-page-header">
          <div>
            <h1 className="admin-page-title">Articles</h1>
            <p className="admin-page-sub">
              {articles.length} total
            </p>
          </div>
          <Link to="/admin/articles/new" className="admin-btn admin-btn--primary">
            + New article
          </Link>
        </div>

        {loading && <div className="admin-loading">Loading…</div>}
        {error   && <div className="admin-error-msg">{error}</div>}

        {!loading && !error && articles.length === 0 && (
          <div className="admin-empty">
            <div className="admin-empty__icon">📄</div>
            <p className="admin-empty__text">No articles yet.</p>
            <Link to="/admin/articles/new" className="admin-btn admin-btn--primary">
              Create your first article
            </Link>
          </div>
        )}

        {!loading && articles.length > 0 && (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Category</th>
                  <th>Views</th>
                  <th>Published</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((a) => (
                  <tr key={a._id}>
                    <td>
                      <div className="admin-table__title">{a.title}</div>
                      <div className="admin-table__meta">/{a.slug}</div>
                    </td>
                    <td>
                      <span className={`admin-badge admin-badge--${a.status}`}>
                        {a.status}
                      </span>
                    </td>
                    <td>{a.category?.name ?? <span style={{ color: "var(--color-muted)" }}>—</span>}</td>
                    <td>{a.views ?? 0}</td>
                    <td>
                      {a.publishedAt
                        ? new Date(a.publishedAt).toLocaleDateString()
                        : <span style={{ color: "var(--color-muted)" }}>—</span>}
                    </td>
                    <td>
                      <div className="admin-table__actions">
                        <Link
                          to={`/admin/articles/${a._id}/edit`}
                          className="admin-btn admin-btn--ghost"
                        >
                          Edit
                        </Link>
                        <button
                          className="admin-btn admin-btn--ghost"
                          onClick={() => handleToggle(a._id)}
                        >
                          {a.status === "published" ? "Unpublish" : "Publish"}
                        </button>
                        <button
                          className="admin-btn admin-btn--danger"
                          onClick={() => handleDelete(a._id, a.title)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
