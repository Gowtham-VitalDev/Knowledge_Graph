import { Link } from "react-router-dom";
import type { Article } from "../../types/article";
import CategoryBadge from "../CategoryBadge/CategoryBadge";
import AuthorAvatar from "../AuthorAvatar/AuthorAvatar";
import { formatShortDate } from "../../utils/formatDate";
import "./ListArticleCard.css";

interface ListArticleCardProps {
  article: Article;
}

const ListArticleCard = ({ article }: ListArticleCardProps) => {
  return (
    <Link to={`/article/${article.slug}`} className="list-card">
      <div className="list-card__text">
        <CategoryBadge category={article.category} outline />
        <h3 className="list-card__title">{article.title}</h3>
        <p className="list-card__excerpt">{article.excerpt}</p>
        <div className="list-card__byline">
          <AuthorAvatar name={article.author.name} size="sm" />
          <span className="list-card__author">{article.author.name}</span>
          <span>·</span>
          <span>{formatShortDate(article.publishedAt)}</span>
          <span>·</span>
          <span>{article.readTimeMinutes} min read</span>
        </div>
      </div>
      <img src={article.thumbnailUrl} alt="" className="list-card__thumb" />
    </Link>
  );
};

export default ListArticleCard;
