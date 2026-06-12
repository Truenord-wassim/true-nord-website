# About Us Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the "coming soon" placeholder at `/about` with the real About Us page (hero, "Our Story", "Our Expertise" card grid, closing CTA), and correct the "15+ years" → "14+ years" figure on the Home page for consistency.

**Architecture:** `app/about/page.tsx` is rewritten as a 4-section static page following the navy → white → cream → navy section rhythm already established on the Home page (`app/page.tsx`), reusing the same Tailwind utility patterns (hero, section label, card grid, CTA button). `app/page.tsx`'s `valueProps` array gets a one-line text correction.

**Tech Stack:** Next.js 16.2.7 (App Router), React 19, Tailwind CSS v4 (`@theme` tokens already defined in `app/globals.css`).

**Spec:** `docs/superpowers/specs/2026-06-12-about-page-design.md`

**Verification approach:** This is a static content/UI change with no data or forms, so verification is manual (per the spec). Each task ends with `npm run dev` + a specific check in the browser. The final task runs `npm run lint` and `npm run build` to confirm everything compiles cleanly for production.

---

### Task 1: Home page "14+ years" consistency fix

**Files:**
- Modify: `app/page.tsx:14-18`

- [ ] **Step 1: Update the value-prop title**

In `app/page.tsx`, find the third entry of the `valueProps` array:

```tsx
  {
    title: "15+ Years of MENA Market Knowledge",
    description:
      "Deep buying experience across GCC retail — we know what sells, and how to get it there.",
  },
```

Change `title` to:

```tsx
  {
    title: "14+ Years of MENA Market Knowledge",
    description:
      "Deep buying experience across GCC retail — we know what sells, and how to get it there.",
  },
```

(Only the title text changes — the description stays the same.)

- [ ] **Step 2: Verify on the Home page**

Run: `npm run dev` (if not already running)

Open `http://localhost:3000`. In the "What True Nord Delivers" section, confirm the third card now reads "14+ Years of MENA Market Knowledge".

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "fix: correct Home page value prop to 14+ years of MENA market knowledge"
```

---

### Task 2: About Us page content

**Files:**
- Modify: `app/about/page.tsx`

- [ ] **Step 1: Replace `app/about/page.tsx`**

This fully replaces the current `ComingSoon` placeholder with the real 4-section About Us page: a navy hero, a white "Our Story" section, a cream "Our Expertise" card grid, and a navy closing CTA.

```tsx
import type { Metadata } from "next";
import Link from "next/link";

const expertiseCards = [
  {
    title: "14+ Years Inside GCC Grocery Retail",
    description:
      "Senior buying and category management experience across the UAE, Saudi Arabia, Kuwait, and Egypt — working directly with the retailers and distributors who decide which products make it onto Gulf shelves, and what it takes for a new brand to succeed there.",
  },
  {
    title: "Grocery E-Commerce & Quick-Commerce at Scale",
    description:
      "Hands-on experience building and scaling online grocery and quick-commerce operations — the fastest-growing channel in GCC retail — including launching distribution and fulfillment infrastructure across multiple markets.",
  },
  {
    title: "Certified Supply Chain & Project Management Expertise",
    description:
      "Professional certifications in supply chain management (APICS CSCP) and project management (PMP) — the same disciplines applied to sourcing, consolidation, customs documentation, and logistics for every True Nord shipment.",
  },
  {
    title: "Built for Both Sides of the Trade",
    description:
      "Experience sitting on both sides of the table — sourcing and buying for GCC retailers, and helping suppliers understand what it takes to get listed — is why True Nord can speak credibly to Canadian brands and GCC retailers alike.",
  },
];

export const metadata: Metadata = {
  title: "About Us | True Nord",
  description:
    "True Nord is a Canadian grocery trading company founded by a team with 14+ years of MENA retail and e-commerce experience, connecting Canadian brands with GCC and MENA retailers.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy px-6 py-24 text-center text-white">
        <h1 className="text-4xl md:text-5xl">About True Nord</h1>
        <div className="mx-auto my-5 h-1 w-16 bg-red" aria-hidden="true" />
        <p className="mb-5 text-lg font-medium text-white/90">
          Two markets. One partner.
        </p>
        <p className="mx-auto max-w-2xl text-base text-white/85">
          True Nord connects Canadian grocery brands with retailers across the
          GCC and MENA — not as a broker standing between two markets, but as
          an extension of each side&apos;s own business. To Canadian
          suppliers, we&apos;re simply another customer placing a standard
          order. To GCC retailers, we&apos;re your Canadian sourcing team,
          already on the ground and ready to go.
        </p>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <p className="mb-2 text-center text-sm font-semibold uppercase tracking-wide text-red">
            How We Started
          </p>
          <h2 className="mb-8 text-center text-3xl">Our Story</h2>
          <div className="space-y-4 text-base text-navy/80">
            <p>
              True Nord was founded by a team with deep roots in MENA grocery
              retail and e-commerce — people who have spent their careers
              inside the buying offices, distribution centers, and category
              teams that decide what ends up on Gulf grocery shelves.
            </p>
            <p>
              From that vantage point, we kept seeing the same gap, from both
              directions. Canadian brands wanted to reach Gulf consumers, but
              exporting internationally meant new customs paperwork, freight
              logistics, and minimum order quantities that didn&apos;t fit a
              first-time market — friction that made an otherwise great
              product too risky to pursue. At the same time, GCC retailers
              wanted access to quality Canadian products, but had no North
              American business entity, no existing supplier relationships,
              and no easy way to consolidate small orders into something that
              cleared a container.
            </p>
            <p>
              True Nord exists to close that gap on both sides at once. For
              Canadian suppliers, we become a normal domestic customer — you
              fulfill a standard wholesale order, and we handle sourcing,
              consolidation, documentation, and freight from there. For GCC
              retailers, we become your Canadian sourcing arm — curating
              brands, meeting minimum order quantities by combining orders
              across markets, and managing the import process end to end.
              It&apos;s the idea behind our tagline: True Direction. Zero
              Complexity.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 text-center text-sm font-semibold uppercase tracking-wide text-red">
            Track Record
          </p>
          <h2 className="mb-6 text-center text-3xl">Our Expertise</h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-base text-navy/80">
            True Nord&apos;s founding team has spent over 14 years working
            inside GCC grocery retail and e-commerce — not as outside
            consultants, but in the buying, supply chain, and operations roles
            that run it day to day. That hands-on experience shapes how we
            operate.
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            {expertiseCards.map((item) => (
              <div key={item.title} className="border-l-4 border-red pl-5">
                <h3 className="mb-2 text-xl">{item.title}</h3>
                <p className="text-sm text-navy/80">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy px-6 py-20 text-center text-white">
        <h2 className="mb-5 text-3xl">Want to Work With True Nord?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-base text-white/85">
          Whether you&apos;re a Canadian brand looking to reach GCC shelves, or
          a GCC retailer looking to source Canadian products, we&apos;d love to
          hear from you. Get in touch and tell us what you&apos;re working on —
          we&apos;ll let you know how True Nord fits in.
        </p>
        <Link
          href="/contact"
          className="inline-block rounded-md bg-red px-6 py-3 text-sm font-semibold text-white hover:bg-red-shade"
        >
          Contact Us
        </Link>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify the About page on desktop**

Run: `npm run dev` (if not already running)

Open `http://localhost:3000/about`. Check, top to bottom:
- **Hero**: navy background, white "About True Nord" heading in serif (Playfair Display), a short red bar beneath it, the subhead "Two markets. One partner.", and the lead paragraph.
- **Our Story**: white background, small red uppercase "How We Started" label, "Our Story" heading, and three paragraphs of body text.
- **Our Expertise**: cream (off-white) background, small red uppercase "Track Record" label, "Our Expertise" heading, an intro paragraph, and a 2x2 grid of 4 cards, each with a red left border, a serif sub-heading, and body text.
- **Closing CTA**: navy background, "Want to Work With True Nord?" heading, a paragraph, and a red "Contact Us" button.
- Click "Contact Us" → goes to `/contact` (Coming soon). Use the browser back button to return to `/about`.

- [ ] **Step 3: Verify the About page on mobile width**

Resize the browser to narrower than ~768px (or use dev tools device toolbar). Check:
- The header collapses to the "☰ Menu" toggle.
- The "Our Expertise" 4-card grid becomes a single column.
- All text remains readable with no horizontal scrollbar.

- [ ] **Step 4: Verify the browser tab title**

With `/about` open, confirm the browser tab title reads "About Us | True Nord".

- [ ] **Step 5: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: build real About Us page with story and expertise sections"
```

---

### Task 3: Production build and lint check

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
git commit -m "fix: resolve lint/build issues from About Us page work"
```
