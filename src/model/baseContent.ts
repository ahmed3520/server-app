import mongoose from "mongoose";
import { BaseContent } from "../types/BaseContent ";

export const baseContentSchema = new mongoose.Schema<BaseContent>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);
