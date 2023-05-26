import { connect } from "./config/db";
import cors from "cors";
import v1 from "./routes/v1";
import fileUpload from "express-fileupload";
import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
config();
connect();
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(fileUpload());
app.use("/api/v1/", v1);

export default app;
