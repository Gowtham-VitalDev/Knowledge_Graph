import { useEffect, useMemo, useRef, useState } from "react";
import { usePageMeta } from "../../hooks/usePageMeta";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import BlogNavbar from "../../components/BlogNavbar/BlogNavbar";
import CategoryBadge from "../../components/CategoryBadge/CategoryBadge";
import AuthorAvatar from "../../components/AuthorAvatar/AuthorAvatar";
import Outline from "../../components/Outline/Outline";
import MermaidBlock from "../../components/MermaidBlock/MermaidBlock";
import type { OutlineHeading } from "../../components/Outline/Outline";
import type { Article } from "../../types/article";
import { fetchArticleBySlug } from "../../api/articles";
import { adaptArticle } from "../../api/adapters";
import "./BlogView.css";

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const extractHeadings = (markdown: string): OutlineHeading[] => {
  const lines = markdown.split("\n");
  const headings: OutlineHeading[] = [];
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = /^(#{2,3})\s+(.+)$/.exec(line);
    if (!match) continue;
    const level = match[1].length;
    const text = match[2].trim();
    headings.push({ id: slugify(text), level, text });
  }
  return headings;
};

const YT_RE = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/;

function getYouTubeId(href: string): string | null {
  const m = YT_RE.exec(href);
  return m ? m[1] : null;
}

const mdComponents: Components = {
  h2: ({ children }) => <h2 id={slugify(String(children))}>{children}</h2>,
  h3: ({ children }) => <h3 id={slugify(String(children))}>{children}</h3>,

  // Images — lazy, rounded, captioned if alt text present
  img: ({ src, alt }) => (
    <figure className="blog-article__figure">
      <img
        src={src}
        alt={alt ?? ""}
        loading="lazy"
        className="blog-article__img"
      />
      {alt && <figcaption className="blog-article__figcaption">{alt}</figcaption>}
    </figure>
  ),

  // Code blocks — mermaid diagrams or syntax-highlighted pre
  code: ({ className, children, ...props }) => {
    const isBlock = !props.node?.position || String(children).includes("\n");
    if (isBlock && className === "language-mermaid") {
      return <MermaidBlock code={String(children).trim()} />;
    }
    return <code className={className} {...props}>{children}</code>;
  },

  // Links — YouTube bare URLs become embedded iframes
  a: ({ href, children }) => {
    const ytId = href ? getYouTubeId(href) : null;
    // Only embed when the link text equals the href (bare autolinked URL)
    if (ytId && String(children) === href) {
      return (
        <figure className="blog-article__video">
          <iframe
            src={`https://www.youtube.com/embed/${ytId}`}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </figure>
      );
    }
    return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
  },
};

const BlogView = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  usePageMeta(article?.title ?? "Article", article?.excerpt);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(false);
    fetchArticleBySlug(slug)
      .then((data) => setArticle(adaptArticle(data)))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  const headings = useMemo(
    () => (article ? extractHeadings(article.body) : []),
    [article]
  );

  const [activeId, setActiveId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [tocOpen, setTocOpen] = useState<boolean>(() => {
    return localStorage.getItem("kg-toc-open") !== "false";
  });
  const articleRef = useRef<HTMLElement>(null);

  const toggleToc = () => {
    setTocOpen((prev) => {
      const next = !prev;
      localStorage.setItem("kg-toc-open", String(next));
      return next;
    });
  };

  useEffect(() => {
    if (headings.length > 0) setActiveId(headings[0].id);
  }, [headings]);

  // Reading progress bar
  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const scrolled = Math.max(0, -top);
      const total = height - windowH;
      setProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy via IntersectionObserver
  useEffect(() => {
    if (!articleRef.current || headings.length === 0) return;

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  const handleHeadingClick = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  };

  if (loading) return <div className="blog-page"><BlogNavbar breadcrumb={[]} /><p style={{ padding: "2rem" }}>Loading...</p></div>;
  if (error || !article) return <div className="blog-page"><BlogNavbar breadcrumb={[]} /><p style={{ padding: "2rem" }}>Article not found.</p></div>;

  return (
    <div className="blog-page">
      {/* Reading progress bar */}
      <div className="blog-progress" aria-hidden="true">
        <div className="blog-progress__fill" style={{ width: `${progress}%` }} />
      </div>

      <BlogNavbar breadcrumb={article.breadcrumb} articleId={article.id} />

      <div className="blog-layout" data-toc={tocOpen ? "open" : "closed"}>
        {/* Left / main column */}
        <article className="blog-article" ref={articleRef}>
          <header className="blog-article__header">
            <div className="blog-article__badge-row">
              <CategoryBadge category={article.category} />
            </div>
            <h1 className="blog-article__title">{article.title}</h1>
            <div className="blog-article__byline">
              <AuthorAvatar name={article.author.name} size="md" />
              <p className="blog-article__byline-text">
                By{" "}
                <span className="blog-article__byline-author">
                  {article.author.name}
                </span>{" "}
                · {article.readTimeMinutes} min read · {article.publishedAt}
              </p>
            </div>
          </header>

          {/*
            Mobile accordion TOC lives here — between header and body.
            On desktop it's hidden (CSS); on mobile it collapses/expands.
            The sticky desktop TOC is in the right grid column below.
          */}
          <div className="blog-article__toc-mobile">
            <Outline
              headings={headings}
              activeId={activeId}
              onHeadingClick={handleHeadingClick}
            />
          </div>

          <div className="blog-article__body">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
              {article.body}
            </ReactMarkdown>
          </div>
        </article>

        {/* Right column: desktop sticky TOC + toggle button */}
        <div className="blog-toc-desktop">
          <button
            type="button"
            className="blog-toc-toggle"
            onClick={toggleToc}
            aria-label={tocOpen ? "Collapse outline" : "Expand outline"}
            title={tocOpen ? "Collapse outline" : "Expand outline"}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className={tocOpen ? "blog-toc-toggle__icon" : "blog-toc-toggle__icon blog-toc-toggle__icon--flipped"}
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
          <div className="blog-toc-desktop__panel">
            <Outline
              headings={headings}
              activeId={activeId}
              onHeadingClick={handleHeadingClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogView;
