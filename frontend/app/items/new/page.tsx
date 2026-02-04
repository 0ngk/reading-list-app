"use client";

import { Info, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import BackButton from "@/components/BackButton";
import { createItem } from "@/lib/fetch";

interface FormData {
  title: string;
  url: string;
}

interface FormErrors {
  title?: string;
  url?: string;
}

export default function NewItemPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    url: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // タイトルのバリデーション
    if (!formData.title.trim()) {
      newErrors.title = "タイトルを入力してください";
    } else if (formData.title.length > 200) {
      newErrors.title = "タイトルは200文字以内で入力してください";
    }

    // URLのバリデーション
    if (!formData.url.trim()) {
      newErrors.url = "URLを入力してください";
    } else {
      try {
        new URL(formData.url);
      } catch {
        newErrors.url = "有効なURLを入力してください";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await createItem({
        title: formData.title,
        url: formData.url,
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
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto px-6 py-8 md:px-8">
        {/* 戻るリンク */}
        <BackButton
          variant="default"
          label="ダッシュボードに戻る"
          className="mb-6"
        />

        {/* ページタイトル */}
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          新しい記事を追加
        </h1>

        {/* フォームカード */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* タイトル */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                タイトル <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.title
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-slate-200"
                }`}
                placeholder="記事のタイトルを入力してください"
                aria-invalid={!!errors.title}
                aria-describedby={errors.title ? "title-error" : undefined}
              />
              {errors.title && (
                <p id="title-error" className="mt-1 text-xs text-red-500">
                  {errors.title}
                </p>
              )}
            </div>

            {/* URL */}
            <div>
              <label
                htmlFor="url"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="url"
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.url
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-slate-200"
                }`}
                placeholder="https://example.com/article"
                aria-invalid={!!errors.url}
                aria-describedby={errors.url ? "url-error" : undefined}
              />
              {errors.url && (
                <p id="url-error" className="mt-1 text-xs text-red-500">
                  {errors.url}
                </p>
              )}
            </div>

            {/* AI要約の注意書き */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <Info size={20} className="text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-700">
                AI要約は記事追加後に自動生成されます
              </p>
            </div>

            {/* 送信エラー */}
            {submitError && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
                <p className="text-sm text-red-700">{submitError}</p>
              </div>
            )}

            {/* ボタン */}
            <div className="flex gap-4 pt-4">
              <BackButton
                variant="form"
                label="キャンセル"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>追加中...</span>
                ) : (
                  <>
                    <span>追加する</span>
                    <Plus size={20} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
