# Sourcing & Logistics Page — Design Spec

Date: 2026-06-12

## Overview

This spec covers Phase 1 page #4: the real **Sourcing & Logistics** page
(`/sourcing-logistics`), replacing its current `ComingSoon` placeholder.

Source of truth for brand decisions: `True Nord Branding/outputs/design-brief.md`.

This page reuses the visual patterns already established and reviewed for the
Home, About, and Regions & Markets pages
(`docs/superpowers/specs/2026-06-12-brand-layout-home-design.md`,
`docs/superpowers/specs/2026-06-12-about-page-design.md`,
`docs/superpowers/specs/2026-06-12-regions-markets-page-design.md`): navy hero
section, white content section, cream content section, card grids with a red
left border, and red CTA buttons.

**Audience:** Buyers (GCC retailers) and Suppliers (Canadian brands). The page
walks both audiences through the same single pipeline, then closes by routing
each audience to their respective Phase 1 inbound form.

**Content decision — one unified process narrative:** Rather than splitting
the 4-step process into separate Canadian-brand and GCC-retailer versions,
the "From Source to Shelf" section tells ONE story — the single pipeline True
Nord runs end to end. The audience split happens afterward, in the "What This
Means for You" section, which translates that single process into the
specific value each audience gets from it.

**Content decision — process step layout:** The 4 steps (Source, Prepare,
Export, Launch) use the same 2-column card grid as the rest of the site
(`grid gap-8 md:grid-cols-2`, `border-l-4 border-red pl-5` cards), with an
added small navy circular number badge above each card's heading to convey
sequence. This was confirmed via a side-by-side mockup against a vertical
timeline alternative — the card grid (Option A) was preferred for visual
consistency with the rest of the site.

Out of scope: a visual map/diagram of the shipping route, certification
details (covered by the dedicated Certifications page, Phase 1 page #5), an
Arabic version, and analytics — consistent with prior page specs.

## Page Structure (`app/sourcing-logistics/page.tsx`)

Four sections, following the same navy → white → cream → navy rhythm as
About and Regions & Markets.

### Section 1 — Hero (navy background, white text)

- H1 (Playfair Display): **"Sourcing & Logistics"**
- Small red accent bar below the heading (same pattern as Home/About/Regions
  & Markets hero)
- Subhead (Inter, medium): **"One process. Zero complexity."**
- Lead paragraph: "Whether you're a Canadian brand wondering how your product
  reaches Gulf shelves, or a GCC retailer wondering how a sourcing partner
  actually works — here's the process. Four stages, fully managed by True
  Nord, from the moment we take on a product to the moment it's on shelf."

### Section 2 — "From Source to Shelf" (white background)

- Section label (small, red, uppercase): "How It Works"
- H2: "From Source to Shelf"
- Intro paragraph (centered, `max-w-3xl`): "Getting a Canadian grocery
  product onto GCC shelves means curation, consolidation, customs, and
  logistics — usually a maze of new relationships and paperwork for anyone
  entering the market for the first time. True Nord runs all four stages as
  one continuous pipeline."
- 2-column card grid (1 column on mobile), same style as About's expertise
  cards and Regions & Markets' market cards (`border-l-4 border-red pl-5`,
  Playfair Display sub-heading, Inter paragraph), with an added number badge
  (small navy circle, white Inter numeral, `mb-2` above the heading) on each
  card. 4 cards:
  1. **Source** — "We curate and vet Canadian grocery brands — building
     relationships with manufacturers like MadeGood and OHME to create a
     trusted, GCC-ready catalog."
  2. **Prepare** — "Orders are consolidated across all eight GCC and MENA
     markets to meet minimum order quantities, while we prepare the
     certifications and documentation each market requires."
  3. **Export** — "Products are picked up from the supplier, cleared through
     customs, and shipped from Canada — freight and logistics handled door to
     door."
  4. **Launch** — "Shipments arrive at the retailer's warehouse, ready for
     shelf — completing the journey from Canadian producer to GCC consumer."

### Section 3 — "What This Means for You" (cream background `#F7F5F2`)

- H2: "What This Means for You"
- 2-column card grid (1 column on mobile), same `border-l-4 border-red pl-5`
  style as Section 2 (without number badges). 2 cards:
  1. **For Canadian Brands** — "One partner curates your fit for the GCC
     market, handles preparation and documentation, and gets your product
     onto shelves — without you setting up local entities, certifications, or
     freight relationships yourself."
  2. **For GCC Retailers** — "One source for vetted Canadian products,
     consolidated into orders that meet your minimums, fully cleared and
     delivered — no need to manage multiple Canadian suppliers or
     cross-border logistics yourself."

### Section 4 — Closing CTA (navy background, white text)

- H2: "Ready to Start the Conversation?"
- Body paragraph (centered, `max-w-2xl`): "Ready to add Canadian products to
  your shelves, or get your Canadian brand into the GCC? Tell us what you're
  working on, and we'll show you how True Nord's sourcing and logistics
  process fits in."
- Two CTA buttons, side by side on `sm` and up, stacked on mobile:
  1. **"I'm a Canadian Brand"** → `/sell-in-gcc`
  2. **"I'm a GCC Retailer"** → `/source-for-me`
- Both buttons use the same red CTA style as other pages
  (`inline-block rounded-md bg-red px-6 py-3 text-sm font-semibold text-white
  hover:bg-red-shade`).

## Full Page Code (`app/sourcing-logistics/page.tsx`)

```tsx
import type { Metadata } from "next";
import Link from "next/link";

const processSteps = [
  {
    number: 1,
    title: "Source",
    description:
      "We curate and vet Canadian grocery brands — building relationships with manufacturers like MadeGood and OHME to create a trusted, GCC-ready catalog.",
  },
  {
    number: 2,
    title: "Prepare",
    description:
      "Orders are consolidated across all eight GCC and MENA markets to meet minimum order quantities, while we prepare the certifications and documentation each market requires.",
  },
  {
    number: 3,
    title: "Export",
    description:
      "Products are picked up from the supplier, cleared through customs, and shipped from Canada — freight and logistics handled door to door.",
  },
  {
    number: 4,
    title: "Launch",
    description:
      "Shipments arrive at the retailer's warehouse, ready for shelf — completing the journey from Canadian producer to GCC consumer.",
  },
];

const audienceCards = [
  {
    title: "For Canadian Brands",
    description:
      "One partner curates your fit for the GCC market, handles preparation and documentation, and gets your product onto shelves — without you setting up local entities, certifications, or freight relationships yourself.",
  },
  {
    title: "For GCC Retailers",
    description:
      "One source for vetted Canadian products, consolidated into orders that meet your minimums, fully cleared and delivered — no need to manage multiple Canadian suppliers or cross-border logistics yourself.",
  },
];

export const metadata: Metadata = {
  title: "Sourcing & Logistics | True Nord",
  description:
    "How True Nord sources, prepares, exports, and delivers Canadian grocery products to GCC and MENA retailers.",
};

export default function SourcingLogisticsPage() {
  return (
    <>
      <section className="bg-navy px-6 py-24 text-center text-white">
        <h1 className="text-4xl md:text-5xl">Sourcing &amp; Logistics</h1>
        <div className="mx-auto my-5 h-1 w-16 bg-red" aria-hidden="true" />
        <p className="mb-5 text-lg font-medium text-white/90">
          One process. Zero complexity.
        </p>
        <p className="mx-auto max-w-2xl text-base text-white/85">
          Whether you&apos;re a Canadian brand wondering how your product
          reaches Gulf shelves, or a GCC retailer wondering how a sourcing
          partner actually works — here&apos;s the process. Four stages,
          fully managed by True Nord, from the moment we take on a product to
          the moment it&apos;s on shelf.
        </p>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 text-center text-sm font-semibold uppercase tracking-wide text-red">
            How It Works
          </p>
          <h2 className="mb-6 text-center text-3xl">From Source to Shelf</h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-base text-navy/80">
            Getting a Canadian grocery product onto GCC shelves means
            curation, consolidation, customs, and logistics — usually a maze
            of new relationships and paperwork for anyone entering the market
            for the first time. True Nord runs all four stages as one
            continuous pipeline.
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            {processSteps.map((step) => (
              <div key={step.title} className="border-l-4 border-red pl-5">
                <span className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white">
                  {step.number}
                </span>
                <h3 className="mb-2 text-xl">{step.title}</h3>
                <p className="text-sm text-navy/80">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl">
            What This Means for You
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {audienceCards.map((card) => (
              <div key={card.title} className="border-l-4 border-red pl-5">
                <h3 className="mb-2 text-xl">{card.title}</h3>
                <p className="text-sm text-navy/80">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy px-6 py-20 text-center text-white">
        <h2 className="mb-5 text-3xl">Ready to Start the Conversation?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-base text-white/85">
          Ready to add Canadian products to your shelves, or get your
          Canadian brand into the GCC? Tell us what you&apos;re working on,
          and we&apos;ll show you how True Nord&apos;s sourcing and logistics
          process fits in.
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

This fully replaces the current placeholder content of
`app/sourcing-logistics/page.tsx` (which renders
`<ComingSoon title="Sourcing & Logistics" />`). The `Metadata` export is
unchanged from the current placeholder.

## Mobile-First & Responsiveness

- Hero, "From Source to Shelf" intro, and closing CTA body text are
  single-column at all widths (text reflows naturally within their `max-w-*`
  containers).
- "From Source to Shelf" and "What This Means for You" card grids: 1 column
  on mobile → 2 columns at `md` (768px) and up, matching About's expertise
  grid and Regions & Markets' market grid (`grid gap-8 md:grid-cols-2`).
- Closing CTA buttons: stacked vertically on mobile, side by side at `sm`
  (640px) and up (`flex flex-col items-center justify-center gap-4
  sm:flex-row`).

## Verification Plan

Since this is a static content/UI change with no data or forms involved,
verification is manual:

1. Run `npm run dev` and open `/sourcing-logistics`.
2. Confirm all 4 sections render with the correct copy, background colors
   (navy / white / cream / navy), and fonts (Playfair Display headings, Inter
   body).
3. Confirm the "From Source to Shelf" section shows all 4 process cards
   (Source, Prepare, Export, Launch) in order, each with its numbered badge
   (1-4) and full description.
4. Confirm the "What This Means for You" section shows both audience cards
   ("For Canadian Brands" and "For GCC Retailers").
5. Confirm the closing CTA shows both buttons, with "I'm a Canadian Brand"
   linking to `/sell-in-gcc` and "I'm a GCC Retailer" linking to
   `/source-for-me`.
6. Confirm the browser tab title is "Sourcing & Logistics | True Nord".
7. Resize to mobile width — confirm both card grids stack to a single column,
   the closing CTA buttons stack vertically, and all text remains readable
   with no horizontal scrollbar.
