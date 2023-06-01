import mongoose from "mongoose";
import { baseContentSchema } from "./baseContent";
import { Document } from "../types/Doc";
const documentSchema = new mongoose.Schema<Document>(
  {
    ...baseContentSchema.obj,
    category: { type: String, required: true },
  },
  { timestamps: true }
);

export const DocumentModel = mongoose.model<Document>(
  "Document",
  documentSchema
);
