import type { CategoryId } from "../../types/article";
import { getCategoryBadgeLabel } from "../../data/categories";
import "./CategoryBadge.css";

interface CategoryBadgeProps {
  category: CategoryId;
  hero?: boolean;
  className?: string;
}

const CategoryBadge = ({ category, hero = false, className = "" }: CategoryBadgeProps) => {
  const heroClass = hero ? "category-badge--hero" : "";
  return (
    <span className={`category-badge category-badge--${category} ${heroClass} ${className}`.trim()}>
      {getCategoryBadgeLabel(category)}
    </span>
  );
};

export default CategoryBadge;
