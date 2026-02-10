"use client";

import {
  CloseOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Alert, Button, Card, Form, Input, Space } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import BackButton from "@/components/BackButton";
import { Title } from "@/components/Typography";
import { ApiError, NetworkError } from "@/lib/api-error";
import { createItem } from "@/lib/fetch";

interface FormData {
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
        url: values.url,
      });

      // 成功時はダッシュボードにリダイレクト
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof ApiError) {
        setSubmitError(error.getUserMessage());
      } else if (error instanceof NetworkError) {
        setSubmitError("ネットワーク接続を確認してください");
      } else {
        setSubmitError("記事の追加に失敗しました");
      }
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
              description="記事のタイトルとAI要約は自動生成されます"
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
                  icon={<CloseOutlined />}
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
