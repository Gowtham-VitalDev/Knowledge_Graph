import client from "./client";

export interface ApiTagFull {
  _id: string;
  name: string;
  slug: string;
  usageCount: number;
}

export async function fetchTags(): Promise<ApiTagFull[]> {
  const res = await client.get("/api/tags");
  return res.data.data;
}
