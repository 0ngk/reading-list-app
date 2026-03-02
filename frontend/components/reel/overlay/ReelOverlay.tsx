"use client";

import {
  BookOutlined,
  CommentOutlined,
  LinkOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import type { ItemType } from "@/types/item";
import { useTitleMarquee } from "../hooks/useTitleMarquee";

type ReelOverlayProps = {
  item: ItemType;
  isFocused: boolean;
  slideIndex: number;
  commentCount: number;
  onOpenComments: () => void;
};

export default function ReelOverlay({
  item,
  isFocused,
  slideIndex,
  commentCount,
  onOpenComments,
}: ReelOverlayProps) {
  const [expanded, setExpanded] = useState(false);
  const { titleMaskRef, titleTextRef, isMarquee, marqueeStyle } =
    useTitleMarquee({
      isFocused,
      slideIndex,
    });
  const toggleExpanded = () => setExpanded((prev) => !prev);
  const overlayContainerClass =
    "absolute inset-x-0 bottom-0 z-20 cursor-pointer bg-gradient-to-b from-transparent to-black/70 px-4 pb-[calc(24px+env(safe-area-inset-bottom))]";
  const overlayGlassClass = `w-full rounded-2xl border-0 px-4 py-[14px] text-left [backdrop-filter:blur(16px)] [-webkit-backdrop-filter:blur(16px)] transition-all duration-300 motion-reduce:transition-none ${
    expanded ? "bg-black/40 p-4" : "bg-black/25"
  }`;
  const titleTextClass = `inline-block max-w-full whitespace-nowrap will-change-transform ${
    isMarquee
      ? "animate-[reel-title-marquee_var(--title-marquee-duration,_8s)_linear_infinite] [animation-delay:0.8s] motion-reduce:animate-none"
      : ""
  }`;
  const actionButtonClass =
    "flex h-11 w-11 items-center justify-center rounded-full border-0 bg-white/15 text-lg text-white transition-colors duration-200 hover:bg-white/25 motion-reduce:transition-none";

  return (
    <div className={overlayContainerClass}>
      <div className={overlayGlassClass}>
        <button
          type="button"
          className="block w-full min-w-0 cursor-pointer border-0 bg-transparent p-0 text-left [font:inherit] text-inherit"
          onClick={toggleExpanded}
          onKeyDown={(e) => {
            if (e.key === "Escape") setExpanded(false);
          }}
          aria-expanded={expanded}
          aria-label="記事情報を表示"
        >
          <h3 className="m-0 overflow-hidden text-base leading-[1.4] font-semibold text-white">
            <span
              ref={titleMaskRef}
              className="block max-w-full overflow-hidden"
            >
              <span
                ref={titleTextRef}
                className={titleTextClass}
                style={marqueeStyle}
              >
                {item.title}
              </span>
            </span>
          </h3>
        </button>

        {expanded && (
          <div className="mt-3 flex flex-col gap-3">
            {item.originalUrl && (
              <a
                href={item.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] text-white/80 no-underline transition-colors duration-200 hover:text-white motion-reduce:transition-none"
                onClick={(e) => e.stopPropagation()}
              >
                <LinkOutlined />
                {new URL(item.originalUrl).hostname.replace("www.", "")}
              </a>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                className={`${actionButtonClass} relative`}
                aria-label={`コメント ${commentCount}件`}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenComments();
                }}
              >
                <CommentOutlined />
                {commentCount > 0 && (
                  <span className="pointer-events-none absolute -top-1 -right-1 h-[18px] min-w-[18px] rounded-[9px] bg-orange-500 px-[5px] text-center text-[11px] leading-[18px] font-bold text-white">
                    {commentCount}
                  </span>
                )}
              </button>
              <button
                type="button"
                className={actionButtonClass}
                aria-label="ブックマーク"
                onClick={(e) => e.stopPropagation()}
              >
                <BookOutlined />
              </button>
              <button
                type="button"
                className={actionButtonClass}
                aria-label="共有"
                onClick={(e) => e.stopPropagation()}
              >
                <ShareAltOutlined />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
