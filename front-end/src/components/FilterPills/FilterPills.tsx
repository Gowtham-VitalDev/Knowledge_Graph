import { useState } from "react";
import { FILTER_PILLS } from "../../data/categories";
import "./FilterPills.css";

const FilterPills = () => {
  const [active, setActive] = useState<string>("all");

  return (
    <div className="filter-pills-wrapper">
      <span className="filter-pills-label">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M4 6h16M7 12h10M10 18h4"/>
        </svg>
        Topics
      </span>
      <div className="filter-pills" role="tablist" aria-label="Filter by topic">
        {FILTER_PILLS.map((pill) => (
          <button
            key={pill.id}
            type="button"
            role="tab"
            aria-selected={active === pill.id}
            className={`filter-pill${active === pill.id ? " filter-pill--active" : ""}`}
            onClick={() => setActive(pill.id)}
          >
            {pill.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterPills;
