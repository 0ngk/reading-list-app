import type { ItemType } from "@/types/item";
import { apiClient } from "./api-client";

export const fetchItemById = async (id: string): Promise<ItemType> => {
  return apiClient.get<ItemType>(`/articles/${id}`);
};

interface CreateItemData {
  text: string;
  originalUrl?: string;
}

interface CreateArticleRequest {
  text: string;
  originalUrl?: string;
}

interface CreateArticleResponse {
  id: string;
  title: string;
  originalUrl?: string;
  aiSummary: string;
}

export const fetchArticles = async (): Promise<ItemType[]> => {
  const response = await apiClient.get<ItemType[]>("/articles");
  return response;
};

export const createItem = async (data: CreateItemData): Promise<ItemType> => {
  const request: CreateArticleRequest = {
    text: data.text,
    ...(data.originalUrl ? { originalUrl: data.originalUrl } : {}),
  };

  const response = await apiClient.post<CreateArticleResponse>(
    "/articles",
    request,
  );

  return {
    id: response.id,
    title: response.title,
    originalUrl: response.originalUrl,
    aiSummary: response.aiSummary,
  };
};
