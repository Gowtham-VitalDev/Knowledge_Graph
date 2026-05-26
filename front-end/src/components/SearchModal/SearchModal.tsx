import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { fetchArticles } from "../../api/articles";
import { adaptArticle } from "../../api/adapters";
import type { Article } from "../../types/article";
import "./SearchModal.css";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

const SearchModal = ({ open, onClose }: SearchModalProps) => {
  const [query, setQuery]     = useState("");
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef              = useRef<HTMLInputElement>(null);
  const timerRef              = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetchArticles({ q: query.trim(), limit: 6 });
        setResults(res.data.map(adaptArticle));
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [query]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="search-overlay" onClick={onClose} aria-modal="true" role="dialog">
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-modal__input-wrap">
          <svg className="search-modal__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            ref={inputRef}
            className="search-modal__input"
            type="text"
            placeholder="Search articles…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search articles"
          />
          {query && (
            <button className="search-modal__clear" onClick={() => setQuery("")} aria-label="Clear">
              ✕
            </button>
          )}
        </div>

        {query.trim() && (
          <div className="search-modal__results">
            {loading && <p className="search-modal__status">Searching…</p>}
            {!loading && results.length === 0 && (
              <p className="search-modal__status">No results for "{query}"</p>
            )}
            {results.map((a) => (
              <Link
                key={a.slug}
                to={`/article/${a.slug}`}
                className="search-result"
                onClick={onClose}
              >
                <span className="search-result__category">{a.category}</span>
                <span className="search-result__title">{a.title}</span>
                <span className="search-result__meta">{a.author.name} · {a.readTimeMinutes} min</span>
              </Link>
            ))}
          </div>
        )}

        <div className="search-modal__hint">
          Press <kbd>Esc</kbd> to close
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
