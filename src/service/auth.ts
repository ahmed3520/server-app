import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "../utils/findUserByEmail";
import { Response } from "../types/Response";
export async function login(
  email: string,
  password: string
): Promise<Response> {
  const userData = await findUserByEmail(email);
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
