import { useCallback, useEffect, useRef, useState } from "react";
import { AUTO_ADVANCE_INTERVAL_MS } from "../model/constants";

type UseAutoAdvanceOptions = {
  currentIndex: number;
  paused: boolean;
  onAdvance: () => void;
};

export function useAutoAdvance({
  currentIndex,
  paused,
  onAdvance,
}: UseAutoAdvanceOptions) {
  const [timerKey, setTimerKey] = useState(0);
  const [progress, setProgress] = useState(0);
  const onAdvanceRef = useRef(onAdvance);
  onAdvanceRef.current = onAdvance;

  // currentIndex が変わったらタイマーリセット
  // biome-ignore lint/correctness/useExhaustiveDependencies: currentIndex の変更でタイマーをリセットする意図的な依存
  useEffect(() => {
    setTimerKey((k) => k + 1);
  }, [currentIndex]);

  // タイマー本体
  // biome-ignore lint/correctness/useExhaustiveDependencies: timerKey の変更でタイマーをリスタートする意図的な依存
  useEffect(() => {
    if (paused) {
      setProgress(0);
      return;
    }

    // progress を 0 にリセットし、次フレームで 1 に設定して CSS transition を発火
    setProgress(0);
    const raf = requestAnimationFrame(() => {
      setProgress(1);
    });

    const timer = setTimeout(() => {
      onAdvanceRef.current();
    }, AUTO_ADVANCE_INTERVAL_MS);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [timerKey, paused]);

  const resetTimer = useCallback(() => {
    setTimerKey((k) => k + 1);
  }, []);

  return { progress, timerKey, resetTimer };
}
