import {
  type CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type TitleMarqueeState = {
  enabled: boolean;
  distance: number;
  duration: number;
};

type UseTitleMarqueeParams = {
  isFocused: boolean;
  slideIndex: number;
};

export function useTitleMarquee({
  isFocused,
  slideIndex,
}: UseTitleMarqueeParams) {
  const [titleMarquee, setTitleMarquee] = useState<TitleMarqueeState>({
    enabled: false,
    distance: 0,
    duration: 0,
  });
  const titleMaskRef = useRef<HTMLSpanElement>(null);
  const titleTextRef = useRef<HTMLSpanElement>(null);

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
      setTitleMarquee({ enabled: true, distance, duration });
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

    textEl.style.animation = "none";
    textEl.style.transform = "translateX(0)";

    if (!isFocused || !titleMarquee.enabled) return;

    const rafId = requestAnimationFrame(() => {
      textEl.style.animation = "";
      textEl.style.transform = "";
    });

    return () => cancelAnimationFrame(rafId);
  }, [isFocused, slideIndex, titleMarquee.enabled]);

  const marqueeStyle = useMemo<CSSProperties | undefined>(() => {
    if (!titleMarquee.enabled) return undefined;

    return {
      "--title-marquee-distance": `${titleMarquee.distance}px`,
      "--title-marquee-duration": `${titleMarquee.duration}s`,
    } as CSSProperties;
  }, [titleMarquee.distance, titleMarquee.duration, titleMarquee.enabled]);

  return {
    titleMaskRef,
    titleTextRef,
    isMarquee: titleMarquee.enabled,
    marqueeStyle,
  };
}
