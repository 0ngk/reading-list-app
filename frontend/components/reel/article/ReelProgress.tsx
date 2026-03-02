import { useMemo } from "react";
import { AUTO_ADVANCE_INTERVAL_MS } from "../model/constants";

type ReelProgressProps = {
  total: number;
  current: number;
  progress: number;
  timerKey: number;
};

export default function ReelProgress({
  total,
  current,
  progress,
  timerKey,
}: ReelProgressProps) {
  const segments = useMemo(
    () => Array.from({ length: total }, (_, i) => `segment-${i}`),
    [total],
  );

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-30 flex gap-1 px-3 pt-[calc(12px+env(safe-area-inset-top))] md:pt-3"
      aria-hidden="true"
    >
      {segments.map((key, i) => {
        const isPast = i < current;
        const isCurrent = i === current;

        let fillWidth: string;
        let transition: string | undefined;

        if (isPast) {
          fillWidth = "100%";
        } else if (isCurrent) {
          fillWidth = `${progress * 100}%`;
          transition =
            progress > 0
              ? `width ${AUTO_ADVANCE_INTERVAL_MS}ms linear`
              : undefined;
        } else {
          fillWidth = "0%";
        }

        return (
          <div
            key={key}
            className="h-[3px] flex-1 overflow-hidden rounded-[2px] bg-white/30"
          >
            <div
              key={isCurrent ? timerKey : undefined}
              className="h-full rounded-[2px] bg-white/90"
              style={{
                width: fillWidth,
                transition,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
