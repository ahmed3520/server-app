import UserModel from "../model/user";

export async function findUserByEmail(email: string) {
  try {
    const user = await UserModel.findOne({ email });
    console.log("user finded email:", user);
    return user;
  } catch (err) {
    console.error(err);
    return null;
  }
}
