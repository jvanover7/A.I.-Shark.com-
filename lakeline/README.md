# Lakeline

Mobile-first PWA for wake surfing and fishing on lakes — Surfline + Fishbrain
mashed into one. Launches with Lake Murray (OK); architected for multi-lake.

The differentiator: the **Glass Score** (14-factor composite) and the
**Glass Window Predictor** that scans the next 7 days and answers "when's
the next time the lake is glass, and which spot delivers it?"

## Quick start

```bash
cd lakeline
npm install
cp .env.local.example .env.local   # fill in Mapbox + Supabase keys
npm run dev
```

App runs at http://localhost:3001 (port chosen so it doesn't clash with the
sibling A.I. Shark site at :3000).

## Required env vars

| Var | Required? | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Yes for the map | Free tier at mapbox.com covers 50k loads/mo |
| `NEXT_PUBLIC_SUPABASE_URL` | Phase 5+ | Not required to boot |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Phase 5+ | Not required to boot |
| `OPENMETEO_BASE` | Optional | Defaults to `https://api.open-meteo.com/v1` |

No keys required for Open-Meteo. The app boots without Mapbox/Supabase set —
the map shows a "configure your token" placeholder and Supabase-backed
features (Phase 5) are gracefully no-op.

## Scripts

- `npm run dev` — dev server on port 3001
- `npm run build` — production build
- `npm run start` — production server
- `npm run typecheck` — `tsc --noEmit`
- `npm run lint` — Next.js ESLint

## Deploy (Vercel)

This repo holds two Next.js apps. Create a **separate Vercel project** for
Lakeline and set its **Root Directory** to `lakeline/`. That way `vercel.com/<your-org>/lakeline`
deploys this app and `vercel.com/<your-org>/ai-shark` deploys the sibling site.

```bash
cd lakeline
vercel link            # link to a NEW Vercel project, not the A.I. Shark one
vercel env add NEXT_PUBLIC_MAPBOX_TOKEN
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel deploy --prod
```

## What's in Phase 1 (this build)

- ✅ Next.js 14 + Tailwind scaffold (TypeScript strict)
- ✅ iOS PWA manifest + Apple meta tags + safe-area insets
- ✅ Cached Open-Meteo proxy (`/api/weather`)
- ✅ Full 14-factor Glass Score algorithm (`lib/glass-score.ts`)
- ✅ Glass Window predictor across the 7-day forecast (`lib/glass-windows.ts`)
- ✅ Spot protection + fetch lookup (`lib/wind-protection.ts`)
- ✅ Accurate moon transit / solunar (`lib/solunar.ts` via `suncalc`)
- ✅ Hero glass score + label + score-band scale
- ✅ Glass windows list ("when's the next glass")
- ✅ Conditions panel (wind / gusts / pressure trend / cloud / UV)
- ✅ Spot list sorted by current score
- ✅ Mapbox satellite map with score-colored markers
- ✅ Solunar panel (moon phase glyph, sun/moon times, major/minor periods)
- ✅ Mobile-first layout + bottom tab nav (Surf · Fish · Map · Saved)
- ✅ Lake Murray seeded with 8 spots

## What's next (per the build plan)

- Phase 2.x — pre-compute fetch distances per spot using Turf.js + Lake Murray
  NHD GeoJSON; populate the `fetchDistances` array in `data/lakes.json`
- Phase 3.3 — USGS water temperature lookup (per-lake gauge IDs)
- Phase 3.4 — lake level via OWRB (Lake Murray) + per-state equivalents
- Phase 4 — Supabase species table + BiteTime per fish (Fishbrain-clone)
- Phase 5 — Supabase auth, saved spots, catch log, condition alerts
- Phase 6 — multi-lake (Travis, Texoma, Conroe), `[lake]` route, per-lake config
- Push notifications — web push on iOS 16.4+ (PWA) or Capacitor wrapper

See `CLAUDE.md` for the build-trigger conventions and the Phase 4-6 hand-off
notes.

## Architecture notes

- **Data flow.** `app/page.tsx` is a server component. On request it calls
  `fetchWeather()` (Open-Meteo, cached 15 min via `revalidate: 900`), scores
  every spot at the current hour, computes glass windows over the 7-day
  hourly array, calculates solunar locally with `suncalc`, then renders.
  No client-side weather fetching — first paint already has real data.
- **Mapbox is the only client component.** Everything else SSRs so the
  first paint on a slow LTE connection is instant.
- **PWA.** Manifest at `/manifest.webmanifest`, iOS-specific meta in the
  root layout (`apple-mobile-web-app-capable`, `viewport-fit=cover`).
  Add the user to home screen → standalone app shell, hides Safari chrome.
- **Score algorithm.** Lives entirely in `lib/glass-score.ts`. Pure
  function, no side effects, deterministic — easy to unit test and tweak
  without touching UI.

## License

Private / unreleased.
