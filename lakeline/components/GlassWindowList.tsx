import { format, isToday, isTomorrow } from "date-fns";
import { ratingLabel } from "@/lib/glass-score";
import type { GlassWindow } from "@/lib/types";

interface Props {
  windows: GlassWindow[];
  timezone: string;
}

function dayLabel(iso: string): string {
  const d = new Date(iso);
  if (isToday(d)) return "Today";
  if (isTomorrow(d)) return "Tomorrow";
  return format(d, "EEEE");
}

function timeLabel(iso: string): string {
  return format(new Date(iso), "h:mm a").toLowerCase();
}

export default function GlassWindowList({ windows }: Props) {
  if (windows.length === 0) {
    return (
      <section className="px-5 py-6 border-b border-rule">
        <h2 className="text-xs uppercase tracking-[0.18em] text-ink-mute">
          Upcoming glass windows
        </h2>
        <p className="mt-3 text-sm text-ink-soft">
          No rideable windows in the next 7 days. Check back as forecasts update.
        </p>
      </section>
    );
  }

  return (
    <section className="px-5 py-6 border-b border-rule">
      <h2 className="text-xs uppercase tracking-[0.18em] text-ink-mute">
        Upcoming glass windows
      </h2>
      <ul className="mt-3 divide-y divide-rule">
        {windows.slice(0, 8).map((w, i) => {
          const color = ratingLabel(w.peakScore).color;
          return (
            <li
              key={`${w.startISO}-${i}`}
              className="py-3 flex items-baseline gap-3"
            >
              <div className="w-20 shrink-0 text-sm text-ink-soft">
                {dayLabel(w.startISO)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-ink truncate">
                  {timeLabel(w.startISO)} – {timeLabel(w.endISO)}
                </div>
                <div className="text-xs text-ink-soft mt-0.5 truncate">
                  → {w.spotName}
                </div>
              </div>
              <div
                className="text-right shrink-0 score-numeral font-medium text-base"
                style={{ color }}
              >
                {w.peakScore}
                <div className="text-[10px] uppercase tracking-wider text-ink-mute font-normal">
                  {w.peakLabel}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
