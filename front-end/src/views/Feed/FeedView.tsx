import Navbar from "../../components/Navbar/Navbar";
import FilterPills from "../../components/FilterPills/FilterPills";
import FeaturedArticleCard from "../../components/FeaturedArticleCard/FeaturedArticleCard";
import ListArticleCard from "../../components/ListArticleCard/ListArticleCard";
import TrendingList from "../../components/TrendingList/TrendingList";
import TopicCloud from "../../components/TopicCloud/TopicCloud";
import NewsletterWidget from "../../components/NewsletterWidget/NewsletterWidget";
import Footer from "../../components/Footer/Footer";
import { getHeroArticle, getFeedArticles } from "../../data/articles";
import "./FeedView.css";

const FeedView = () => {
  const hero = getHeroArticle();
  const list = getFeedArticles();

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
        <FilterPills />
      </div>

      <div className="feed-grid">
        <div className="feed-grid__main">
          <span className="feed-grid__section-label">Latest Transmissions</span>

          {hero && <FeaturedArticleCard article={hero} />}

          <div className="feed-grid__list">
            {list.map((article) => (
              <ListArticleCard key={article.slug} article={article} />
            ))}
          </div>

          <div className="feed-load-more">
            <button type="button" className="feed-load-more__btn">
              Load More Archives
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>

        <aside className="feed-grid__sidebar">
          <NewsletterWidget />
          <TrendingList />
          <TopicCloud />
        </aside>
      </div>

      <Footer />
    </div>
  );
};

export default FeedView;
