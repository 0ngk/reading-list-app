"use client";

import { useScrollSnap } from "@/hooks/useScrollSnap";
import type { ItemType } from "@/types/item";
import { useSlideTapNavigation } from "../hooks/useSlideTapNavigation";
import ReelOverlay from "../overlay/ReelOverlay";
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
  const totalSlides = item.aiSummary.length;
  const { currentIndex, scrollTo, containerRef, setItemRef } = useScrollSnap(
    totalSlides,
    { direction: "horizontal" },
  );
  const { onPointerDown, onPointerUp } = useSlideTapNavigation({
    currentIndex,
    totalSlides,
    scrollTo,
  });

  return (
    <section
      ref={setRef}
      data-snap-index={index}
      className="reel-article"
      aria-label={`記事: ${item.title}`}
    >
      <ReelProgress total={totalSlides} current={currentIndex} />

      <section
        ref={containerRef as React.RefObject<HTMLDivElement>}
        className="reel-slides"
        aria-roledescription="carousel"
        aria-label={`AI要約: 全${totalSlides}枚`}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {item.aiSummary.map((sentence, i) => (
          <ReelSlide
            key={sentence.text.slice(0, 16)}
            emoji={sentence.emoji}
            text={sentence.text}
            index={i}
            totalSlides={totalSlides}
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
