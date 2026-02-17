"use client";

import {
  BookOutlined,
  LinkOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import type { ItemType } from "@/types/item";

type ReelOverlayProps = {
  item: ItemType;
};

export default function ReelOverlay({ item }: ReelOverlayProps) {
  const [expanded, setExpanded] = useState(false);
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
          <h3 className="reel-overlay-title">{item.title}</h3>
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
