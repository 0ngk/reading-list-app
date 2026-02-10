import type { ItemType } from "@/types/item";
import { apiClient } from "./api-client";

export const fetchItemById = (id: string) => {
  return {
    id,
    title: `Item foo`,
    originalUrl: `https://example.com/item`,
    aiSummary: `This is a summary.`,
  };
};

interface CreateItemData {
  url: string;
}

interface CreateArticleRequest {
  originalUrl: string;
}

interface CreateArticleResponse {
  id: string;
  title: string;
  originalUrl: string;
  aiSummary: string;
}

export const createItem = async (data: CreateItemData): Promise<ItemType> => {
  const request: CreateArticleRequest = {
    originalUrl: data.url,
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
