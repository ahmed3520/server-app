import mongoose, { Document, Schema } from "mongoose";

export interface IFileContent extends Document {
  fileId: number;
  title: string;
  cover: string;
  text: string;
}

const fileContentSchema: Schema<IFileContent> = new mongoose.Schema({
  fileId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  cover: {
    type: String,
    required: false,
  },
  text: {
    type: String,
    required: false,
  },
});

export const FileContent = mongoose.model<IFileContent>(
  "FileContent",
  fileContentSchema
);
