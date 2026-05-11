import type { CategoryId } from "../../types/article";
import { getCategoryBadgeLabel } from "../../data/categories";
import "./CategoryBadge.css";

interface CategoryBadgeProps {
  category: CategoryId;
  className?: string;
}

const CategoryBadge = ({ category, className = "" }: CategoryBadgeProps) => {
  return (
    <span className={`category-badge category-badge--${category} ${className}`}>
      {getCategoryBadgeLabel(category)}
    </span>
  );
};

export default CategoryBadge;
