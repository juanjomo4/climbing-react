import api from "./api";
import type { News } from "../types";

export const getNews = (params?: { categoria?: string; search?: string }) =>
  api.get<News[]>("/news", { params });

export const getNewsById = (id: number) => api.get<News>(`/news/${id}`);

export const getHighlightedNews = () => api.get<News[]>("/news/highlighted");

export const getCategories = () => api.get<string[]>("/news/categories");
