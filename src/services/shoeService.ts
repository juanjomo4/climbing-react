import api from "./api";
import type { ClimbingShoe } from "../types";

export const getShoes = (params?: {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}) => api.get<ClimbingShoe[]>("/shoes", { params });

export const getShoeById = (id: number) =>
  api.get<ClimbingShoe>(`/shoes/${id}`);

export const getHighlightedShoes = () =>
  api.get<ClimbingShoe[]>("/shoes/highlighted");
