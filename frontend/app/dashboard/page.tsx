import ItemList from "@/components/ItemList";
import { fetchArticles } from "@/lib/fetch";
import type { ItemType } from "@/types/item";

export default async function Dashboard() {
  let items: ItemType[];
  try {
    items = await fetchArticles();
  } catch {
    return (
      <main style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "32px 24px",
          }}
        >
          <p>記事の取得に失敗しました。</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "32px 24px",
        }}
      >
        <ItemList items={items} />
      </div>
    </main>
  );
}
