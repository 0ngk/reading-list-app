import { fetchItemById } from "@/lib/fetch";

export default async function Item({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await fetchItemById(id);
  return (
    <div>
      <h1>Item Page</h1>
      <p>Item ID: {item.id}</p>
      <p>Title: {item.title}</p>
      <p>Original URL: {item.originalUrl}</p>
      <p>AI Summary: {item.aiSummary}</p>
    </div>
  );
}
