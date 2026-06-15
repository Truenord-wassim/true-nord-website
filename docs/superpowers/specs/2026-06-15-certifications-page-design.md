# Certifications Page — Design Spec

Date: 2026-06-15

## Overview

This spec covers Phase 1 page #5: the real **Certifications** page
(`/certifications`), replacing its current `ComingSoon` placeholder.

Source of truth for brand decisions: `True Nord Branding/outputs/design-brief.md`.

This page reuses the visual patterns already established and reviewed for the
Home, About, Regions & Markets, and Sourcing & Logistics pages
(`docs/superpowers/specs/2026-06-12-*.md`): navy hero section, white content
section, cream content section, red accent bars, red CTA buttons, and
Playfair Display headings over Inter body text.

**Audience:** Buyers (GCC retailers) and Suppliers (Canadian brands). Both
audiences care about certification status, but for different reasons — GCC
retailers need it as a compliance/trust signal before stocking a product,
Canadian brands benefit because they don't need to navigate it themselves.
The page does not split content by audience (that pattern was just used on
the Sourcing & Logistics page); instead it presents one unified message, then
closes with the same dual-audience CTA used elsewhere.

**Content decision — locked statement wording (approved 2026-06-15):**
> "Every product we move is Halal Certified and exported under CFIA (Canadian
> Food Inspection Agency) certification — the foundation for trusted food
> trade across the GCC and MENA. Beyond these, we prepare and manage all
> additional certificates, permits, and regulatory documentation required by
> each destination market, handled shipment by shipment in coordination with
> our logistics and customs partners."

This wording is reproduced **verbatim** on the page (split across a headline
sentence + supporting sentence — see Section 2 below). It names only the two
confirmed certifications (Halal, CFIA Export). Other certificates (Certificate
of Origin, Health/Sanitary, Certificate of Conformity) are intentionally *not*
named individually, since their status is unconfirmed — they're covered by
the generic "additional certificates, permits, and regulatory documentation"
language.

**Content decision — statement-only, no logos/scans:** Per the locked Phase 1
decision, this page presents a written statement only. No certificate
logos, scans, or badges of authenticity are displayed. The two small pill
badges in Section 2 ("Halal Certified" / "CFIA Export Certified") are a
typographic accent that restates wording already present in the statement —
not a visual certificate/logo.

**Content decision — "Why Certifications Matter" stat:** Section 3 uses a
single supporting fact from `data/markets-and-certifications.md`: "Over 85%
of food products sold in UAE and Saudi Arabia require halal certification."
This was chosen over an audience-split layout (used on the immediately
preceding Sourcing & Logistics page) to keep this page feeling distinct and
avoid a formulaic repeat.

Out of scope: certificate logos/scans, market-by-market certification
breakdowns, an Arabic version, and analytics — consistent with prior page
specs.

## Page Structure (`app/certifications/page.tsx`)

Four sections, following the same navy → white → cream → navy rhythm as
the other real pages.

### Section 1 — Hero (navy background, white text)

- H1 (Playfair Display): **"Certifications"**
- Small red accent bar below the heading (same pattern as other heroes)
- Subhead (Inter, medium): **"Certified once. Trusted everywhere."**
- Lead paragraph: "Selling food products across borders means navigating a
  different set of certifications, permits, and import requirements for
  every market — Halal, CFIA export, customs documentation, and more. True
  Nord has it covered, market by market, so your products move smoothly from
  source to shelf."

### Section 2 — "Certified & Compliant" (white background)

- Section label (small, red, uppercase): "Compliance"
- H2: "Certified & Compliant"
- Headline statement (Playfair Display is reserved for `h1`-`h3`, so this is
  rendered as a large `<p>`, `text-xl md:text-2xl`, centered, `max-w-3xl`) —
  the first sentence of the locked statement, verbatim: "Every product we
  move is Halal Certified and exported under CFIA (Canadian Food Inspection
  Agency) certification — the foundation for trusted food trade across the
  GCC and MENA."
- Two pill badges, centered, wrapping on narrow screens
  (`rounded-full border border-navy/15 bg-cream px-4 py-1.5 text-sm
  font-semibold text-navy`): **"Halal Certified"** and **"CFIA Export
  Certified"**
- Supporting text (`text-sm text-navy/80`, centered, `max-w-3xl`) — the
  second sentence of the locked statement, verbatim: "Beyond these, we
  prepare and manage all additional certificates, permits, and regulatory
  documentation required by each destination market, handled shipment by
  shipment in coordination with our logistics and customs partners."

### Section 3 — "Why Certifications Matter" (cream background `#F7F5F2`)

- H2: "Why Certifications Matter" (centered)
- Large stat callout: **"85%"** — rendered as a `<p>` with `font-heading`
  (Playfair Display via the existing `--font-heading` CSS variable),
  `text-6xl md:text-7xl`, `text-red`, centered
- Stat caption (`text-sm text-navy/80`, `max-w-md`, centered): "of food
  products sold in the UAE and Saudi Arabia require halal certification"
- Body paragraph (`text-base text-navy/80`, `max-w-3xl`, centered):
  "Certification status is often the first filter applied — long before any
  other conversation happens — for Canadian brands evaluating the GCC, and
  for GCC retailers evaluating a new supply partner. True Nord's products
  meet these standards from day one, so neither side needs to navigate
  compliance market by market — it's already confirmed."

### Section 4 — Closing CTA (navy background, white text)

- H2: **"Ready to Move Forward?"** (distinct from "Ready to Get Started?" on
  Regions & Markets and "Ready to Start the Conversation?" on Sourcing &
  Logistics, to avoid repeating an identical heading across pages)
- Body paragraph (centered, `max-w-2xl`): "Certifications confirmed,
  compliance handled — the only thing left is the conversation. Tell us about
  your product or your shelves, and we'll show you how True Nord fits in."
- Two CTA buttons, side by side on `sm` and up, stacked on mobile (same
  pattern as Regions & Markets / Sourcing & Logistics):
  1. **"I'm a Canadian Brand"** → `/sell-in-gcc`
  2. **"I'm a GCC Retailer"** → `/source-for-me`
- Both buttons use the standard red CTA style (`inline-block rounded-md
  bg-red px-6 py-3 text-sm font-semibold text-white hover:bg-red-shade`).

## Full Page Code (`app/certifications/page.tsx`)

```tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Certifications | True Nord",
  description:
    "True Nord holds the certifications required for food import into GCC and MENA markets, including Halal and CFIA export certification.",
};

export default function CertificationsPage() {
  return (
    <>
      <section className="bg-navy px-6 py-24 text-center text-white">
        <h1 className="text-4xl md:text-5xl">Certifications</h1>
        <div className="mx-auto my-5 h-1 w-16 bg-red" aria-hidden="true" />
        <p className="mb-5 text-lg font-medium text-white/90">
          Certified once. Trusted everywhere.
        </p>
        <p className="mx-auto max-w-2xl text-base text-white/85">
          Selling food products across borders means navigating a different
          set of certifications, permits, and import requirements for every
          market — Halal, CFIA export, customs documentation, and more. True
          Nord has it covered, market by market, so your products move
          smoothly from source to shelf.
        </p>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-red">
            Compliance
          </p>
          <h2 className="mb-8 text-3xl">Certified &amp; Compliant</h2>
          <p className="mb-6 text-xl text-navy md:text-2xl">
            Every product we move is Halal Certified and exported under CFIA
            (Canadian Food Inspection Agency) certification — the foundation
            for trusted food trade across the GCC and MENA.
          </p>
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-full border border-navy/15 bg-cream px-4 py-1.5 text-sm font-semibold text-navy">
              Halal Certified
            </span>
            <span className="rounded-full border border-navy/15 bg-cream px-4 py-1.5 text-sm font-semibold text-navy">
              CFIA Export Certified
            </span>
          </div>
          <p className="text-sm text-navy/80">
            Beyond these, we prepare and manage all additional certificates,
            permits, and regulatory documentation required by each
            destination market, handled shipment by shipment in coordination
            with our logistics and customs partners.
          </p>
        </div>
      </section>

      <section className="bg-cream px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-8 text-3xl">Why Certifications Matter</h2>
          <p className="font-heading text-6xl text-red md:text-7xl">85%</p>
          <p className="mx-auto mb-8 mt-2 max-w-md text-sm text-navy/80">
            of food products sold in the UAE and Saudi Arabia require halal
            certification
          </p>
          <p className="text-base text-navy/80">
            Certification status is often the first filter applied — long
            before any other conversation happens — for Canadian brands
            evaluating the GCC, and for GCC retailers evaluating a new supply
            partner. True Nord&apos;s products meet these standards from day
            one, so neither side needs to navigate compliance market by
            market — it&apos;s already confirmed.
          </p>
        </div>
      </section>

      <section className="bg-navy px-6 py-20 text-center text-white">
        <h2 className="mb-5 text-3xl">Ready to Move Forward?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-base text-white/85">
          Certifications confirmed, compliance handled — the only thing left
          is the conversation. Tell us about your product or your shelves,
          and we&apos;ll show you how True Nord fits in.
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
`app/certifications/page.tsx` (which renders `<ComingSoon
title="Certifications" />`). The `Metadata` export is unchanged from the
current placeholder.

## Mobile-First & Responsiveness

- Hero lead paragraph, Section 2 statement/supporting text, and Section 3
  body text are single-column at all widths (text reflows naturally within
  their `max-w-*` containers).
- Section 2 pill badges use `flex flex-wrap` so they wrap onto multiple lines
  on narrow screens without overflowing.
- Section 3's "85%" stat uses `text-6xl md:text-7xl` — large at all sizes by
  design (it's the visual focal point of the section), but short enough
  (4 characters) not to cause overflow on mobile.
- Closing CTA buttons: stacked vertically on mobile, side by side at `sm`
  (640px) and up (`flex flex-col items-center justify-center gap-4
  sm:flex-row`), matching Regions & Markets and Sourcing & Logistics.

## Verification Plan

Since this is a static content/UI change with no data or forms involved,
verification is manual:

1. Run `npm run dev` and open `/certifications`.
2. Confirm all 4 sections render with the correct copy, background colors
   (navy / white / cream / navy), and fonts (Playfair Display headings,
   Inter body).
3. Confirm Section 2 shows the headline statement, both pill badges ("Halal
   Certified" and "CFIA Export Certified"), and the supporting text, and that
   the combined text matches the locked statement wording verbatim.
4. Confirm Section 3 shows the "85%" stat in red Playfair Display, its
   caption, and the body paragraph.
5. Confirm the closing CTA shows both buttons, with "I'm a Canadian Brand"
   linking to `/sell-in-gcc` and "I'm a GCC Retailer" linking to
   `/source-for-me`.
6. Confirm the browser tab title is "Certifications | True Nord".
7. Resize to mobile width — confirm the pill badges wrap cleanly, the closing
   CTA buttons stack vertically, and all text remains readable with no
   horizontal scrollbar.
