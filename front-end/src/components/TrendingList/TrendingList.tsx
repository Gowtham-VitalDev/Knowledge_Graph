import { Link } from "react-router-dom";
import { TRENDING } from "../../data/trending";
import "./TrendingList.css";

const TrendingList = () => {
  return (
    <section className="trending" aria-labelledby="trending-title">
      <div className="trending__header">
        <svg className="trending__title-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
        </svg>
        <h2 id="trending-title" className="trending__title">Surging Protocols</h2>
      </div>
      <div className="trending__list">
        {TRENDING.map((item) => (
          <Link key={item.rank} to={`/article/${item.articleSlug}`} className="trending__row">
            <span className="trending__rank">{String(item.rank).padStart(2, "0")}</span>
            <div className="trending__body">
              <span className="trending__row-title">{item.title}</span>
              <span className="trending__reads">{item.reads}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TrendingList;
