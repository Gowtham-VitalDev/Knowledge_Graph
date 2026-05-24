import { Schema, model, Document } from "mongoose";

export interface ITag extends Document {
  name: string;
  slug: string;
  description: string;
  usageCount: number;
  createdAt: Date;
}

const TagSchema = new Schema<ITag>(
  {
    name:        { type: String, required: true },
    slug:        { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    usageCount:  { type: Number, default: 0 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Tag = model<ITag>("Tag", TagSchema);
