import { SLIDE_GRADIENT_CLASSES } from "../model/constants";

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
      className={`box-border flex h-full w-full grow-0 shrink-0 basis-full snap-start snap-always items-center justify-center px-8 pt-20 pb-40 md:pt-[60px] md:pb-[140px] ${
        SLIDE_GRADIENT_CLASSES[index % SLIDE_GRADIENT_CLASSES.length]
      }`}
      aria-roledescription="slide"
      aria-label={`スライド ${index + 1} / ${totalSlides}`}
    >
      <p className="m-0 text-center text-2xl leading-[1.7] font-semibold text-white [overflow-wrap:anywhere] [text-shadow:0_2px_8px_rgba(0,0,0,0.4)] [word-break:auto-phrase]">
        <span className="mb-5 block text-5xl [text-shadow:none]">{emoji}</span>
        {text}
      </p>
    </article>
  );
}
