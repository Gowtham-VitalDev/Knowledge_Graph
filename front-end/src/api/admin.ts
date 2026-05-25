import client from "./client";

export interface AdminArticle {
  _id: string;
  title: string;
  slug: string;
  status: "draft" | "published" | "archived";
  category?: { name: string; slug: string } | null;
  author?: { fullName: string } | null;
  publishedAt?: string | null;
  readTime?: number;
  views?: number;
}

export interface ArticleBody {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  status?: "draft" | "published";
  categoryId?: string;
  tagIds?: string[];
  coverImage?: string;
  readTime?: number;
  featured?: boolean;
}

const cfg = { withCredentials: true };

export const listAdminArticles = () =>
  client.get<{ articles: AdminArticle[] }>("/api/admin/articles", cfg).then((r) => r.data.articles);

export const getAdminArticle = (id: string) =>
  client.get<{ article: AdminArticle & { content: string } }>(`/api/admin/articles/${id}`, cfg).then((r) => r.data.article);

export const listCategories = () =>
  client.get<{ data: { name: string; _id: string }[] }>("/api/categories", cfg).then((r) => r.data.data);

export const createArticle = (body: ArticleBody) =>
  client.post<{ article: AdminArticle }>("/api/admin/articles", body, cfg).then((r) => r.data.article);

export const updateArticle = (id: string, body: Partial<ArticleBody>) =>
  client.put<{ article: AdminArticle }>(`/api/admin/articles/${id}`, body, cfg).then((r) => r.data.article);

export const togglePublish = (id: string) =>
  client.patch<{ article: AdminArticle }>(`/api/admin/articles/${id}/publish`, {}, cfg).then((r) => r.data.article);

export const deleteArticle = (id: string) =>
  client.delete(`/api/admin/articles/${id}`, cfg).then((r) => r.data);
