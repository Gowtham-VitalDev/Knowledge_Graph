import type { Category, CategoryId } from "../types/article";

export const CATEGORIES: Category[] = [
  { id: "ai-ml", label: "Artificial Intelligence", badgeLabel: "AI & ML" },
  { id: "machine-learning", label: "Machine Learning", badgeLabel: "AI & ML" },
  { id: "systems", label: "Systems", badgeLabel: "SYSTEMS" },
  { id: "web", label: "Web Development", badgeLabel: "WEB" },
  { id: "data", label: "Data Science", badgeLabel: "DATA" },
  { id: "design", label: "Design", badgeLabel: "DESIGN" },
  { id: "engineering", label: "Engineering", badgeLabel: "ENGINEERING" },
  { id: "research", label: "Research", badgeLabel: "RESEARCH" },
];

export const FILTER_PILLS: { id: CategoryId | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ai-ml", label: "Artificial Intelligence" },
  { id: "machine-learning", label: "Machine Learning" },
  { id: "systems", label: "Systems" },
  { id: "web", label: "Web Development" },
  { id: "data", label: "Data Science" },
  { id: "design", label: "Design" },
  { id: "engineering", label: "Engineering" },
];

export function getCategoryBadgeLabel(id: CategoryId): string {
  return CATEGORIES.find((c) => c.id === id)?.badgeLabel ?? id.toUpperCase();
}
