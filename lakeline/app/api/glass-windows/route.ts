import { NextResponse } from "next/server";
import { fetchWeather } from "@/lib/weather";
import { findGlassWindows } from "@/lib/glass-windows";
import { getLake, DEFAULT_LAKE_ID } from "@/lib/lakes";

export const revalidate = 900;
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const lakeId = url.searchParams.get("lake") ?? DEFAULT_LAKE_ID;
  const threshold = Number(url.searchParams.get("threshold") ?? "55");
  const lake = getLake(lakeId);
  if (!lake) {
    return NextResponse.json({ error: "Unknown lake" }, { status: 404 });
  }

  try {
    const weather = await fetchWeather(
      lake.center.lat,
      lake.center.lon,
      lake.timezone
    );
    const sunByDate: Record<string, { sunrise: string; sunset: string }> = {};
    for (const d of weather.daily) {
      sunByDate[d.date] = { sunrise: d.sunrise, sunset: d.sunset };
    }
    const windows = findGlassWindows({
      lake,
      hourly: weather.hourly,
      sunByDate,
      threshold,
    });
    return NextResponse.json({ lakeId, threshold, windows });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "windows compute failed" },
      { status: 502 }
    );
  }
}
