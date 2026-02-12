"use client";

import {
  CloseOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Alert, Button, Form, Input, Space } from "antd";
import { useActionState, useEffect } from "react";
import BackButton from "@/components/BackButton";
import { createItemAction } from "./actions";

interface FormData {
  text: string;
  originalUrl?: string;
}

export default function NewItemForm() {
  const [form] = Form.useForm<FormData>();
  const [state, formAction, isPending] = useActionState(
    createItemAction,
    undefined,
  );

  // Server Action からのエラーを Form に反映
  useEffect(() => {
    if (state?.errors?.text) {
      form.setFields([{ name: "text", errors: state.errors.text }]);
    }
    if (state?.errors?.originalUrl) {
      form.setFields([
        { name: "originalUrl", errors: state.errors.originalUrl },
      ]);
    }
  }, [state?.errors?.text, state?.errors?.originalUrl, form]);

  const handleFinish = async (values: FormData) => {
    // FormData を構築
    const formData = new FormData();
    formData.append("text", values.text);
    if (values.originalUrl) {
      formData.append("originalUrl", values.originalUrl);
    }

    // Server Action を呼び出し
    formAction(formData);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      requiredMark="optional"
    >
      {/* テキスト */}
      <Form.Item
        label="テキスト"
        name="text"
        rules={[{ required: true, message: "テキストを入力してください" }]}
      >
        <Input.TextArea
          rows={10}
          placeholder="記事の内容を入力してください"
          disabled={isPending}
        />
      </Form.Item>

      {/* URL（任意） */}
      <Form.Item
        label="URL"
        name="originalUrl"
        rules={[
          { type: "url", message: "有効なURLを入力してください" },
        ]}
      >
        <Input
          type="url"
          placeholder="https://example.com/article"
          disabled={isPending}
        />
      </Form.Item>

      {/* AI要約の注意書き */}
      <Alert
        description="タイトルとAI要約はテキストの内容から自動生成されます"
        type="info"
        icon={<InfoCircleOutlined />}
        showIcon
        style={{ marginBottom: 24 }}
      />

      {/* 送信エラー */}
      {state?.errors?._form && (
        <Alert
          description={state.errors._form[0]}
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
            disabled={isPending}
            icon={<CloseOutlined />}
          />
          <Button
            type="primary"
            htmlType="submit"
            loading={isPending}
            icon={!isPending ? <PlusOutlined /> : undefined}
            size="large"
            className="ant-btn-cta"
            style={{ flex: 1 }}
          >
            {isPending ? "追加中..." : "追加する"}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
