import type { ItemType } from "@/types/item";

export const fetchItemById = (id: number) => {
  return {
    id,
    title: `Item foo`,
    originalUrl: `https://example.com/item`,
    aiSummary: `This is a summary.`,
  };
};

interface CreateItemData {
  title: string;
  url: string;
}

export const createItem = async (data: CreateItemData): Promise<ItemType> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    id: Date.now(),
    title: data.title,
    originalUrl: data.url,
    aiSummary: "AI要約を生成中...",
  };
};
