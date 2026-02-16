"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type UseScrollSnapOptions = {
  /** IntersectionObserver threshold (0-1). Default: 0.5 */
  threshold?: number;
  /** Scroll direction. Default: "horizontal" */
  direction?: "horizontal" | "vertical";
};

export function useScrollSnap(
  itemCount: number,
  options: UseScrollSnapOptions = {},
) {
  const { threshold = 0.5, direction = "horizontal" } = options;
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  const scrollTo = useCallback(
    (index: number) => {
      const item = itemRefs.current[index];
      const container = containerRef.current;
      if (!item || !container) return;

      if (direction === "horizontal") {
        container.scrollTo({ left: item.offsetLeft, behavior: "smooth" });
      } else {
        container.scrollTo({ top: item.offsetTop, behavior: "smooth" });
      }
    },
    [direction],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: itemCount triggers re-observation when items change
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number(
              (entry.target as HTMLElement).dataset.snapIndex,
            );
            if (!Number.isNaN(index)) {
              setCurrentIndex(index);
            }
          }
        }
      },
      { root: container, threshold },
    );

    for (const item of itemRefs.current) {
      if (item) observer.observe(item);
    }

    return () => observer.disconnect();
  }, [threshold, itemCount]);

  const setItemRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      itemRefs.current[index] = el;
    },
    [],
  );

  return { currentIndex, scrollTo, containerRef, setItemRef };
}
