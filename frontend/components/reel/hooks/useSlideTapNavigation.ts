import { useRef } from "react";

type UseSlideTapNavigationParams = {
  currentIndex: number;
  totalSlides: number;
  scrollTo: (index: number) => void;
  tapThreshold?: number;
};

export function useSlideTapNavigation({
  currentIndex,
  totalSlides,
  scrollTo,
  tapThreshold = 10,
}: UseSlideTapNavigationParams) {
  const pointerDownPos = useRef<{ x: number; y: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    pointerDownPos.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = (e: React.PointerEvent<HTMLElement>) => {
    if (!pointerDownPos.current) return;

    const dx = e.clientX - pointerDownPos.current.x;
    const dy = e.clientY - pointerDownPos.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    pointerDownPos.current = null;

    if (distance > tapThreshold) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    if (clickX < rect.width / 2) {
      if (currentIndex > 0) scrollTo(currentIndex - 1);
      return;
    }

    if (currentIndex < totalSlides - 1) scrollTo(currentIndex + 1);
  };

  return { onPointerDown, onPointerUp };
}
