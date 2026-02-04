export const fetchItemById = (id: number) => {
  return {
    id,
    title: `Item foo`,
    originalUrl: `https://example.com/item`,
    aiSummary: `This is a summary.`,
  };
};
