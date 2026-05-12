export type CategoryId =
  | "research"
  | "ai-ml"
  | "machine-learning"
  | "web"
  | "systems"
  | "data"
  | "design"
  | "engineering";

export interface Category {
  id: CategoryId;
  label: string;
  badgeLabel: string;
}

export interface Author {
  name: string;
  avatarUrl?: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: CategoryId;
  breadcrumb: string[];
  tags: string[];
  author: Author;
  coverImageUrl: string;
  thumbnailUrl: string;
  readTimeMinutes: number;
  publishedAt: string;
  isHero?: boolean;
  body: string;
}

export interface TrendingItem {
  rank: number;
  title: string;
  authorName: string;
  readTimeMinutes: number;
  articleSlug: string;
}

export interface Topic {
  label: string;
  slug: string;
}
