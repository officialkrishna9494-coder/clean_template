# Reusing this template for another site

The system is deliberately separated from the Bee Cave content. Working through
this list gives you a different, complete site without touching a component.

## 1. Brand (~15 minutes)

- [ ] `config/theme.config.ts` → replace `palette.primary` and `palette.accent`
      with the client's ramps (50 → 950).
- [ ] Check `semanticColors.light` and `.dark` still read well — usually only
      `primary`, `primary-hover` and `primary-ink` need attention.
- [ ] `config/fonts.ts` → swap the `next/font` loaders. Keep the variable names
      (`--font-sans-src`, `--font-display-src`, `--font-mono-src`).
- [ ] `config/theme.config.ts` → `radius.button` / `radius.card` to match the
      brand's shape language.

## 2. Identity

- [ ] `config/site.config.ts` → name, legal name, tagline, description, timezone.
- [ ] Contact block: phone (display **and** E.164), email, full address, geo
      coordinates, and the two Google Maps URLs.
- [ ] `hours` — use `null` for `opens`/`closes` on closed days.
- [ ] `social` — one entry per network; add glyphs to
      `components/ui/social-icon.tsx` if you need one that is not there.
- [ ] `cta.primary` / `cta.secondary`.
- [ ] `announcement` — set to `null` if the client has no offer.

## 3. Content

- [ ] `content/services.ts` — the catalogue. Each entry generates a page, a nav
      item, a card and a sitemap entry. Use the client's **real URL slugs** if
      you are replacing an existing site, so links and rankings survive.
- [ ] `content/practice.ts` — differentiators, stats, visit steps, the
      practitioner biography.
- [ ] `content/testimonials.ts` — real reviews only; these publish as
      `AggregateRating` structured data.
- [ ] `content/faqs.ts`, `content/gallery.ts`.
- [ ] `config/navigation.config.ts` — top-level order and the footer columns.
      The Services dropdown generates itself from the catalogue.

## 4. Assets

- [ ] Replace everything in `public/assets/` — see its README.
- [ ] Replace `app/favicon.ico`.
- [ ] **Replace `og-default.svg` with a raster PNG/JPG** and update
      `config/assets.config.ts`. Most social platforms will not render an SVG
      preview.

## 5. Environment

- [ ] `NEXT_PUBLIC_SITE_URL` — the real origin. Metadata, canonicals, the
      sitemap and OG tags all derive from it.
- [ ] `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY` — without it the map falls back to a
      styled "open in Google Maps" card.
- [ ] `CONTACT_FORM_RECIPIENT` + your provider credentials.
- [ ] `NEXT_PUBLIC_BOOKING_URL` if the client uses an external scheduler; it
      repoints the primary CTA automatically.
- [ ] Feature flags in `config/env.ts` → `features`.

## 6. Backend

- [ ] Implement `deliver()` in `app/api/contact/route.ts` and
      `app/api/appointments/route.ts`.
- [ ] For multi-instance or serverless hosting, replace the in-memory map in
      `lib/api/rate-limit.ts` with Redis/Upstash. The exported signature is
      designed so no caller changes.
- [ ] If using an external API, set `NEXT_PUBLIC_API_BASE_URL` and register the
      paths in `config/api.config.ts`.

## 7. SEO

- [ ] `config/seo.config.ts` — default title, description, keywords.
- [ ] Add search-console verification tokens.
- [ ] Confirm each page's `buildMetadata({ title, description, path })`.
- [ ] Update the `areaServed` list in `lib/utils/structured-data.ts` and
      `serviceAreas` in `content/practice.ts`.

## 8. Legal

- [ ] Have counsel review `/privacy-policy`, `/terms` and `/accessibility`.
      They are starting points, not legal advice, and each carries a visible
      template notice that must be removed once reviewed.

## 9. Before launch

- [ ] `npm run check` (typecheck + lint + build) passes.
- [ ] Every page checked at 390 / 768 / 1024 / 1440 px.
- [ ] Both forms submit and deliver to the real inbox.
- [ ] `/sitemap.xml` and `/robots.txt` show the production origin.
- [ ] Structured data validated in Google's Rich Results Test.
- [ ] Lighthouse run on the homepage and one service page.
- [ ] Every phone number, address and opening hour confirmed against the
      client's own records.
