export type ItemType = {
  id: string;
  title: string;
  originalUrl?: string;
  aiSummary: { emoji: string; text: string }[];
};
