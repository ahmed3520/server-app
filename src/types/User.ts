export interface User {
  name: string | null;
  email: string;
  password: string;
  country: string;
  image: string;
  token: string;
  role: "admin" | "user";
}
