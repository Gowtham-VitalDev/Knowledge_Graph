import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { usePageMeta } from "../../hooks/usePageMeta";
import Navbar from "../../components/Navbar/Navbar";
import FilterPills from "../../components/FilterPills/FilterPills";
import FeaturedArticleCard from "../../components/FeaturedArticleCard/FeaturedArticleCard";
import ListArticleCard from "../../components/ListArticleCard/ListArticleCard";
import TrendingList from "../../components/TrendingList/TrendingList";
import TopicCloud from "../../components/TopicCloud/TopicCloud";
import NewsletterWidget from "../../components/NewsletterWidget/NewsletterWidget";
import Footer from "../../components/Footer/Footer";
import { fetchArticles } from "../../api/articles";
import { fetchTrending } from "../../api/trending";
import { fetchTags } from "../../api/tags";
import { adaptArticle, adaptTrending } from "../../api/adapters";
import type { Article, TrendingItem, Topic } from "../../types/article";
import "./FeedView.css";

const PAGE_SIZE = 10;

const FeedView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "all";
  usePageMeta("Feed", "The latest tech news, research and engineering articles — curated for builders.");

  const [hero, setHero]       = useState<Article | null>(null);
  const [list, setList]       = useState<Article[]>([]);
  const [trending, setTrending] = useState<TrendingItem[]>([]);
  const [topics, setTopics]   = useState<Topic[]>([]);
  const [page, setPage]       = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError]     = useState(false);

  const handleCategoryChange = (category: string) => {
    setPage(1);
    setList([]);
    setHero(null);
    if (category === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  // Fetch articles whenever category changes — reset list
  useEffect(() => {
    setLoading(true);
    setError(false);
    const categoryParam = activeCategory === "all" ? undefined : activeCategory;

    Promise.all([
      fetchArticles({ category: categoryParam, page: 1, limit: PAGE_SIZE }),
      fetchTrending(),
      fetchTags(),
    ])
      .then(([articlesRes, trendingRes, tagsRes]) => {
        const adapted = articlesRes.data.map(adaptArticle);
        const heroArticle = activeCategory === "all"
          ? (adapted.find((a) => a.isHero) ?? adapted[0] ?? null)
          : null;
        const feedArticles = adapted.filter((a) => a !== heroArticle);
        setHero(heroArticle);
        setList(feedArticles);
        setHasMore(articlesRes.meta.page < articlesRes.meta.totalPages);
        setPage(1);
        setTrending(trendingRes.map(adaptTrending));
        setTopics(tagsRes.map((t) => ({ label: t.name, slug: t.slug })));
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const handleLoadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    const categoryParam = activeCategory === "all" ? undefined : activeCategory;
    try {
      const res = await fetchArticles({ category: categoryParam, page: nextPage, limit: PAGE_SIZE });
      const adapted = res.data.map(adaptArticle);
      setList((prev) => [...prev, ...adapted]);
      setHasMore(res.meta.page < res.meta.totalPages);
      setPage(nextPage);
    } catch {
      // fail silently — user can retry
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, page, activeCategory]);

  return (
    <div className="feed-page">
      <div className="feed-edge-frame" aria-hidden="true" />

      <Navbar />

      <section className="feed-hero">
        <span className="feed-hero__live-tag">
          <span className="feed-hero__live-dot" />
          Live Feed
        </span>
        <h1 className="feed-hero__title">
          The Neon <span className="feed-hero__title-accent">Pulse</span>
        </h1>
        <p className="feed-hero__subtitle">
          Transmissions from the edge of the digital frontier. Deep dives into
          cybernetics, AI emergence, and the synthetic future.
        </p>
      </section>

      <div className="feed-filters">
        <FilterPills active={activeCategory} onChange={handleCategoryChange} />
      </div>

      <div className="feed-grid">
        <div className="feed-grid__main">
          <span className="feed-grid__section-label">Latest Transmissions</span>

          {loading && <p className="feed-state">Loading...</p>}
          {error && <p className="feed-state feed-state--error">Failed to load articles. Is the server running?</p>}

          {!loading && !error && (
            <>
              {hero && <FeaturedArticleCard article={hero} />}
              <div className="feed-grid__list">
                {list.map((article) => (
                  <ListArticleCard key={article.slug} article={article} />
                ))}
              </div>
              {!loading && !error && list.length === 0 && !hero && (
                <p className="feed-state">No articles in this category yet.</p>
              )}
            </>
          )}

          {hasMore && (
            <div className="feed-load-more">
              <button
                type="button"
                className="feed-load-more__btn"
                onClick={handleLoadMore}
                disabled={loadingMore}
              >
                {loadingMore ? "Loading..." : "Load More Archives"}
                {!loadingMore && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>

        <aside className="feed-grid__sidebar">
          <NewsletterWidget />
          <TrendingList items={trending} />
          <TopicCloud topics={topics} onTopicClick={handleCategoryChange} />
        </aside>
      </div>

      <Footer />
    </div>
  );
};

export default FeedView;
