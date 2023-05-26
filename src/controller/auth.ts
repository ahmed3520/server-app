import { Request, Response } from "express";
import { Response as CustomResponse } from "../types/Response";
import { login } from "../service/auth";

export async function loginController(req: any, res: any) {
  const { email, password } = req.body;
  console.log("email:", email, "password:", password);
  if (!(email && password)) {
    return res.status(400).json({
      type: "Error",
      message:
        "Bad request params - you need to provide an email and a password",
      statusCode: 400,
    });
  }
  const { type, message, statusCode, response }: CustomResponse = await login(
    email,
    password
  );

  if (type === "Error") {
    return res.status(statusCode).json({ type, message });
  }
  console.log("res", response);
  return res.status(statusCode).json({
    type,
    message,
    response,
  });
}
