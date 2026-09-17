# DESIGN.md — Ankit Kumar Portfolio
<!-- impeccable:design-schema 1 -->

## Identity

**Visual world:** NEO MIRAI — retro-futurist editorial. A warm, illustrated, Japanese-inflected aesthetic that reads like a hand-crafted artifact from a future Tokyo. Inspired by the impeccable.style/neo-mirai conference reference.

**Mode:** Experience — the artifact leads from the first viewport. The interface recedes; the work speaks.

## Palette

| Role        | Token          | Value     | Usage |
|-------------|----------------|-----------|-------|
| Background  | `--bg`         | `#0F0C09` | Page base — warm near-black |
| Bg warm     | `--bg-warm`    | `#141008` | Slightly lighter near-black |
| Surface     | `--surface`    | `#1C1510` | Alternate section bg (Stack, Certs) |
| Surface-2   | `--surface-2`  | `#251C13` | Chip/card backgrounds |
| Amber       | `--amber`      | `#D4922A` | Primary accent — links, borders, highlights |
| Amber bright| `--amber-bright`| `#F0B429`| Hover states on amber |
| Amber dim   | `--amber-dim`  | `#9A6A1A` | Subdued amber for section labels |
| Crimson     | `--crimson`    | `#8B1A1A` | Secondary accent (currently unused; available) |
| Parchment   | `--parchment`  | `#F5EDD6` | (Available for light sections) |
| Text        | `--text`       | `#E8DFC8` | Primary text — warm cream-white |
| Text warm   | `--text-warm`  | `#C9B99A` | Secondary text |
| Muted       | `--muted`      | `#7A6D58` | Tertiary text, tags, captions |
| Muted-2     | `--muted-2`    | `#3D3428` | Decorative text, section rules |

**Color strategy:** Restrained-to-Committed. Warm near-black ground with amber as the single accent. Amber earns whole regions at scale (project numbers on hover, rule lines, CTA buttons, heading accents). Never neon, never cool-white.

## Typography

| Face | Family | Weight | Usage |
|------|--------|--------|-------|
| Zen Old Mincho | `'Zen Old Mincho', serif` | 400–700 | Display headings (h1, h2, h3), hero name, pull quotes |
| Chakra Petch | `'Chakra Petch', sans-serif` | 300–600 | Body copy, nav links, UI labels, tag captions |
| Azeret Mono | `'Azeret Mono', monospace` | 400–700 | Section labels, tech tags, timestamps, mono accents |

**Scale:** Hero name `clamp(3.5rem, 10vw, 8.5rem)` / Section h2 `clamp(2rem, 4.5vw, 3.25rem)` / Body `0.95rem` / Labels `0.62–0.65rem`. Tracking: `-0.02em` on display, `0.04–0.14em` on uppercase mono labels.

## Assets

| File | Usage |
|------|-------|
| `/hero-illustration.jpg` | Hero section right column — illustrated developer figure + amber sun + futurist city |
| `/sun-motif.jpg` | Contact section background spin decoration |
| `/about-art.jpg` | About section top banner — illustrated warm futurist city panorama |
| `/stamp-seal.jpg` | Hero bottom-right spinning seal accent |
| `/resume.pdf` | Downloadable resume (preserved) |

## Layout

**Max-width:** 1280px centered with 2rem horizontal padding (1.25rem on mobile).

**Hero:** Two-column grid (`1fr auto`) — text left, illustration right. Collapses to single column below 860px (illustration hides).

**About:** Full-width illustrated art banner (280px, `object-fit: cover`) with linear gradient fade-to-bg at bottom. Two-column text grid below (`1fr 1fr`), collapses to 1fr below 768px.

**Stack / Certifications:** `--surface` background, full-width with 1280px inner container.

**Projects:** Main grid list with `project-num` display serif counter. Minor projects: `auto-fill minmax(220px, 1fr)` grid.

**Contact:** Single surface card with spinning sun motif, top amber accent rule.

## Motion

- `floatY` — 7s ease-in-out loop on hero illustration (breathes gently)
- `spinSlow` — 40s linear rotation on stamp seal and sun motif backgrounds
- `pulseAmber` — 2s ease-in-out on hero status dot
- `marquee` — 36s linear loop on Stack section tech strip
- `revealUp` — `Reveal` component: `opacity` + `translateY(28px→0)` on IntersectionObserver hit, `cubic-bezier(0.16,1,0.3,1)` ease, staggered delays
- `cursor-blink` — 1.2s step-end on role rotator caret
- All animations respect `prefers-reduced-motion: reduce`

## Components

**`<Nav>`** — Fixed, transparent until 60px scroll → warm near-black glassy. AK monogram in amber circle border. Uppercase Chakra Petch nav links. Amber `btn-primary` Resume pill.

**`<Hero>`** — Full-viewport, editorial two-column. Vertical Japanese text watermark left. Large Zen Old Mincho name (amber second name). Role rotator in Azeret Mono. Three CTAs. Hero illustration floats.

**`<About>`** — Illustrated panorama banner (0.65 opacity) with fade. Left: amber-bordered blockquote in Zen Old Mincho. Right: body copy (Chakra Petch 300) + stat chips + role rotator.

**`<Stack>`** — `--surface` bg. Category labels in amber-dim mono. Items in Chakra Petch warm text. Marquee tech strip below.

**`<Projects>`** — Ruled list. Large Zen Old Mincho project numbers (amber on hover). Title in Zen Old Mincho, desc in Chakra Petch 300. Tags as Azeret Mono pills. Arrow icon circle rotates 45° on hover.

**`<Certifications>`** — `--surface` bg. Ruled list. Award icon in amber glow box. Verify link in Azeret Mono.

**`<Contact>`** — `--surface` card with top amber rule and spinning sun-motif background. Large serif CTA heading with amber accent. Contact pills with amber hover.

**`<Footer>`** — Minimal. Japanese text ("未来を構築する") + year + build line.

## Rules

- **Amber rules:** `var(--amber-rule)` (`rgba(212,146,42,0.25)`) on `<Rule />` dividers
- **Tag pills:** 3px border-radius, `var(--border)`, Azeret Mono, no rounded pills
- **Buttons:** 3px border-radius (not full-pill)
- **No gradient text**
- **No glass decoration** (only backdrop-filter on scrolled nav for utility)
- **No neon colors**
- **No section numbers** as primary section titles
- **Borders at 1px only**
