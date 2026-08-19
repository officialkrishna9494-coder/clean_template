# Design System

How the visual language is defined, and the rules for building with it.

## 1. Tokens

`config/theme.config.ts` is the only file that declares a visual value. It is
converted to CSS custom properties by `lib/utils/theme.ts`, injected onto
`:root` by `<ThemeStyles />`, and mapped into Tailwind's `@theme inline` layer
in `app/globals.css`.

Every emitted variable is namespaced `--t-` so it can never collide with a
name Tailwind generates itself.

### Colour

Two brand ramps (`primary`, `accent`), one neutral ramp, and three status ramps
(`success`, `warning`, `danger`) — each 50 → 950.

Components **never** reference a ramp step. They reference a **semantic role**,
which is what makes a re-skin a one-file change:

| Role | Utility | Used for |
| --- | --- | --- |
| `background` | `bg-background` | Page background |
| `surface` | `bg-surface` | Alternating section band |
| `elevated` | `bg-elevated` | Cards, dropdowns, form controls |
| `inverted` | `bg-inverted` | Dark bands, footer |
| `ink` | `text-ink` | Body text, headings |
| `ink-muted` | `text-ink-muted` | Secondary text |
| `ink-subtle` | `text-ink-subtle` | Captions, meta, hints |
| `ink-inverted` | `text-ink-inverted` | Text on dark |
| `border` / `border-strong` | `border-border` | Hairlines / stronger dividers |
| `primary` + `-hover` `-soft` `-ink` | `bg-primary` … | Primary actions |
| `accent` + `-hover` `-soft` `-ink` | `bg-accent` … | Highlights, ratings |
| `ring` | `outline-ring` | Focus rings |

Each role is defined for both light and dark in `semanticColors`.

### Type

Two families: `font-sans` (Plus Jakarta Sans) for UI and body, `font-display`
(Fraunces) for headings. Both self-hosted by `next/font` — no external request,
no layout shift.

Every step in the scale is a `clamp()`, so type scales continuously between
mobile and desktop instead of snapping at a breakpoint:

`text-xs` `text-sm` `text-base` `text-lg` `text-xl` `text-2xl` `text-3xl`
`text-4xl` `text-5xl` `text-6xl`

### Spacing

- **Section rhythm** — `spacing.section` (`sm` `md` `lg` `xl`), all fluid.
  Applied by `<Section spacing="lg">`. Never set section padding by hand.
- **Gutter** — one fluid horizontal gutter, applied by `<Container>` via the
  `container-gutter` utility. Nothing else sets page-level side padding.
- **Container widths** — `max-w-page-sm` … `max-w-page-2xl`. Namespaced `page-`
  so Tailwind's own `max-w-sm`/`max-w-md` keep their standard values.

### Radius, elevation, motion, z-index

- `rounded-button` `rounded-card` `rounded-input` `rounded-image` — semantic
  radii. Change one token to restyle every instance.
- `shadow-xs` … `shadow-xl`, plus `shadow-soft` (cards) and `shadow-ring` (focus).
- `duration-[var(--t-duration-fast|normal|slow)]`,
  `ease-[var(--t-ease-standard|entrance|exit|spring)]`.
- `z-base` `z-raised` `z-sticky` `z-header` `z-dropdown` `z-overlay` `z-modal`
  `z-toast` — named steps, declared as custom utilities in `globals.css`.

---

## 2. Component layers

Three layers, each allowed to depend only on the ones above it.

### Layer 1 — `components/ui/` (primitives)

Generic, brand-agnostic, no knowledge of dentistry. Every one takes `className`
and merges it with `cn()` so a call site can override safely.

| Component | Notes |
| --- | --- |
| `Container` | Centres content, applies the single global gutter |
| `Section` | Page band: `spacing`, `tone`, `container` |
| `Heading` `Text` `Eyebrow` `SectionHeader` | Semantic level and visual size are decoupled |
| `Button` `ButtonLink` | 9 variants × 5 sizes, `loading` state; `ButtonLink` picks `next/link` vs `<a>` automatically |
| `Card` + `CardHeader/Body/Footer` | 6 variants; pass `href` to make the whole card a link |
| `Badge` `IconBox` `Rating` `Divider` `Alert` `Spinner` | Small display primitives |
| `AppImage` | The **only** image component — see below |
| `Logo` `SocialIcon` | Brand marks, sourced from `assets.config.ts` |
| `Accordion` | Keyboard-accessible disclosure list |
| `InputField` `TextareaField` `SelectField` | Label/hint/error wiring built in |
| `Prose` | Long-form body copy (policies) |
| `ThemeStyles` `StructuredData` | Infrastructure |

**`AppImage`** deserves a note. It resolves paths through `asset()` (so a CDN is
one env var), serves SVG unoptimized (the Next.js optimizer rejects SVG by
default — this is why the placeholders work today and real photography will
work after a drop-in swap), enforces an aspect ratio to prevent layout shift,
and applies a shared blur placeholder.

### Layer 2 — `components/sections/` (page bands)

Composed from primitives, still data-driven — they take arrays and strings, not
hard-coded content.

`Hero` · `PageHero` · `ServicesGrid` · `FeatureGrid` · `MediaSplit` ·
`ProcessSteps` · `StatsBand` · `Testimonials` · `GalleryGrid` · `FaqSection` ·
`ContactInfo` · `MapEmbed` · `ServiceAreas` · `CtaBand`

### Layer 3 — `app/**/page.tsx` (routes)

Routes contain **no layout code**. They compose sections, pass data from
`content/`, and export metadata. Compare: the homepage is ~200 lines and every
one of them is either a section invocation or a prop.

---

## 3. Rules for building a page

1. **Every band is a `<Section>`.** Alternate `tone="default"` and
   `tone="surface"` down the page so bands separate without extra dividers.
2. **Open every section with `<SectionHeader>`.** Eyebrow, heading and
   description in one component keeps intros identical everywhere.
3. **Never write a raw hex, px padding or font-family.** If a token does not
   exist for what you need, add it to `theme.config.ts` — do not inline it.
4. **Never import an image path.** Add it to `assets.config.ts` and reference
   the entry.
5. **Prefer a section over new markup.** If you need a layout that does not
   exist, add it to `components/sections/` so the next page can use it too.
6. **Server Components by default.** `'use client'` only where there is real
   interactivity — currently the header, both navs, the accordion and the forms.
7. **Interior pages open with `<PageHero>`** and close with `<CtaBand>`.

---

## 4. Responsive approach

Mobile-first, with the fluid scales doing most of the work. Named breakpoints
(`xs` 480 · `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280 · `2xl` 1536) handle
layout changes only:

- **< 640px** — single column; fixed bottom call bar; compact header with an
  icon-only phone button.
- **< 1024px** — navigation collapses into the slide-in drawer; the utility
  strip is hidden.
- **≥ 1024px** — two-column splits activate; the Services dropdown appears.
- **≥ 1280px** — the Services dropdown widens from two columns to three.

Verified at 390 / 768 / 1024 / 1440 px.

---

## 5. Accessibility checklist

Everything below is already implemented; keep it true as you add pages.

- [x] Skip link to `#main`
- [x] One `<h1>` per page, headings in order
- [x] All interactive elements keyboard-reachable with a visible focus ring
- [x] `aria-expanded` + `aria-controls` on every disclosure
- [x] Closed mobile drawer is `inert` (out of the tab order and a11y tree)
- [x] Form fields have labels; errors are `aria-describedby`-linked and
      `aria-invalid`-marked
- [x] Decorative images and icons are `aria-hidden`; meaningful ones have `alt`
- [x] Text and UI colours meet WCAG AA in both light and dark
- [x] `prefers-reduced-motion` honoured globally
- [x] Body scroll locked while the drawer is open, without layout jump
