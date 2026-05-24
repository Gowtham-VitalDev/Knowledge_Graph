import { Schema, model, Document, Types } from "mongoose";

export interface ITrendingRanking extends Document {
  articleId: Types.ObjectId;
  weekStartDate: Date;
  rank: number;
  score: number;
  categoryId?: Types.ObjectId;
}

const TrendingRankingSchema = new Schema<ITrendingRanking>(
  {
    articleId:     { type: Schema.Types.ObjectId, ref: "Article", required: true },
    weekStartDate: { type: Date, required: true },
    rank:          { type: Number, required: true },
    score:         { type: Number, default: 0 },
    categoryId:    { type: Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: false }
);

TrendingRankingSchema.index({ weekStartDate: 1, rank: 1 });

export const TrendingRanking = model<ITrendingRanking>("TrendingRanking", TrendingRankingSchema);
