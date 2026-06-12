# Sourcing & Logistics Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the "coming soon" placeholder at `/sourcing-logistics` with the real Sourcing & Logistics page (hero, "From Source to Shelf" 4-step process grid, "What This Means for You" audience cards, closing CTA with two audience-specific buttons).

**Architecture:** `app/sourcing-logistics/page.tsx` is rewritten as a 4-section static page following the navy → white → cream → navy section rhythm already established on the Home, About, and Regions & Markets pages, reusing the same Tailwind utility patterns (hero, section label, card grid, CTA button). The "From Source to Shelf" cards add a small navy circular number badge above each card's heading to convey the step sequence.

**Tech Stack:** Next.js 16.2.7 (App Router), React 19, Tailwind CSS v4 (`@theme` tokens already defined in `app/globals.css`).

**Spec:** `docs/superpowers/specs/2026-06-12-sourcing-logistics-page-design.md`

**Verification approach:** This is a static content/UI change with no data or forms, so verification is manual (per the spec). The task ends with `npm run dev` + specific checks in the browser. The final task runs `npm run lint` and `npm run build` to confirm everything compiles cleanly for production.

---

### Task 1: Sourcing & Logistics page content

**Files:**
- Modify: `app/sourcing-logistics/page.tsx`

- [ ] **Step 1: Replace `app/sourcing-logistics/page.tsx`**

This fully replaces the current `ComingSoon` placeholder with the real 4-section Sourcing & Logistics page: a navy hero, a white "From Source to Shelf" section with a 4-step process grid, a cream "What This Means for You" section with audience cards, and a navy closing CTA with two buttons. The `Metadata` export is unchanged from the current placeholder.

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

- [ ] **Step 2: Verify the Sourcing & Logistics page on desktop**

Run: `npm run dev` (if not already running)

Open `http://localhost:3000/sourcing-logistics`. Check, top to bottom:
- **Hero**: navy background, white "Sourcing & Logistics" heading in serif (Playfair Display), a short red bar beneath it, the subhead "One process. Zero complexity.", and the lead paragraph.
- **From Source to Shelf**: white background, small red uppercase "How It Works" label, "From Source to Shelf" heading, an intro paragraph, and a 2-column grid of 4 cards (Source, Prepare, Export, Launch), each with a small navy circular number badge (1-4), a red left border, a serif sub-heading, and body text.
- **What This Means for You**: cream (off-white) background, "What This Means for You" heading, and a 2-column grid of 2 cards ("For Canadian Brands" and "For GCC Retailers"), each with a red left border, a serif sub-heading, and body text.
- **Closing CTA**: navy background, "Ready to Start the Conversation?" heading, a paragraph, and two red buttons side by side: "I'm a Canadian Brand" and "I'm a GCC Retailer".
- Click "I'm a Canadian Brand" → goes to `/sell-in-gcc` (Coming soon). Use the browser back button to return to `/sourcing-logistics`, then click "I'm a GCC Retailer" → goes to `/source-for-me` (Coming soon). Use the browser back button to return to `/sourcing-logistics`.

- [ ] **Step 3: Verify the Sourcing & Logistics page on mobile width**

Resize the browser to narrower than ~768px (or use dev tools device toolbar). Check:
- The header collapses to the "☰ Menu" toggle.
- The "From Source to Shelf" grid becomes a single column of 4 stacked cards (Source, Prepare, Export, Launch in order), each still showing its number badge.
- The "What This Means for You" grid becomes a single column of 2 stacked cards.
- The closing CTA's two buttons stack vertically.
- All text remains readable with no horizontal scrollbar.

- [ ] **Step 4: Verify the browser tab title**

With `/sourcing-logistics` open, confirm the browser tab title reads "Sourcing & Logistics | True Nord".

- [ ] **Step 5: Commit**

```bash
git add app/sourcing-logistics/page.tsx
git commit -m "feat: build real Sourcing & Logistics page with 4-step process"
```

---

### Task 2: Production build and lint check

**Files:** none (verification only; fix any files flagged by lint/build errors)

- [ ] **Step 1: Run the linter**

Run: `npm run lint`

Expected: no errors. If errors are reported (e.g., unescaped characters in JSX text, unused imports), fix them in the relevant file and re-run until clean.

- [ ] **Step 2: Run a production build**

Run: `npm run build`

Expected: the build completes successfully and lists all 10 routes (`/`, `/about`, `/regions-markets`, `/sourcing-logistics`, `/certifications`, `/brands`, `/source-for-me`, `/sell-in-gcc`, `/privacy-policy`, `/contact`) with no errors. If errors are reported, fix them and re-run until the build succeeds.

- [ ] **Step 3: Commit any fixes (skip if nothing changed)**

```bash
git add -A
git commit -m "fix: resolve lint/build issues from Sourcing & Logistics page work"
```
