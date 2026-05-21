import SunCalc from "suncalc";

export interface SolunarReading {
  date: Date;
  moonIlluminationPct: number;
  moonPhase: number; // 0 = new, 0.5 = full, 1 = new again
  moonPhaseLabel: string;
  moonrise: Date | null;
  moonset: Date | null;
  sunrise: Date;
  sunset: Date;
  /**
   * Major periods: moon transit (overhead) and antitransit (underfoot),
   * ± 1 hour either side.
   */
  majorPeriods: { start: Date; end: Date }[];
  /**
   * Minor periods: moonrise and moonset, ± 30 min.
   */
  minorPeriods: { start: Date; end: Date }[];
}

const PHASE_LABELS = [
  "New",
  "Waxing Crescent",
  "First Quarter",
  "Waxing Gibbous",
  "Full",
  "Waning Gibbous",
  "Last Quarter",
  "Waning Crescent",
];

function phaseLabel(phase: number): string {
  const idx = Math.round(phase * 8) % 8;
  return PHASE_LABELS[idx];
}

/**
 * Find moon transit (max altitude) and antitransit (min altitude) on a given
 * UTC day at the spot. Returns null for either if SunCalc can't locate them.
 */
function findMoonTransits(date: Date, lat: number, lon: number) {
  let transit: { time: Date; altitude: number } | null = null;
  let antitransit: { time: Date; altitude: number } | null = null;
  const start = new Date(date);
  start.setUTCHours(0, 0, 0, 0);

  for (let m = 0; m < 24 * 60; m += 10) {
    const t = new Date(start.getTime() + m * 60_000);
    const pos = SunCalc.getMoonPosition(t, lat, lon);
    if (transit === null || pos.altitude > transit.altitude) {
      transit = { time: t, altitude: pos.altitude };
    }
    if (antitransit === null || pos.altitude < antitransit.altitude) {
      antitransit = { time: t, altitude: pos.altitude };
    }
  }
  return { transit, antitransit };
}

export function getSolunar(
  date: Date,
  lat: number,
  lon: number
): SolunarReading {
  const illum = SunCalc.getMoonIllumination(date);
  const sunTimes = SunCalc.getTimes(date, lat, lon);
  const moonTimes = SunCalc.getMoonTimes(date, lat, lon, true);
  const { transit, antitransit } = findMoonTransits(date, lat, lon);

  const major: { start: Date; end: Date }[] = [];
  if (transit) {
    major.push({
      start: new Date(transit.time.getTime() - 60 * 60_000),
      end: new Date(transit.time.getTime() + 60 * 60_000),
    });
  }
  if (antitransit) {
    major.push({
      start: new Date(antitransit.time.getTime() - 60 * 60_000),
      end: new Date(antitransit.time.getTime() + 60 * 60_000),
    });
  }

  const minor: { start: Date; end: Date }[] = [];
  if (moonTimes.rise) {
    minor.push({
      start: new Date(moonTimes.rise.getTime() - 30 * 60_000),
      end: new Date(moonTimes.rise.getTime() + 30 * 60_000),
    });
  }
  if (moonTimes.set) {
    minor.push({
      start: new Date(moonTimes.set.getTime() - 30 * 60_000),
      end: new Date(moonTimes.set.getTime() + 30 * 60_000),
    });
  }

  return {
    date,
    moonIlluminationPct: Math.round(illum.fraction * 100),
    moonPhase: illum.phase,
    moonPhaseLabel: phaseLabel(illum.phase),
    moonrise: moonTimes.rise ?? null,
    moonset: moonTimes.set ?? null,
    sunrise: sunTimes.sunrise,
    sunset: sunTimes.sunset,
    majorPeriods: major,
    minorPeriods: minor,
  };
}

/** True if a given time falls within any major or minor solunar window. */
export function inSolunarWindow(t: Date, solunar: SolunarReading): "major" | "minor" | null {
  for (const w of solunar.majorPeriods) {
    if (t >= w.start && t <= w.end) return "major";
  }
  for (const w of solunar.minorPeriods) {
    if (t >= w.start && t <= w.end) return "minor";
  }
  return null;
}
