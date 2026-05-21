import type { CurrentWeather } from "@/lib/types";

interface Props {
  current: CurrentWeather;
  pressureTrendHpa: number;
}

const COMPASS = [
  "N",
  "NNE",
  "NE",
  "ENE",
  "E",
  "ESE",
  "SE",
  "SSE",
  "S",
  "SSW",
  "SW",
  "WSW",
  "W",
  "WNW",
  "NW",
  "NNW",
];

function compassFrom(deg: number): string {
  const idx = Math.round((((deg % 360) + 360) % 360) / 22.5) % 16;
  return COMPASS[idx];
}

function pressureGlyph(trend: number) {
  if (trend > 1) return { label: "Rising", arrow: "↑", tone: "text-cond-prime" };
  if (trend > -1) return { label: "Steady", arrow: "→", tone: "text-ink-soft" };
  if (trend > -3) return { label: "Falling", arrow: "↓", tone: "text-cond-bumpy" };
  return { label: "Dropping fast", arrow: "↡", tone: "text-cond-choppy" };
}

export default function WeatherPanel({ current, pressureTrendHpa }: Props) {
  const p = pressureGlyph(pressureTrendHpa);
  return (
    <section className="px-5 py-6 border-b border-rule">
      <h2 className="text-xs uppercase tracking-[0.18em] text-ink-mute">
        Conditions
      </h2>

      <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-5">
        <Stat
          label="Wind"
          value={`${Math.round(current.windMph)} mph`}
          sub={`${compassFrom(current.windDirDeg)} · ${Math.round(current.windDirDeg)}°`}
        />
        <Stat
          label="Gusts"
          value={`${Math.round(current.windGustMph)} mph`}
          sub={`+${Math.round(Math.max(0, current.windGustMph - current.windMph))} delta`}
        />
        <Stat
          label="Air"
          value={`${Math.round(current.temperatureF)}°`}
          sub={`feels ${Math.round(current.apparentTemperatureF)}°`}
        />
        <Stat
          label="Pressure"
          value={`${current.pressureHpa.toFixed(0)} hPa`}
          sub={
            <span className={p.tone}>
              {p.arrow} {p.label}
            </span>
          }
        />
        <Stat
          label="Cloud"
          value={`${Math.round(current.cloudCover)}%`}
          sub={current.cloudCover > 70 ? "Thermal suppressed" : "Open sky"}
        />
        <Stat
          label="UV"
          value={current.uvIndex.toFixed(1)}
          sub={uvAdvice(current.uvIndex)}
        />
      </div>
    </section>
  );
}

function uvAdvice(u: number) {
  if (u >= 8) return "Reapply every 45 min";
  if (u >= 5) return "Sunscreen";
  if (u >= 2) return "Moderate";
  return "Low";
}

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-widest text-ink-mute">
        {label}
      </div>
      <div className="mt-1 text-xl font-medium text-ink score-numeral">
        {value}
      </div>
      <div className="text-xs text-ink-soft mt-0.5">{sub}</div>
    </div>
  );
}
