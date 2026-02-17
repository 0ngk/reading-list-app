"use client";

import {
  BookOutlined,
  LinkOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import type { ItemType } from "@/types/item";

type ReelOverlayProps = {
  item: ItemType;
  isFocused: boolean;
  slideIndex: number;
};

export default function ReelOverlay({
  item,
  isFocused,
  slideIndex,
}: ReelOverlayProps) {
  const [expanded, setExpanded] = useState(false);
  const [titleMarquee, setTitleMarquee] = useState({
    enabled: false,
    distance: 0,
    duration: 0,
  });
  const titleMaskRef = useRef<HTMLSpanElement>(null);
  const titleTextRef = useRef<HTMLSpanElement>(null);
  const toggleExpanded = () => setExpanded((prev) => !prev);

  useEffect(() => {
    const updateMarquee = () => {
      const maskEl = titleMaskRef.current;
      const textEl = titleTextRef.current;
      if (!maskEl || !textEl) return;

      const overflow = textEl.scrollWidth > maskEl.clientWidth + 1;
      if (!overflow) {
        setTitleMarquee({ enabled: false, distance: 0, duration: 0 });
        return;
      }

      const distance = textEl.scrollWidth - maskEl.clientWidth;
      const duration = Math.max(6, distance / 30);
      setTitleMarquee({
        enabled: true,
        distance,
        duration,
      });
    };

    updateMarquee();
    const resizeObserver = new ResizeObserver(updateMarquee);
    if (titleMaskRef.current) resizeObserver.observe(titleMaskRef.current);
    if (titleTextRef.current) resizeObserver.observe(titleTextRef.current);
    window.addEventListener("resize", updateMarquee);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateMarquee);
    };
  }, []);

  useEffect(() => {
    const textEl = titleTextRef.current;
    if (!textEl) return;
    if (slideIndex < 0) return;

    // フォーカス移動時にタイトル位置を先頭へ戻す
    textEl.style.animation = "none";
    textEl.style.transform = "translateX(0)";

    if (!isFocused || !titleMarquee.enabled) return;

    const rafId = requestAnimationFrame(() => {
      textEl.style.animation = "";
      textEl.style.transform = "";
    });

    return () => cancelAnimationFrame(rafId);
  }, [isFocused, slideIndex, titleMarquee.enabled]);

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
                  titleMarquee.enabled ? "is-marquee" : ""
                }`}
                style={
                  titleMarquee.enabled
                    ? ({
                        "--title-marquee-distance": `${titleMarquee.distance}px`,
                        "--title-marquee-duration": `${titleMarquee.duration}s`,
                      } as CSSProperties)
                    : undefined
                }
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
