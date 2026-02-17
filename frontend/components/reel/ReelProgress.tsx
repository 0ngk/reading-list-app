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
    <div className="reel-progress" aria-hidden="true">
      {segments.map((seg) => (
        <div
          key={seg.id}
          className={`reel-progress-segment ${seg.active ? "active" : ""}`}
        />
      ))}
    </div>
  );
}
