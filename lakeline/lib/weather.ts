import type {
  CurrentWeather,
  DailyWeather,
  HourlyWeather,
  WeatherBundle,
} from "./types";

const BASE = process.env.OPENMETEO_BASE ?? "https://api.open-meteo.com/v1";

interface OpenMeteoResponse {
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    wind_gusts_10m: number;
    surface_pressure: number;
    weather_code: number;
    cloud_cover: number;
    precipitation: number;
    uv_index: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    apparent_temperature: number[];
    wind_speed_10m: number[];
    wind_direction_10m: number[];
    wind_gusts_10m: number[];
    surface_pressure: number[];
    weather_code: number[];
    cloud_cover: number[];
    precipitation_probability: number[];
    precipitation: number[];
    uv_index: number[];
  };
  daily: {
    time: string[];
    sunrise: string[];
    sunset: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    uv_index_max: number[];
    precipitation_sum: number[];
    wind_speed_10m_max: number[];
    wind_gusts_10m_max: number[];
  };
}

export async function fetchWeather(
  lat: number,
  lon: number,
  timezone: string,
  opts: { revalidateSec?: number } = {}
): Promise<WeatherBundle> {
  const params = new URLSearchParams({
    latitude: lat.toFixed(4),
    longitude: lon.toFixed(4),
    current: [
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "wind_speed_10m",
      "wind_direction_10m",
      "wind_gusts_10m",
      "surface_pressure",
      "weather_code",
      "cloud_cover",
      "precipitation",
      "uv_index",
    ].join(","),
    hourly: [
      "temperature_2m",
      "apparent_temperature",
      "wind_speed_10m",
      "wind_direction_10m",
      "wind_gusts_10m",
      "surface_pressure",
      "weather_code",
      "cloud_cover",
      "precipitation_probability",
      "precipitation",
      "uv_index",
    ].join(","),
    daily: [
      "sunrise",
      "sunset",
      "temperature_2m_max",
      "temperature_2m_min",
      "uv_index_max",
      "precipitation_sum",
      "wind_speed_10m_max",
      "wind_gusts_10m_max",
    ].join(","),
    temperature_unit: "fahrenheit",
    wind_speed_unit: "mph",
    precipitation_unit: "inch",
    timezone,
    forecast_days: "7",
  });

  const res = await fetch(`${BASE}/forecast?${params.toString()}`, {
    next: { revalidate: opts.revalidateSec ?? 900 },
  });
  if (!res.ok) {
    throw new Error(`Open-Meteo ${res.status}: ${res.statusText}`);
  }
  const raw = (await res.json()) as OpenMeteoResponse;

  const current: CurrentWeather = {
    time: raw.current.time,
    temperatureF: raw.current.temperature_2m,
    apparentTemperatureF: raw.current.apparent_temperature,
    humidity: raw.current.relative_humidity_2m,
    windMph: raw.current.wind_speed_10m,
    windDirDeg: raw.current.wind_direction_10m,
    windGustMph: raw.current.wind_gusts_10m,
    pressureHpa: raw.current.surface_pressure,
    weatherCode: raw.current.weather_code,
    cloudCover: raw.current.cloud_cover,
    precipitation: raw.current.precipitation,
    uvIndex: raw.current.uv_index,
  };

  const hourly: HourlyWeather[] = raw.hourly.time.map((t, i) => ({
    time: t,
    temperatureF: raw.hourly.temperature_2m[i],
    apparentTemperatureF: raw.hourly.apparent_temperature[i],
    windMph: raw.hourly.wind_speed_10m[i],
    windDirDeg: raw.hourly.wind_direction_10m[i],
    windGustMph: raw.hourly.wind_gusts_10m[i],
    pressureHpa: raw.hourly.surface_pressure[i],
    weatherCode: raw.hourly.weather_code[i],
    cloudCover: raw.hourly.cloud_cover[i],
    precipitationProbability: raw.hourly.precipitation_probability[i],
    precipitation: raw.hourly.precipitation[i],
    uvIndex: raw.hourly.uv_index[i],
  }));

  const daily: DailyWeather[] = raw.daily.time.map((d, i) => ({
    date: d,
    sunrise: raw.daily.sunrise[i],
    sunset: raw.daily.sunset[i],
    tempMaxF: raw.daily.temperature_2m_max[i],
    tempMinF: raw.daily.temperature_2m_min[i],
    uvMax: raw.daily.uv_index_max[i],
    precipitationSum: raw.daily.precipitation_sum[i],
    windMaxMph: raw.daily.wind_speed_10m_max[i],
    gustMaxMph: raw.daily.wind_gusts_10m_max[i],
  }));

  return {
    current,
    hourly,
    daily,
    fetchedAt: new Date().toISOString(),
  };
}

/**
 * 3-hour pressure trend in hPa. Positive = rising, negative = falling.
 * Returns 0 if the hourly array doesn't have 3 hours of history for `targetIdx`.
 */
export function pressureTrend(
  hourly: HourlyWeather[],
  targetIdx: number
): number {
  if (targetIdx < 3) return 0;
  return (
    hourly[targetIdx].pressureHpa - hourly[targetIdx - 3].pressureHpa
  );
}
