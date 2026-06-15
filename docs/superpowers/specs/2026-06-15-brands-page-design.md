# Brands Page — Design Spec

Date: 2026-06-15

## Overview

This spec covers Phase 1 page #6: the real **Current Brands** page
(`/brands`), replacing its current `ComingSoon` placeholder.

Source of truth for brand decisions: `True Nord Branding/outputs/design-brief.md`.
Source of truth for brand/product content: `data/brands.md`.

This page reuses the visual patterns already established and reviewed for the
Home, About, Regions & Markets, Sourcing & Logistics, and Certifications
pages (`docs/superpowers/specs/2026-06-12-*.md`,
`2026-06-15-certifications-page-design.md`): navy hero section, content
sections on white/cream backgrounds, red accent bars, red CTA buttons, and
Playfair Display headings over Inter body text.

**Relationship to Regions & Markets:** The Regions & Markets page
(`app/regions-markets/page.tsx`) already has a "Canadian Brands We Carry"
section with compact teaser cards for MadeGood and OHME (product photo,
logo, two-sentence description), and an "Explore Our Brands" button linking
to `/brands`. This page is the deeper destination for that link — full
profiles for each brand rather than teaser cards. No changes to
`app/regions-markets/page.tsx` are part of this spec.

**Content decision — dual-audience framing (approved 2026-06-15):** The page
serves two audiences at once: GCC retailers evaluating what they can stock
today, and Canadian brands sizing up the caliber of company they'd be joining
if added to the catalog. Both framings are present in the hero and the
closing CTA; the brand profile sections themselves are written neutrally
(facts about the brand) and don't need to split by audience.

**Content decision — external brand links (approved 2026-06-15):** Each
brand profile includes an outbound link to the brand's own website
(`https://www.madegoodfoods.com`, `https://www.ohmefoods.com`), opening in a
new tab (`target="_blank" rel="noopener noreferrer"`). This adds credibility
and transparency — these are real, independently-operating brands — without
competing with True Nord's own CTAs, which remain in the closing section.

**Content decision — growing catalog (approved 2026-06-15):** The page
briefly frames today's two brands as the start of a growing lineup. This
appears once in the hero lead paragraph ("with more brands added as the
catalog grows") and is echoed in the closing CTA copy ("the next name in
True Nord's catalog"). It is not a major theme or its own section — just
enough to support the dual-audience framing without suggesting the catalog is
incomplete or early-stage.

**Content decision — profile layout (approved 2026-06-15, via visual
companion):** Each brand gets its own full section (not a card in a grid).
Within each section, content is arranged side-by-side on `md` and up: product
photo + logo in a left column (5/12 width), and all text content (tagline,
certification pills, product line, GCC-fit sentence, external link) in a
right column (7/12 width). On mobile, the image/logo column stacks above the
text column. Two options were mocked up (side-by-side vs. stacked/centered);
side-by-side was chosen.

Out of scope: SKU-level product detail (per `data/brands.md`, this is
explicitly Phase 2), additional brands beyond MadeGood and OHME, an Arabic
version, and analytics — consistent with prior page specs.

## Page Structure (`app/brands/page.tsx`)

Four sections, following the same navy → white → cream → navy rhythm as
the other real pages, with MadeGood and OHME each getting one full section.

### Section 1 — Hero (navy background, white text)

- H1 (Playfair Display): **"Current Brands"**
- Small red accent bar below the heading (same pattern as other heroes)
- Subhead (Inter, medium): **"Two brands. One growing catalog."**
- Lead paragraph: "True Nord's catalog starts with two Canadian brands
  already trusted by health-conscious shoppers — vetted for clean labels,
  halal-compatible ingredients, and shelf-ready packaging for GCC retail. For
  GCC retailers, this is what's ready to stock today. For Canadian brands,
  it's the caliber of lineup you'd be joining — with more brands added as the
  catalog grows."

### Section 2 — MadeGood profile (white background)

- Section label (small, red, uppercase): "Granola, Bars & Snacks"
- Left column (product photo above logo, `md:col-span-5`):
  - Product photo: `/brands/madegood-product.png`, displayed in a
    `224px` (mobile) / `256px` (`md`+) square, `object-contain`
  - Logo: `/brands/madegood-logo.png`, 136×40, centered below the photo
- Right column (`md:col-span-7`):
  - H2: "MadeGood"
  - Tagline (italic, `text-navy/80`): "Crafted and packed by proud
    Canadians" — organic, allergy-friendly snacks." (curly quotes)
  - Certification pills (`rounded-full border border-navy/15 bg-cream
    px-4 py-1.5 text-sm font-semibold text-navy`, wrapping):
    Certified Organic, Non-GMO, Gluten-Free, Nut-Free, Vegan, Kosher
  - Product line (`text-sm text-navy/80`, with a bold "Product line:"
    lead-in): "Granola Bars, Granola Bites, Cookies & Crackers (including
    Star Crackers), Crispy Squares, Crunchy Granola Squares, and Morning
    Bars & Oat Cups."
  - GCC-fit sentence (`text-sm text-navy/80`): "A strong fit for the GCC's
    growing health-conscious and allergy-aware shopper base, with
    halal-compatible ingredients across the range."
  - External link (`text-sm font-semibold text-red hover:text-red-shade`,
    opens in new tab): "Visit madegoodfoods.com ↗" →
    `https://www.madegoodfoods.com`

### Section 3 — OHME profile (cream background `#F7F5F2`)

Same structure as Section 2, mirrored content for OHME. The only styling
difference is the certification pills use `bg-white` instead of `bg-cream`
so they remain visible against the cream section background.

- Section label: "Freeze-Dried Fruit Snacks"
- Left column (`md:col-span-5`):
  - Product photo: `/brands/ohme-product.png`, same sizing as Section 2
  - Logo: `/brands/ohme-logo.svg`, 123×40, centered below the photo
- Right column (`md:col-span-7`):
  - H2: "OHME"
  - Tagline (italic): "Real fruit. Big crunch." — freeze-dried fruit
    snacks with no preservatives and no added sugar." (curly quotes)
  - Certification pills (`rounded-full border border-navy/15 bg-white
    px-4 py-1.5 text-sm font-semibold text-navy`, wrapping): Non-GMO, Vegan
  - Product line: "Freeze-Dried Fruit Snacks (strawberries, blueberries,
    raspberries, mangoes, and figs), Yogurt Crunch, OHME Minis, and Yum
    Packs."
  - GCC-fit sentence: "No preservatives and no added sugar, meeting the
    Gulf's growing demand for clean, better-for-you snacking."
  - External link (opens in new tab): "Visit ohmefoods.com ↗" →
    `https://www.ohmefoods.com`

### Section 4 — Closing CTA (navy background, white text)

- H2: **"Ready to Add to the Lineup?"** (distinct from "Ready to Get
  Started?" on Regions & Markets and "Ready to Move Forward?" on
  Certifications — works for both a retailer adding these brands to their
  shelf lineup, and a Canadian brand becoming the next addition to True
  Nord's catalog)
- Body paragraph (centered, `max-w-2xl`): "Whether you're a GCC retailer
  ready to bring MadeGood and OHME onto your shelves, or a Canadian brand
  hoping to be the next name in True Nord's catalog, let's start the
  conversation."
- Two CTA buttons, side by side on `sm` and up, stacked on mobile (same
  pattern as other pages):
  1. **"I'm a Canadian Brand"** → `/sell-in-gcc`
  2. **"I'm a GCC Retailer"** → `/source-for-me`
- Both buttons use the standard red CTA style (`inline-block rounded-md
  bg-red px-6 py-3 text-sm font-semibold text-white hover:bg-red-shade`).

## Full Page Code (`app/brands/page.tsx`)

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Current Brands | True Nord",
  description:
    "Browse the Canadian grocery brands True Nord currently carries for GCC and MENA retailers.",
};

export default function BrandsPage() {
  return (
    <>
      <section className="bg-navy px-6 py-24 text-center text-white">
        <h1 className="text-4xl md:text-5xl">Current Brands</h1>
        <div className="mx-auto my-5 h-1 w-16 bg-red" aria-hidden="true" />
        <p className="mb-5 text-lg font-medium text-white/90">
          Two brands. One growing catalog.
        </p>
        <p className="mx-auto max-w-2xl text-base text-white/85">
          True Nord&apos;s catalog starts with two Canadian brands already
          trusted by health-conscious shoppers — vetted for clean labels,
          halal-compatible ingredients, and shelf-ready packaging for GCC
          retail. For GCC retailers, this is what&apos;s ready to stock
          today. For Canadian brands, it&apos;s the caliber of lineup
          you&apos;d be joining — with more brands added as the catalog
          grows.
        </p>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-12 md:items-start">
          <div className="md:col-span-5">
            <div className="relative mx-auto h-56 w-56 md:h-64 md:w-64">
              <Image
                src="/brands/madegood-product.png"
                alt="MadeGood Organic Crunchy Granola Squares package"
                fill
                sizes="(min-width: 768px) 256px, 224px"
                className="object-contain"
              />
            </div>
            <div className="mt-5 flex justify-center">
              <Image
                src="/brands/madegood-logo.png"
                alt="MadeGood"
                width={136}
                height={40}
              />
            </div>
          </div>
          <div className="md:col-span-7">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-red">
              Granola, Bars &amp; Snacks
            </p>
            <h2 className="mb-3 text-3xl">MadeGood</h2>
            <p className="mb-4 text-base italic text-navy/80">
              “Crafted and packed by proud Canadians” — organic,
              allergy-friendly snacks.
            </p>
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-navy/15 bg-cream px-4 py-1.5 text-sm font-semibold text-navy">
                Certified Organic
              </span>
              <span className="rounded-full border border-navy/15 bg-cream px-4 py-1.5 text-sm font-semibold text-navy">
                Non-GMO
              </span>
              <span className="rounded-full border border-navy/15 bg-cream px-4 py-1.5 text-sm font-semibold text-navy">
                Gluten-Free
              </span>
              <span className="rounded-full border border-navy/15 bg-cream px-4 py-1.5 text-sm font-semibold text-navy">
                Nut-Free
              </span>
              <span className="rounded-full border border-navy/15 bg-cream px-4 py-1.5 text-sm font-semibold text-navy">
                Vegan
              </span>
              <span className="rounded-full border border-navy/15 bg-cream px-4 py-1.5 text-sm font-semibold text-navy">
                Kosher
              </span>
            </div>
            <p className="mb-4 text-sm text-navy/80">
              <span className="font-semibold text-navy">Product line:</span>{" "}
              Granola Bars, Granola Bites, Cookies &amp; Crackers (including
              Star Crackers), Crispy Squares, Crunchy Granola Squares, and
              Morning Bars &amp; Oat Cups.
            </p>
            <p className="mb-5 text-sm text-navy/80">
              A strong fit for the GCC&apos;s growing health-conscious and
              allergy-aware shopper base, with halal-compatible ingredients
              across the range.
            </p>
            <a
              href="https://www.madegoodfoods.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-red hover:text-red-shade"
            >
              Visit madegoodfoods.com ↗
            </a>
          </div>
        </div>
      </section>

      <section className="bg-cream px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-12 md:items-start">
          <div className="md:col-span-5">
            <div className="relative mx-auto h-56 w-56 md:h-64 md:w-64">
              <Image
                src="/brands/ohme-product.png"
                alt="OHME Freeze-Dried Strawberries package"
                fill
                sizes="(min-width: 768px) 256px, 224px"
                className="object-contain"
              />
            </div>
            <div className="mt-5 flex justify-center">
              <Image
                src="/brands/ohme-logo.svg"
                alt="OHME"
                width={123}
                height={40}
              />
            </div>
          </div>
          <div className="md:col-span-7">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-red">
              Freeze-Dried Fruit Snacks
            </p>
            <h2 className="mb-3 text-3xl">OHME</h2>
            <p className="mb-4 text-base italic text-navy/80">
              “Real fruit. Big crunch.” — freeze-dried fruit snacks with no
              preservatives and no added sugar.
            </p>
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-navy/15 bg-white px-4 py-1.5 text-sm font-semibold text-navy">
                Non-GMO
              </span>
              <span className="rounded-full border border-navy/15 bg-white px-4 py-1.5 text-sm font-semibold text-navy">
                Vegan
              </span>
            </div>
            <p className="mb-4 text-sm text-navy/80">
              <span className="font-semibold text-navy">Product line:</span>{" "}
              Freeze-Dried Fruit Snacks (strawberries, blueberries,
              raspberries, mangoes, and figs), Yogurt Crunch, OHME Minis, and
              Yum Packs.
            </p>
            <p className="mb-5 text-sm text-navy/80">
              No preservatives and no added sugar, meeting the Gulf&apos;s
              growing demand for clean, better-for-you snacking.
            </p>
            <a
              href="https://www.ohmefoods.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-red hover:text-red-shade"
            >
              Visit ohmefoods.com ↗
            </a>
          </div>
        </div>
      </section>

      <section className="bg-navy px-6 py-20 text-center text-white">
        <h2 className="mb-5 text-3xl">Ready to Add to the Lineup?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-base text-white/85">
          Whether you&apos;re a GCC retailer ready to bring MadeGood and OHME
          onto your shelves, or a Canadian brand hoping to be the next name
          in True Nord&apos;s catalog, let&apos;s start the conversation.
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

This fully replaces the current placeholder content of `app/brands/page.tsx`
(which renders `<ComingSoon title="Current Brands" />`). The `Metadata`
export is unchanged from the current placeholder.

## Mobile-First & Responsiveness

- Hero lead paragraph is single-column at all widths (text reflows within
  `max-w-2xl`).
- Each brand profile uses `grid gap-10 md:grid-cols-12`: on mobile (no
  `grid-cols` set), the image/logo block and the text block stack vertically
  with a `2.5rem` gap. At `md` and up, the grid becomes 12 columns with a
  5/7 split (`md:col-span-5` / `md:col-span-7`), placing image+logo beside
  the text content.
- Product photos are `224px` square on mobile, `256px` on `md`+
  (`h-56 w-56 md:h-64 md:w-64`), using `next/image` `fill` +
  `object-contain` so they never distort.
- Certification pills use `flex flex-wrap gap-2` so they wrap onto multiple
  lines on narrow screens without overflowing.
- Closing CTA buttons: stacked vertically on mobile, side by side at `sm`
  (640px) and up (`flex flex-col items-center justify-center gap-4
  sm:flex-row`), matching every other real page.

## Verification Plan

Since this is a static content/UI change with no data or forms involved,
verification is manual:

1. Run `npm run dev` and open `/brands`.
2. Confirm all 4 sections render with the correct copy, background colors
   (navy / white / cream / navy), and fonts (Playfair Display headings,
   Inter body).
3. Confirm the MadeGood section (white) shows the product photo, logo,
   tagline, all 6 certification pills (cream background), the product line
   sentence, the GCC-fit sentence, and the "Visit madegoodfoods.com ↗" link.
4. Confirm the OHME section (cream) shows the product photo, logo, tagline,
   both certification pills (white background, visible against the cream
   section), the product line sentence, the GCC-fit sentence, and the "Visit
   ohmefoods.com ↗" link.
5. Click both external links — confirm they open `madegoodfoods.com` and
   `ohmefoods.com` in a new browser tab.
6. Confirm the closing CTA shows "Ready to Add to the Lineup?", the body
   paragraph, and both buttons, with "I'm a Canadian Brand" linking to
   `/sell-in-gcc` and "I'm a GCC Retailer" linking to `/source-for-me`.
7. Confirm the browser tab title is "Current Brands | True Nord".
8. Resize to mobile width — confirm each brand's image+logo stacks above its
   text content, certification pills wrap cleanly, the closing CTA buttons
   stack vertically, and all text remains readable with no horizontal
   scrollbar.
