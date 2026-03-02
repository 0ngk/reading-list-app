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
        className="desktop-reel-frame reel-loading-frame-shell h-dvh md:flex md:items-center md:justify-center md:bg-slate-900"
        aria-hidden="true"
      >
        <div className="desktop-reel-phone reel-loading-phone-shell h-full md:relative md:h-[min(844px,calc(100dvh-48px))] md:w-[390px] md:overflow-hidden md:rounded-[24px] md:[box-shadow:0_0_0_8px_#1e293b,0_25px_50px_rgba(0,0,0,0.5)]">
          <div className="reel-feed reel-loading-feed h-[calc(100dvh-76px-env(safe-area-inset-bottom))] overflow-x-hidden overflow-y-auto [scroll-snap-type:y_mandatory] [overscroll-behavior-y:contain] scroll-smooth motion-reduce:scroll-auto [-ms-overflow-style:none] [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden md:h-dvh">
            <section className="reel-article reel-loading-article relative h-[calc(100dvh-76px-env(safe-area-inset-bottom))] snap-start [scroll-snap-stop:always] overflow-hidden md:h-dvh">
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
