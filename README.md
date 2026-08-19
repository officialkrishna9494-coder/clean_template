# Bee Cave Family Dentistry — Website & Design System

A production-ready Next.js 16 template built as a **reusable system**, then used
to build the Bee Cave Family Dentistry site as its first implementation.

Everything visual, textual and structural is driven from configuration and
content files. To launch a different practice — or a different kind of local
business entirely — you edit `config/` and `content/`, replace the artwork in
`public/assets/`, and ship. The components do not change.

```
npm install
cp .env.example .env.local     # optional; sensible defaults are built in
npm run dev                    # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |
| `npm run check` | Typecheck + lint + build — run before you push |

---

## The one thing to understand

**Nothing is hard-coded in a component.** Colours, fonts, spacing, radii,
shadows, motion, z-index, copy, navigation, images, API endpoints and
environment settings all live in `config/` and `content/`. A component reads
tokens; it never declares them.

That single rule is what makes this a system rather than a website.

```
config/theme.config.ts   →  lib/utils/theme.ts  →  <ThemeStyles/>  →  :root { --t-* }
                                                                          ↓
                                          app/globals.css  @theme inline  { --color-primary: var(--t-color-primary) }
                                                                          ↓
                                                        Tailwind utilities: bg-primary, text-ink-muted, rounded-card…
```

Change `palette.primary` in `config/theme.config.ts` and every button, link,
badge, icon tile, focus ring and gradient on all 30 routes changes with it.

---

## Project structure

```
config/                    ← the control panel
  theme.config.ts            colours, type scale, spacing, radii, shadows, motion, z-index
  fonts.ts                   next/font loaders (imported ONLY by app/layout.tsx)
  site.config.ts             practice identity, contact, hours, social, CTAs, announcement
  navigation.config.ts       header/footer/legal menus (service menu is generated)
  assets.config.ts           every image, logo and icon, with intrinsic dimensions
  api.config.ts              API base URL, timeouts, retry policy, endpoint registry
  env.ts                     typed + validated environment variables
  seo.config.ts              default metadata, OG defaults, robots rules
  index.ts                   barrel: import { site, theme, assets } from '@/config'

content/                   ← the words
  services.ts                the 15-service catalogue; drives pages, nav, sitemap
  testimonials.ts            patient reviews (also feeds AggregateRating JSON-LD)
  faqs.ts                    general practice FAQs
  practice.ts                differentiators, stats, visit steps, doctor bio
  gallery.ts                 before/after smile gallery

components/
  ui/                        primitives — Button, Card, Section, Heading, fields…
  layout/                    Header, DesktopNav, MobileNav, Footer, SkipLink, call bar
  sections/                  page bands — Hero, ServicesGrid, MediaSplit, CtaBand…
  forms/                     AppointmentForm, ContactForm

lib/
  api/                       client, typed errors, Zod schemas, services, rate limiter
  hooks/                     useMediaQuery, useScrolledPast, useBodyScrollLock, useDismiss
  utils/                     cn, theme CSS generator, formatters, SEO, structured data

app/                       ← routes only; all rendering delegates to components
  [slug]/                    every service page, generated from content/services.ts
  api/                       contact + appointment route handlers
```

---

## Common tasks

### Re-brand the site

Edit `config/theme.config.ts`:

- `palette.primary` / `palette.accent` — the two brand ramps
- `semanticColors` — how those ramps map to roles (`primary`, `ink-muted`, …)
- `radius.button` / `radius.card` — `9999px` for pill buttons, `0.5rem` for square
- `typography.fontSize` — the fluid type scale

Then swap the typefaces in `config/fonts.ts`. Nothing else needs to change.

### Change the practice details

`config/site.config.ts` — name, phone, address, geo coordinates, opening hours,
social links, the announcement bar, and the primary/secondary CTAs. The header,
footer, contact page, maps links, `tel:` links and `LocalBusiness` structured
data all read from it.

Set `site.announcement` to `null` to remove the top promotional strip.

### Add a service page

Add one entry to `content/services.ts`. That single edit:

- publishes `/{slug}` as a statically generated page
- adds it to the header Services dropdown
- adds it to the services index under its category
- includes it in `sitemap.xml`
- makes it selectable in the appointment form
- emits `MedicalProcedure` and (if you supply `faqs`) `FAQPage` structured data

### Replace the placeholder artwork

See [`public/assets/README.md`](public/assets/README.md). Short version:
overwrite the file keeping its name, or repoint the entry in
`config/assets.config.ts`. No component references an image path directly.

### Point the forms at a real backend

`app/api/contact/route.ts` and `app/api/appointments/route.ts` are working
reference implementations — they validate, rate-limit, reject honeypot hits and
log. Replace the `deliver()` function in each with your email provider or CRM.

To use an external API instead, set `NEXT_PUBLIC_API_BASE_URL` and add the
endpoint to `config/api.config.ts`. Nothing else changes: the forms call
`lib/api/services/`, which calls `lib/api/client.ts`, which reads the config.

### Toggle dark mode

`config/theme.config.ts` → `themeOptions.colorMode`:

- `'light'` (default) — light, with dark available via `<html data-theme="dark">`
- `'dark'` — pinned dark
- `'system'` — follows `prefers-color-scheme`, still overridable by `data-theme`

The dark palette is already defined in `semanticColors.dark`.

---

## What is built in

**Responsive** — a fluid type scale and fluid section spacing (`clamp()`) mean
the layout scales continuously rather than snapping at breakpoints. Verified at
390 / 768 / 1024 / 1440 px.

**Accessible** — skip link, keyboard-operable dropdown and drawer, visible focus
rings, `aria-expanded` / `aria-controls` on every disclosure, labelled and
described form fields, `inert` on the closed drawer, and automatic honouring of
`prefers-reduced-motion`.

**SEO** — per-route metadata via `buildMetadata()`, canonical URLs, OpenGraph and
Twitter cards, a generated `sitemap.xml` and `robots.txt`, plus `Dentist`,
`WebSite`, `BreadcrumbList`, `MedicalProcedure`, `FAQPage` and `AggregateRating`
JSON-LD.

**Performance** — static generation for all 30 content routes, self-hosted fonts
with no layout shift, `next/image` with explicit dimensions everywhere, and
minimal client JavaScript (only the header, nav, accordion and forms are client
components).

**Security** — `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy` and
`Permissions-Policy` headers; server-only API keys; honeypot plus per-IP rate
limiting on both form endpoints.

---

## Documentation

- [`docs/design-system.md`](docs/design-system.md) — tokens, the component
  catalogue, and the rules for composing a new page
- [`docs/new-site-checklist.md`](docs/new-site-checklist.md) — step-by-step for
  reusing this template for another client
- [`public/assets/README.md`](public/assets/README.md) — replacing the artwork

## Notes on content

Copy and practice details were reconstructed from publicly available information
about Bee Cave Family Dentistry. **Review every page against the practice's own
records before launch** — particularly opening hours, insurance claims, service
availability and the patient testimonials. The legal pages
(`/privacy-policy`, `/terms`, `/accessibility`) are templates, not legal advice,
and need review by counsel.
