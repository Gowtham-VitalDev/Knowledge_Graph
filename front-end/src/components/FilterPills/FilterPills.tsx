import { useState } from "react";
import { FILTER_PILLS } from "../../data/categories";
import "./FilterPills.css";

const FilterPills = () => {
  const [active, setActive] = useState<string>("all");

  return (
    <div className="filter-pills" role="tablist" aria-label="Filter by category">
      {FILTER_PILLS.map((pill) => (
        <button
          key={pill.id}
          type="button"
          role="tab"
          aria-selected={active === pill.id}
          className={`filter-pill ${
            active === pill.id ? "filter-pill--active" : ""
          }`}
          onClick={() => setActive(pill.id)}
        >
          {pill.label}
        </button>
      ))}
    </div>
  );
};

export default FilterPills;
