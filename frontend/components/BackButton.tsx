"use client";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
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

  if (variant === "form") {
    // フォーム内ボタン（button要素 + useRouter）
    return (
      <Button
        type="default"
        onClick={() => router.push(href)}
        disabled={disabled}
        className={className}
        aria-label={label}
        style={{ flex: 1 }}
      >
        {label}
      </Button>
    );
  }

  if (variant === "text") {
    // テキストリンク
    return (
      <Link href={href} style={{ textDecoration: "none" }}>
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
    <Link href={href} style={{ textDecoration: "none" }}>
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
