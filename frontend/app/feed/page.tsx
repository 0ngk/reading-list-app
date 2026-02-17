import { ReelFeed } from "@/components/reel";
import { fetchArticles } from "@/lib/fetch";
import type { ItemType } from "@/types/item";

export default async function FeedPage({
  searchParams,
}: {
  searchParams: Promise<{ article?: string }>;
}) {
  const { article: initialArticleId } = await searchParams;

  let items: ItemType[];
  try {
    items = await fetchArticles();
  } catch {
    return (
      <main
        style={{
          minHeight: "100dvh",
          backgroundColor: "#000",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>記事の取得に失敗しました。</p>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main
        style={{
          minHeight: "100dvh",
          backgroundColor: "#0f172a",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <p style={{ fontSize: 18, fontWeight: 500 }}>まだ記事がありません</p>
        <a
          href="/items/new"
          style={{
            color: "#f97316",
            textDecoration: "none",
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          最初の記事を追加する
        </a>
      </main>
    );
  }

  return <ReelFeed items={items} initialArticleId={initialArticleId} />;
}
