import { UserResponse } from "@/types/UserTypes";
import { HttpClient } from "./HttpClient";

const authApi = new HttpClient({
  baseUrl: "http://localhost:3000/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = async (email: string, password: string) => {
  try {
    const userResponse = await authApi.post("/sign-in", { email, password });
    return userResponse.data as UserResponse;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};

export const registerUser = async (name: string, cpf: string, email: string, password: string) => {
  try {
    const userResponse = await authApi.post("/register", { name, email, cpf, password });
    return userResponse.data;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};
