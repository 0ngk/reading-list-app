"use client";

import { useEffect } from "react";

const PROGRESS_SEGMENT_KEYS = [
  "seg-1",
  "seg-2",
  "seg-3",
  "seg-4",
  "seg-5",
  "seg-6",
] as const;
const SLIDE_LINE_WIDTHS = ["78%", "92%", "70%"] as const;
const OVERLAY_TITLE_WIDTHS = ["86%", "58%"] as const;

export default function FeedLoading() {
  useEffect(() => {
    document.body.classList.add("feed-active");
    return () => document.body.classList.remove("feed-active");
  }, []);

  return (
    <main className="reel-loading-stage" aria-busy="true">
      <output className="reel-loading-sr-only" aria-live="polite">
        記事を読み込み中...
      </output>

      <div
        className="desktop-reel-frame reel-loading-frame-shell"
        aria-hidden="true"
      >
        <div className="desktop-reel-phone reel-loading-phone-shell">
          <div className="reel-feed reel-loading-feed">
            <section className="reel-article reel-loading-article">
              <div className="reel-progress reel-loading-progress">
                {PROGRESS_SEGMENT_KEYS.map((key, index) => (
                  <span
                    key={key}
                    className={`reel-loading-segment${index === 0 ? " is-active" : ""}`}
                  />
                ))}
              </div>

              <div className="reel-loading-slide">
                <div className="reel-loading-slide-glow" />
                <div className="reel-loading-emoji reel-loading-shimmer" />

                <div className="reel-loading-lines">
                  {SLIDE_LINE_WIDTHS.map((width) => (
                    <span
                      key={`slide-line-${width}`}
                      className="reel-loading-line reel-loading-shimmer"
                      style={{ width }}
                    />
                  ))}
                </div>

                <div className="reel-loading-caption-pill reel-loading-shimmer" />
              </div>

              <div className="reel-overlay reel-loading-overlay-shell">
                <div className="reel-overlay-glass reel-loading-overlay-glass">
                  <div className="reel-loading-chip-row">
                    <span className="reel-loading-chip reel-loading-shimmer" />
                    <span className="reel-loading-chip reel-loading-shimmer is-ghost" />
                  </div>

                  <div className="reel-loading-overlay-title">
                    {OVERLAY_TITLE_WIDTHS.map((width) => (
                      <span
                        key={`overlay-line-${width}`}
                        className="reel-loading-line reel-loading-shimmer is-title"
                        style={{ width }}
                      />
                    ))}
                  </div>

                  <div className="reel-loading-overlay-footer">
                    <span className="reel-loading-line reel-loading-shimmer reel-loading-url-line" />

                    <div className="reel-loading-actions">
                      <span className="reel-loading-action reel-loading-shimmer" />
                      <span className="reel-loading-action reel-loading-shimmer" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
