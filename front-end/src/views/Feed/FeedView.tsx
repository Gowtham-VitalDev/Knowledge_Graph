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
      <Navbar />

      <section className="feed-hero">
        <span className="feed-hero__eyebrow">The Editorial</span>
        <h1 className="feed-hero__title">Ideas worth reading.</h1>
        <p className="feed-hero__subtitle">
          Deep dives, technical insights, and pragmatic perspectives from the
          vanguard of software engineering and design.
        </p>
      </section>

      <div className="feed-filters">
        <FilterPills />
      </div>

      <div className="feed-grid">
        <div className="feed-grid__main">
          <span className="feed-grid__section-label">Latest Articles</span>

          {hero && <FeaturedArticleCard article={hero} />}

          <div className="feed-grid__list">
            {list.map((article) => (
              <ListArticleCard key={article.slug} article={article} />
            ))}
          </div>

          <div className="feed-load-more">
            <button type="button" className="feed-load-more__btn">
              Load more articles
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="m9 18 6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <aside className="feed-grid__sidebar">
          <TrendingList />
          <TopicCloud />
          <NewsletterWidget />
        </aside>
      </div>

      <Footer />
    </div>
  );
};

export default FeedView;
