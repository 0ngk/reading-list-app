import { useRef } from "react";

type UseSlideTapNavigationParams = {
  currentIndex: number;
  totalSlides: number;
  scrollTo: (index: number) => void;
  tapThreshold?: number;
  swipeThreshold?: number;
  onEdgePrev?: () => void;
  onEdgeNext?: () => void;
};

export function useSlideTapNavigation({
  currentIndex,
  totalSlides,
  scrollTo,
  tapThreshold = 10,
  swipeThreshold = 56,
  onEdgePrev,
  onEdgeNext,
}: UseSlideTapNavigationParams) {
  const pointerDownPos = useRef<{ x: number; y: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    pointerDownPos.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = (e: React.PointerEvent<HTMLElement>) => {
    if (!pointerDownPos.current) return;

    const dx = e.clientX - pointerDownPos.current.x;
    const dy = e.clientY - pointerDownPos.current.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    const distance = Math.sqrt(dx * dx + dy * dy);
    pointerDownPos.current = null;

    if (absDx >= swipeThreshold && absDx > absDy) {
      if (dx > 0) {
        if (currentIndex > 0) {
          scrollTo(currentIndex - 1);
        } else {
          onEdgePrev?.();
        }
      } else if (currentIndex < totalSlides - 1) {
        scrollTo(currentIndex + 1);
      } else {
        onEdgeNext?.();
      }
      return;
    }

    if (distance > tapThreshold) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    if (clickX < rect.width / 2) {
      if (currentIndex > 0) {
        scrollTo(currentIndex - 1);
      } else {
        onEdgePrev?.();
      }
      return;
    }

    if (currentIndex < totalSlides - 1) {
      scrollTo(currentIndex + 1);
    } else {
      onEdgeNext?.();
    }
  };

  return { onPointerDown, onPointerUp };
}
