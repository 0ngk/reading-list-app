"use client";

import { useScrollSnap } from "@/hooks/useScrollSnap";
import type { ItemType } from "@/types/item";
import ReelOverlay from "./ReelOverlay";
import ReelProgress from "./ReelProgress";
import ReelSlide from "./ReelSlide";

type ReelArticleProps = {
  item: ItemType;
  index: number;
  setRef: (el: HTMLElement | null) => void;
};

export default function ReelArticle({ item, index, setRef }: ReelArticleProps) {
  const { currentIndex, containerRef, setItemRef } = useScrollSnap(
    item.aiSummary.length,
    { direction: "horizontal" },
  );

  return (
    <section
      ref={setRef}
      data-snap-index={index}
      className="reel-article"
      aria-label={`記事: ${item.title}`}
    >
      <section
        ref={containerRef as React.RefObject<HTMLDivElement>}
        className="reel-slides"
        aria-roledescription="carousel"
        aria-label={`AI要約: 全${item.aiSummary.length}枚`}
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

      <ReelProgress total={item.aiSummary.length} current={currentIndex} />

      <ReelOverlay item={item} />
    </section>
  );
}
