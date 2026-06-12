# Regions & Markets Page — Design Spec

Date: 2026-06-12

## Overview

This spec covers Phase 1 page #3: the real **Regions & Markets** page
(`/regions-markets`), replacing its current `ComingSoon` placeholder.

Source of truth for brand decisions: `True Nord Branding/outputs/design-brief.md`.
Source of truth for market and brand data: `True Nord Website/data/markets-and-certifications.md`
and `True Nord Website/data/brands.md`.

This page reuses the visual patterns already established and reviewed for the
Home and About pages (`docs/superpowers/specs/2026-06-12-brand-layout-home-design.md`,
`docs/superpowers/specs/2026-06-12-about-page-design.md`): navy hero section,
white content section, cream content section, card grids with a red left
border, and red CTA buttons.

**Audience:** Buyers (GCC retailers) and Suppliers (Canadian brands). The
closing CTA routes each audience to their respective Phase 1 inbound form.

**Content decision — name brands now:** Although the Current Brands catalog
page (`/brands`, Phase 1 page #6) is still a `ComingSoon` placeholder, this
page names MadeGood and OHME specifically with a short positioning line each,
plus each brand's logo and a photo of one representative product. This signals
real traction to suppliers and gives buyers a preview of the catalog. The
"Explore Our Brands" button still links to `/brands` — that route is already
reachable via the site nav, so this is not a new placeholder exposure.

Out of scope: individual SKU listings beyond the single product photo per
brand, a visual map graphic, an Arabic version, and analytics — consistent
with the Home and About page specs.

## Image Assets

Brand logos and product photos for MadeGood and OHME were sourced from each
brand's own website (madegoodfoods.com, ohmefoods.com) — covered by the
verbal brand-image permission already confirmed (see
`True Nord Website/decisions/open_items.md`). The files are already added to
this repo at `public/brands/` — no download/fetch steps are needed during
implementation:

| File | Used for | Source | Notes |
|---|---|---|---|
| `public/brands/madegood-logo.png` | MadeGood logo (678x200, navy on transparent) | madegoodfoods.com header logo | Works on white/cream backgrounds |
| `public/brands/madegood-product.png` | MadeGood product photo (500x500, transparent) | madegoodfoods.com — Crunchy Squares (Oats & Dark Chocolate) | Resized from original 2000x2000 |
| `public/brands/ohme-logo.svg` | OHME logo (vector, orange `#fe4f02`) | ohmefoods.com SVG logo | Works on white/cream backgrounds |
| `public/brands/ohme-product.png` | OHME product photo (500x501, transparent) | ohmefoods.com — Freeze-Dried Strawberries | Used as-is |

## Page Structure (`app/regions-markets/page.tsx`)

Four sections, following the same navy → white → cream → navy rhythm as the
About page.

### Section 1 — Hero (navy background, white text)

- H1 (Playfair Display): **"Regions & Markets"**
- Small red accent bar below the heading (same pattern as Home/About hero)
- Subhead (Inter, medium): **"Eight markets. One supply chain."**
- Lead paragraph: "True Nord sources Canadian grocery brands and delivers them
  into eight markets across the GCC, Jordan, and Egypt. Whether you're a
  Canadian supplier looking for your next export market, or a GCC retailer
  looking for your next addition to shelf, True Nord's reach already covers
  where you need to be."

### Section 2 — "Markets We Serve" (white background)

- Section label (small, red, uppercase): "Where We Operate"
- H2: "Markets We Serve"
- Intro paragraph (centered, `max-w-3xl`): "True Nord supplies into all six GCC
  countries plus two of the broader region's largest grocery markets — eight
  markets in total, each with its own retail landscape and import
  requirements. One relationship with True Nord gives Canadian suppliers
  access to all of them, and gives GCC retailers a single point of contact for
  sourcing across the region."
- 2-column card grid (1 column on mobile), same style as About's expertise
  cards (`border-l-4 border-red pl-5`, Playfair Display sub-heading, Inter
  paragraph). 2 cards:
  1. **GCC** — "Saudi Arabia, United Arab Emirates, Kuwait, Qatar, Bahrain, and
     Oman — the core of True Nord's distribution network, and home to some of
     the fastest-growing grocery and quick-commerce markets in the world."
  2. **Broader MENA** — "Jordan and Egypt extend True Nord's reach beyond the
     Gulf — two of the region's largest population centers, opening the door
     to even larger consumer markets for Canadian brands."

### Section 3 — "Canadian Brands We Carry" (cream background `#F7F5F2`)

- Section label: "What We Carry"
- H2: "Canadian Brands We Carry"
- Intro paragraph (centered, `max-w-3xl`): "True Nord's catalog starts with two
  Canadian brands already trusted by health-conscious shoppers — with more
  being added as we grow. Every brand we carry is vetted for GCC retail: clean
  labels, halal-compatible ingredients, and shelf-ready packaging."
- 2-column card grid (1 column on mobile). Unlike Section 2's cards, these are
  white "tile" cards (`rounded-lg border border-navy/10 bg-white p-6
  text-center`) — the white background lets each brand's own product photo and
  logo stand out against the cream section background. Each card, top to
  bottom:
  1. A product photo in a fixed `h-40 w-40` square, centered with `mx-auto`
     (Next.js `Image` with `fill`, `sizes="160px"`, and `className="object-contain"`)
  2. The brand's logo, rendered at a consistent 40px height, wrapped in an
     `<h3>` (the logo `Image`'s `alt` text is the brand name, so this still
     produces a proper heading for the page's H1 → H2 → H3 structure)
  3. A short description paragraph (`text-sm text-navy/80`)

  The 2 cards:
  1. **MadeGood** — product photo: `madegood-product.png` (Crunchy Squares,
     Oats & Dark Chocolate); logo: `madegood-logo.png` (136x40); description:
     "Organic, allergy-friendly snacks — granola bars, cookies, and crackers
     that are Non-GMO, Gluten-Free, Nut-Free, Vegan, and Kosher. A strong fit
     for the GCC's growing health-and-allergy-conscious shopper base."
  2. **OHME** — product photo: `ohme-product.png` (Freeze-Dried Strawberries);
     logo: `ohme-logo.svg` (123x40); description: "Freeze-dried fruit snacks
     with no preservatives and no added sugar — real fruit, simple
     ingredients, big crunch. Meets rising Gulf demand for clean,
     better-for-you snacking."
- Below the grid, centered: a red "Explore Our Brands" button → `/brands`,
  same style as other CTA buttons (`inline-block rounded-md bg-red px-6 py-3
  text-sm font-semibold text-white hover:bg-red-shade`).

### Section 4 — Closing CTA (navy background, white text)

- H2: "Ready to Get Started?"
- Body paragraph (centered, `max-w-2xl`): "Whether you're a Canadian brand
  ready to enter the GCC, or a GCC retailer looking to source from Canada,
  True Nord's regional reach means you're already covered. Tell us what you're
  working on, and we'll show you how True Nord fits in."
- Two CTA buttons, side by side on `sm` and up, stacked on mobile:
  1. **"I'm a Canadian Brand"** → `/sell-in-gcc`
  2. **"I'm a GCC Retailer"** → `/source-for-me`
- Both buttons use the same red CTA style as Section 3's button.

## Full Page Code (`app/regions-markets/page.tsx`)

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const marketGroups = [
  {
    title: "GCC",
    description:
      "Saudi Arabia, United Arab Emirates, Kuwait, Qatar, Bahrain, and Oman — the core of True Nord's distribution network, and home to some of the fastest-growing grocery and quick-commerce markets in the world.",
  },
  {
    title: "Broader MENA",
    description:
      "Jordan and Egypt extend True Nord's reach beyond the Gulf — two of the region's largest population centers, opening the door to even larger consumer markets for Canadian brands.",
  },
];

const brandCards = [
  {
    name: "MadeGood",
    logoSrc: "/brands/madegood-logo.png",
    logoWidth: 136,
    logoHeight: 40,
    productSrc: "/brands/madegood-product.png",
    productAlt: "MadeGood Organic Crunchy Granola Squares package",
    description:
      "Organic, allergy-friendly snacks — granola bars, cookies, and crackers that are Non-GMO, Gluten-Free, Nut-Free, Vegan, and Kosher. A strong fit for the GCC's growing health-and-allergy-conscious shopper base.",
  },
  {
    name: "OHME",
    logoSrc: "/brands/ohme-logo.svg",
    logoWidth: 123,
    logoHeight: 40,
    productSrc: "/brands/ohme-product.png",
    productAlt: "OHME Freeze-Dried Strawberries package",
    description:
      "Freeze-dried fruit snacks with no preservatives and no added sugar — real fruit, simple ingredients, big crunch. Meets rising Gulf demand for clean, better-for-you snacking.",
  },
];

export const metadata: Metadata = {
  title: "Regions & Markets | True Nord",
  description:
    "True Nord supplies Canadian grocery brands like MadeGood and OHME into eight markets across the GCC, Jordan, and Egypt.",
};

export default function RegionsMarketsPage() {
  return (
    <>
      <section className="bg-navy px-6 py-24 text-center text-white">
        <h1 className="text-4xl md:text-5xl">Regions &amp; Markets</h1>
        <div className="mx-auto my-5 h-1 w-16 bg-red" aria-hidden="true" />
        <p className="mb-5 text-lg font-medium text-white/90">
          Eight markets. One supply chain.
        </p>
        <p className="mx-auto max-w-2xl text-base text-white/85">
          True Nord sources Canadian grocery brands and delivers them into
          eight markets across the GCC, Jordan, and Egypt. Whether
          you&apos;re a Canadian supplier looking for your next export
          market, or a GCC retailer looking for your next addition to shelf,
          True Nord&apos;s reach already covers where you need to be.
        </p>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 text-center text-sm font-semibold uppercase tracking-wide text-red">
            Where We Operate
          </p>
          <h2 className="mb-6 text-center text-3xl">Markets We Serve</h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-base text-navy/80">
            True Nord supplies into all six GCC countries plus two of the
            broader region&apos;s largest grocery markets — eight markets in
            total, each with its own retail landscape and import
            requirements. One relationship with True Nord gives Canadian
            suppliers access to all of them, and gives GCC retailers a single
            point of contact for sourcing across the region.
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            {marketGroups.map((item) => (
              <div key={item.title} className="border-l-4 border-red pl-5">
                <h3 className="mb-2 text-xl">{item.title}</h3>
                <p className="text-sm text-navy/80">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 text-center text-sm font-semibold uppercase tracking-wide text-red">
            What We Carry
          </p>
          <h2 className="mb-6 text-center text-3xl">
            Canadian Brands We Carry
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-base text-navy/80">
            True Nord&apos;s catalog starts with two Canadian brands already
            trusted by health-conscious shoppers — with more being added as
            we grow. Every brand we carry is vetted for GCC retail: clean
            labels, halal-compatible ingredients, and shelf-ready packaging.
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            {brandCards.map((brand) => (
              <div
                key={brand.name}
                className="rounded-lg border border-navy/10 bg-white p-6 text-center"
              >
                <div className="relative mx-auto mb-4 h-40 w-40">
                  <Image
                    src={brand.productSrc}
                    alt={brand.productAlt}
                    fill
                    sizes="160px"
                    className="object-contain"
                  />
                </div>
                <h3 className="mb-3 flex justify-center">
                  <Image
                    src={brand.logoSrc}
                    alt={brand.name}
                    width={brand.logoWidth}
                    height={brand.logoHeight}
                  />
                </h3>
                <p className="text-sm text-navy/80">{brand.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/brands"
              className="inline-block rounded-md bg-red px-6 py-3 text-sm font-semibold text-white hover:bg-red-shade"
            >
              Explore Our Brands
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-navy px-6 py-20 text-center text-white">
        <h2 className="mb-5 text-3xl">Ready to Get Started?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-base text-white/85">
          Whether you&apos;re a Canadian brand ready to enter the GCC, or a
          GCC retailer looking to source from Canada, True Nord&apos;s
          regional reach means you&apos;re already covered. Tell us what
          you&apos;re working on, and we&apos;ll show you how True Nord fits
          in.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/sell-in-gcc"
            className="inline-block rounded-md bg-red px-6 py-3 text-sm font-semibold text-white hover:bg-red-shade"
          >
            I&apos;m a Canadian Brand
          </Link>
          <Link
            href="/source-for-me"
            className="inline-block rounded-md bg-red px-6 py-3 text-sm font-semibold text-white hover:bg-red-shade"
          >
            I&apos;m a GCC Retailer
          </Link>
        </div>
      </section>
    </>
  );
}
```

This fully replaces the current placeholder content of `app/regions-markets/page.tsx`
(which renders `<ComingSoon title="Regions & Markets" />`).

## Mobile-First & Responsiveness

- Hero, "Markets We Serve" intro, "Canadian Brands We Carry" intro, and closing
  CTA body text are single-column at all widths (text reflows naturally within
  their `max-w-*` containers).
- "Markets We Serve" and "Canadian Brands We Carry" card grids: 1 column on
  mobile → 2 columns at `md` (768px) and up, matching About's expertise grid
  (`grid gap-8 md:grid-cols-2`).
- Brand cards: the product photo container is a fixed `h-40 w-40` (160x160px)
  square at all breakpoints — on mobile, each card still spans the full
  content width, but the image stays a fixed size, centered with `mx-auto`. No
  responsive image sizing is needed beyond the fixed `sizes="160px"`.
- Closing CTA buttons: stacked vertically on mobile, side by side at `sm`
  (640px) and up (`flex flex-col items-center justify-center gap-4
  sm:flex-row`).

## Verification Plan

Since this is a static content/UI change with no data or forms involved,
verification is manual:

1. Run `npm run dev` and open `/regions-markets`.
2. Confirm all 4 sections render with the correct copy, background colors
   (navy / white / cream / navy), and fonts (Playfair Display headings, Inter
   body).
3. Confirm the "Markets We Serve" section shows both the "GCC" and "Broader
   MENA" cards with their full country lists.
4. Confirm the "Canadian Brands We Carry" section shows both brand cards, each
   with a product photo, the brand's logo (MadeGood navy wordmark, OHME orange
   wordmark), and description text, and that "Explore Our Brands" links to
   `/brands`.
5. Confirm the closing CTA shows both buttons, linking to `/sell-in-gcc` and
   `/source-for-me` respectively.
6. Confirm the browser tab title is "Regions & Markets | True Nord".
7. Resize to mobile width — confirm both card grids stack to a single column,
   the closing CTA buttons stack vertically, and all text remains readable
   with no horizontal scrollbar.
