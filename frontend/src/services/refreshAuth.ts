import Cookies from "js-cookie";
import { HttpClient } from "./HttpClient";

export const setAuthHeader = (instance: HttpClient) => {
  const token = Cookies.get("jwtToken");
  if (token) instance.setAuthToken(token);
};
