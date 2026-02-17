"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { config } from "@/lib/config";

// フォーム状態の型定義
export interface CreateItemState {
  errors?: {
    text?: string[];
    originalUrl?: string[];
    _form?: string[];
  };
  success?: boolean;
}

// Problem Details 形式のエラーレスポンス
interface ProblemDetails {
  title: string;
  status: number;
  detail?: string;
}

interface ValidationProblemDetails extends ProblemDetails {
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

export async function createItemAction(
  _prevState: CreateItemState | undefined,
  formData: FormData,
): Promise<CreateItemState> {
  // FormDataからテキスト取得
  const textValue = formData.get("text");

  // 型チェック（null/File を除外）
  if (!textValue || typeof textValue !== "string") {
    return {
      errors: {
        text: ["テキストを入力してください"],
      },
    };
  }

  const text = textValue.trim();

  // 空文字チェック
  if (!text) {
    return {
      errors: {
        text: ["テキストを入力してください"],
      },
    };
  }

  // originalUrl の取得（任意）
  const originalUrlValue = formData.get("originalUrl");
  const originalUrl =
    typeof originalUrlValue === "string" ? originalUrlValue.trim() : "";

  // リクエストボディの構築
  const body: { text: string; originalUrl?: string } = { text };
  if (originalUrl) {
    body.originalUrl = originalUrl;
  }

  // バックエンドAPIへのリクエスト
  const apiUrl = config.apiUrl;
  let shouldRedirect = false;

  try {
    const response = await fetch(`${apiUrl}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const contentType = response.headers.get("content-type");

      // Problem Details 形式のエラー処理
      if (contentType?.includes("application/problem+json")) {
        const problemDetails: ProblemDetails | ValidationProblemDetails =
          await response.json();

        // バリデーションエラーの場合
        if ("errors" in problemDetails && problemDetails.errors) {
          const errors = problemDetails.errors
            .map((error) => `${error.field}: ${error.message}`)
            .join("\n");
          return {
            errors: {
              _form: [`入力エラー:\n${errors}`],
            },
          };
        }

        // 一般的なAPIエラー
        return {
          errors: {
            _form: [problemDetails.detail || problemDetails.title],
          },
        };
      }

      // Problem Details 形式でない場合
      return {
        errors: {
          _form: [`サーバーエラーが発生しました (${response.status})`],
        },
      };
    }

    // 成功
    await response.json();
    shouldRedirect = true;
  } catch (error) {
    // ネットワークエラー
    if (error instanceof TypeError && error.message.includes("fetch")) {
      return {
        errors: {
          _form: ["ネットワーク接続を確認してください"],
        },
      };
    }

    // その他のエラー
    return {
      errors: {
        _form: ["記事の追加に失敗しました"],
      },
    };
  }

  // 成功時の処理（try/catch の外）
  if (shouldRedirect) {
    // キャッシュをクリア
    revalidatePath("/feed");
    // リダイレクト（NEXT_REDIRECT エラーを投げる）
    redirect("/feed");
  }

  // この行には到達しないが、TypeScript のために必要
  return { success: true };
}
