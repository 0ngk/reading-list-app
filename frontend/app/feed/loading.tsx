"use client";

import { type CSSProperties, useEffect } from "react";

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
const SHIMMER_CLASS =
  "relative overflow-hidden after:pointer-events-none after:absolute after:inset-0 after:translate-x-[-130%] after:content-[''] after:bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.06)_35%,rgba(255,255,255,0.28)_50%,rgba(255,255,255,0.06)_65%,transparent_100%)] after:animate-[reel-loading-sweep_2s_ease-in-out_infinite] motion-reduce:after:animate-none motion-reduce:after:transition-none";

export default function FeedLoading() {
  useEffect(() => {
    document.body.classList.add("feed-active");
    return () => document.body.classList.remove("feed-active");
  }, []);

  return (
    <main
      className="relative isolate h-[calc(100dvh-76px-env(safe-area-inset-bottom))] min-h-[calc(100dvh-76px-env(safe-area-inset-bottom))] overflow-hidden bg-black before:pointer-events-none before:absolute before:-z-[1] before:left-[-48px] before:top-[12%] before:h-[240px] before:w-[240px] before:rounded-full before:opacity-80 before:blur-[48px] before:content-[''] before:bg-[radial-gradient(circle_at_30%_30%,rgba(88,28,135,0.34),transparent_70%),radial-gradient(circle_at_70%_70%,rgba(30,58,138,0.28),transparent_72%)] after:pointer-events-none after:absolute after:-z-[1] after:bottom-[14%] after:right-[-64px] after:h-[280px] after:w-[280px] after:rounded-full after:opacity-80 after:blur-[48px] after:content-[''] after:bg-[radial-gradient(circle_at_35%_35%,rgba(88,28,135,0.2),transparent_72%),radial-gradient(circle_at_60%_60%,rgba(30,58,138,0.22),transparent_76%)] md:h-dvh md:min-h-dvh"
      aria-busy="true"
    >
      <output className="sr-only" aria-live="polite">
        記事を読み込み中...
      </output>

      <div
        className="h-full md:flex md:items-center md:justify-center md:bg-slate-900"
        aria-hidden="true"
      >
        <div className="h-full md:relative md:h-[min(844px,calc(100dvh-48px))] md:w-[390px] md:overflow-hidden md:rounded-[24px] md:[box-shadow:0_0_0_8px_#1e293b,0_25px_50px_rgba(0,0,0,0.5)]">
          <div className="pointer-events-none h-[calc(100dvh-76px-env(safe-area-inset-bottom))] overflow-hidden overflow-x-hidden overflow-y-auto [scroll-snap-type:y_mandatory] [overscroll-behavior-y:contain] scroll-smooth motion-reduce:scroll-auto [-ms-overflow-style:none] [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden md:h-full">
            <section className="relative h-[calc(100dvh-76px-env(safe-area-inset-bottom))] snap-start overflow-hidden [scroll-snap-stop:always] bg-[radial-gradient(120%_100%_at_18%_10%,rgba(255,255,255,0.08),rgba(255,255,255,0)_52%),radial-gradient(120%_120%_at_55%_88%,rgba(0,0,0,0.22),rgba(0,0,0,0)_55%),linear-gradient(135deg,#581c87_0%,#1e3a8a_100%)] before:pointer-events-none before:absolute before:inset-0 before:opacity-[0.45] before:content-[''] before:bg-[length:26px_26px] before:bg-[linear-gradient(rgba(255,255,255,0.014)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.014)_1px,transparent_1px)] md:h-full">
              <div className="pointer-events-none absolute inset-x-0 top-0 z-[32] flex gap-1 px-3 pt-[calc(12px+env(safe-area-inset-top))] md:pt-3">
                {PROGRESS_SEGMENT_KEYS.map((key, index) => {
                  const segmentStyle = {
                    "--segment-delay": `${index * 0.08}s`,
                  } as CSSProperties;
                  return (
                    <span
                      key={key}
                      style={segmentStyle}
                      className={`relative block h-[3px] flex-1 overflow-hidden rounded-full after:absolute after:inset-0 after:translate-x-[-120%] after:content-[''] after:bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.12)_35%,rgba(255,255,255,0.45)_50%,rgba(255,255,255,0.12)_65%,transparent_100%)] after:animate-[reel-loading-sweep_2.2s_ease-in-out_infinite] after:[animation-delay:var(--segment-delay)] motion-reduce:after:animate-none motion-reduce:after:transition-none ${
                        index === 0 ? "bg-white/24" : "bg-white/16"
                      }`}
                    />
                  );
                })}
              </div>

              <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden px-8 pt-20 pb-40 [box-sizing:border-box] md:px-8 md:pt-[60px] md:pb-[140px]">
                <div className="absolute top-[16%] h-[min(86vw,420px)] w-[min(86vw,420px)] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.1),rgba(255,255,255,0)_65%)] opacity-[0.85] blur-2xl" />
                <div
                  className={`${SHIMMER_CLASS} mb-1.5 h-[72px] w-[72px] rounded-[22px] bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.26),transparent_62%),linear-gradient(145deg,rgba(255,255,255,0.14),rgba(255,255,255,0.08))] [box-shadow:inset_0_1px_0_rgba(255,255,255,0.14),0_16px_40px_rgba(0,0,0,0.28)]`}
                />

                <div className="flex w-[min(86%,420px)] flex-col items-center gap-3">
                  {SLIDE_LINE_WIDTHS.map((width) => (
                    <span
                      key={`slide-line-${width}`}
                      className={`${SHIMMER_CLASS} block h-3.5 rounded-full bg-white/[0.13]`}
                      style={{ width }}
                    />
                  ))}
                </div>

                <div
                  className={`${SHIMMER_CLASS} mt-2 h-2.5 w-[124px] rounded-full bg-white/[0.12]`}
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 z-20 cursor-default bg-gradient-to-b from-transparent to-black/70 px-4 pb-[calc(24px+env(safe-area-inset-bottom))] md:pb-6">
                <div className="block w-full rounded-2xl border border-white/8 bg-slate-950/35 px-4 py-[14px] text-left [box-sizing:border-box] [font:inherit] [backdrop-filter:blur(16px)] [-webkit-backdrop-filter:blur(16px)] [box-shadow:inset_0_1px_0_rgba(255,255,255,0.08),0_20px_30px_rgba(0,0,0,0.24)]">
                  <div className="mb-3 flex gap-2">
                    <span
                      className={`${SHIMMER_CLASS} h-2 w-16 rounded-full bg-white/[0.11]`}
                    />
                    <span
                      className={`${SHIMMER_CLASS} h-2 w-[42px] rounded-full bg-white/[0.11] opacity-80`}
                    />
                  </div>

                  <div className="flex flex-col gap-2.5">
                    {OVERLAY_TITLE_WIDTHS.map((width) => (
                      <span
                        key={`overlay-line-${width}`}
                        className={`${SHIMMER_CLASS} block h-3 rounded-full bg-white/[0.13]`}
                        style={{ width }}
                      />
                    ))}
                  </div>

                  <div className="mt-3.5 flex items-center justify-between gap-3">
                    <span
                      className={`${SHIMMER_CLASS} block h-2.5 w-[42%] min-w-[108px] rounded-full bg-white/[0.13] opacity-85`}
                    />

                    <div className="flex items-center gap-2.5">
                      <span
                        className={`${SHIMMER_CLASS} h-9 w-9 rounded-full bg-white/[0.13]`}
                      />
                      <span
                        className={`${SHIMMER_CLASS} h-9 w-9 rounded-full bg-white/[0.13]`}
                      />
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
