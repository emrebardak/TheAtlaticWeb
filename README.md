# The Atletic Base — Landing Page

Single-page, dark cinematic "liquid glass" landing site for The Atletic Base gym.

## Stack

Vite + React + TypeScript, Tailwind CSS v3, Framer Motion.

## Development

```bash
npm install
npm run dev
```

Open the printed `http://localhost:5173/` URL.

## Build

```bash
npm run build
npm run preview
```

## Placeholder media

`src/content/media.ts` currently points `SCROLL_VIDEO_SRC` (the scroll-scrubbed fullscreen background video), `INSTAGRAM_POST_IMAGES`, and `MAP_EMBED_URL` at public placeholders. Replace these constants with real Atletic Base media when available — no other file needs to change.

## Design reference

See `docs/superpowers/specs/2026-07-17-atletic-base-landing-design.md` for the full design spec, and `docs/superpowers/plans/2026-07-17-atletic-base-landing-page.md` for the implementation plan this was built from.
