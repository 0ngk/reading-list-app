"use client";

import { useCallback, useState } from "react";
import { useScrollSnap } from "@/hooks/useScrollSnap";
import type { ItemType } from "@/types/item";
import ReelCommentsSheet from "../comments/ReelCommentsSheet";
import type { ReelComment } from "../comments/types";
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

  const [comments, setComments] = useState<ReelComment[]>([]);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [draft, setDraft] = useState("");

  const handleOpenComments = useCallback(() => setIsCommentsOpen(true), []);
  const handleCloseComments = useCallback(() => setIsCommentsOpen(false), []);

  const handleSubmitComment = useCallback(() => {
    const body = draft.trim();
    if (body.length === 0 || body.length > 280) return;
    const newComment: ReelComment = {
      id: crypto.randomUUID(),
      articleId: item.id,
      authorName: "あなた",
      body,
      createdAt: Date.now(),
      isMine: true,
    };
    setComments((prev) => [...prev, newComment]);
    setDraft("");
  }, [draft, item.id]);

  const handleDeleteComment = useCallback((commentId: string) => {
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  }, []);

  return (
    <section
      ref={setRef}
      data-snap-index={index}
      className="reel-article relative h-[calc(100dvh-76px-env(safe-area-inset-bottom))] snap-start [scroll-snap-stop:always] overflow-hidden md:h-dvh"
      aria-label={`記事: ${item.title}`}
    >
      <ReelProgress total={totalSlides} current={currentIndex} />

      <section
        ref={containerRef as React.RefObject<HTMLDivElement>}
        className="reel-slides flex h-full w-full cursor-pointer overflow-x-auto overflow-y-hidden [scroll-snap-type:x_mandatory] [overscroll-behavior-x:contain] scroll-smooth motion-reduce:scroll-auto [-ms-overflow-style:none] [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
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
        commentCount={comments.length}
        onOpenComments={handleOpenComments}
      />

      <ReelCommentsSheet
        open={isCommentsOpen}
        itemTitle={item.title}
        comments={comments}
        draft={draft}
        onDraftChange={setDraft}
        onSubmit={handleSubmitComment}
        onDelete={handleDeleteComment}
        onClose={handleCloseComments}
      />
    </section>
  );
}
