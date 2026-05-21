import { ratingLabel } from "@/lib/glass-score";
import type { GlassRating } from "@/lib/types";

interface Props {
  rating: GlassRating;
  bestSpotName: string;
  subtext?: string;
}

export default function GlassScore({ rating, bestSpotName, subtext }: Props) {
  return (
    <section className="px-5 pt-8 pb-6 border-b border-rule">
      <div className="text-xs uppercase tracking-[0.18em] text-ink-mute">
        Right now
      </div>
      <div className="mt-3 flex items-end gap-4">
        <div
          className="score-numeral text-[120px] leading-[0.85] font-medium"
          style={{ color: rating.color }}
        >
          {rating.score}
        </div>
        <div className="pb-3">
          <div
            className="text-2xl font-medium leading-tight"
            style={{ color: rating.color }}
          >
            {rating.label}
          </div>
          <div className="text-sm text-ink-soft mt-1">
            Best at <span className="text-ink font-medium">{bestSpotName}</span>
          </div>
        </div>
      </div>
      {subtext ? (
        <div className="mt-3 text-sm text-ink-soft leading-snug">{subtext}</div>
      ) : null}
      <ScoreScale current={rating.score} />
    </section>
  );
}

function ScoreScale({ current }: { current: number }) {
  const bands = [
    { min: 0, label: "Blown" },
    { min: 20, label: "Choppy" },
    { min: 40, label: "Bumpy" },
    { min: 55, label: "Rideable" },
    { min: 70, label: "Prime" },
    { min: 85, label: "Glass" },
  ];
  return (
    <div className="mt-5">
      <div className="flex h-1.5 rounded-full overflow-hidden">
        {bands.map((b, i) => {
          const c = ratingLabel(b.min + 1).color;
          return <div key={i} className="flex-1" style={{ background: c }} />;
        })}
      </div>
      <div
        className="relative h-3 mt-1"
        aria-label={`Current score ${current}`}
      >
        <div
          className="absolute top-0 -translate-x-1/2 w-px h-2 bg-ink"
          style={{ left: `${Math.max(0, Math.min(100, current))}%` }}
        />
      </div>
    </div>
  );
}
