import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  username: string;
  email: string;
  passwordHash: string;
  role: "reader" | "author" | "editor" | "admin";
  bio: string;
  avatarUrl: string;
  socialLinks: {
    twitter: string;
    linkedin: string;
    github: string;
    website: string;
  };
  expertise: string[];
  isVerified: boolean;
  status: "active" | "suspended";
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
}

const UserSchema = new Schema<IUser>(
  {
    fullName:     { type: String, required: true },
    username:     { type: String, required: true, unique: true },
    email:        { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role:         { type: String, enum: ["reader", "author", "editor", "admin"], default: "reader" },
    bio:          { type: String, default: "" },
    avatarUrl:    { type: String, default: "" },
    socialLinks: {
      twitter:  { type: String, default: "" },
      linkedin: { type: String, default: "" },
      github:   { type: String, default: "" },
      website:  { type: String, default: "" },
    },
    expertise:  { type: [String], default: [] },
    isVerified: { type: Boolean, default: false },
    status:     { type: String, enum: ["active", "suspended"], default: "active" },
    lastLogin:  { type: Date },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", UserSchema);
