import type { ConditionLabel, GlassRating } from "./types";

interface GlassScoreInput {
  windMph: number;
  gustMph: number;
  spotProtection: number;
  fetchYards: number;
  hour: number;
  sunriseHour: number;
  sunsetHour: number;
  pressureTrendHpa: number;
  cloudCoverPct: number;
  precipitationMmHr: number;
  isWeekend: boolean;
  weatherCode: number;
}

const labelFor = (score: number): { label: ConditionLabel; color: string } => {
  if (score >= 85) return { label: "Glass", color: "#1B4D6E" };
  if (score >= 70) return { label: "Prime", color: "#2D6A4F" };
  if (score >= 55) return { label: "Rideable", color: "#6B8E3D" };
  if (score >= 40) return { label: "Bumpy", color: "#B8860B" };
  if (score >= 20) return { label: "Choppy", color: "#C4571A" };
  return { label: "Blown Out", color: "#8B2500" };
};

export function calculateGlassScore(input: GlassScoreInput): GlassRating {
  const {
    windMph,
    gustMph,
    spotProtection,
    fetchYards,
    hour,
    sunriseHour,
    sunsetHour,
    pressureTrendHpa,
    cloudCoverPct,
    precipitationMmHr,
    isWeekend,
    weatherCode,
  } = input;

  if (weatherCode >= 95) {
    return {
      score: 0,
      label: "DANGER",
      color: "#8B0000",
      breakdown: {
        windSpeed: 0,
        gustFactor: 0,
        spotProtection: 0,
        fetch: 0,
        thermal: 0,
        pressure: 0,
        cloud: 0,
        precip: 0,
        weekend: 0,
      },
    };
  }

  let windScore = 0;
  if (windMph < 3) windScore = 35;
  else if (windMph < 5) windScore = 28;
  else if (windMph < 8) windScore = 19;
  else if (windMph < 12) windScore = 10;
  else if (windMph < 16) windScore = 3;

  const gustDelta = Math.max(0, gustMph - windMph);
  let gustScore = 0;
  if (gustDelta < 3) gustScore = 15;
  else if (gustDelta < 6) gustScore = 10;
  else if (gustDelta < 10) gustScore = 6;
  else if (gustDelta < 15) gustScore = 2;

  const protectionScore = (Math.max(0, Math.min(100, spotProtection)) / 100) * 15;

  let fetchScore = 0;
  if (fetchYards < 200) fetchScore = 10;
  else if (fetchYards < 500) fetchScore = 8;
  else if (fetchYards < 1000) fetchScore = 5;
  else if (fetchYards < 2000) fetchScore = 3;

  const hoursFromSunrise = Math.abs(hour - sunriseHour);
  const hoursFromSunset = Math.abs(hour - sunsetHour);
  const nearGolden = Math.min(hoursFromSunrise, hoursFromSunset);
  let thermalScore = 0;
  if (nearGolden <= 1.5) thermalScore = 5;
  else if (nearGolden <= 3) thermalScore = 3;
  else if (hour >= 11 && hour <= 15) thermalScore = 0;
  else thermalScore = 1;

  let pressureScore = 0;
  if (pressureTrendHpa > 1) pressureScore = 5;
  else if (pressureTrendHpa > -1) pressureScore = 3;
  else if (pressureTrendHpa > -3) pressureScore = 1;

  let cloudScore = 0;
  if (cloudCoverPct > 80) cloudScore = 3;
  else if (cloudCoverPct > 50) cloudScore = 1;

  let precipScore = 0;
  if (precipitationMmHr === 0) precipScore = 2;
  else if (precipitationMmHr < 0.5) precipScore = 1;

  const weekendPenalty =
    isWeekend && hour >= 10 && hour <= 17 ? -3 : 0;

  const raw =
    windScore +
    gustScore +
    protectionScore +
    fetchScore +
    thermalScore +
    pressureScore +
    cloudScore +
    precipScore +
    weekendPenalty;

  const clamped = Math.max(0, Math.min(100, Math.round(raw)));
  const { label, color } = labelFor(clamped);

  return {
    score: clamped,
    label,
    color,
    breakdown: {
      windSpeed: windScore,
      gustFactor: gustScore,
      spotProtection: Math.round(protectionScore),
      fetch: fetchScore,
      thermal: thermalScore,
      pressure: pressureScore,
      cloud: cloudScore,
      precip: precipScore,
      weekend: weekendPenalty,
    },
  };
}

export const ratingLabel = labelFor;
