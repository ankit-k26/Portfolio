# DESIGN.md — Ankit Kumar Portfolio
<!-- impeccable:design-schema 1 -->

## Identity

**Visual world:** NEON DARK TECH — bold cartoon energy meets dark hacker aesthetic. Inspired by the Dikshant portfolio reference: expressive cartoon hero character, hand-drawn doodle accents, neon accent colors on deep near-black, punchy display typography. Adapted from a 2D animator portfolio to an AI/ML developer context.

**Mode:** Experience — the artifact leads from the first viewport. Energy and personality first, technical depth second.

## Palette

| Role         | Token              | Value      | Usage |
|--------------|--------------------|------------|-------|
| Background   | `--bg`             | `#060812`  | Page base — deep navy-black |
| Bg-2         | `--bg-2`           | `#080d1a`  | Slightly lighter near-black |
| Surface      | `--surface`        | `#0d1426`  | Section backgrounds |
| Surface-2    | `--surface-2`      | `#111b33`  | Card hover backgrounds |
| Cyan         | `--cyan`           | `#00f0ff`  | Primary accent — CTAs, borders, glows |
| Cyan-dim     | `--cyan-dim`       | `#00a8b5`  | Muted cyan for tags, hover borders |
| Lime         | `--lime`           | `#b6f000`  | Secondary accent — speech bubbles, outlined text, highlights |
| Violet       | `--violet`         | `#8b5cf6`  | Tertiary accent — project cards, doodles |
| Text         | `--text`           | `#e2eeff`  | Primary text |
| Text-warm    | `--text-warm`      | `#a8c0e8`  | Secondary text |
| Muted        | `--muted`          | `#4a6080`  | Tertiary text, placeholders |

**Color strategy:** Single dominant accent (cyan) with lime as secondary punch and violet for depth. No warm tones. No gradient blobs. Neon glow effects on interactive elements only.

## Typography

| Face | Family | Weight | Usage |
|------|--------|--------|-------|
| Bebas Neue | `'Bebas Neue', sans-serif` | 400 | Display headings (h1, h2), hero name, section titles |
| Space Grotesk | `'Space Grotesk', sans-serif` | 300–700 | Body copy, nav links, UI labels, buttons |
| JetBrains Mono | `'JetBrains Mono', monospace` | 400–700 | Section labels, tech tags, role rotator, code accents |

**Scale:** Hero name `clamp(4.5rem, 12vw, 10rem)` / Section h2 `clamp(2.5rem, 6vw, 4.5rem)` / Body `0.95rem` / Labels `0.65rem`. Outlined text effect: `WebkitTextStroke` on select headings for impact.

## Assets

| File | Usage |
|------|-------|
| `/hero-character.jpg` | Hero section right column — cartoon AI developer character |
| `/projects-bg.jpg` | Projects section background texture (low opacity) |
| `/resume.pdf` | Downloadable resume (preserved) |

## Layout

**Max-width:** 1280px centered with 2rem horizontal padding (1.25rem on mobile).

**Hero:** Two-column grid (`1fr auto`) — text left, cartoon character right. Character hides below 768px.

**About:** Two-column grid — big Bebas Neue quote with stat cards left, bio text right.

**Projects:** Auto-fill card grid (`repeat(auto-fill, minmax(340px, 1fr))`).

**Stack:** Auto-fill skill chip grid with marquee strip.

**Contact:** Centered with Bebas Neue large headline, outlined "SOMETHING" text, lime highlight on "DOPE!"

## Motion (Framer Motion via `motion/react`)

- `fadeUp` — spring enter on every section via `stagger` parent / `staggerChildren` 0.09s
- `float-character` — 5s ease-in-out CSS loop on hero character (y + subtle rotate)
- `floatDoodle` — CSS keyframe on scattered doodle SVGs, unique delays
- `status-dot` — glowPulse 2.5s ease-in-out infinite on online indicator
- `marquee-track` — 28s linear infinite on Stack section tech strip
- `cursor-blink` — 1.1s step-end on role rotator caret
- Mouse-parallax 3D tilt on hero character via `useMotionValue` / `useTransform`
- Hover: whileHover `scale` / `y` on all interactive cards and buttons
- All animations respect `prefers-reduced-motion: reduce`

## Components

**`<Nav>`** — Fixed, transparent until scroll → glassmorphism `rgba(6,8,18,0.85)` + blur. AK monogram in cyan circle. Space Grotesk nav links. Cyan `btn-primary` Resume pill.

**`<Hero>`** — Full-viewport, two-column. Bebas Neue "ANKIT / KUMAR" (second line outlined). Lime speech bubble. Floating cyan/lime badges on character. JetBrains Mono role rotator. Three CTAs.

**`<About>`** — Two-column. Large Bebas Neue quote with outlined/filled text. Stat grid cards. Bio + tech chips + currently-line.

**`<Projects>`** — Project cards with icon + emoji header, descriptions, tag pills, arrow-up-right. Cyan glow on hover.

**`<Stack>`** — `--surface` bg, icon + label + tag chips per category. Marquee strip.

**`<Certifications>`** — Ruled list with cyan icon boxes and mono metadata.

**`<Contact>`** — Centered Bebas Neue headline. Lime outlined text. "DOPE!" on lime fill. Contact pills in 50px border-radius. Cyan "Say Hello" CTA.

## Rules

- **One accent per section:** Cyan dominates, lime is punch, violet is depth — never all three in one component
- **Tag pills:** 4px border-radius, cyan border, JetBrains Mono, no full-pills
- **Buttons:** 6px border-radius (not pill, not sharp)
- **No gradient blobs / AI-purple**
- **No warm tones** (this is a cold-palette dark-tech world)
- **Doodle SVGs at most 5 per section**, used for personality not pattern
- **Borders at 1px only**
