import mongoose from "mongoose";
import { User } from "../types/User";
const userSchema = new mongoose.Schema<User>({
  name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  country: { type: String },
  image: { type: String },
  token: { type: String },
  role: { type: String, enum: ["admin", "user"], required: true },
});

export default mongoose.model<User>("user", userSchema);
