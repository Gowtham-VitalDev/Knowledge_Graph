import { Link } from "react-router-dom";
import type { Article } from "../../types/article";
import CategoryBadge from "../CategoryBadge/CategoryBadge";
import AuthorAvatar from "../AuthorAvatar/AuthorAvatar";
import "./FeaturedArticleCard.css";

interface FeaturedArticleCardProps {
  article: Article;
}

const FeaturedArticleCard = ({ article }: FeaturedArticleCardProps) => {
  return (
    <Link to={`/article/${article.slug}`} className="featured-card">
      <div className="featured-card__media">
        <img src={article.coverImageUrl} alt={article.title} />
      </div>

      <span className="featured-card__featured-tag">
        <span className="featured-card__featured-dot" />
        Featured
      </span>

      <div className="featured-card__tags">
        {article.tags.map((tag) => (
          <CategoryBadge key={tag} category={article.category} />
        )).slice(0, 2)}
      </div>

      <h2 className="featured-card__title">{article.title}</h2>
      <p className="featured-card__excerpt">{article.excerpt}</p>

      <div className="featured-card__meta">
        <AuthorAvatar name={article.author.name} size="sm" />
        <span className="featured-card__meta-text">
          {article.author.name} · {article.publishedAt} · {article.readTimeMinutes} min read
        </span>
        <span className="featured-card__arrow" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </span>
      </div>
    </Link>
  );
};

export default FeaturedArticleCard;
