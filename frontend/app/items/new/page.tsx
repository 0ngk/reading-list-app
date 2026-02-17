import BackButton from "@/components/BackButton";
import NewItemForm from "./NewItemForm";

export default async function NewItemPage() {
  return (
    <main className="new-item-page">
      <div className="new-item-container">
        {/* 戻るリンク */}
        <div style={{ marginBottom: 24 }}>
          <BackButton variant="text" label="フィードに戻る" />
        </div>

        {/* ページタイトル */}
        <h1 className="new-item-title">新しい記事を追加</h1>

        {/* フォームカード */}
        <div className="new-item-card">
          <NewItemForm />
        </div>
      </div>
    </main>
  );
}
