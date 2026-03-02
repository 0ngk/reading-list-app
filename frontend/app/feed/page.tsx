import Link from "next/link";
import { ReelFeed } from "@/components/reel";
import { fetchArticles } from "@/lib/fetch";
import type { ItemType } from "@/types/item";

const sleep = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

export default async function FeedPage({
  searchParams,
}: {
  searchParams: Promise<{ article?: string; debugDelayMs?: string }>;
}) {
  const { article: initialArticleId, debugDelayMs } = await searchParams;

  const parsedDebugDelayMs = Number.parseInt(debugDelayMs ?? "", 10);
  if (Number.isFinite(parsedDebugDelayMs) && parsedDebugDelayMs > 0) {
    // loading.tsx の表示確認用。クエリで明示したときだけ遅延させる。
    await sleep(Math.min(parsedDebugDelayMs, 10_000));
  }

  let items: ItemType[];
  try {
    items = await fetchArticles();
  } catch {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-black text-white">
        <p>記事の取得に失敗しました。</p>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-slate-900 text-white">
        <p className="text-lg font-medium">まだ記事がありません</p>
        <Link
          href="/items/new"
          className="text-base font-semibold text-orange-500 no-underline transition-colors hover:text-orange-400"
        >
          最初の記事を追加する
        </Link>
      </main>
    );
  }

  return <ReelFeed items={items} initialArticleId={initialArticleId} />;
}
