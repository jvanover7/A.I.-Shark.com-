# The AI Shark

Marketing site for **The AI Shark LLC** — an AI consulting firm that builds custom automations and unique AI solutions for niche industries.

Built with [Next.js 14](https://nextjs.org/) (App Router) + [Tailwind CSS](https://tailwindcss.com/). Designed to deploy to Vercel with zero config.

## Local development

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Deploy to Vercel

1. Push this branch to GitHub.
2. Visit https://vercel.com/new and import the repository.
3. Vercel auto-detects Next.js — no config needed. Click **Deploy**.
4. Once deployed, add the custom domain `theaishark.com` in the Vercel project's **Settings → Domains**.

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run start` — run production build locally
- `npm run typecheck` — TypeScript check
- `npm run lint` — Next.js / ESLint

## Brand

- **Palette:** Deep ocean (`#02060f` / `#040b1c`) with electric cyan (`#22e0ff` / `#5cf2ff`) accents.
- **Mark:** Custom SVG shark silhouette with circuit accents — lives in `components/Logo.tsx` and `app/icon.svg`.
- **Contact:** `theaishark@theaishark.com`

## Tools

- `tools/get-shit-done/` — vendored snapshot of the [GSD (Get Shit Done)](https://github.com/gsd-build/get-shit-done) Claude Code skill system (MIT). See `tools/get-shit-done/INSTALL-LOCAL.md` for install + the six-command core loop.
