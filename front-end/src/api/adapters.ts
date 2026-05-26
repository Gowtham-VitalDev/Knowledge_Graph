import type { Article } from "../types/article";
import type { ApiArticle } from "./articles";
import type { ApiTrendingItem } from "./trending";
import type { TrendingItem } from "../types/article";

export function adaptArticle(a: ApiArticle): Article {
  return {
    id:              a._id,
    slug:            a.slug,
    title:           a.title,
    excerpt:         a.excerpt,
    body:            a.content,
    category:        a.categoryId?.slug as Article["category"] ?? "ai-ml",
    breadcrumb:      [a.categoryId?.name ?? ""],
    tags:            a.tagIds?.map((t) => t.name) ?? [],
    author:          { name: a.authorId?.fullName ?? "", avatarUrl: a.authorId?.avatarUrl },
    coverImageUrl:   a.coverImage,
    thumbnailUrl:    a.coverImage,
    readTimeMinutes: a.readTime,
    publishedAt:     a.publishedAt
      ? new Date(a.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      : "",
    isHero:          a.featured,
  };
}

export function adaptTrending(t: ApiTrendingItem): TrendingItem {
  return {
    rank:        t.rank,
    title:       t.articleId?.title ?? "",
    reads:       t.articleId?.views
      ? `${(t.articleId.views / 1000).toFixed(0)}k reads`
      : "0 reads",
    articleSlug: t.articleId?.slug ?? "",
  };
}
