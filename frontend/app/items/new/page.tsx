import { Card } from "antd";
import BackButton from "@/components/BackButton";
import { Title } from "@/components/Typography";
import NewItemForm from "./NewItemForm";

export default async function NewItemPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <div
        style={{
          maxWidth: 768,
          margin: "0 auto",
          padding: "32px 24px",
        }}
      >
        {/* 戻るリンク */}
        <div style={{ marginBottom: 24 }}>
          <BackButton variant="default" label="フィードに戻る" />
        </div>

        {/* ページタイトル */}
        <Title level={1} style={{ marginBottom: 32 }}>
          新しい記事を追加
        </Title>

        {/* フォームカード */}
        <Card>
          <NewItemForm />
        </Card>
      </div>
    </main>
  );
}
