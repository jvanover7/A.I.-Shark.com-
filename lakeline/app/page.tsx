import { format, isToday, isTomorrow } from "date-fns";
import GlassScore from "@/components/GlassScore";
import GlassWindowList from "@/components/GlassWindowList";
import WeatherPanel from "@/components/WeatherPanel";
import SpotList from "@/components/SpotList";
import SolunarPanel from "@/components/SolunarPanel";
import LakeMap from "@/components/LakeMap";
import LakeHeader from "@/components/LakeHeader";
import BottomNav from "@/components/BottomNav";
import { fetchWeather, pressureTrend } from "@/lib/weather";
import { findGlassWindows } from "@/lib/glass-windows";
import { calculateGlassScore } from "@/lib/glass-score";
import { spotProtection, fetchAtBearing } from "@/lib/wind-protection";
import { getSolunar } from "@/lib/solunar";
import { getLake, DEFAULT_LAKE_ID } from "@/lib/lakes";

export const revalidate = 900;
export const dynamic = "force-dynamic";

function dayLabel(iso: string) {
  const d = new Date(iso);
  if (isToday(d)) return "today";
  if (isTomorrow(d)) return "tomorrow";
  return format(d, "EEEE").toLowerCase();
}

export default async function HomePage() {
  const lake = getLake(DEFAULT_LAKE_ID)!;
  const weather = await fetchWeather(
    lake.center.lat,
    lake.center.lon,
    lake.timezone
  );
  const now = new Date();
  const todayKey = weather.daily[0]?.date ?? format(now, "yyyy-MM-dd");
  const today = weather.daily.find((d) => d.date === todayKey) ?? weather.daily[0];

  const sunriseHour = new Date(today.sunrise).getHours();
  const sunsetHour = new Date(today.sunset).getHours();
  const dow = now.getDay();
  const isWeekend = dow === 0 || dow === 6;
  const hour = now.getHours();
  const trend = pressureTrend(weather.hourly, Math.min(hour, weather.hourly.length - 1));

  // Best spot RIGHT NOW
  let bestScore = 0;
  let bestSpot = lake.spots[0];
  let bestRating = calculateGlassScore({
    windMph: weather.current.windMph,
    gustMph: weather.current.windGustMph,
    spotProtection: spotProtection(weather.current.windDirDeg, bestSpot.shorelineBearing),
    fetchYards: fetchAtBearing(bestSpot.fetchDistances, weather.current.windDirDeg),
    hour,
    sunriseHour,
    sunsetHour,
    pressureTrendHpa: trend,
    cloudCoverPct: weather.current.cloudCover,
    precipitationMmHr: weather.current.precipitation,
    isWeekend,
    weatherCode: weather.current.weatherCode,
  });
  for (const s of lake.spots) {
    const protection = spotProtection(weather.current.windDirDeg, s.shorelineBearing);
    const fetchYards = fetchAtBearing(s.fetchDistances, weather.current.windDirDeg);
    const r = calculateGlassScore({
      windMph: weather.current.windMph,
      gustMph: weather.current.windGustMph,
      spotProtection: protection,
      fetchYards,
      hour,
      sunriseHour,
      sunsetHour,
      pressureTrendHpa: trend,
      cloudCoverPct: weather.current.cloudCover,
      precipitationMmHr: weather.current.precipitation,
      isWeekend,
      weatherCode: weather.current.weatherCode,
    });
    if (r.score > bestScore) {
      bestScore = r.score;
      bestSpot = s;
      bestRating = r;
    }
  }

  // Glass windows next 7 days
  const sunByDate: Record<string, { sunrise: string; sunset: string }> = {};
  for (const d of weather.daily) {
    sunByDate[d.date] = { sunrise: d.sunrise, sunset: d.sunset };
  }
  const windows = findGlassWindows({
    lake,
    hourly: weather.hourly,
    sunByDate,
    threshold: 55,
  });
  const futureWindows = windows.filter((w) => new Date(w.endISO) > now);

  // Solunar
  const solunar = getSolunar(now, lake.center.lat, lake.center.lon);

  // Spot scoring (current)
  // Markers for map
  const markers = lake.spots.map((s) => {
    const protection = spotProtection(weather.current.windDirDeg, s.shorelineBearing);
    const fetchYards = fetchAtBearing(s.fetchDistances, weather.current.windDirDeg);
    const r = calculateGlassScore({
      windMph: weather.current.windMph,
      gustMph: weather.current.windGustMph,
      spotProtection: protection,
      fetchYards,
      hour,
      sunriseHour,
      sunsetHour,
      pressureTrendHpa: trend,
      cloudCoverPct: weather.current.cloudCover,
      precipitationMmHr: weather.current.precipitation,
      isWeekend,
      weatherCode: weather.current.weatherCode,
    });
    return {
      spotId: s.id,
      name: s.name,
      lat: s.lat,
      lon: s.lon,
      score: r.score,
      color: r.color,
    };
  });

  const nextWindow = futureWindows[0];
  const nextWindowSummary = nextWindow
    ? `Next glass window ${dayLabel(nextWindow.startISO)} ${format(new Date(nextWindow.startISO), "h:mm a")} → ${nextWindow.spotName} (${nextWindow.peakLabel} ${nextWindow.peakScore})`
    : "No glass windows in the 7-day forecast.";

  const heroSubtext = bestRating.score >= 55
    ? `Wind ${Math.round(weather.current.windMph)} mph from ${Math.round(weather.current.windDirDeg)}°. Gusts ${Math.round(weather.current.windGustMph)}.`
    : `Wind ${Math.round(weather.current.windMph)} mph, gusts ${Math.round(weather.current.windGustMph)}. ${nextWindowSummary}`;

  return (
    <main className="max-w-md mx-auto pb-2">
      <LakeHeader
        lakeName={lake.name}
        state={`${lake.state} · Lake`}
        fetchedAt={weather.fetchedAt}
        nextWindowSummary={nextWindow ? nextWindowSummary : null}
      />
      <GlassScore
        rating={bestRating}
        bestSpotName={bestSpot.name}
        subtext={heroSubtext}
      />
      <GlassWindowList windows={futureWindows} timezone={lake.timezone} />
      <WeatherPanel current={weather.current} pressureTrendHpa={trend} />
      <SpotList
        spots={lake.spots}
        current={weather.current}
        sunriseHour={sunriseHour}
        sunsetHour={sunsetHour}
        pressureTrendHpa={trend}
        isWeekend={isWeekend}
        hour={hour}
      />
      <LakeMap
        lake={lake}
        markers={markers}
        windDirDeg={weather.current.windDirDeg}
        windMph={weather.current.windMph}
      />
      <SolunarPanel solunar={solunar} />
      <BottomNav active="surf" />
    </main>
  );
}
