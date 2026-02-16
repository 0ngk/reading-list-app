"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GRADIENTS = [
  "linear-gradient(135deg, #581c87 0%, #1e3a8a 100%)",
  "linear-gradient(135deg, #134e4a 0%, #064e3b 100%)",
  "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
  "linear-gradient(135deg, #881337 0%, #9a3412 100%)",
  "linear-gradient(135deg, #0c4a6e 0%, #155e75 100%)",
  "linear-gradient(135deg, #3b0764 0%, #701a75 100%)",
  "linear-gradient(135deg, #1a2e05 0%, #365314 100%)",
];

export default function SummaryReelsViewer({
  sentences,
}: {
  sentences: { emoji: string; text: string }[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);

  const scrollTo = useCallback((index: number) => {
    const slide = slideRefs.current[index];
    const container = containerRef.current;
    if (!slide || !container) return;
    container.scrollTo({
      top: slide.offsetTop,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number(
              (entry.target as HTMLElement).dataset.slideIndex,
            );
            if (!Number.isNaN(index)) {
              setCurrentIndex(index);
            }
          }
        }
      },
      {
        root: container,
        threshold: 0.6,
      },
    );

    for (const slide of slideRefs.current) {
      if (slide) observer.observe(slide);
    }

    return () => observer.disconnect();
  }, []);

  if (sentences.length === 0) return null;

  return (
    <div className="reels-wrapper">
      <button
        type="button"
        className="reels-nav-btn reels-nav-up"
        disabled={currentIndex === 0}
        onClick={() => scrollTo(currentIndex - 1)}
        aria-label="前のスライド"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M18 15l-6-6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <section
        ref={containerRef}
        className="reels-container"
        aria-label={`AI要約スライド: 全${sentences.length}枚`}
        aria-roledescription="carousel"
      >
        {/* Progress bar */}
        <div className="reels-progress" aria-hidden="true">
          {sentences.map((_, i) => (
            <div
              key={`progress-${sentences[i]?.text.slice(0, 8) ?? i}`}
              className={`reels-progress-segment ${i <= currentIndex ? "active" : ""}`}
            />
          ))}
        </div>

        {/* Slides */}
        {sentences.map((sentence, i) => (
          <article
            key={`slide-${sentence.text.slice(0, 16)}`}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            data-slide-index={i}
            className="reels-slide"
            style={{
              background: GRADIENTS[i % GRADIENTS.length],
            }}
            aria-roledescription="slide"
            aria-label={`スライド ${i + 1} / ${sentences.length}`}
          >
            <p className="reels-slide-text">
              <span className="reels-slide-emoji">{sentence.emoji}</span>
              {sentence.text}
            </p>
          </article>
        ))}

        {/* Slide counter */}
        <div className="reels-counter" aria-hidden="true">
          {currentIndex + 1} / {sentences.length}
        </div>
      </section>

      <button
        type="button"
        className="reels-nav-btn reels-nav-down"
        disabled={currentIndex === sentences.length - 1}
        onClick={() => scrollTo(currentIndex + 1)}
        aria-label="次のスライド"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
