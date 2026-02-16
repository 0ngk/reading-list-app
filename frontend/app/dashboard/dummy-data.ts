import type { ItemType } from "@/types/item";

export const dummyItems: ItemType[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    title: "Example Item 1",
    originalUrl: "https://example.com/item1",
    aiSummary: [{ emoji: "📖", text: "This is a summary for Example Item 1." }],
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    title: "Example Item 2",
    originalUrl: "https://example.com/item2",
    aiSummary: [{ emoji: "📖", text: "This is a summary for Example Item 2." }],
  },
];
