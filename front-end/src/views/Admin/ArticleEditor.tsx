import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import {
  getAdminArticle,
  createArticle,
  updateArticle,
  type ArticleBody,
} from "../../api/admin";
import "./Admin.css";

const EMPTY: ArticleBody = {
  title: "",
  slug: "",
  content: "",
  excerpt: "",
  status: "draft",
  coverImage: "",
  readTime: 5,
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function ArticleEditor() {
  const { id }      = useParams<{ id: string }>();
  const isEdit      = Boolean(id);
  const { logout }  = useAdminAuth();
  const navigate    = useNavigate();

  const [form, setForm]       = useState<ArticleBody>(EMPTY);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState("");

  useEffect(() => {
    if (!isEdit || !id) return;
    getAdminArticle(id)
      .then((a) => {
        setForm({
          title:     a.title ?? "",
          slug:      a.slug  ?? "",
          content:   (a as any).content ?? "",
          excerpt:   (a as any).excerpt ?? "",
          status:    a.status ?? "draft",
          coverImage:(a as any).coverImage ?? "",
          readTime:  a.readTime ?? 5,
        });
      })
      .catch(() => setError("Failed to load article."))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const set = (field: keyof ArticleBody, value: string | number) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleTitleChange = (v: string) => {
    setForm((prev) => ({
      ...prev,
      title: v,
      slug: isEdit ? prev.slug : slugify(v),
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim()) {
      setError("Title and slug are required.");
      return;
    }
    setError("");
    setSaving(true);
    try {
      if (isEdit && id) {
        await updateArticle(id, form);
      } else {
        await createArticle(form);
      }
      navigate("/admin");
    } catch {
      setError("Failed to save. Check the console for details.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="admin-shell">
        <div className="admin-loading">Loading article…</div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      {/* Nav */}
      <nav className="admin-nav">
        <Link to="/admin" className="admin-nav__brand">
          <span className="admin-nav__kg">KG</span>
          <span className="admin-nav__label">Admin</span>
        </Link>
        <div className="admin-nav__actions">
          <Link to="/admin" className="admin-btn admin-btn--ghost">← Back</Link>
          <button className="admin-btn admin-btn--ghost" onClick={handleLogout}>Sign out</button>
        </div>
      </nav>

      <main className="admin-page">
        <form onSubmit={handleSave}>
          <div className="admin-page-header">
            <h1 className="admin-page-title">
              {isEdit ? "Edit article" : "New article"}
            </h1>
            <div style={{ display: "flex", gap: "var(--space-3)" }}>
              <Link to="/admin" className="admin-btn admin-btn--ghost">Cancel</Link>
              <button
                type="submit"
                className="admin-btn admin-btn--primary"
                disabled={saving}
              >
                {saving ? "Saving…" : isEdit ? "Save changes" : "Create article"}
              </button>
            </div>
          </div>

          {error && <div className="admin-error-msg">{error}</div>}

          {/* Meta row */}
          <div className="admin-meta-fields">
            <div className="admin-field">
              <label className="admin-field__label">Title *</label>
              <input
                className="admin-field__input"
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Article title"
                required
              />
            </div>

            <div className="admin-field">
              <label className="admin-field__label">Slug *</label>
              <input
                className="admin-field__input"
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
                placeholder="article-slug"
                required
              />
            </div>

            <div className="admin-field">
              <label className="admin-field__label">Status</label>
              <select
                className="admin-select"
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="admin-field">
              <label className="admin-field__label">Read time (min)</label>
              <input
                className="admin-field__input"
                type="number"
                min={1}
                value={form.readTime}
                onChange={(e) => set("readTime", Number(e.target.value))}
              />
            </div>

            <div className="admin-field" style={{ gridColumn: "1 / -1" }}>
              <label className="admin-field__label">Excerpt</label>
              <input
                className="admin-field__input"
                value={form.excerpt}
                onChange={(e) => set("excerpt", e.target.value)}
                placeholder="Short description for cards and SEO"
              />
            </div>

            <div className="admin-field" style={{ gridColumn: "1 / -1" }}>
              <label className="admin-field__label">Cover image URL</label>
              <input
                className="admin-field__input"
                value={form.coverImage}
                onChange={(e) => set("coverImage", e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Editor + Preview */}
          <div className="admin-editor">
            <div className="admin-editor-pane">
              <span className="admin-editor-pane__label">Markdown</span>
              <textarea
                className="admin-editor-pane__textarea"
                value={form.content}
                onChange={(e) => set("content", e.target.value)}
                placeholder="Write your article in Markdown…"
                spellCheck={false}
              />
            </div>

            <div className="admin-editor-pane">
              <span className="admin-editor-pane__label">Preview</span>
              <div className="admin-preview">
                {form.content ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {form.content}
                  </ReactMarkdown>
                ) : (
                  <span style={{ color: "var(--color-muted)", fontFamily: "var(--font-ui)" }}>
                    Start writing to see preview…
                  </span>
                )}
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
