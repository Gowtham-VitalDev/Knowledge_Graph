import client from "./client";

export interface ApiCategoryFull {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  colorCode: string;
  articleCount: number;
}

export async function fetchCategories(): Promise<ApiCategoryFull[]> {
  const res = await client.get("/api/categories");
  return res.data.data;
}
