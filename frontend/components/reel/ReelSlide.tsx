import { SLIDE_GRADIENTS } from "@/lib/constants/gradients";

type ReelSlideProps = {
  emoji: string;
  text: string;
  index: number;
  totalSlides: number;
  setRef: (el: HTMLElement | null) => void;
};

export default function ReelSlide({
  emoji,
  text,
  index,
  totalSlides,
  setRef,
}: ReelSlideProps) {
  return (
    <article
      ref={setRef}
      data-snap-index={index}
      className="reel-slide"
      style={{ background: SLIDE_GRADIENTS[index % SLIDE_GRADIENTS.length] }}
      aria-roledescription="slide"
      aria-label={`スライド ${index + 1} / ${totalSlides}`}
    >
      <p className="reel-slide-text">
        <span className="reel-slide-emoji">{emoji}</span>
        {text}
      </p>
    </article>
  );
}
