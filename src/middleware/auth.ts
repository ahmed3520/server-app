import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: string | object;
    }
  }
}

const config = process.env;

const verifyToken = (req: any, res: any, next: NextFunction): void => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    res.status(403).json({
      type: "Error",
      message: "A token is required for authentication",
      statusCode: 403,
    });
    return;
  }
  try {
    const decoded = jwt.verify(token as string, config.TOKEN_KEY as string);
    console.log("decoded", decoded);
    req.user = decoded;
  } catch (err) {
    res
      .status(401)
      .json({ type: "Error", message: "Invalid Token", statusCode: 401 });
    return;
  }
  next();
};

export default verifyToken;
