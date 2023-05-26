import mongoose from "mongoose";

export const connect = (): void => {
  // Connecting to the database
  mongoose
    .connect(process.env.MONGO_URI as string, {})
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB Error => ", err));
};
