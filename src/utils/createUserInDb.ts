import UserModel from "../model/user";

export async function createUserInDb(
  email: string,
  hashedPassword: string,
  role: "admin" | "user",
  name: string,
  country?: string
) {
  const user = await UserModel.create({
    name,
    email: email.toLowerCase(), // sanitize: convert email to lowercase
    password: hashedPassword,
    role,
    country,
  });
  return user;
}
