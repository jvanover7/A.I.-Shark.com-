"use client";

import { useEffect, useRef } from "react";
import mapboxgl, { type Map as MapboxMap } from "mapbox-gl";
import type { Lake } from "@/lib/types";

interface MarkerData {
  spotId: string;
  name: string;
  lat: number;
  lon: number;
  score: number;
  color: string;
}

interface Props {
  lake: Lake;
  markers: MarkerData[];
  windDirDeg: number;
  windMph: number;
}

export default function LakeMap({ lake, markers, windDirDeg, windMph }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapboxMap | null>(null);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token || !containerRef.current) return;
    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [lake.center.lon, lake.center.lat],
      zoom: lake.mapZoom,
      attributionControl: false,
    });
    mapRef.current = map;

    map.on("load", () => {
      for (const m of markers) {
        const el = document.createElement("div");
        el.style.cssText = `
          width: 22px;
          height: 22px;
          border-radius: 999px;
          background: ${m.color};
          border: 2px solid #FAF7F2;
          box-shadow: 0 2px 6px rgba(0,0,0,0.4);
          display: grid;
          place-items: center;
          color: #FAF7F2;
          font-size: 10px;
          font-weight: 600;
          font-family: -apple-system, system-ui, sans-serif;
          font-variant-numeric: tabular-nums;
        `;
        el.textContent = String(m.score);
        new mapboxgl.Marker({ element: el })
          .setLngLat([m.lon, m.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 14, closeButton: false }).setHTML(
              `<div style="font-family:-apple-system,system-ui,sans-serif;font-size:13px;color:#1A1614;padding:2px 4px">
                 <div style="font-weight:600">${m.name}</div>
                 <div style="color:${m.color};font-weight:600;margin-top:2px">${m.score}</div>
               </div>`
            )
          )
          .addTo(map);
      }
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [lake, markers]);

  return (
    <section className="border-b border-rule">
      <div className="px-5 pt-6 pb-3 flex items-baseline justify-between">
        <h2 className="text-xs uppercase tracking-[0.18em] text-ink-mute">
          Map
        </h2>
        <div className="text-xs text-ink-soft">
          Wind {Math.round(windMph)} mph from {Math.round(windDirDeg)}°
        </div>
      </div>
      {process.env.NEXT_PUBLIC_MAPBOX_TOKEN ? (
        <div
          ref={containerRef}
          className="w-full h-[360px]"
          aria-label={`Map of ${lake.name}`}
        />
      ) : (
        <div className="mx-5 mb-6 px-4 py-6 border border-rule rounded text-sm text-ink-soft">
          Add <code className="text-ink">NEXT_PUBLIC_MAPBOX_TOKEN</code> to
          <code className="text-ink"> .env.local</code> to render the satellite
          map. Free tier at mapbox.com covers 50k loads/month.
        </div>
      )}
    </section>
  );
}
