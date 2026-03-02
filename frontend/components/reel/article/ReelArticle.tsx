"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollSnap } from "@/hooks/useScrollSnap";
import type { ItemType } from "@/types/item";
import ReelCommentsSheet from "../comments/ReelCommentsSheet";
import type { ReelComment } from "../comments/types";
import { useAutoAdvance } from "../hooks/useAutoAdvance";
import { useSlideTapNavigation } from "../hooks/useSlideTapNavigation";
import {
  EDGE_SWIPE_THRESHOLD,
  EDGE_TRANSITION_COOLDOWN_MS,
  EDGE_WHEEL_THRESHOLD,
} from "../model/constants";
import ReelOverlay from "../overlay/ReelOverlay";
import ReelProgress from "./ReelProgress";
import ReelSlide from "./ReelSlide";

type ReelArticleProps = {
  item: ItemType;
  index: number;
  isFocused: boolean;
  setRef: (el: HTMLElement | null) => void;
  canGoPrevArticle: boolean;
  canGoNextArticle: boolean;
  onRequestPrevArticle: () => void;
  onRequestNextArticle: () => void;
  entryResetToken: number;
  onCommentsOpenChange: (articleId: string, open: boolean) => void;
};

export default function ReelArticle({
  item,
  index,
  isFocused,
  setRef,
  canGoPrevArticle,
  canGoNextArticle,
  onRequestPrevArticle,
  onRequestNextArticle,
  entryResetToken,
  onCommentsOpenChange,
}: ReelArticleProps) {
  const totalSlides = item.aiSummary.length;
  const lastSlideIndex = totalSlides - 1;
  const { currentIndex, scrollTo, containerRef, setItemRef } = useScrollSnap(
    totalSlides,
    { direction: "horizontal" },
  );
  const [comments, setComments] = useState<ReelComment[]>([]);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [isPointerDown, setIsPointerDown] = useState(false);
  const lastEdgeTransitionAtRef = useRef(0);
  const wheelEdgeDeltaRef = useRef(0);
  const handledEntryResetTokenRef = useRef(entryResetToken);

  // コメント開閉を親に通知
  useEffect(() => {
    onCommentsOpenChange(item.id, isCommentsOpen);
  }, [isCommentsOpen, item.id, onCommentsOpenChange]);

  // アンマウント時にロック取り残し防止
  useEffect(() => {
    return () => {
      onCommentsOpenChange(item.id, false);
    };
  }, [item.id, onCommentsOpenChange]);

  const tryEdgeTransition = useCallback(
    (direction: "prev" | "next") => {
      if (!isFocused || isCommentsOpen) return false;
      const now = Date.now();
      if (now - lastEdgeTransitionAtRef.current < EDGE_TRANSITION_COOLDOWN_MS) {
        return false;
      }

      if (direction === "prev") {
        if (!canGoPrevArticle) return false;
        onRequestPrevArticle();
      } else {
        if (!canGoNextArticle) return false;
        onRequestNextArticle();
      }

      lastEdgeTransitionAtRef.current = now;
      wheelEdgeDeltaRef.current = 0;
      return true;
    },
    [
      canGoNextArticle,
      canGoPrevArticle,
      isCommentsOpen,
      isFocused,
      onRequestNextArticle,
      onRequestPrevArticle,
    ],
  );

  const autoAdvancePaused = !isFocused || isCommentsOpen || isPointerDown;

  const { progress, timerKey } = useAutoAdvance({
    currentIndex,
    paused: autoAdvancePaused,
    onAdvance: () => {
      if (currentIndex < lastSlideIndex) {
        scrollTo(currentIndex + 1);
      } else {
        onRequestNextArticle();
      }
    },
  });

  const { onPointerDown: onSlideTapDown, onPointerUp: onSlideTapUp } =
    useSlideTapNavigation({
      currentIndex,
      totalSlides,
      scrollTo,
      swipeThreshold: EDGE_SWIPE_THRESHOLD,
      onEdgePrev: () => {
        tryEdgeTransition("prev");
      },
      onEdgeNext: () => {
        tryEdgeTransition("next");
      },
    });

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      setIsPointerDown(true);
      onSlideTapDown(e);
    },
    [onSlideTapDown],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      setIsPointerDown(false);
      onSlideTapUp(e);
    },
    [onSlideTapUp],
  );

  const handlePointerCancelOrLeave = useCallback(() => {
    setIsPointerDown(false);
  }, []);

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

  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLElement>) => {
      if (!isFocused || isCommentsOpen) return;

      const { deltaX, deltaY } = e;
      if (Math.abs(deltaX) <= Math.abs(deltaY)) {
        wheelEdgeDeltaRef.current = 0;
        return;
      }

      const isTowardsPrev = deltaX < 0;
      const isTowardsNext = deltaX > 0;
      const canTriggerPrev = isTowardsPrev && currentIndex === 0;
      const canTriggerNext = isTowardsNext && currentIndex === lastSlideIndex;
      if (!canTriggerPrev && !canTriggerNext) {
        wheelEdgeDeltaRef.current = 0;
        return;
      }

      if (
        (wheelEdgeDeltaRef.current > 0 && deltaX < 0) ||
        (wheelEdgeDeltaRef.current < 0 && deltaX > 0)
      ) {
        wheelEdgeDeltaRef.current = 0;
      }

      wheelEdgeDeltaRef.current += deltaX;
      if (Math.abs(wheelEdgeDeltaRef.current) < EDGE_WHEEL_THRESHOLD) return;

      const transitioned = canTriggerPrev
        ? tryEdgeTransition("prev")
        : tryEdgeTransition("next");
      if (transitioned) e.preventDefault();
      wheelEdgeDeltaRef.current = 0;
    },
    [
      currentIndex,
      isCommentsOpen,
      isFocused,
      lastSlideIndex,
      tryEdgeTransition,
    ],
  );

  useEffect(() => {
    if (!isFocused) return;
    if (entryResetToken === handledEntryResetTokenRef.current) return;
    handledEntryResetTokenRef.current = entryResetToken;
    requestAnimationFrame(() => scrollTo(0));
  }, [entryResetToken, isFocused, scrollTo]);

  useEffect(() => {
    if (!isFocused || isCommentsOpen) return;

    const isTextInputLikeTarget = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false;
      if (target.isContentEditable) return true;
      const tagName = target.tagName;
      return (
        tagName === "INPUT" ||
        tagName === "TEXTAREA" ||
        tagName === "SELECT" ||
        Boolean(target.closest("[contenteditable='true']"))
      );
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented) return;
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      if (isTextInputLikeTarget(e.target)) return;

      if (e.key === "ArrowLeft") {
        if (currentIndex > 0) {
          e.preventDefault();
          scrollTo(currentIndex - 1);
          return;
        }
        if (tryEdgeTransition("prev")) e.preventDefault();
        return;
      }

      if (currentIndex < lastSlideIndex) {
        e.preventDefault();
        scrollTo(currentIndex + 1);
        return;
      }
      if (tryEdgeTransition("next")) e.preventDefault();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    currentIndex,
    isCommentsOpen,
    isFocused,
    lastSlideIndex,
    scrollTo,
    tryEdgeTransition,
  ]);

  return (
    <section
      ref={setRef}
      data-snap-index={index}
      className="relative h-[calc(100dvh-76px-env(safe-area-inset-bottom))] snap-start [scroll-snap-stop:always] overflow-hidden md:h-full"
      aria-label={`記事: ${item.title}`}
    >
      <ReelProgress
        total={totalSlides}
        current={currentIndex}
        progress={progress}
        timerKey={timerKey}
      />

      <section
        ref={containerRef as React.RefObject<HTMLDivElement>}
        className="flex h-full w-full cursor-pointer overflow-x-auto overflow-y-hidden [scroll-snap-type:x_mandatory] [overscroll-behavior-x:contain] scroll-smooth motion-reduce:scroll-auto [-ms-overflow-style:none] [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
        aria-roledescription="carousel"
        aria-label={`AI要約: 全${totalSlides}枚`}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancelOrLeave}
        onPointerLeave={handlePointerCancelOrLeave}
        onWheel={handleWheel}
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
