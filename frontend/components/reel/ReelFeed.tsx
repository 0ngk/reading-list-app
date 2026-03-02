"use client";

import { useEffect } from "react";
import { useScrollSnap } from "@/hooks/useScrollSnap";
import type { ItemType } from "@/types/item";
import ReelArticle from "./article/ReelArticle";
import { useFeedBodyClasses } from "./hooks/useFeedBodyClasses";

type ReelFeedProps = {
  items: ItemType[];
  initialArticleId?: string;
};

export default function ReelFeed({ items, initialArticleId }: ReelFeedProps) {
  const { currentIndex, scrollTo, containerRef, setItemRef } = useScrollSnap(
    items.length,
    { direction: "vertical" },
  );

  useFeedBodyClasses();

  // 初期表示時に指定記事にスクロール
  useEffect(() => {
    if (!initialArticleId) return;
    const index = items.findIndex((item) => item.id === initialArticleId);
    if (index > 0) {
      // 初回レンダリング後にスクロール
      requestAnimationFrame(() => scrollTo(index));
    }
  }, [initialArticleId, items, scrollTo]);

  // URLを現在の記事IDで更新
  useEffect(() => {
    const currentItem = items[currentIndex];
    if (!currentItem) return;
    const url = new URL(window.location.href);
    url.searchParams.set("article", currentItem.id);
    window.history.replaceState(null, "", url.toString());
  }, [currentIndex, items]);

  return (
    <div className="h-dvh md:flex md:items-center md:justify-center md:bg-slate-900">
      <div className="h-full md:relative md:h-[min(844px,calc(100dvh-48px))] md:w-[390px] md:overflow-hidden md:rounded-[24px] md:[box-shadow:0_0_0_8px_#1e293b,0_25px_50px_rgba(0,0,0,0.5)]">
        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className="h-[calc(100dvh-76px-env(safe-area-inset-bottom))] overflow-x-hidden overflow-y-auto [scroll-snap-type:y_mandatory] [overscroll-behavior-y:contain] scroll-smooth motion-reduce:scroll-auto [-ms-overflow-style:none] [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden md:h-full"
        >
          {items.map((item, i) => (
            <ReelArticle
              key={item.id}
              item={item}
              index={i}
              isFocused={i === currentIndex}
              setRef={setItemRef(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
