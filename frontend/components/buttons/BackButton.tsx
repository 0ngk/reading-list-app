"use client";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

interface BackButtonProps {
  href?: string;
  label?: string;
  variant?: "default" | "text" | "form";
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
}

export default function BackButton({
  href = "/feed",
  label = "戻る",
  variant = "default",
  disabled = false,
  className = "",
  icon,
}: BackButtonProps) {
  const router = useRouter();

  if (variant === "form") {
    // フォーム内ボタン（button要素 + useRouter）
    return (
      <Button
        type="default"
        onClick={() => router.push(href)}
        disabled={disabled}
        size="large"
        className={`!flex-1 ${className}`}
        aria-label={label}
        icon={icon}
      >
        {label}
      </Button>
    );
  }

  if (variant === "text") {
    // テキストリンク
    return (
      <Link href={href} className="no-underline">
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          disabled={disabled}
          className={className}
          aria-label={label}
        >
          {label}
        </Button>
      </Link>
    );
  }

  // default: ボタン風
  return (
    <Link href={href} className="no-underline">
      <Button
        type="default"
        icon={<ArrowLeftOutlined />}
        disabled={disabled}
        className={className}
        aria-label={label}
      >
        {label}
      </Button>
    </Link>
  );
}
