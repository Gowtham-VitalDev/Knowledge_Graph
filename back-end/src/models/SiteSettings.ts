import { Schema, model, Document, Types } from "mongoose";

export interface ISiteSettings extends Document {
  homepageHeroTitle: string;
  homepageHeroSubtitle: string;
  featuredArticleId?: Types.ObjectId;
  newsletterEnabled: boolean;
  maintenanceMode: boolean;
  seoDefaults: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    homepageHeroTitle:    { type: String, default: "" },
    homepageHeroSubtitle: { type: String, default: "" },
    featuredArticleId:    { type: Schema.Types.ObjectId, ref: "Article" },
    newsletterEnabled:    { type: Boolean, default: true },
    maintenanceMode:      { type: Boolean, default: false },
    seoDefaults: {
      metaTitle:       { type: String, default: "" },
      metaDescription: { type: String, default: "" },
      keywords:        { type: [String], default: [] },
    },
  },
  { timestamps: { createdAt: false, updatedAt: true } }
);

export const SiteSettings = model<ISiteSettings>("SiteSettings", SiteSettingsSchema);
