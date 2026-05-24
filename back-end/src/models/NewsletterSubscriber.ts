import { Schema, model, Document } from "mongoose";

export interface INewsletterSubscriber extends Document {
  email: string;
  source: "homepage" | "footer" | "popup";
  isActive: boolean;
  subscribedAt: Date;
  unsubscribedAt?: Date;
}

const NewsletterSubscriberSchema = new Schema<INewsletterSubscriber>(
  {
    email:            { type: String, required: true, unique: true },
    source:           { type: String, enum: ["homepage", "footer", "popup"], default: "homepage" },
    isActive:         { type: Boolean, default: true },
    subscribedAt:     { type: Date, default: Date.now },
    unsubscribedAt:   { type: Date },
  },
  { timestamps: false }
);

export const NewsletterSubscriber = model<INewsletterSubscriber>("NewsletterSubscriber", NewsletterSubscriberSchema);
