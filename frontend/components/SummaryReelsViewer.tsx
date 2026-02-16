"use client";

import { useEffect, useRef, useState } from "react";

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
  sentences: string[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);

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
              key={`progress-${sentences[i]?.slice(0, 8) ?? i}`}
              className={`reels-progress-segment ${i <= currentIndex ? "active" : ""}`}
            />
          ))}
        </div>

        {/* Slides */}
        {sentences.map((sentence, i) => (
          <article
            key={`slide-${sentence.slice(0, 16)}`}
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
            <p className="reels-slide-text">{sentence}</p>
          </article>
        ))}

        {/* Slide counter */}
        <div className="reels-counter" aria-hidden="true">
          {currentIndex + 1} / {sentences.length}
        </div>
      </section>
    </div>
  );
}
