import { Link } from "react-router-dom";
import type { Article } from "../../types/article";
import CategoryBadge from "../CategoryBadge/CategoryBadge";
import AuthorAvatar from "../AuthorAvatar/AuthorAvatar";
import { formatShortDate } from "../../utils/formatDate";
import "./FeaturedArticleCard.css";

interface FeaturedArticleCardProps {
  article: Article;
}

const FeaturedArticleCard = ({ article }: FeaturedArticleCardProps) => {
  return (
    <Link to={`/article/${article.slug}`} className="featured-card">
      <div className="featured-card__media">
        <img src={article.coverImageUrl} alt="" />
      </div>
      <div className="featured-card__body">
        <CategoryBadge category={article.category} hero />
        <h2 className="featured-card__title">{article.title}</h2>
        <p className="featured-card__excerpt">{article.excerpt}</p>
        <div className="featured-card__byline">
          <AuthorAvatar name={article.author.name} size="md" />
          <div className="featured-card__meta">
            <span className="featured-card__author">{article.author.name}</span>
            <span>
              {formatShortDate(article.publishedAt)} ·{" "}
              {article.readTimeMinutes} min read
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedArticleCard;
