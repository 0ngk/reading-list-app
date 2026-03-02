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

  return (
    <div className={`reel-overlay ${expanded ? "expanded" : "compact"}`}>
      <div className="reel-overlay-glass">
        <button
          type="button"
          className="reel-overlay-trigger"
          onClick={toggleExpanded}
          onKeyDown={(e) => {
            if (e.key === "Escape") setExpanded(false);
          }}
          aria-expanded={expanded}
          aria-label="記事情報を表示"
        >
          <h3 className="reel-overlay-title">
            <span ref={titleMaskRef} className="reel-overlay-title-mask">
              <span
                ref={titleTextRef}
                className={`reel-overlay-title-text ${
                  isMarquee ? "is-marquee" : ""
                }`}
                style={marqueeStyle}
              >
                {item.title}
              </span>
            </span>
          </h3>
        </button>

        {expanded && (
          <div className="reel-overlay-details">
            {item.originalUrl && (
              <a
                href={item.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="reel-overlay-url"
                onClick={(e) => e.stopPropagation()}
              >
                <LinkOutlined />
                {new URL(item.originalUrl).hostname.replace("www.", "")}
              </a>
            )}

            <div className="reel-overlay-actions">
              <button
                type="button"
                className="reel-action-btn reel-action-btn-comment"
                aria-label={`コメント ${commentCount}件`}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenComments();
                }}
              >
                <CommentOutlined />
                {commentCount > 0 && (
                  <span className="reel-comment-badge">{commentCount}</span>
                )}
              </button>
              <button
                type="button"
                className="reel-action-btn"
                aria-label="ブックマーク"
                onClick={(e) => e.stopPropagation()}
              >
                <BookOutlined />
              </button>
              <button
                type="button"
                className="reel-action-btn"
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
