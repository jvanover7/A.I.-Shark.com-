# A.I. Shark monorepo

This repository now holds **two independent Next.js 14 apps** that share the repo but deploy to separate Vercel projects:

| Path | App | Port |
| --- | --- | --- |
| `/` (root) | **The AI Shark** — marketing site for The AI Shark LLC | `3000` |
| `/lakeline/` | **Lakeline** — mobile-first PWA for wake-surf + fishing forecasts | `3001` |

Each has its own `package.json` and `node_modules`. Deploy by creating a Vercel project per app and setting its **Root Directory** to the corresponding path.

---

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

## Lakeline app

Lives in `lakeline/`. See `lakeline/README.md` for setup, env vars, and the Phase 1 → 6 build plan. Quick start:

```bash
cd lakeline
npm install
cp .env.local.example .env.local
npm run dev    # http://localhost:3001
```

## Tools

Vendored Claude Code skills/plugins live under `tools/` — see `tools/README.md` for the full table. Snapshots include:

- `tools/get-shit-done/` — [GSD](https://github.com/gsd-build/get-shit-done) spec-driven dev skill (MIT)
- `tools/claude-plugins-official/` — Anthropic-official `skill-creator` + `frontend-design` plugins
- `tools/context-mode/` — [context-mode](https://github.com/mksglu/context-mode) MCP server for context sandboxing
- `tools/claude-mem/` — [claude-mem](https://github.com/thedotmack/claude-mem) persistent memory compression
