import { format } from "date-fns";
import type { SolunarReading } from "@/lib/solunar";

interface Props {
  solunar: SolunarReading;
}

const fmt = (d: Date | null) => (d ? format(d, "h:mm a").toLowerCase() : "—");

export default function SolunarPanel({ solunar }: Props) {
  return (
    <section className="px-5 py-6 border-b border-rule">
      <h2 className="text-xs uppercase tracking-[0.18em] text-ink-mute">
        Moon &amp; bite
      </h2>

      <div className="mt-4 flex items-baseline gap-4">
        <MoonGlyph phase={solunar.moonPhase} />
        <div>
          <div className="text-lg font-medium text-ink">
            {solunar.moonPhaseLabel}
          </div>
          <div className="text-xs text-ink-soft">
            {solunar.moonIlluminationPct}% illuminated
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
        <Row label="Sunrise" value={fmt(solunar.sunrise)} />
        <Row label="Sunset" value={fmt(solunar.sunset)} />
        <Row label="Moonrise" value={fmt(solunar.moonrise)} />
        <Row label="Moonset" value={fmt(solunar.moonset)} />
      </div>

      <div className="mt-5">
        <div className="text-[11px] uppercase tracking-widest text-ink-mute">
          Major bite
        </div>
        <ul className="mt-1 text-sm text-ink">
          {solunar.majorPeriods.length === 0 ? (
            <li className="text-ink-soft">None today</li>
          ) : (
            solunar.majorPeriods.map((p, i) => (
              <li key={i}>
                {fmt(p.start)} – {fmt(p.end)}
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="mt-3">
        <div className="text-[11px] uppercase tracking-widest text-ink-mute">
          Minor bite
        </div>
        <ul className="mt-1 text-sm text-ink-soft">
          {solunar.minorPeriods.length === 0 ? (
            <li>None today</li>
          ) : (
            solunar.minorPeriods.map((p, i) => (
              <li key={i}>
                {fmt(p.start)} – {fmt(p.end)}
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-ink-mute text-[11px] uppercase tracking-widest">
        {label}
      </span>
      <span className="text-ink score-numeral">{value}</span>
    </div>
  );
}

function MoonGlyph({ phase }: { phase: number }) {
  // phase: 0 new, 0.25 first quarter, 0.5 full, 0.75 last quarter
  const size = 40;
  const r = size / 2;
  // Approximate the illuminated crescent with two arcs.
  const lit = Math.cos(2 * Math.PI * phase);
  const flip = phase > 0.5 ? -1 : 1;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden
    >
      <circle cx={r} cy={r} r={r} fill="#1A1614" />
      <path
        d={`M ${r} 0
            a ${r} ${r} 0 1 ${flip > 0 ? 1 : 0} 0 ${size}
            a ${Math.abs(lit) * r} ${r} 0 1 ${lit * flip > 0 ? 0 : 1} 0 -${size}`}
        fill="#FAF7F2"
      />
    </svg>
  );
}
