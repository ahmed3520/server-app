import mongoose, { Schema, Document } from "mongoose";

export interface IExplorerItem extends Document {
  id: number;
  parentId: number | null;
  name: string;
  isFolder: boolean;
  contentId?: string;
  title?: string;
  cover?: string;
  author?: string;
  items: Array<IExplorerItem>;
}

const explorerItemSchema: Schema = new Schema({
  id: { type: Number, required: true },
  parentId: { type: Number, default: null },
  name: { type: String, required: true },
  isFolder: { type: Boolean, required: true },
  contentId: { type: String },
  title: { type: String },
  cover: { type: String },
  author: { type: String },
  items: [
    {
      type: Number,
      ref: "ExplorerItem",
      refPath: "items.id",
    },
  ],
});

const ExplorerItem = mongoose.model<IExplorerItem>(
  "ExplorerItem",
  explorerItemSchema
);

export default ExplorerItem;
