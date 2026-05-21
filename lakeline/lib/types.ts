export interface Spot {
  id: string;
  name: string;
  lat: number;
  lon: number;
  shorelineBearing: number;
  description: string;
  fetchDistances: number[] | null;
}

export interface Lake {
  id: string;
  name: string;
  state: string;
  country: string;
  timezone: string;
  center: { lat: number; lon: number };
  mapZoom: number;
  normalPoolFt: number;
  usgsGaugeId: string | null;
  spots: Spot[];
}

export interface CurrentWeather {
  time: string;
  temperatureF: number;
  apparentTemperatureF: number;
  humidity: number;
  windMph: number;
  windDirDeg: number;
  windGustMph: number;
  pressureHpa: number;
  weatherCode: number;
  cloudCover: number;
  precipitation: number;
  uvIndex: number;
}

export interface HourlyWeather {
  time: string;
  temperatureF: number;
  apparentTemperatureF: number;
  windMph: number;
  windDirDeg: number;
  windGustMph: number;
  pressureHpa: number;
  weatherCode: number;
  cloudCover: number;
  precipitationProbability: number;
  precipitation: number;
  uvIndex: number;
}

export interface DailyWeather {
  date: string;
  sunrise: string;
  sunset: string;
  tempMaxF: number;
  tempMinF: number;
  uvMax: number;
  precipitationSum: number;
  windMaxMph: number;
  gustMaxMph: number;
}

export interface WeatherBundle {
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
  fetchedAt: string;
}

export type ConditionLabel =
  | "DANGER"
  | "Glass"
  | "Prime"
  | "Rideable"
  | "Bumpy"
  | "Choppy"
  | "Blown Out";

export interface GlassRating {
  score: number;
  label: ConditionLabel;
  color: string;
  /** Per-factor contributions for debugging / explain-mode UI */
  breakdown: {
    windSpeed: number;
    gustFactor: number;
    spotProtection: number;
    fetch: number;
    thermal: number;
    pressure: number;
    cloud: number;
    precip: number;
    weekend: number;
  };
}

export interface GlassWindow {
  startISO: string;
  endISO: string;
  peakScore: number;
  peakLabel: ConditionLabel;
  spotId: string;
  spotName: string;
}
