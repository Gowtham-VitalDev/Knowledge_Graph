import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import BlogNavbar from "../../components/BlogNavbar/BlogNavbar";
import CategoryBadge from "../../components/CategoryBadge/CategoryBadge";
import AuthorAvatar from "../../components/AuthorAvatar/AuthorAvatar";
import Outline from "../../components/Outline/Outline";
import type { OutlineHeading } from "../../components/Outline/Outline";
import { getArticleBySlug, ARTICLES } from "../../data/articles";
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

const BlogView = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = useMemo(() => {
    const target = slug ?? "";
    return getArticleBySlug(target) ?? ARTICLES[0];
  }, [slug]);

  const headings = useMemo(() => extractHeadings(article.body), [article.body]);

  const [activeId, setActiveId] = useState<string | null>(headings[0]?.id ?? null);
  const [progress, setProgress] = useState(0);
  const articleRef = useRef<HTMLElement>(null);

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

  return (
    <div className="blog-page">
      {/* Reading progress bar */}
      <div className="blog-progress" aria-hidden="true">
        <div className="blog-progress__fill" style={{ width: `${progress}%` }} />
      </div>

      <BlogNavbar breadcrumb={article.breadcrumb} />

      <div className="blog-layout">
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

          <div className="blog-article__body">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2 id={slugify(String(children))}>{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 id={slugify(String(children))}>{children}</h3>
                ),
              }}
            >
              {article.body}
            </ReactMarkdown>
          </div>
        </article>

        <Outline
          headings={headings}
          activeId={activeId}
          onHeadingClick={handleHeadingClick}
        />
      </div>
    </div>
  );
};

export default BlogView;
