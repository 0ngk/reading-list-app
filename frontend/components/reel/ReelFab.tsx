"use client";

import { PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

export default function ReelFab() {
  const router = useRouter();

  return (
    <button
      type="button"
      className="reel-fab"
      onClick={() => router.push("/items/new")}
      aria-label="記事を追加"
    >
      <PlusOutlined />
    </button>
  );
}
