import { Schema, model, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  description: string;
  icon: string;
  colorCode: string;
  articleCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name:         { type: String, required: true },
    slug:         { type: String, required: true, unique: true },
    description:  { type: String, default: "" },
    icon:         { type: String, default: "" },
    colorCode:    { type: String, default: "" },
    articleCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Category = model<ICategory>("Category", CategorySchema);
