import { Request, Response, NextFunction } from "express";
import { Response as CustomResponse } from "../types/Response";
import { deleteUser, login } from "../service/auth";
import verifyToken from "../middleware/auth";
import { findUserByEmail } from "../utils/findUserByEmail";
import UserModel from "../model/user";
import { updateUser } from "../service/auth";
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
import { createUser } from "../service/auth";

export async function createUserController(req: any, res: any) {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).json({
      type: "Error",
      message:
        "Bad request params - you need to provide an email and a password",
      statusCode: 400,
    });
  }

  const { type, message, statusCode, response } = await createUser(req);

  return res.status(statusCode).json({
    type,
    message,
    response,
  });
}
export async function validateToken(req: any, res: any) {
  if (!req.user) {
    return res.status(401).json({
      type: "Error",
      message: "Invalid Token",
      statusCode: 401,
    });
  }
  const statusCode = 200;
  const type = "Success";
  const message = "User object retrieved successfully";
  const user = await findUserByEmail(req.user.email);
  if (user) {
    user.password = "";
  }
  return res.status(statusCode).json({
    type,
    message,
    response: user,
  });
}

export async function getUsersController(req: any, res: any) {
  try {
    const users = await UserModel.find();
    return res.status(200).json({
      type: "Success",
      message: "Users retrieved successfully",
      response: users,
    });
  } catch (error) {
    console.error("Failed to get users:", error);
    return res.status(500).json({
      type: "Error",
      message: (error as Error).message,
    });
  }
}

export async function updateUserController(req: any, res: any) {
  const { id, updatedUser } = req.body;
  console.log("id:", id, "updatedUser:", updatedUser);
  if (!(id && updatedUser)) {
    return res.status(400).json({
      type: "Error",
      message:
        "Bad request params - you need to provide an id and an updated user",
      statusCode: 400,
    });
  }
  const { type, message, statusCode, response }: CustomResponse =
    await updateUser(id, updatedUser);

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
export async function deleteUserController(req: any, res: any) {
  const { id } = req.body;
  console.log("id:", id);
  if (!id) {
    return res.status(400).json({
      type: "Error",
      message: "Bad request params - you need to provide an id",
      statusCode: 400,
    });
  }
  const { type, message, statusCode }: CustomResponse = await deleteUser(id);

  if (type === "Error") {
    return res.status(statusCode).json({ type, message });
  }
  return res.status(statusCode).json({
    type,
    message,
  });
}
