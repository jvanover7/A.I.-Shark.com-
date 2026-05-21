import { calculateGlassScore, ratingLabel } from "@/lib/glass-score";
import { fetchAtBearing, spotProtection } from "@/lib/wind-protection";
import type { CurrentWeather, Spot } from "@/lib/types";

interface Props {
  spots: Spot[];
  current: CurrentWeather;
  sunriseHour: number;
  sunsetHour: number;
  pressureTrendHpa: number;
  isWeekend: boolean;
  hour: number;
}

interface ScoredSpot {
  spot: Spot;
  score: number;
  label: ReturnType<typeof ratingLabel>["label"];
  color: string;
  protection: number;
  fetchYards: number;
}

export default function SpotList(props: Props) {
  const scored: ScoredSpot[] = props.spots.map((spot) => {
    const protection = spotProtection(
      props.current.windDirDeg,
      spot.shorelineBearing
    );
    const fetchYards = fetchAtBearing(
      spot.fetchDistances,
      props.current.windDirDeg
    );
    const rating = calculateGlassScore({
      windMph: props.current.windMph,
      gustMph: props.current.windGustMph,
      spotProtection: protection,
      fetchYards,
      hour: props.hour,
      sunriseHour: props.sunriseHour,
      sunsetHour: props.sunsetHour,
      pressureTrendHpa: props.pressureTrendHpa,
      cloudCoverPct: props.current.cloudCover,
      precipitationMmHr: props.current.precipitation,
      isWeekend: props.isWeekend,
      weatherCode: props.current.weatherCode,
    });
    return {
      spot,
      score: rating.score,
      label: rating.label,
      color: rating.color,
      protection,
      fetchYards,
    };
  });

  scored.sort((a, b) => b.score - a.score);

  return (
    <section className="px-5 py-6 border-b border-rule">
      <h2 className="text-xs uppercase tracking-[0.18em] text-ink-mute">
        Spots
      </h2>
      <ul className="mt-3 divide-y divide-rule">
        {scored.map(({ spot, score, label, color, protection }) => (
          <li
            key={spot.id}
            className="py-3 flex items-baseline gap-3"
          >
            <div className="flex-1 min-w-0">
              <div className="font-medium text-ink truncate">{spot.name}</div>
              <div className="text-xs text-ink-soft mt-0.5 truncate">
                Protection {protection} · {spot.description}
              </div>
            </div>
            <div className="text-right shrink-0">
              <div
                className="score-numeral text-xl font-medium"
                style={{ color }}
              >
                {score}
              </div>
              <div
                className="text-[10px] uppercase tracking-wider"
                style={{ color }}
              >
                {label}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
