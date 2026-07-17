# The Atletic Base Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the single-page, dark cinematic "liquid glass" landing site for The Atletic Base gym (Hero + Programs sections) as specified in `docs/superpowers/specs/2026-07-17-atletic-base-landing-design.md`.

**Architecture:** Vite + React + TypeScript SPA, styled with Tailwind CSS v3 utility classes plus two hand-written `.liquid-glass` / `.liquid-glass-strong` CSS classes, animated with Framer Motion. Two presentational section components (`Hero`, `Programs`) are assembled from small reusable pieces (`FadingVideo`, `BlurText`, inline SVG icon components) and content constants centralized in `src/content/`.

**Tech Stack:** Vite, React 18/19, TypeScript, Tailwind CSS v3 (pinned — not v4), Framer Motion, PostCSS + Autoprefixer.

## Global Constraints

- Background is pure `#000` black; all text white (`white`, `white/80`, `white/90`) — no other background colors anywhere on the page.
- Headings use Instrument Serif italic only (`font-heading` + `italic`); body text uses Barlow (`font-body`), weights 300/400/500/600 only.
- Fonts loaded via Google Fonts `<link>` tags in `index.html` — no self-hosted font files.
- Tailwind CSS must be v3.x with a JS `tailwind.config.js` (not v4's CSS-first `@theme` config) — pin `tailwindcss@^3` on install.
- `.liquid-glass` / `.liquid-glass-strong` CSS must match the spec's exact values (blur radius, box-shadow, gradient-stroke `::before` with `mask-composite: exclude`) — no literal `border` properties anywhere on glass elements.
- Exactly two sections: Hero and Programs. No routing, no backend, no forms, no CMS, no additional sections.
- All copy strings live in `src/content/copy.ts`; all media URLs live in `src/content/media.ts` — never hardcode copy/URLs inline in components.
- Placeholder media only (public sample MP4s) — swappable via the two named constants in `src/content/media.ts`.
- Responsive behavior follows Tailwind's default `sm`/`md`/`lg` breakpoints per the spec's Responsive Behavior section (nav pill hidden below `md`, grid `grid-cols-1` → `md:grid-cols-3`, CTA/stat stacking `flex-col` → `sm:flex-row`).
- No automated test suite (per spec's Testing Approach) — every task's verification is TypeScript compilation (`tsc --noEmit`), a production build (`npm run build`), and manual browser checks in the dev server.

---

### Task 1: Project scaffold (Vite + React + TypeScript)

**Files:**
- Create: entire Vite React-TS scaffold (`package.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/vite-env.d.ts`, `.gitignore`) via `npm create vite@latest`
- Modify: `src/App.tsx` (replace generated placeholder content)
- Delete: `src/App.css`, `src/assets/react.svg` (unused scaffold assets)

**Interfaces:**
- Consumes: nothing (first task)
- Produces: a working Vite dev server at `http://localhost:5173`, `src/App.tsx` default-exporting a React component named `App`

- [ ] **Step 1: Scaffold the project**

Run from the project root (`C:\MrBardak\Code\DenemeWebSitesi`), which already contains `docs/` and `.git/` but nothing else:

```bash
npm create vite@latest . -- --template react-ts --force
```

Expected output: create-vite prints the files it scaffolded (`package.json`, `index.html`, `src/`, etc.) and finishes with "Done. Now run:" instructions. Verify `docs/` and `.git/` still exist afterward:

```bash
ls docs .git
```

Expected: both directories are still listed (unaffected by the scaffold).

- [ ] **Step 2: Install dependencies**

```bash
npm install
```

Expected: installs without errors, creates `node_modules/` and `package-lock.json`.

- [ ] **Step 3: Verify the default scaffold runs**

```bash
npm run dev
```

Expected: prints a `Local: http://localhost:5173/` URL. Open it in a browser — the default Vite + React starter page (spinning logos, counter button) should render. Stop the dev server (Ctrl+C) once confirmed.

- [ ] **Step 4: Replace `src/App.tsx` with a minimal placeholder**

Delete the unused scaffold files:

```bash
rm -f src/App.css src/assets/react.svg
```

Replace `src/App.tsx` entirely with:

```tsx
function App() {
  return (
    <div style={{ padding: '2rem', color: 'white', background: 'black', minHeight: '100vh' }}>
      The Atletic Base — coming soon
    </div>
  );
}

export default App;
```

Open `src/main.tsx` and remove the `import './index.css'` line's reference to any deleted CSS if present, and remove `import './App.css'` from `App.tsx` if the scaffold added one (the replacement above has no such import, so nothing further to do there).

- [ ] **Step 5: Verify**

```bash
npm run dev
```

Open `http://localhost:5173/` — the page shows the black background with the text "The Atletic Base — coming soon" instead of the default Vite starter page. Stop the dev server.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json tsconfig.json tsconfig.node.json vite.config.ts index.html src .gitignore
git commit -m "chore: scaffold Vite + React + TypeScript project"
```

---

### Task 2: Tailwind CSS setup + liquid glass CSS

**Files:**
- Create: `tailwind.config.js`, `postcss.config.js`
- Modify: `src/index.css` (replace with Tailwind directives + base rules + liquid glass classes), `src/App.tsx` (temporary visual check)

**Interfaces:**
- Consumes: Task 1's `src/main.tsx` (already imports `./index.css` from the Vite scaffold — confirm this import exists; if not, add it)
- Produces: `.liquid-glass` and `.liquid-glass-strong` CSS classes usable by any component; Tailwind utility classes available project-wide; `font-heading` / `font-body` Tailwind font families

- [ ] **Step 1: Install Tailwind v3 and generate config**

```bash
npm install -D tailwindcss@^3 postcss autoprefixer
npx tailwindcss init -p
```

Expected: creates `tailwind.config.js` and `postcss.config.js` in the project root.

- [ ] **Step 2: Configure `tailwind.config.js`**

Replace its contents with:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Instrument Serif'", 'serif'],
        body: ["'Barlow'", 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 3: Confirm `postcss.config.js` contents**

It should read (this is `tailwindcss init -p`'s default output — verify it matches, no edit needed if so):

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 4: Replace `src/index.css`**

Replace the entire file with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html,
body {
  background: #000;
  color: #fff;
  font-family: 'Barlow', sans-serif;
}

.liquid-glass {
  background: rgba(255, 255, 255, 0.01);
  background-blend-mode: luminosity;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}
.liquid-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.45) 0%,
    rgba(255, 255, 255, 0.15) 20%,
    rgba(255, 255, 255, 0) 40%,
    rgba(255, 255, 255, 0) 60%,
    rgba(255, 255, 255, 0.15) 80%,
    rgba(255, 255, 255, 0.45) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.liquid-glass-strong {
  background: rgba(255, 255, 255, 0.01);
  background-blend-mode: luminosity;
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.15);
  position: relative;
  overflow: hidden;
}
.liquid-glass-strong::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0) 40%,
    rgba(255, 255, 255, 0) 60%,
    rgba(255, 255, 255, 0.2) 80%,
    rgba(255, 255, 255, 0.5) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

- [ ] **Step 5: Confirm `src/main.tsx` imports the stylesheet**

Open `src/main.tsx`. It must contain `import './index.css'` near the top (the Vite scaffold adds this by default — if missing, add it as the first import after React imports).

- [ ] **Step 6: Temporary visual check in `src/App.tsx`**

Replace `src/App.tsx` with:

```tsx
function App() {
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="liquid-glass w-64 rounded-2xl p-6 text-white">
        Tailwind + liquid glass check
      </div>
    </div>
  );
}

export default App;
```

- [ ] **Step 7: Verify**

```bash
npm run dev
```

Open `http://localhost:5173/`. You should see a black page with a rounded glass panel: a faint blurred box with a subtle light gradient border (brighter at top/bottom edges, fading in the middle) and white text inside. Stop the dev server.

Also run:

```bash
npx tsc --noEmit
```

Expected: no output (no type errors).

- [ ] **Step 8: Commit**

```bash
git add tailwind.config.js postcss.config.js src/index.css src/App.tsx package.json package-lock.json
git commit -m "feat: add Tailwind CSS v3 and liquid glass CSS classes"
```

---

### Task 3: Google Fonts + font verification

**Files:**
- Modify: `index.html` (add font `<link>` tags, update `<title>`), `src/App.tsx` (temporary visual check)

**Interfaces:**
- Consumes: Task 2's `font-heading` / `font-body` Tailwind classes
- Produces: Instrument Serif (italic) and Barlow (300/400/500/600) available as `font-heading` / `font-body` in every component from here on

- [ ] **Step 1: Update `index.html`**

Open `index.html`. Replace the `<title>` line and add font links inside `<head>`, so the head looks like:

```html
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>The Atletic Base</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600&family=Instrument+Serif:ital@1&display=swap"
    rel="stylesheet"
  />
</head>
```

(You may remove the `vite.svg` favicon link if you don't have a replacement icon yet — leaving it is also fine since it has no effect on the design.)

- [ ] **Step 2: Temporary visual check in `src/App.tsx`**

Replace `src/App.tsx` with:

```tsx
function App() {
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="liquid-glass w-80 rounded-2xl p-6">
        <h1 className="font-heading text-4xl italic text-white">Instrument Serif Italic</h1>
        <p className="mt-2 font-body text-white/80">Barlow body text check</p>
      </div>
    </div>
  );
}

export default App;
```

- [ ] **Step 3: Verify**

```bash
npm run dev
```

Open `http://localhost:5173/`. The heading "Instrument Serif Italic" should render in an italic serif typeface (not the browser default serif), and "Barlow body text check" should render in Barlow's sans-serif. Confirm in browser devtools: select the `<h1>`, check the Computed panel — `font-family` should resolve to `'Instrument Serif', serif` (not fall back to generic serif). Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add index.html src/App.tsx
git commit -m "feat: load Instrument Serif and Barlow via Google Fonts"
```

---

### Task 4: Icon components

**Files:**
- Create: `src/components/icons/ArrowUpRight.tsx`, `src/components/icons/Play.tsx`, `src/components/icons/ClockIcon.tsx`, `src/components/icons/GlobeIcon.tsx`, `src/components/icons/ImageIcon.tsx`, `src/components/icons/MovieIcon.tsx`, `src/components/icons/LightbulbIcon.tsx`, `src/components/icons/index.ts`
- Modify: `src/App.tsx` (temporary visual check)

**Interfaces:**
- Consumes: nothing beyond React
- Produces: `ArrowUpRight`, `Play`, `ClockIcon`, `GlobeIcon`, `ImageIcon`, `MovieIcon`, `LightbulbIcon` — each a `({ className }: { className?: string }) => JSX.Element` component, all exported from `src/components/icons/index.ts`

- [ ] **Step 1: Create `src/components/icons/ArrowUpRight.tsx`**

```tsx
export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}
```

- [ ] **Step 2: Create `src/components/icons/Play.tsx`**

```tsx
export function Play({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="6 4 20 12 6 20 6 4" />
    </svg>
  );
}
```

- [ ] **Step 3: Create `src/components/icons/ClockIcon.tsx`**

```tsx
export function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}
```

- [ ] **Step 4: Create `src/components/icons/GlobeIcon.tsx`**

```tsx
export function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <path d="M12 3c2.5 2.5 2.5 15.5 0 18" />
      <path d="M12 3c-2.5 2.5-2.5 15.5 0 18" />
    </svg>
  );
}
```

- [ ] **Step 5: Create `src/components/icons/ImageIcon.tsx`**

```tsx
export function ImageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
    </svg>
  );
}
```

- [ ] **Step 6: Create `src/components/icons/MovieIcon.tsx`**

```tsx
export function MovieIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2z" />
    </svg>
  );
}
```

- [ ] **Step 7: Create `src/components/icons/LightbulbIcon.tsx`**

```tsx
export function LightbulbIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 21h6v-1H9v1zm3-19a7 7 0 0 0-4 12.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26A7 7 0 0 0 12 2z" />
    </svg>
  );
}
```

- [ ] **Step 8: Create `src/components/icons/index.ts`**

```ts
export { ArrowUpRight } from './ArrowUpRight';
export { Play } from './Play';
export { ClockIcon } from './ClockIcon';
export { GlobeIcon } from './GlobeIcon';
export { ImageIcon } from './ImageIcon';
export { MovieIcon } from './MovieIcon';
export { LightbulbIcon } from './LightbulbIcon';
```

- [ ] **Step 9: Temporary visual check in `src/App.tsx`**

Replace `src/App.tsx` with:

```tsx
import {
  ArrowUpRight,
  Play,
  ClockIcon,
  GlobeIcon,
  ImageIcon,
  MovieIcon,
  LightbulbIcon,
} from './components/icons';

function App() {
  return (
    <div className="flex min-h-screen flex-wrap items-center gap-6 bg-black p-8 text-white">
      <ArrowUpRight className="h-6 w-6" />
      <Play className="h-6 w-6" />
      <ClockIcon className="h-6 w-6" />
      <GlobeIcon className="h-6 w-6" />
      <ImageIcon className="h-6 w-6" />
      <MovieIcon className="h-6 w-6" />
      <LightbulbIcon className="h-6 w-6" />
    </div>
  );
}

export default App;
```

- [ ] **Step 10: Verify**

```bash
npx tsc --noEmit
npm run dev
```

Expected: `tsc` prints no errors. In the browser, seven white icons render in a row on a black background (arrow, play triangle, clock, globe, image, film, lightbulb).

- [ ] **Step 11: Commit**

```bash
git add src/components/icons src/App.tsx
git commit -m "feat: add inline SVG icon components"
```

---

### Task 5: Content constants (copy + media)

**Files:**
- Create: `src/content/copy.ts`, `src/content/media.ts`
- Modify: `src/App.tsx` (temporary visual check)

**Interfaces:**
- Consumes: nothing
- Produces:
  - From `src/content/copy.ts`: `NAV_LINKS: readonly string[]`, `HERO_BADGE_TEXT: string`, `HERO_HEADLINE: string`, `HERO_SUBTEXT: string`, `HERO_STATS: readonly { icon: 'clock' | 'globe'; value: string; label: string }[]`, `TRUST_BAR_TEXT: string`, `TRUST_STATS: string[]`, `PROGRAMS_LABEL: string`, `PROGRAMS_HEADING: string[]`, `PROGRAM_CARDS: readonly { icon: 'image' | 'movie' | 'lightbulb'; title: string; tags: string[]; body: string }[]`
  - From `src/content/media.ts`: `HERO_VIDEO_SRC: string`, `PROGRAMS_VIDEO_SRC: string[]`

- [ ] **Step 1: Create `src/content/copy.ts`**

```ts
export const NAV_LINKS = ['Programs', 'Coaches', 'Facility', 'Membership', 'Contact'] as const;

export const HERO_BADGE_TEXT = 'Now Open — Founding Member Rates Available';

export const HERO_HEADLINE = 'Raw Strength Forged In Concrete And Steel';

export const HERO_SUBTEXT =
  "The Atletic Base is an industrial-grade training facility built for those who show up. Exposed concrete, moody blue light, and equipment that doesn't quit — built for strength, conditioning, and community.";

export const HERO_STATS = [
  { icon: 'clock', value: '24/7', label: 'Round-The-Clock Facility Access' },
  { icon: 'globe', value: '500+', label: 'Members Training Strong Every Week' },
] as const;

export const TRUST_BAR_TEXT =
  'Trusted by athletes, coaches, and everyday grinders across the city';

export const TRUST_STATS = ['Est. 2019', '12 Coaches', '500+ Members', '5.0 Rated', '24/7 Access'];

export const PROGRAMS_LABEL = '// Programs';

export const PROGRAMS_HEADING = ['Concrete floors,', 'real results'];

export const PROGRAM_CARDS = [
  {
    icon: 'image',
    title: 'Strength',
    tags: ['Free Weights', 'Powerlifting', 'Progressive Overload', '1-on-1 Spotting'],
    body: 'Barbells, plates, and concrete platforms built for serious lifting. Progressive programs for beginners through competitive powerlifters.',
  },
  {
    icon: 'movie',
    title: 'Conditioning',
    tags: ['HIIT', 'Group Classes', 'Small Group', 'All Levels'],
    body: 'High-energy group sessions under the blue lights. Conditioning work that builds community as much as capacity.',
  },
  {
    icon: 'lightbulb',
    title: 'Coaching',
    tags: ['1-on-1', 'Nutrition', 'Program Design', 'Accountability'],
    body: "Dedicated coaches build a plan around your goals, your schedule, and your body — then hold you to it.",
  },
] as const;
```

- [ ] **Step 2: Create `src/content/media.ts`**

```ts
// TEMPORARY PLACEHOLDER MEDIA — replace with real Atletic Base footage when available.
export const HERO_VIDEO_SRC =
  'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export const PROGRAMS_VIDEO_SRC = [
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
];
```

- [ ] **Step 3: Temporary visual check in `src/App.tsx`**

Replace `src/App.tsx` with:

```tsx
import { HERO_HEADLINE } from './content/copy';
import { HERO_VIDEO_SRC } from './content/media';

function App() {
  return (
    <div className="min-h-screen bg-black p-8 text-white">
      <p>{HERO_HEADLINE}</p>
      <p className="text-xs text-white/50">{HERO_VIDEO_SRC}</p>
    </div>
  );
}

export default App;
```

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit
npm run dev
```

Expected: no type errors; browser shows the headline text and the placeholder video URL as plain text on a black background.

- [ ] **Step 5: Commit**

```bash
git add src/content src/App.tsx
git commit -m "feat: add centralized copy and media content constants"
```

---

### Task 6: `FadingVideo` component

**Files:**
- Create: `src/components/FadingVideo.tsx`
- Modify: `src/App.tsx` (temporary visual check)

**Interfaces:**
- Consumes: nothing beyond React
- Produces: `FadingVideo({ src, className, style }: { src: string | string[]; className?: string; style?: CSSProperties }) => JSX.Element` — a `<video>` that fades in on load, fades out in its last 0.55s, and either loops (single `src`) or cycles to the next source (array `src`) on `ended`

- [ ] **Step 1: Create `src/components/FadingVideo.tsx`**

```tsx
import { useEffect, useRef, useState, type CSSProperties } from 'react';

interface FadingVideoProps {
  src: string | string[];
  className?: string;
  style?: CSSProperties;
}

const FADE_IN_MS = 500;
const FADE_OUT_MS = 550;
const FADE_OUT_THRESHOLD_S = 0.55;

export function FadingVideo({ src, className, style }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const opacityRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const fadingOutRef = useRef(false);
  const [sourceIndex, setSourceIndex] = useState(0);

  const sources = Array.isArray(src) ? src : [src];
  const currentSrc = sources[sourceIndex] ?? sources[0];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const animateOpacity = (target: number, durationMs: number) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);

      const start = opacityRef.current;
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        const value = start + (target - start) * progress;
        opacityRef.current = value;
        video.style.opacity = String(value);
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          rafRef.current = null;
        }
      };

      rafRef.current = requestAnimationFrame(step);
    };

    fadingOutRef.current = false;
    video.style.opacity = '0';
    opacityRef.current = 0;

    const handleLoadedData = () => {
      animateOpacity(1, FADE_IN_MS);
    };

    const handleTimeUpdate = () => {
      if (!video.duration || Number.isNaN(video.duration)) return;
      const remaining = video.duration - video.currentTime;
      if (remaining <= FADE_OUT_THRESHOLD_S && !fadingOutRef.current) {
        fadingOutRef.current = true;
        animateOpacity(0, FADE_OUT_MS);
      }
    };

    const handleEnded = () => {
      fadingOutRef.current = false;
      if (sources.length > 1) {
        setSourceIndex((prevIndex) => (prevIndex + 1) % sources.length);
      } else {
        video.currentTime = 0;
        video.play().catch(() => {});
        animateOpacity(1, FADE_IN_MS);
      }
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [currentSrc, sources.length]);

  return (
    <video
      ref={videoRef}
      key={currentSrc}
      src={currentSrc}
      className={className}
      style={{ opacity: 0, ...style }}
      autoPlay
      muted
      playsInline
      preload="auto"
    />
  );
}
```

- [ ] **Step 2: Temporary visual check in `src/App.tsx`**

Replace `src/App.tsx` with:

```tsx
import { FadingVideo } from './components/FadingVideo';
import { HERO_VIDEO_SRC } from './content/media';

function App() {
  return (
    <div className="relative h-screen bg-black">
      <FadingVideo src={HERO_VIDEO_SRC} className="h-full w-full object-cover" />
    </div>
  );
}

export default App;
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
npm run dev
```

Expected: no type errors. In the browser, the video fades in from black over ~0.5s once it loads, plays, fades to black over its last ~0.55s, then restarts and fades back in (loop, since `HERO_VIDEO_SRC` is a single string here). This video is a few minutes long — use the browser devtools to fast-forward (`document.querySelector('video').currentTime = document.querySelector('video').duration - 2` in the console) to confirm the fade-out/loop behavior without waiting.

- [ ] **Step 4: Commit**

```bash
git add src/components/FadingVideo.tsx src/App.tsx
git commit -m "feat: add FadingVideo component with fade in/out and source cycling"
```

---

### Task 7: `BlurText` component

**Files:**
- Create: `src/components/BlurText.tsx`
- Modify: `src/App.tsx` (temporary visual check)

**Interfaces:**
- Consumes: `framer-motion`'s `motion` export (installed in this task)
- Produces: `BlurText({ text, className }: { text: string; className?: string }) => JSX.Element` — renders `text` as word-by-word blur-in spans that animate once the container scrolls into view

- [ ] **Step 1: Install Framer Motion**

```bash
npm install framer-motion
```

- [ ] **Step 2: Create `src/components/BlurText.tsx`**

```tsx
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface BlurTextProps {
  text: string;
  className?: string;
}

export function BlurText({ text, className }: BlurTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const words = text.split(' ');

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        rowGap: '0.1em',
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
          animate={
            isVisible
              ? { filter: 'blur(0px)', opacity: 1, y: 0 }
              : { filter: 'blur(10px)', opacity: 0, y: 50 }
          }
          transition={{ duration: 0.7, delay: index * 0.1, ease: 'easeOut' }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Temporary visual check in `src/App.tsx`**

Replace `src/App.tsx` with:

```tsx
import { BlurText } from './components/BlurText';

function App() {
  return (
    <div className="bg-black">
      <div style={{ height: '120vh' }} className="flex items-center justify-center text-white/50">
        Scroll down to trigger the blur-in animation
      </div>
      <BlurText
        text="Raw Strength Forged In Concrete And Steel"
        className="font-heading text-6xl italic text-white"
      />
      <div style={{ height: '50vh' }} />
    </div>
  );
}

export default App;
```

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit
npm run dev
```

Expected: no type errors. In the browser, the headline is not visible (or blurred/offset) until you scroll down to it, at which point each word blurs/fades/slides into place in sequence, left to right.

- [ ] **Step 5: Commit**

```bash
git add src/components/BlurText.tsx src/App.tsx package.json package-lock.json
git commit -m "feat: add BlurText word-by-word scroll-triggered animation component"
```

---

### Task 8: Hero section

**Files:**
- Create: `src/sections/Hero.tsx`
- Modify: `src/App.tsx` (render `Hero` only)

**Interfaces:**
- Consumes: `FadingVideo` (Task 6), `BlurText` (Task 7), `ArrowUpRight`/`Play`/`ClockIcon`/`GlobeIcon` (Task 4), `NAV_LINKS`/`HERO_BADGE_TEXT`/`HERO_HEADLINE`/`HERO_SUBTEXT`/`HERO_STATS`/`TRUST_BAR_TEXT`/`TRUST_STATS` (Task 5 `copy.ts`), `HERO_VIDEO_SRC` (Task 5 `media.ts`)
- Produces: `Hero(): JSX.Element` — the full hero `<section>`, exported as a named export from `src/sections/Hero.tsx`

- [ ] **Step 1: Create `src/sections/Hero.tsx`**

```tsx
import { motion } from 'framer-motion';
import { FadingVideo } from '../components/FadingVideo';
import { BlurText } from '../components/BlurText';
import { ArrowUpRight, Play, ClockIcon, GlobeIcon } from '../components/icons';
import {
  NAV_LINKS,
  HERO_BADGE_TEXT,
  HERO_HEADLINE,
  HERO_SUBTEXT,
  HERO_STATS,
  TRUST_BAR_TEXT,
  TRUST_STATS,
} from '../content/copy';
import { HERO_VIDEO_SRC } from '../content/media';

const fadeUp = {
  initial: { filter: 'blur(10px)', opacity: 0, y: 20 },
  animate: { filter: 'blur(0px)', opacity: 1, y: 0 },
};

const STAT_ICONS: Record<'clock' | 'globe', typeof ClockIcon> = {
  clock: ClockIcon,
  globe: GlobeIcon,
};

export function Hero() {
  return (
    <section className="relative h-screen overflow-hidden bg-black">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(10,26,47,0.55) 0%, rgba(10,26,47,0) 60%)',
        }}
      />
      <FadingVideo
        src={HERO_VIDEO_SRC}
        className="absolute left-1/2 top-0 z-0 -translate-x-1/2 object-cover object-top"
        style={{ width: '120%', height: '120%' }}
      />

      <div className="relative z-10 flex h-full flex-col">
        <nav className="fixed inset-x-0 top-4 z-50 flex items-center justify-between px-8 lg:px-16">
          <div className="liquid-glass flex h-12 w-12 items-center justify-center rounded-full">
            <span className="font-heading text-2xl italic">AB</span>
          </div>

          <div className="liquid-glass hidden items-center rounded-full px-1.5 py-1.5 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="px-3 py-2 font-body text-sm font-medium text-white/90"
              >
                {link}
              </a>
            ))}
            <button
              type="button"
              className="flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-medium text-black"
            >
              Join Now
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          <div className="hidden h-12 w-12 md:block" />
        </nav>

        <div className="flex flex-1 flex-col items-center justify-center px-4 pt-24 text-center">
          <motion.div
            className="liquid-glass flex items-center gap-2 rounded-full px-4 py-2"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
          >
            <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-black">
              New
            </span>
            <span className="font-body text-sm text-white/90">{HERO_BADGE_TEXT}</span>
          </motion.div>

          <div className="mt-6 max-w-3xl">
            <BlurText
              text={HERO_HEADLINE}
              className="font-heading text-6xl italic leading-[0.8] tracking-[-4px] text-white md:text-7xl lg:text-[5.5rem]"
            />
          </div>

          <motion.p
            className="mt-4 max-w-2xl font-body text-sm font-light leading-tight text-white md:text-base"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.8 }}
          >
            {HERO_SUBTEXT}
          </motion.p>

          <motion.div
            className="mt-6 flex flex-col items-center gap-6 sm:flex-row"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 1.1 }}
          >
            <button
              type="button"
              className="liquid-glass-strong flex items-center gap-2 rounded-full px-5 py-2.5 font-body text-sm font-medium text-white"
            >
              Join Now
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="flex items-center gap-2 font-body text-sm font-medium text-white"
            >
              <Play className="h-4 w-4" />
              Watch The Space
            </button>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-col gap-4 sm:flex-row"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 1.3 }}
          >
            {HERO_STATS.map((stat) => {
              const Icon = STAT_ICONS[stat.icon];
              return (
                <div
                  key={stat.label}
                  className="liquid-glass w-[220px] rounded-[1.25rem] p-5 text-left"
                >
                  <Icon className="h-5 w-5 text-white/80" />
                  <div className="mt-4 font-heading text-4xl italic leading-none tracking-[-1px] text-white">
                    {stat.value}
                  </div>
                  <div className="mt-2 font-body text-sm text-white/80">{stat.label}</div>
                </div>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          className="flex flex-col items-center gap-4 pb-8"
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 1.4 }}
        >
          <div className="liquid-glass rounded-full px-4 py-2 font-body text-sm text-white/90">
            {TRUST_BAR_TEXT}
          </div>
          <div className="flex flex-wrap justify-center gap-3 px-4">
            {TRUST_STATS.map((stat) => (
              <span
                key={stat}
                className="liquid-glass rounded-full px-4 py-1.5 font-body text-sm text-white/90"
              >
                {stat}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Replace `src/App.tsx`**

```tsx
import { Hero } from './sections/Hero';

function App() {
  return <Hero />;
}

export default App;
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
npm run build
npm run dev
```

Expected: `tsc` and `npm run build` both succeed with no errors. In the browser at `http://localhost:5173/`:
- Desktop width (≥1024px): logo circle (left), center nav pill with 5 links + "Join Now" button, empty spacer (right); badge, headline (blur-in on load), subtext, two CTA buttons, two stat cards, and the trust bar all appear centered, staggering in over ~1.5s.
- Resize to tablet width (~768px) and mobile width (~375px) using devtools device toolbar: the center nav pill and right spacer disappear below `md`, only the logo circle remains in the header; CTA buttons and stat cards stack vertically; trust stat pills wrap onto multiple lines.
- The background video fades in and plays behind everything, cropped to `object-cover object-top`.

- [ ] **Step 4: Commit**

```bash
git add src/sections/Hero.tsx src/App.tsx
git commit -m "feat: assemble Hero section"
```

---

### Task 9: Programs section

**Files:**
- Create: `src/sections/Programs.tsx`
- Modify: `src/App.tsx` (render `Hero` + `Programs`)

**Interfaces:**
- Consumes: `FadingVideo` (Task 6), `ImageIcon`/`MovieIcon`/`LightbulbIcon` (Task 4), `PROGRAMS_LABEL`/`PROGRAMS_HEADING`/`PROGRAM_CARDS` (Task 5 `copy.ts`), `PROGRAMS_VIDEO_SRC` (Task 5 `media.ts`)
- Produces: `Programs(): JSX.Element` — the full programs `<section>`, exported as a named export from `src/sections/Programs.tsx`

- [ ] **Step 1: Create `src/sections/Programs.tsx`**

```tsx
import { FadingVideo } from '../components/FadingVideo';
import { ImageIcon, MovieIcon, LightbulbIcon } from '../components/icons';
import { PROGRAMS_LABEL, PROGRAMS_HEADING, PROGRAM_CARDS } from '../content/copy';
import { PROGRAMS_VIDEO_SRC } from '../content/media';

const CARD_ICONS: Record<'image' | 'movie' | 'lightbulb', typeof ImageIcon> = {
  image: ImageIcon,
  movie: MovieIcon,
  lightbulb: LightbulbIcon,
};

export function Programs() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(10,26,47,0.55) 0%, rgba(10,26,47,0) 60%)',
        }}
      />
      <FadingVideo
        src={PROGRAMS_VIDEO_SRC}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      <div className="relative z-10 flex min-h-screen flex-col px-8 pb-10 pt-24 md:px-16 lg:px-20">
        <div className="mb-auto">
          <p className="mb-6 font-body text-sm text-white/80">{PROGRAMS_LABEL}</p>
          <h2 className="font-heading text-6xl italic leading-[0.9] tracking-[-3px] text-white md:text-7xl lg:text-[6rem]">
            {PROGRAMS_HEADING.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PROGRAM_CARDS.map((card) => {
            const Icon = CARD_ICONS[card.icon];
            return (
              <div
                key={card.title}
                className="liquid-glass flex min-h-[360px] flex-col rounded-[1.25rem] p-6"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="liquid-glass flex h-11 w-11 items-center justify-center rounded-[0.75rem]">
                    <Icon className="h-5 w-5 text-white/90" />
                  </div>
                  <div className="flex flex-wrap justify-end gap-1.5">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="liquid-glass whitespace-nowrap rounded-full px-3 py-1 font-body text-[11px] text-white/90"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex-1" />

                <div>
                  <h3 className="font-heading text-3xl italic leading-none tracking-[-1px] text-white md:text-4xl">
                    {card.title}
                  </h3>
                  <p className="mt-3 max-w-[32ch] font-body text-sm font-light leading-snug text-white/90">
                    {card.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Replace `src/App.tsx`**

```tsx
import { Hero } from './sections/Hero';
import { Programs } from './sections/Programs';

function App() {
  return (
    <>
      <Hero />
      <Programs />
    </>
  );
}

export default App;
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
npm run build
npm run dev
```

Expected: `tsc` and `npm run build` both succeed. In the browser, scroll past the Hero section to reach Programs:
- Desktop width: "// Programs" label, "Concrete floors, / real results" two-line heading, and a 3-column grid of Strength/Conditioning/Coaching cards, each with an icon square, right-aligned tags, and title+body pinned to the bottom.
- Resize to mobile width: the grid collapses to a single column, cards stack vertically full-width.
- The background video cycles between the two `PROGRAMS_VIDEO_SRC` sources: let one clip play to the end (or scrub near the end via devtools console `document.querySelectorAll('video')[1].currentTime = document.querySelectorAll('video')[1].duration - 2`) and confirm it fades out, then fades in on the next source without a hard cut.

- [ ] **Step 4: Commit**

```bash
git add src/sections/Programs.tsx src/App.tsx
git commit -m "feat: assemble Programs section"
```

---

### Task 10: Final polish, README, and full QA pass

**Files:**
- Create: `README.md`
- Modify: none (verification-only pass on existing files)

**Interfaces:**
- Consumes: the fully assembled `App` from Task 9
- Produces: a documented, build-clean project ready to hand off

- [ ] **Step 1: Create `README.md`**

```md
# The Atletic Base — Landing Page

Single-page, dark cinematic "liquid glass" landing site for The Atletic Base gym.

## Stack

Vite + React + TypeScript, Tailwind CSS v3, Framer Motion.

## Development

\`\`\`bash
npm install
npm run dev
\`\`\`

Open the printed `http://localhost:5173/` URL.

## Build

\`\`\`bash
npm run build
npm run preview
\`\`\`

## Placeholder media

`src/content/media.ts` currently points `HERO_VIDEO_SRC` and `PROGRAMS_VIDEO_SRC` at public sample videos as placeholders. Replace both constants with real Atletic Base footage URLs when available — no other file needs to change.

## Design reference

See `docs/superpowers/specs/2026-07-17-atletic-base-landing-design.md` for the full design spec, and `docs/superpowers/plans/2026-07-17-atletic-base-landing-page.md` for the implementation plan this was built from.
```

- [ ] **Step 2: Full QA pass**

```bash
npx tsc --noEmit
npm run build
npm run preview
```

Expected: all three commands succeed with no errors. Open the `npm run preview` URL and walk through the full spec's Testing Approach checklist:
- Both sections render in order (Hero, then Programs).
- Hero video fades in on load; Programs video cycles between its two sources with fade transitions (no hard cuts).
- `BlurText` headline animates in on initial load (Hero is in view immediately); scrolling behavior confirmed already in Task 7.
- Resize the window / use devtools device toolbar at three widths — ~375px (mobile), ~768px (tablet), ~1280px (desktop) — and confirm all responsive rules from the spec's Responsive Behavior section hold: nav pill hidden below `md`, CTA/stat stacking, trust pill wrapping, Programs grid collapsing to one column.
- Liquid glass panels show visible blur and a soft gradient-stroke border (not a flat solid border) in a Chromium-based browser.

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: add project README"
```

---

## Post-Plan Notes

- Git has no configured identity on this machine (`git commit` will fail with "Please tell me who you are" until `git config --global user.name`/`user.email` are set, or set locally in this repo). Set this before running Step 1's commits, or run all commits at the end in one pass.
- All media is placeholder (Google's public sample MP4s) per the spec — swap `src/content/media.ts` once real Atletic Base video/photos are available.
