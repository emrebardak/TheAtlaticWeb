# The Atletic Base — Landing Page Design

**Date:** 2026-07-17
**Status:** Approved

## Overview

A single-page, cinematic dark-mode landing site for a local gym called "The Atletic Base." Built as a React + Vite + TypeScript + Tailwind CSS app using a "liquid glass" morphism visual language (blurred glass panels with gradient-stroke borders), Framer Motion blur/fade animations, and full-viewport video backgrounds. The design follows a provided example agency-landing-page template exactly in structure and mechanics, re-skinned with gym-specific copy, and accented with a dark blue "gym lighting" glow to reflect the space's exposed concrete + blue-lit interior.

Scope is intentionally small: exactly two full-viewport sections (Hero, Programs). No routing, no backend, no forms. Media (video/images) are placeholders until the user supplies real gym footage/photos.

## Tech Stack

- **Build tooling:** Vite + `@vitejs/plugin-react`, TypeScript
- **Styling:** Tailwind CSS (+ PostCSS, Autoprefixer)
- **Animation:** Framer Motion
- **Fonts (Google Fonts, loaded via `<link>` in `index.html`):**
  - Instrument Serif (italic) → `font-heading`
  - Barlow (weights 300/400/500/600) → `font-body`
- No icon library — all icons are hand-written inline SVGs (see Icons section).
- No routing library — single page, single route.

Tailwind config extends `fontFamily`:
```js
heading: ["'Instrument Serif'", 'serif'],
body: ["'Barlow'", 'sans-serif'],
```

Base CSS: `html, body { background: #000; color: #fff; font-family: 'Barlow', sans-serif; }`

## Visual System

- **Base:** pure black (`#000`) background, white text throughout. Secondary text uses `white/80` or `white/90` opacity.
- **Blue accent (gym atmosphere):** subtle dark-blue radial/linear glow gradients (roughly `#0a1a2f` fading to transparent) layered behind the Hero and Programs sections, positioned absolutely behind the video/content layers (`z-0`, below content `z-10`). This is the one intentional deviation from the source template (which was accent-free black/white) — it nods to the gym's concrete-and-blue-lighting interior without breaking the glass aesthetic.
- **Typography:** heading font (Instrument Serif) is always italic with tight/negative letter-tracking; body font (Barlow) is light-weight. Headline uses `leading-[0.8]` to `leading-[0.9]` for a tight, cinematic stack.
- **Liquid glass:** two CSS utility classes, `.liquid-glass` (subtle, `blur(4px)`) and `.liquid-glass-strong` (bold, `blur(50px)`), each with a `::before` gradient-stroke border created via CSS `mask`/`-webkit-mask` compositing (`xor`/`exclude`). No literal `border`, no visible fill — just blur + inset highlight + gradient stroke. Full CSS given below.
- **Media:** full-bleed background `<video>` per section, cropped with `object-cover`, faded in/out via the `FadingVideo` component. Placeholder videos/images (generic gym/concrete/weights footage) used until the user provides real assets — asset URLs are swappable constants, not hardcoded inline more than once.

### Liquid Glass CSS

```css
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

## Shared Components

### `FadingVideo`

Reusable `<video>` wrapper. Props: `src` (`string | string[]`), `className`, `style`.

Behavior:
1. Starts at `opacity: 0`.
2. On `loadeddata` → fades in over 500ms via `requestAnimationFrame`.
3. On `timeupdate` → when remaining time ≤ 0.55s, fades out over 550ms.
4. On `ended` → if `src` is a single string, reset `currentTime = 0`, replay, fade back in; if `src` is an array, advance to the next index (cycling, wrapping to 0).
5. Rendered with `autoPlay muted playsInline preload="auto"`.

### `BlurText`

Word-by-word staggered blur-in text animation (Framer Motion).

- Splits the `text` prop on spaces; each word renders as a `motion.span` (`display: inline-block`, `marginRight: 0.28em`).
- Triggers via `IntersectionObserver` (threshold `0.1`) — animates once the element enters view.
- Per-word animation: `filter: blur(10px) → blur(0px)`, `opacity: 0 → 1`, `y: 50 → 0`; duration `0.7s`; stagger delay `100ms × word index`.
- Container: `display: flex; flex-wrap: wrap; justify-content: center; row-gap: 0.1em`.

### Icons (inline SVG, no external library)

`ArrowUpRight`, `Play`, `ClockIcon`, `GlobeIcon`, `ImageIcon`, `MovieIcon`, `LightbulbIcon` — each a small hand-written 24×24 SVG per the original template's shapes (stroke icons for Arrow/Play/Clock/Globe, filled Material-style icons for Image/Movie/Lightbulb). Icons are decorative/structural (reused for Programs cards) rather than gym-specific pictograms — acceptable since they sit inside glass squares alongside descriptive tag text.

### Shared motion preset

All top-level motion elements share the same enter animation:
`initial: { filter: 'blur(10px)', opacity: 0, y: 20 }` → `animate: { filter: 'blur(0px)', opacity: 1, y: 0 }`, `duration: 0.8s`, `ease: 'easeOut'`, staggered via per-element `delay`.

## Section 1: Hero

Full viewport (`h-screen`), `overflow-hidden`, `bg-black`, dark-blue glow layer behind content, background video (`FadingVideo`) absolutely positioned and cropped (`object-cover object-top`, oversized to `120%/120%` to avoid edge gaps), all content in a `relative z-10, flex flex-col h-full` wrapper.

**Navbar** (fixed, `top-4 inset-x-0 z-50`, `px-8 lg:px-16`, flex justify-between):
- Left: `liquid-glass` circle (`h-12 w-12 rounded-full`) containing italic "AB" monogram, `font-heading text-2xl`.
- Center (`hidden md:flex`): `liquid-glass` pill (`rounded-full px-1.5 py-1.5`) containing nav links — **Programs · Coaches · Facility · Membership · Contact** (`px-3 py-2 text-sm font-medium text-white/90 font-body`) — plus a white CTA button **"Join Now"** with `ArrowUpRight` icon.
- Right: `h-12 w-12` spacer to keep the center pill visually centered (mobile: this collapses — see Responsive Behavior).

**Main content** (`flex-1 flex flex-col items-center justify-center pt-24 px-4 text-center`):
- **Badge** (motion, delay 0.4): `liquid-glass` pill with a small white "New" chip + text — *"Now Open — Founding Member Rates Available"*.
- **Headline** (`BlurText`, mt-6, `max-w-3xl`): *"Raw Strength Forged In Concrete And Steel"* — `text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.8] tracking-[-4px]`.
- **Subtext** (motion, delay 0.8, mt-4): *"The Atletic Base is an industrial-grade training facility built for those who show up. Exposed concrete, moody blue light, and equipment that doesn't quit — built for strength, conditioning, and community."* — `text-sm md:text-base text-white max-w-2xl font-body font-light leading-tight`.
- **CTA buttons** (motion, delay 1.1, mt-6, flex gap-6, `flex-col sm:flex-row` for mobile stacking): **"Join Now"** (`liquid-glass-strong rounded-full px-5 py-2.5` + `ArrowUpRight`) and **"Watch The Space"** (plain text + `Play` icon).
- **Stats cards** (motion, delay 1.3, mt-8, `flex flex-col sm:flex-row gap-4`): two `liquid-glass p-5 w-[220px] rounded-[1.25rem]` cards:
  - Card 1: `ClockIcon`, **"24/7"**, "Round-The-Clock Facility Access"
  - Card 2: `GlobeIcon`, **"500+"**, "Members Training Strong Every Week"
  - Numbers: `text-4xl font-heading italic tracking-[-1px] leading-none mt-4`.

**Bottom trust bar** (motion, delay 1.4, `flex-col items-center gap-4 pb-8`):
- `liquid-glass rounded-full` pill: *"Trusted by athletes, coaches, and everyday grinders across the city"*.
- Trust stat pills (`flex flex-wrap justify-center gap-3`, each its own small `liquid-glass rounded-full px-4 py-1.5 text-sm font-body`): **Est. 2019 · 12 Coaches · 500+ Members · 5.0 Rated · 24/7 Access** — replaces the template's client-logo row since a gym has no "client" brands to showcase.

## Section 2: Programs

`min-h-screen`, `overflow-hidden`, `bg-black`, relative, dark-blue glow layer + full-bleed background `FadingVideo` (`absolute inset-0 w-full h-full object-cover z-0`).

**Content** (`relative z-10 px-8 md:px-16 lg:px-20 pt-24 pb-10 flex flex-col min-h-screen`):
- **Header** (`mb-auto`):
  - Label: `text-sm font-body text-white/80 mb-6` — *"// Programs"*
  - Heading: `font-heading italic text-6xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-[-3px]` — *"Concrete floors, real results"* (two lines, break after "floors,").

- **Cards grid** (`mt-16, grid grid-cols-1 md:grid-cols-3 gap-6`), three cards, each `liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col`:

  1. **Strength** — icon: `ImageIcon` in nested `liquid-glass h-11 w-11 rounded-[0.75rem]` square. Tags: Free Weights, Powerlifting, Progressive Overload, 1-on-1 Spotting. Body: "Barbells, plates, and concrete platforms built for serious lifting. Progressive programs for beginners through competitive powerlifters."
  2. **Conditioning** — icon: `MovieIcon`. Tags: HIIT, Group Classes, Small Group, All Levels. Body: "High-energy group sessions under the blue lights. Conditioning work that builds community as much as capacity."
  3. **Coaching** — icon: `LightbulbIcon`. Tags: 1-on-1, Nutrition, Program Design, Accountability. Body: "Dedicated coaches build a plan around your goals, your schedule, and your body — then hold you to it."

  Card layout: top row = icon square + tags (`flex-wrap gap-1.5`, right-aligned), each tag `liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap`; spacer `flex-1`; bottom = title (`font-heading italic text-3xl md:text-4xl tracking-[-1px] leading-none`) + body (`text-sm text-white/90 font-body font-light leading-snug max-w-[32ch]`).

## Responsive Behavior

- **Nav:** center link pill hidden below `md` (`hidden md:flex`); on mobile, only the logo circle and a compact "Join Now" pill remain in the fixed header — no hamburger menu, since there's nothing else to reveal (single page, no other routes).
- **Headline/heading sizes:** scale down via existing Tailwind breakpoints (`text-6xl` → `md:text-7xl` → `lg:text-[5.5rem]`/`lg:text-[6rem]`), wrapping to more lines on narrow viewports rather than shrinking below legibility.
- **CTA buttons & stats cards:** stack vertically (`flex-col`) on mobile, switch to horizontal (`sm:flex-row`/`md:flex-row`) at wider breakpoints.
- **Trust bar pills:** wrap (`flex-wrap`) instead of overflowing horizontally.
- **Programs grid:** `grid-cols-1` on mobile → `md:grid-cols-3`.
- **Video backgrounds:** stay `object-cover`, cropping sensibly on any aspect ratio; no separate mobile asset needed.
- **Liquid glass effects:** pure CSS, render identically at all sizes — no mobile fallback required.
- Touch targets (nav links, CTA buttons, tag pills) keep `py-2.5`+ vertical padding for tap comfort.

## Placeholder Media Strategy

Real gym video/photos are not yet available. Placeholder video URLs (freely licensed stock footage of weights/concrete/industrial gym spaces, or locally bundled placeholder MP4s if no suitable external CDN source is confirmed at implementation time) are used for both `FadingVideo` backgrounds, defined as named constants (e.g. `HERO_VIDEO_SRC`, `PROGRAMS_VIDEO_SRC`) in one place so they're trivial to swap once the user supplies real footage.

## Explicitly Out of Scope

- No additional sections (Trainers, Gallery, Testimonials, Contact form, Pricing) — confirmed 2-section scope only.
- No backend, no forms, no membership signup flow, no login/accounts.
- No routing/multi-page — single `index.html`/single React tree.
- No CMS — all copy is hardcoded in components as constants.
- No real gym media — placeholders only, swapped later.

## Testing Approach

- Manual verification in the browser (dev server) covering: both sections render, videos fade in/loop/cycle correctly, `BlurText` triggers on scroll into view, responsive breakpoints checked at mobile/tablet/desktop widths, liquid-glass rendering (blur + gradient border) visually correct in a Chromium-based browser.
- No automated test suite planned given the static, presentation-only nature of the site (no business logic, no data layer) — this may be revisited if the site grows interactive features later.
