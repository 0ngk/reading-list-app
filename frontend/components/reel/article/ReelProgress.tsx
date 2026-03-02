type ReelProgressProps = {
  total: number;
  current: number;
};

export default function ReelProgress({ total, current }: ReelProgressProps) {
  const segments = Array.from({ length: total }, (_, i) => ({
    id: `segment-${i}`,
    active: i <= current,
  }));

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-30 flex gap-1 px-3 pt-[calc(12px+env(safe-area-inset-top))] md:pt-3"
      aria-hidden="true"
    >
      {segments.map((seg) => (
        <div
          key={seg.id}
          className={`h-[3px] flex-1 rounded-[2px] transition-colors duration-300 motion-reduce:transition-none ${
            seg.active ? "bg-white/90" : "bg-white/30"
          }`}
        />
      ))}
    </div>
  );
}
