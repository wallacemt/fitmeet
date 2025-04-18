import { ActivityType } from "@/types/ActivityData";
import { HttpClient } from "./HttpClient";
import { setAuthHeader } from "./refreshAuth";

const userApi = new HttpClient({
  baseUrl: "http://localhost:3000/user",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUser = async () => {
  try {
    setAuthHeader(userApi);
    const userResponse = await userApi.get("");
    return userResponse.data;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};

export const getUserPreferences = async (): Promise<ActivityType[]> => {
  try {
    setAuthHeader(userApi);
    const response = await userApi.get<ActivityType[]>("/preferences");
    return response.data;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};

export const updateUserPreferences = async (preferences: string[]): Promise<string> => {
  try {
    setAuthHeader(userApi);
    const response = await userApi.post("/preferences/define", { typeIds: preferences });
    console.log(response.data);
    return response.data as string;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};

export const editUser = async (name: string, email: string, password: string): Promise<string> => {
  try {
    setAuthHeader(userApi);
    const response = await userApi.post("/update", { name, email, password });
    console.log(response);
    return response.data as string;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};

export const userAvatarDefine = async (avatar: File): Promise<string> => {
  try {
    const imageUpload = new HttpClient({
      baseUrl: "http://localhost:3000/user/avatar"
    });
    setAuthHeader(imageUpload);

    const formData = new FormData();
    formData.append("avatar", avatar);

    const response = await imageUpload.post("", formData);
    return response.data as string;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};



export const userDesctivateAccount = async (): Promise<string> => {
  try {
    setAuthHeader(userApi);
    const response = await userApi.delete("/desactivate", {});
    return response.data as string;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};
