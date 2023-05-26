import mongoose from "mongoose";
import { Image } from "../types/Image";
const imageSchema = new mongoose.Schema<Image>({
  name: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

export default mongoose.model<Image>("image", imageSchema);
