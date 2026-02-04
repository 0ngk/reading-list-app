"use client";

import { InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Form, Input, Space } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import BackButton from "@/components/BackButton";
import { Title } from "@/components/Typography";
import { createItem } from "@/lib/fetch";

interface FormData {
  title: string;
  url: string;
}

export default function NewItemPage() {
  const router = useRouter();
  const [form] = Form.useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleFinish = async (values: FormData) => {
    setSubmitError("");
    setIsSubmitting(true);

    try {
      await createItem({
        title: values.title,
        url: values.url,
      });

      // 成功時はダッシュボードにリダイレクト
      router.push("/dashboard");
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "記事の追加に失敗しました",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <BackButton variant="default" label="ダッシュボードに戻る" />
        </div>

        {/* ページタイトル */}
        <Title level={1} style={{ marginBottom: 32 }}>
          新しい記事を追加
        </Title>

        {/* フォームカード */}
        <Card>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            requiredMark="optional"
          >
            {/* タイトル */}
            <Form.Item
              label="タイトル"
              name="title"
              rules={[
                { required: true, message: "タイトルを入力してください" },
                {
                  max: 200,
                  message: "タイトルは200文字以内で入力してください",
                },
              ]}
            >
              <Input
                placeholder="記事のタイトルを入力してください"
                disabled={isSubmitting}
              />
            </Form.Item>

            {/* URL */}
            <Form.Item
              label="URL"
              name="url"
              rules={[
                { required: true, message: "URLを入力してください" },
                { type: "url", message: "有効なURLを入力してください" },
              ]}
            >
              <Input
                type="url"
                placeholder="https://example.com/article"
                disabled={isSubmitting}
              />
            </Form.Item>

            {/* AI要約の注意書き */}
            <Alert
              description="AI要約は記事追加後に自動生成されます"
              type="info"
              icon={<InfoCircleOutlined />}
              showIcon
              style={{ marginBottom: 24 }}
            />

            {/* 送信エラー */}
            {submitError && (
              <Alert
                description={submitError}
                type="error"
                showIcon
                style={{ marginBottom: 24 }}
              />
            )}

            {/* ボタン */}
            <Form.Item style={{ marginBottom: 0 }}>
              <Space style={{ width: "100%", display: "flex" }}>
                <BackButton
                  variant="form"
                  label="キャンセル"
                  disabled={isSubmitting}
                />
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isSubmitting}
                  icon={!isSubmitting ? <PlusOutlined /> : undefined}
                  size="large"
                  className="ant-btn-cta"
                  style={{ flex: 1 }}
                >
                  {isSubmitting ? "追加中..." : "追加する"}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </main>
  );
}
