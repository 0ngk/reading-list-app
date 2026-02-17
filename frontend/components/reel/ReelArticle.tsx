"use client";

import { useRef } from "react";
import { useScrollSnap } from "@/hooks/useScrollSnap";
import type { ItemType } from "@/types/item";
import ReelOverlay from "./ReelOverlay";
import ReelProgress from "./ReelProgress";
import ReelSlide from "./ReelSlide";

type ReelArticleProps = {
  item: ItemType;
  index: number;
  isFocused: boolean;
  setRef: (el: HTMLElement | null) => void;
};

export default function ReelArticle({
  item,
  index,
  isFocused,
  setRef,
}: ReelArticleProps) {
  const { currentIndex, scrollTo, containerRef, setItemRef } = useScrollSnap(
    item.aiSummary.length,
    { direction: "horizontal" },
  );
  const pointerDownPos = useRef<{ x: number; y: number } | null>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
    pointerDownPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLElement>) => {
    if (!pointerDownPos.current) return;
    const dx = e.clientX - pointerDownPos.current.x;
    const dy = e.clientY - pointerDownPos.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    pointerDownPos.current = null;

    // スワイプやドラッグの場合は無視（10px以上の移動）
    if (distance > 10) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    if (clickX < rect.width / 2) {
      // 左半分: 前のスライドへ
      if (currentIndex > 0) scrollTo(currentIndex - 1);
    } else {
      // 右半分: 次のスライドへ
      if (currentIndex < item.aiSummary.length - 1) scrollTo(currentIndex + 1);
    }
  };

  return (
    <section
      ref={setRef}
      data-snap-index={index}
      className="reel-article"
      aria-label={`記事: ${item.title}`}
    >
      <ReelProgress total={item.aiSummary.length} current={currentIndex} />

      <section
        ref={containerRef as React.RefObject<HTMLDivElement>}
        className="reel-slides"
        aria-roledescription="carousel"
        aria-label={`AI要約: 全${item.aiSummary.length}枚`}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        {item.aiSummary.map((sentence, i) => (
          <ReelSlide
            key={sentence.text.slice(0, 16)}
            emoji={sentence.emoji}
            text={sentence.text}
            index={i}
            totalSlides={item.aiSummary.length}
            setRef={setItemRef(i)}
          />
        ))}
      </section>

      <ReelOverlay
        item={item}
        isFocused={isFocused}
        slideIndex={currentIndex}
      />
    </section>
  );
}
