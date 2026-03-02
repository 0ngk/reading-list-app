"use client";

import {
  CloseOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useActionState, useEffect } from "react";
import BackButton from "@/components/buttons/BackButton";
import { createItemAction } from "./actions";

interface FormData {
  text: string;
  originalUrl?: string;
}

const fieldClassName =
  "w-full !rounded-lg !border-white/[0.15] !bg-white/[0.06] !px-4 !py-3 !text-base !text-white placeholder:!text-white/40 hover:!border-white/[0.25] focus:!border-blue-400/60 focus:!bg-white/[0.1] focus:!shadow-[0_0_0_3px_rgba(59,130,246,0.2)] disabled:!cursor-not-allowed disabled:!opacity-50";

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
      requiredMark={false}
      className="[&_.ant-form-item-explain-error]:!text-red-300"
    >
      {/* テキスト */}
      <Form.Item
        label={<span className="font-medium text-white/90">テキスト</span>}
        name="text"
        rules={[{ required: true, message: "テキストを入力してください" }]}
      >
        <Input.TextArea
          rows={8}
          placeholder="記事の内容を入力してください"
          disabled={isPending}
          className={`${fieldClassName} !min-h-[200px] !leading-relaxed`}
        />
      </Form.Item>

      {/* URL（任意） */}
      <Form.Item
        label={
          <span className="font-medium text-white/90">
            URL
            <span className="ml-2 text-xs font-normal text-white/50">任意</span>
          </span>
        }
        name="originalUrl"
        rules={[{ type: "url", message: "有効なURLを入力してください" }]}
      >
        <Input
          type="url"
          placeholder="https://example.com/article"
          disabled={isPending}
          className={fieldClassName}
        />
      </Form.Item>

      {/* AI要約の注意書き */}
      <div className="mb-6 flex items-start gap-3 rounded-lg border border-blue-400/30 bg-blue-500/15 px-4 py-3.5 text-sm leading-6 text-white/85">
        <InfoCircleOutlined className="mt-0.5 shrink-0 text-base text-blue-300" />
        <span>タイトルとAI要約はテキストの内容から自動生成されます</span>
      </div>

      {/* 送信エラー */}
      {state?.errors?._form && (
        <div className="mb-6 rounded-lg border border-red-400/30 bg-red-500/15 px-4 py-3.5 text-sm leading-6 text-white/90">
          <span>{state.errors._form[0]}</span>
        </div>
      )}

      {/* ボタン */}
      <Form.Item className="!mb-0">
        <div className="flex w-full gap-3">
          <BackButton
            variant="form"
            label="キャンセル"
            disabled={isPending}
            icon={<CloseOutlined />}
            className="!border-white/20 !bg-white/10 !text-white hover:!border-white/30 hover:!bg-white/15"
          />
          <Button
            type="primary"
            htmlType="submit"
            loading={isPending}
            icon={!isPending ? <PlusOutlined /> : undefined}
            size="large"
            className="!flex-1 !border-orange-500 !bg-orange-500 !text-white hover:!border-orange-600 hover:!bg-orange-600 active:!border-orange-600 active:!bg-orange-600"
          >
            {isPending ? "追加中..." : "追加する"}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}
