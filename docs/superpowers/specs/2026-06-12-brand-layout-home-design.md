# Global Brand Config, Shared Layout & Home Page — Design Spec

Date: 2026-06-12

## Overview

This spec covers the first real build step for the True Nord website (Phase 1):

1. Apply the locked brand colors and fonts as a global Tailwind v4 theme.
2. Build a shared site layout (header/navigation + footer) used by every page.
3. Build the real Home page (brand introduction, value props, audience fork).
4. Create lightweight "coming soon" placeholder pages for the remaining 9
   Phase 1 routes, so navigation is complete and every route has proper SEO
   metadata from day one.

Source of truth for brand decisions: `True Nord Branding/outputs/design-brief.md`
and `True Nord Branding/outputs/brand-demo.html`. A reviewed mockup of the Home
page lives at `True Nord Website/outputs/home-page-mockup.html`.

Out of scope for this spec: form functionality (Source for Me, Sell in the GCC,
Contact), real content for the 9 placeholder pages, Arabic version, analytics,
and the final professional logo. These are future-phase work and this design
must not block them.

## Brand Theme Tokens (Tailwind v4)

Tailwind v4 (already in use in this project) defines design tokens via a CSS
`@theme` block rather than a JS config file. `app/globals.css` already has a
small `@theme inline` block for the default fonts — we extend it.

Add to `app/globals.css`:

| Token | Value | Usage |
|---|---|---|
| `--color-navy` | `#1B2A4A` | Primary — safe for any text/background |
| `--color-navy-tint` | `#3A4D78` | Lighter navy — hover/active states |
| `--color-red` | `#B5312A` | Secondary — headlines, accents, buttons only (not small body text) |
| `--color-red-shade` | `#8C2620` | Darker red — pressed/active button states |
| `--color-cream` | `#F7F5F2` | Secondary section background (e.g. audience fork) |
| `--font-heading` | Playfair Display (700) | All headings (h1–h3) |
| `--font-body` | Inter (400/500/600) | Body text, nav, buttons |

These become Tailwind utilities: `bg-navy`, `text-red`, `font-heading`,
`hover:bg-navy-tint`, etc.

The existing `--background` / `--foreground` / Geist font variables and the
`prefers-color-scheme: dark` block are removed — this is a branded site, not a
default Next.js starter, and dark mode is not part of the Phase 1 brand.

## Fonts

Replace the Geist/Geist Mono setup in `app/layout.tsx` with `next/font/google`:

```tsx
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  variable: "--font-heading",
  weight: ["600", "700"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});
```

Both variables are applied on `<html>` via `className`, and mapped in the
`@theme inline` block as `--font-heading` / `--font-body`. Headings (`h1`–`h3`)
get `font-heading` applied via a small base-layer rule in `globals.css`; body
text uses `font-body` as the default sans font.

## Shared Layout

```
app/
├── layout.tsx              (Playfair Display + Inter, renders Header + Footer)
├── globals.css             (brand theme tokens)
├── page.tsx                (Home — real content)
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ComingSoon.tsx
```

`app/layout.tsx` renders `<Header />`, then `{children}`, then `<Footer />`,
inside `<body>`.

### Header (`app/components/Header.tsx`)

- **Logo/wordmark**: "True Nord" text in Playfair Display Bold, navy, with a
  4px-wide red vertical accent bar to its left — recreates the placeholder
  wordmark described in the design brief. Links to `/`.
- **Desktop nav**: horizontal list of 7 links (see Site Map below), Inter
  Medium 14px, navy, red on hover.
- **Mobile nav**: below Tailwind's `lg` breakpoint (1024px), links collapse
  behind a "☰ Menu" toggle. (The reviewed mockup used 800px with shorter nav
  labels; the final labels — "Buy Canadian Products", "I'm a Canadian Brand" —
  are wider, so `lg` is a safer starting point. Exact breakpoint can be tuned
  during implementation by checking how the full label set fits.) Implemented
  as a small client component (`"use client"`) using `useState` to track
  open/closed — the standard React pattern, chosen over a CSS-only `<details>`
  toggle for familiarity and easier future styling.
- Header is sticky (`sticky top-0`) with a white background and a subtle
  bottom border.

### Footer (`app/components/Footer.tsx`)

- Footer wordmark: same "True Nord" + accent bar, in white/light styling on a
  navy background.
- Tagline: "True Direction. Zero Complexity."
- Footer nav: all 9 non-home pages (see Site Map), wrapped flex list.
- Copyright line: "© 2026 True Nord. All rights reserved."

## Site Map & Navigation Labels

| # | Page | Route | Header nav label | Footer nav label |
|---|------|-------|---|---|
| 1 | Home | `/` | (logo) | — |
| 2 | About Us | `/about` | About Us | About Us |
| 3 | Regions & Markets | `/regions-markets` | Regions & Markets | Regions & Markets |
| 4 | Sourcing & Logistics | `/sourcing-logistics` | Sourcing & Logistics | Sourcing & Logistics |
| 5 | Certifications | `/certifications` | — | Certifications |
| 6 | Current Brands | `/brands` | Current Brands | Current Brands |
| 7 | Source for Me | `/source-for-me` | **Buy Canadian Products** | Source for Me |
| 8 | Sell in the GCC | `/sell-in-gcc` | **I'm a Canadian Brand** | Sell in the GCC |
| 9 | Privacy Policy | `/privacy-policy` | — | Privacy Policy |
| 10 | Contact | `/contact` | Contact | Contact |

Note: the header nav uses audience-framed labels for items 7 and 8 ("Buy
Canadian Products" / "I'm a Canadian Brand") so visitors can self-select
directly from the nav, matching the Home page's audience fork. The footer
keeps plain page-name labels, since it reads as a sitemap. Both labels route
to the same underlying pages — no extra routes needed.

## Home Page Content (`app/page.tsx`)

Three sections, brand story first, audience fork last and visually lighter —
per the reviewed mockup (`True Nord Website/outputs/home-page-mockup.html`).

### Section 1 — Hero (navy background, white text)

- H1 (Playfair Display): **"True Direction. Zero Complexity."**
- Small red accent bar below the heading
- Subhead (Inter, medium): **"Simple for You. Powerful for Your Brand."**
- Lead paragraph: "True Nord sources Canadian grocery brands and brings them
  to GCC retailers — and helps Canadian brands reach GCC shelves — without
  adding a new process to either side's business. You place a standard order.
  We handle everything else."

### Section 2 — "What True Nord Delivers" (white background)

- Section label (small, red, uppercase): "Why True Nord"
- H2: "What True Nord Delivers"
- 4-card grid (2x2 desktop, 1 column mobile), each card with a red left
  border, a Playfair Display sub-heading, and an Inter paragraph:
  1. **Zero Export Complexity** — "You place a standard wholesale order. We
     handle sourcing, consolidation, import documentation, and logistics from
     there."
  2. **Curated Canadian Assortment** — "A growing catalog of vetted Canadian
     grocery brands, ready for GCC shelves."
  3. **15+ Years of MENA Market Knowledge** — "Deep buying experience across
     GCC retail — we know what sells, and how to get it there."
  4. **Multi-Market Consolidation** — "We aggregate orders across GCC markets
     into a single shipment, so you can meet minimum order quantities easily."

### Section 3 — "Which One Are You?" (cream background `#F7F5F2`, secondary weight)

- Section label: "Get Started"
- H2 (smaller than Section 2's): "Which One Are You?"
- 2-card grid (1 column on mobile), each a white card with heading, short
  paragraph, and a primary (red) button:
  1. **I'm a Canadian Brand** — "Looking to get your products onto
     international shelves (Middle East, GCC,...). Tell us about your brand."
     → button **"Sell in the GCC"** → `/sell-in-gcc`
  2. **I'm an International Retailer** — "Looking to source quality Canadian
     products for your international shelves (Middle East, GCC,...)? Explore
     what we carry." → button **"View Current Brands"** → `/brands`

## Placeholder ("Coming Soon") Pages

`app/components/ComingSoon.tsx` — a small shared component taking a `title`
prop, rendering a centered message (e.g. "{title} — Coming soon.") styled with
brand fonts/colors so it doesn't look broken.

Each of the 9 remaining routes gets its own `page.tsx` with route-specific SEO
metadata and renders `<ComingSoon title="..." />`:

```tsx
// app/about/page.tsx
import ComingSoon from "../components/ComingSoon";

export const metadata = {
  title: "About Us | True Nord",
  description: "Learn about True Nord, a Canadian grocery trading company connecting North American brands with GCC and MENA retailers.",
};

export default function AboutPage() {
  return <ComingSoon title="About Us" />;
}
```

Each placeholder page gets a unique, real title + meta description (matching
its eventual purpose from the Phase 1 page plan in `CLAUDE.md`), satisfying the
"unique title + meta description on every page" SEO requirement even before
real content exists.

## Mobile-First & Responsiveness

- All layout (header, hero, value-prop grid, audience fork, footer) is built
  mobile-first with Tailwind responsive prefixes.
- Header nav collapses to a "☰ Menu" toggle below the `lg` breakpoint (1024px).
- Value-prop grid: 1 column on mobile → 2x2 at `md` (768px) and up.
- Audience fork grid: 1 column on mobile → 2 columns at `md` (768px) and up.

## Verification Plan

Since this is a static UI change with no data/forms involved, verification is
manual:

1. Run `npm run dev` and open the site locally.
2. Confirm Home page renders all 3 sections with correct copy, colors, and
   fonts (Playfair Display headings, Inter body).
3. Click every header and footer nav link — each of the 10 routes should
   resolve (Home shows real content, the other 9 show "Coming soon" with the
   right page title).
4. Resize the browser to mobile width — confirm the header collapses to the
   hamburger menu, and all sections stack to a single column.
5. Check each placeholder page's `<title>` in the browser tab matches its
   page name.

## Open Questions / Follow-ups (not blocking this spec)

- Whether "Source for Me" / "Sell in the GCC" footer labels should eventually
  also adopt audience-framed wording — left as plain page names for now per
  Wassim's review of the mockup.
- The wordmark is still the placeholder (text + accent bar); swapping in a
  professional logo file later is a drop-in replacement inside
  `Header.tsx`/`Footer.tsx` and does not affect this spec's structure.
