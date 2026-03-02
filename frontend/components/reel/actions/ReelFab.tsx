"use client";

import { PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

export default function ReelFab() {
  const router = useRouter();

  return (
    <button
      type="button"
      className="fixed right-5 bottom-[calc(24px+env(safe-area-inset-bottom))] z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-0 bg-orange-500 text-2xl text-white shadow-[0_4px_20px_rgba(249,115,22,0.4)] transition-[transform,box-shadow] duration-200 hover:scale-[1.08] hover:shadow-[0_6px_24px_rgba(249,115,22,0.5)] active:scale-95 motion-reduce:transition-none md:bottom-6"
      onClick={() => router.push("/items/new")}
      aria-label="記事を追加"
    >
      <PlusOutlined />
    </button>
  );
}
