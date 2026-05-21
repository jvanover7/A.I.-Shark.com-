import { calculateGlassScore } from "./glass-score";
import { fetchAtBearing, spotProtection } from "./wind-protection";
import { pressureTrend } from "./weather";
import type {
  GlassWindow,
  HourlyWeather,
  Lake,
  Spot,
} from "./types";

interface FindWindowsArgs {
  lake: Lake;
  hourly: HourlyWeather[];
  /** UTC ISO sunrise / sunset per day, keyed by YYYY-MM-DD */
  sunByDate: Record<string, { sunrise: string; sunset: string }>;
  /** Score >= this is considered "in a glass window". 55 = Rideable+ */
  threshold?: number;
}

const RIDEABLE_THRESHOLD = 55;

const hourFromISO = (iso: string) => new Date(iso).getHours();
const dateKey = (iso: string) => iso.slice(0, 10);
const isWeekend = (iso: string) => {
  const d = new Date(iso).getDay();
  return d === 0 || d === 6;
};

/**
 * Walk the hourly forecast and find every contiguous window where SOME spot
 * scores at or above threshold. Each window records the peak score and the
 * spot that delivered it.
 */
export function findGlassWindows({
  lake,
  hourly,
  sunByDate,
  threshold = RIDEABLE_THRESHOLD,
}: FindWindowsArgs): GlassWindow[] {
  const windows: GlassWindow[] = [];
  let current: {
    startISO: string;
    lastISO: string;
    peakScore: number;
    peakLabel: GlassWindow["peakLabel"];
    spotId: string;
    spotName: string;
  } | null = null;

  hourly.forEach((h, i) => {
    const sun = sunByDate[dateKey(h.time)];
    const sunriseHour = sun ? hourFromISO(sun.sunrise) : 6;
    const sunsetHour = sun ? hourFromISO(sun.sunset) : 20;
    const trend = pressureTrend(hourly, i);

    let bestScore = 0;
    let bestSpot: Spot | null = null;
    let bestLabel: GlassWindow["peakLabel"] = "Choppy";

    for (const spot of lake.spots) {
      const protection = spotProtection(h.windDirDeg, spot.shorelineBearing);
      const fetchYards = fetchAtBearing(spot.fetchDistances, h.windDirDeg);

      const rating = calculateGlassScore({
        windMph: h.windMph,
        gustMph: h.windGustMph,
        spotProtection: protection,
        fetchYards,
        hour: hourFromISO(h.time),
        sunriseHour,
        sunsetHour,
        pressureTrendHpa: trend,
        cloudCoverPct: h.cloudCover,
        precipitationMmHr: h.precipitation,
        isWeekend: isWeekend(h.time),
        weatherCode: h.weatherCode,
      });
      if (rating.score > bestScore) {
        bestScore = rating.score;
        bestSpot = spot;
        bestLabel = rating.label;
      }
    }

    if (bestScore >= threshold && bestSpot) {
      if (!current) {
        current = {
          startISO: h.time,
          lastISO: h.time,
          peakScore: bestScore,
          peakLabel: bestLabel,
          spotId: bestSpot.id,
          spotName: bestSpot.name,
        };
      } else {
        current.lastISO = h.time;
        if (bestScore > current.peakScore) {
          current.peakScore = bestScore;
          current.peakLabel = bestLabel;
          current.spotId = bestSpot.id;
          current.spotName = bestSpot.name;
        }
      }
    } else if (current) {
      windows.push({
        startISO: current.startISO,
        endISO: current.lastISO,
        peakScore: current.peakScore,
        peakLabel: current.peakLabel,
        spotId: current.spotId,
        spotName: current.spotName,
      });
      current = null;
    }
  });

  if (current) {
    windows.push({
      startISO: (current as any).startISO,
      endISO: (current as any).lastISO,
      peakScore: (current as any).peakScore,
      peakLabel: (current as any).peakLabel,
      spotId: (current as any).spotId,
      spotName: (current as any).spotName,
    });
  }
  return windows;
}
