import client from "./client";

export interface ApiAuthor {
  _id: string;
  fullName: string;
  username: string;
  avatarUrl: string;
  bio?: string;
  socialLinks?: Record<string, string>;
}

export interface ApiCategory {
  _id: string;
  name: string;
  slug: string;
  colorCode: string;
}

export interface ApiTag {
  _id: string;
  name: string;
  slug: string;
}

export interface ApiArticle {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  categoryId: ApiCategory;
  tagIds: ApiTag[];
  authorId: ApiAuthor;
  status: string;
  featured: boolean;
  trendingScore: number;
  readTime: number;
  views: number;
  likes: number;
  shares: number;
  bookmarks: number;
  publishedAt: string;
}

export interface ArticlesMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function fetchArticles(params?: {
  category?: string;
  page?: number;
  limit?: number;
}): Promise<{ data: ApiArticle[]; meta: ArticlesMeta }> {
  const res = await client.get("/api/articles", { params });
  return res.data;
}

export async function fetchArticleBySlug(slug: string): Promise<ApiArticle> {
  const res = await client.get(`/api/articles/${slug}`);
  return res.data.data;
}
