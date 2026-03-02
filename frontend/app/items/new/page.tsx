import NewItemForm from "./NewItemForm";

export default async function NewItemPage() {
  return (
    <main className="min-h-dvh bg-slate-900 text-white">
      <div className="mx-auto max-w-3xl px-6 py-8 pb-[calc(2rem+76px+env(safe-area-inset-bottom))] md:pb-8">
        {/* ページタイトル */}
        <h1 className="mb-8 text-[28px] font-bold leading-tight text-white">
          新しい記事を追加
        </h1>

        {/* フォームカード */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-6 backdrop-blur-md">
          <NewItemForm />
        </div>
      </div>
    </main>
  );
}
