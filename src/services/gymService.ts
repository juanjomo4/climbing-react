import api from "./api";
import type { Gym } from "../types";

export const getGyms = (params?: {
  country?: string;
  city?: string;
  type?: string;
  name?: string;
}) => api.get<Gym[]>("/gyms", { params });

export const getGymById = (id: number) => api.get<Gym>(`/gyms/${id}`);
