import express from "express";
import * as auth from "../middleware/auth";
import { loginController } from "../controller/auth";
const router = express.Router();
router.get("/ping", (req: any, res: any) => {
  res.send("pong");
});
router.post("/login", loginController);

export default router;
