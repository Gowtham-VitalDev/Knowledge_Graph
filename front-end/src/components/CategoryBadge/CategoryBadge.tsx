import type { CategoryId } from "../../types/article";
import { getCategoryBadgeLabel } from "../../data/categories";
import "./CategoryBadge.css";

interface CategoryBadgeProps {
  category: CategoryId;
}

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const label = getCategoryBadgeLabel(category);
  return (
    <span className={`category-badge category-badge--${category}`}>
      {label}
    </span>
  );
};

export default CategoryBadge;
