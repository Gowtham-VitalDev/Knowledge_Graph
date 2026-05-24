import { Schema, model, Document, Types } from "mongoose";

export interface IArticle extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  categoryId: Types.ObjectId;
  tagIds: Types.ObjectId[];
  authorId: Types.ObjectId;
  status: "draft" | "published" | "archived";
  featured: boolean;
  trendingScore: number;
  readTime: number;
  views: number;
  likes: number;
  shares: number;
  bookmarks: number;
  seoTitle: string;
  seoDescription: string;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema<IArticle>(
  {
    title:          { type: String, required: true },
    slug:           { type: String, required: true, unique: true },
    excerpt:        { type: String, default: "" },
    content:        { type: String, default: "" },
    coverImage:     { type: String, default: "" },
    categoryId:     { type: Schema.Types.ObjectId, ref: "Category", required: true },
    tagIds:         [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    authorId:       { type: Schema.Types.ObjectId, ref: "User", required: true },
    status:         { type: String, enum: ["draft", "published", "archived"], default: "draft" },
    featured:       { type: Boolean, default: false },
    trendingScore:  { type: Number, default: 0 },
    readTime:       { type: Number, default: 0 },
    views:          { type: Number, default: 0 },
    likes:          { type: Number, default: 0 },
    shares:         { type: Number, default: 0 },
    bookmarks:      { type: Number, default: 0 },
    seoTitle:       { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    publishedAt:    { type: Date },
  },
  { timestamps: true }
);

ArticleSchema.index({ categoryId: 1 });
ArticleSchema.index({ status: 1, publishedAt: -1 });
ArticleSchema.index({ trendingScore: -1 });

export const Article = model<IArticle>("Article", ArticleSchema);
