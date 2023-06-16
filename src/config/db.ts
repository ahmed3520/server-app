import mongoose from "mongoose";

export const connect = (): void => {
  // Connecting to the database
  console.log(
    "process.env.MONGO_URI=>",
    process.env.MONGO_URI,
    process.env.API_PORT
  );
  mongoose
    .connect(process.env.MONGO_URI as string, {})
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB Error => ", err));
};
