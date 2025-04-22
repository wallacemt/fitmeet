import Cookies from "js-cookie";
import { HttpClient } from "./HttpClient";
import {
  ActivitiesPaginatedResponse,
  ActivityResponse,
  ActivityType,
  ActivityTypeNew,
  Participant,
} from "@/types/ActivityData";
import { setAuthHeader } from "./refreshAuth";

const token = Cookies.get("jwtToken");

const activitiesApi = new HttpClient({
  baseUrl: "http://localhost:3000/activities",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export const getAllActivities = async (): Promise<ActivityResponse[]> => {
  try {
    setAuthHeader(activitiesApi);
    const response = await activitiesApi.get<ActivityResponse[]>("/all");
    return response.data;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};

export const getActivitiesPag = async (): Promise<ActivitiesPaginatedResponse> => {
  try {
    setAuthHeader(activitiesApi);
    const response = await activitiesApi.get<ActivitiesPaginatedResponse>("");
    return response.data;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};

export const getActivityById = async (id: string): Promise<ActivityResponse> => {
  try {
    setAuthHeader(activitiesApi);
    const response = await activitiesApi.get(`/${id}`);

    return response.data as ActivityResponse;
  } catch (err: any) {
    console.log(err);
    throw err;
  }
};

export const getActivitiesType = async (): Promise<ActivityType[]> => {
  try {
    setAuthHeader(activitiesApi);
    const response = await activitiesApi.get<ActivityType[]>("/types");
    return response.data;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};

export const getActivityByType = async (id: string): Promise<ActivityResponse[]> => {
  try {
    setAuthHeader(activitiesApi);
    const response = await activitiesApi.get<ActivityResponse[]>(`/types/${id}`);
    return response.data;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};

export const getUserActivities = async (): Promise<ActivitiesPaginatedResponse> => {
  try {
    setAuthHeader(activitiesApi);
    const response = await activitiesApi.get<ActivitiesPaginatedResponse>("/user/creator");
    return response.data;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};

export const getUserParticipantActivities = async (): Promise<ActivitiesPaginatedResponse> => {
  try {
    setAuthHeader(activitiesApi);
    const response = await activitiesApi.get<ActivitiesPaginatedResponse>("/user/participant");
    return response.data;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};

export const createActivity = async (activity: ActivityTypeNew): Promise<ActivityResponse> => {
  try {
    const activityCreate = new HttpClient({
      baseUrl: "http://localhost:3000/activities/new",
    });
    setAuthHeader(activityCreate);

    const formData = new FormData();
    formData.append("title", activity.title);
    formData.append("description", activity.description);
    formData.append("address", activity.address.join(","));
    formData.append("typeId", activity.typeId);
    formData.append("scheduledDate", activity.scheduledDate.toString());
    formData.append("private", activity.private.toString());
    formData.append("image", activity.imageFile);

    console.log("formData", Object.fromEntries(formData));

    const response = await activityCreate.post<ActivityResponse>("", formData);

    return response.data;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};

export const editActivity = async (activity: ActivityTypeNew, activityId: string): Promise<ActivityResponse> => {
  try {
    const activityCreate = new HttpClient({
      baseUrl: `http://localhost:3000/activities/${activityId}/update`,
    });
    setAuthHeader(activityCreate);

    const formData = new FormData();
    formData.append("title", activity.title);
    formData.append("description", activity.description);
    formData.append("address", activity.address.join(","));
    formData.append("typeId", activity.typeId);
    formData.append("scheduledDate", activity.scheduledDate.toString());
    formData.append("private", activity.private.toString());
    if (activity.imageFile) {
      formData.append("image", activity.imageFile);
    }

    console.log("formData", Object.fromEntries(formData));

    const response = await activityCreate.put<ActivityResponse>("", formData);

    return response.data;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};

export const getActivityParticipant = async (activityId: string): Promise<Participant[] | undefined> => {
  try {
    setAuthHeader(activitiesApi);
    const response = await activitiesApi.get<Participant[]>(`/${activityId}/participants`);
    return response.data;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};

export const cancelActivity = async (actId: string): Promise<string> => {
  try {
    setAuthHeader(activitiesApi);
    const response = await activitiesApi.delete(`/${actId}/delete`);
    return response.data as string;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};

export const activitySubscribe = async (actId: string) => {
  try {
    setAuthHeader(activitiesApi);
    const response = await activitiesApi.post(`/${actId}/subscribe`);
    return response.data as string;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
}