import { NextResponse } from "next/server";
import { fetchWeather } from "@/lib/weather";
import { getLake, DEFAULT_LAKE_ID } from "@/lib/lakes";

export const revalidate = 900; // 15 min cache at the edge
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const lakeId = url.searchParams.get("lake") ?? DEFAULT_LAKE_ID;
  const lake = getLake(lakeId);
  if (!lake) {
    return NextResponse.json({ error: "Unknown lake" }, { status: 404 });
  }

  try {
    const data = await fetchWeather(
      lake.center.lat,
      lake.center.lon,
      lake.timezone
    );
    return NextResponse.json({ lakeId, ...data });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "weather fetch failed" },
      { status: 502 }
    );
  }
}
