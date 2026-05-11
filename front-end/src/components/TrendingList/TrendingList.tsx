import { Link } from "react-router-dom";
import { TRENDING } from "../../data/trending";
import "./TrendingList.css";

const TrendingList = () => {
  return (
    <section className="trending" aria-labelledby="trending-title">
      <h2 id="trending-title" className="trending__title">
        Trending This Week
      </h2>
      {TRENDING.map((item) => (
        <Link
          key={item.rank}
          to={`/article/${item.articleSlug}`}
          className="trending__row"
        >
          <span className="trending__rank">
            {String(item.rank).padStart(2, "0")}
          </span>
          <div className="trending__body">
            <span className="trending__row-title">{item.title}</span>
            <span className="trending__meta">
              {item.authorName} · {item.readTimeMinutes} min
            </span>
          </div>
        </Link>
      ))}
    </section>
  );
};

export default TrendingList;
