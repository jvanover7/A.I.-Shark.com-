# Lakeline

Lake conditions app for wake surfing + fishing. Mobile-first, installable as a
PWA on iOS. Surfline-style for the surf side, Fishbrain-style for the fish side.

## Stack
- Next.js 14 (App Router)
- TypeScript + Tailwind
- Supabase (auth, db) — Phase 5
- Mapbox GL JS (satellite map)
- Open-Meteo (weather; free, no key)
- suncalc (moon + solunar)
- date-fns (formatting)

## Commands
- `weather` → work on the data layer (`lib/weather.ts`, `app/api/weather`)
- `score` → tweak the 14-factor algorithm (`lib/glass-score.ts`)
- `windows` → glass-window predictor (`lib/glass-windows.ts`, `app/api/glass-windows`)
- `map` → Mapbox component (`components/LakeMap.tsx`)
- `spots` → spot protection / fetch calc (`lib/wind-protection.ts`)
- `solunar` → moon + bite times (`lib/solunar.ts`, `components/SolunarPanel.tsx`)
- `fish` → species + BiteTime (Phase 4 — not yet built)
- `seed` → seed Supabase species + lakes (Phase 4)
- `deploy` → vercel deploy --prod

## Design rules
- No cards wrapping content. Dividers (`border-rule`) and whitespace.
- No emoji as icons. Typography + inline SVG only.
- No purple, teal, or gradients. Warm neutrals + condition data colors.
- The score color is the ONLY chromatic accent on a screen.
- Match Fishbrain BiteTime for fish views; match Surfline for spot/conditions views.
- Tap targets ≥ 44pt (Apple HIG).
- Respect safe-area insets (`env(safe-area-inset-*)`).

## Color tokens
- `paper` #FAF7F2 — background
- `ink` #1A1614 — primary text
- `ink-soft` #5E574E — secondary text
- `ink-mute` #8A8276 — tertiary / labels
- `rule` #E8E1D5 — dividers
- Condition: `cond-glass`, `cond-prime`, `cond-rideable`, `cond-bumpy`, `cond-choppy`, `cond-blown`, `cond-danger`

## Data sources
- Weather: Open-Meteo (cached 15 min server-side via `revalidate: 900`)
- Map tiles: Mapbox (token in `NEXT_PUBLIC_MAPBOX_TOKEN`)
- Water data: USGS (Phase 3.3 — gauge lookup TBD per lake)
- Moon/solunar: `suncalc` package
- Species data: Supabase `species` table (Phase 4)
- Lake boundaries / spot coords: `data/lakes.json` and `public/data/geojson/`

## Key files
- `lib/glass-score.ts` — the 14-factor composite (the differentiator)
- `lib/glass-windows.ts` — finds the next rideable windows over 7 days
- `lib/wind-protection.ts` — spot bearing protection + fetch lookup
- `lib/solunar.ts` — accurate transit-based major/minor periods
- `components/GlassScore.tsx` — hero numeral + label + scale
- `components/GlassWindowList.tsx` — "when's the next glass" answer
- `components/LakeMap.tsx` — Mapbox satellite with scored spot markers

## What's NOT built yet
- Species DB + BiteTime per fish (Phase 4)
- Supabase auth + saved spots + catch log (Phase 5)
- Multi-lake expansion (Phase 6)
- Pre-computed fetch distances per spot (need lake GeoJSON + a Node script using Turf.js — see `LAKELINE-CONDITIONS-MODEL.md` for the algorithm)
- USGS water temp + lake level fetchers
- NWS narrative forecast integration
- Push notifications (web push on iOS 16.4+, or Capacitor wrapper for native)
