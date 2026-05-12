import type { CategoryId } from "../../types/article";
import { getCategoryBadgeLabel } from "../../data/categories";
import "./CategoryBadge.css";

interface CategoryBadgeProps {
  category: CategoryId;
  hero?: boolean;
  outline?: boolean;
  className?: string;
}

const CategoryBadge = ({
  category,
  hero = false,
  outline = false,
  className = "",
}: CategoryBadgeProps) => {
  const variant = hero
    ? "category-badge--hero"
    : outline
      ? "category-badge--outline"
      : `category-badge--${category}`;

  return (
    <span className={`category-badge ${variant} ${className}`.trim()}>
      {getCategoryBadgeLabel(category)}
    </span>
  );
};

export default CategoryBadge;
