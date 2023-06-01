import mongoose from "mongoose";
import { baseContentSchema } from "./baseContent";
import { BlogPost } from "../types/BlogPost";

const blogPostSchema = new mongoose.Schema<BlogPost>(
  {
    ...baseContentSchema.obj,
    tags: [String],
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const BlogPostModel = mongoose.model<BlogPost>(
  "BlogPost",
  blogPostSchema
);
