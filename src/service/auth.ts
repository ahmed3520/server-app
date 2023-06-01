import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "../utils/findUserByEmail";
import { Response } from "../types/Response";
import { createUserInDb } from "../utils/createUserInDb";
import UserModel from "../model/user";

export async function login(
  email: string,
  password: string
): Promise<Response> {
  const userData = await findUserByEmail(email);
  if (userData) {
    console.log("password", password, userData.password);
    console.log(await bcrypt.compare(password, userData.password));
  }
  if (
    !userData ||
    !(await bcrypt.compare(password, userData.password)) ||
    email !== userData.email
  ) {
    return { type: "Error", message: "Invalid Credentials", statusCode: 400 };
  }
  const token = jwt.sign(
    { user_id: userData._id, email },
    process.env.TOKEN_KEY as string,
    {
      expiresIn: "15 days",
    }
  );
  userData.token = token;
  return {
    type: "Success",
    statusCode: 200,
    message: "User is authenticated successfully",
    response: userData,
  };
}

export async function createUser(req: any): Promise<Response> {
  const { email, password, role, country, name } = req.body;
  const adminEmail = req.user && req.user.email;
  const getAdminInfo = await findUserByEmail(adminEmail);

  if (getAdminInfo && getAdminInfo.role !== "admin") {
    return {
      type: "Error",
      message: "Unauthorized: Only admins can create new users",
      statusCode: 401,
    };
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return {
      type: "Error",
      message: "User already exists",
      statusCode: 400,
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await createUserInDb(
    email,
    hashedPassword,
    role,
    name,
    country
  );

  return {
    type: "Success",
    statusCode: 201,
    message: "User created successfully",
    response: newUser,
  };
}
export async function updateUser(
  id: string,
  updatedUser: any
): Promise<Response> {
  try {
    // update user in database
    // this is just an example and will vary depending on your database and setup
    const result = await UserModel.findByIdAndUpdate(id, updatedUser, {
      new: true,
    });
    return {
      type: "Success",
      message: "User updated successfully",
      statusCode: 200,
      response: result,
    };
  } catch (error) {
    return {
      type: "Error",
      message: "Something went wrong",
      statusCode: 500,
    };
  }
}

export async function deleteUser(id: string): Promise<Response> {
  try {
    // delete user from database
    await UserModel.findByIdAndDelete(id);
    return {
      type: "Success",
      message: "User deleted successfully",
      statusCode: 200,
    };
  } catch (error) {
    return {
      type: "Error",
      message: "Error while deleting user record",
      statusCode: 500,
    };
  }
}
