"use client";

import { useEffect } from "react";
import { useScrollSnap } from "@/hooks/useScrollSnap";
import type { ItemType } from "@/types/item";
import ReelArticle from "./ReelArticle";

type ReelFeedProps = {
  items: ItemType[];
  initialArticleId?: string;
};

export default function ReelFeed({ items, initialArticleId }: ReelFeedProps) {
  const { currentIndex, scrollTo, containerRef, setItemRef } = useScrollSnap(
    items.length,
    { direction: "vertical" },
  );

  // feed-active クラスをbodyに付与
  useEffect(() => {
    document.body.classList.add("feed-active");
    return () => document.body.classList.remove("feed-active");
  }, []);

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
    <div className="desktop-reel-frame">
      <div className="desktop-reel-phone">
        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className="reel-feed"
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
