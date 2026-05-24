import client from "./client";

export interface ApiTrendingItem {
  _id: string;
  rank: number;
  score: number;
  articleId: {
    _id: string;
    title: string;
    slug: string;
    readTime: number;
    views: number;
    authorId: { fullName: string; username: string };
    categoryId: { name: string; slug: string };
  };
}

export async function fetchTrending(): Promise<ApiTrendingItem[]> {
  const res = await client.get("/api/trending");
  return res.data.data;
}
