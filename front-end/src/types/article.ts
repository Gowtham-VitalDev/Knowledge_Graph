export type CategoryId =
  | "ai-ml"
  | "quantum"
  | "crypto"
  | "synth-bio"
  | "vr-ar"
  | "cybersec"
  | "neural"
  | "robotics"
  | "research"
  | "systems"
  | "web"
  | "data"
  | "design"
  | "engineering"
  | "machine-learning";

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
  reads: string;
  articleSlug: string;
}

export interface Topic {
  label: string;
  slug: string;
}
