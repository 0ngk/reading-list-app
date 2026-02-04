"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  href?: string;
  label?: string;
  variant?: "default" | "text" | "form";
  disabled?: boolean;
  className?: string;
}

export default function BackButton({
  href = "/dashboard",
  label = "戻る",
  variant = "default",
  disabled = false,
  className = "",
}: BackButtonProps) {
  const router = useRouter();

  // 共通スタイル
  const baseStyles =
    "inline-flex items-center gap-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500";

  if (variant === "form") {
    // フォーム内ボタン（button要素 + useRouter）
    const formStyles = `${baseStyles} flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-full hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed ${className}`;

    return (
      <button
        type="button"
        onClick={() => router.push(href)}
        disabled={disabled}
        className={formStyles}
        aria-label={label}
      >
        {label}
      </button>
    );
  }

  if (variant === "text") {
    // テキストリンク
    const textStyles = `${baseStyles} text-slate-600 hover:text-slate-900 ${className}`;

    return (
      <Link href={href} className={textStyles} aria-label={label}>
        <ArrowLeft size={20} />
        <span>{label}</span>
      </Link>
    );
  }

  // default: ボタン風
  const defaultStyles = `${baseStyles} px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 shadow-sm ${className}`;

  return (
    <Link href={href} className={defaultStyles} aria-label={label}>
      <ArrowLeft className="w-4 h-4" />
      {label}
    </Link>
  );
}
