# Regions & Markets Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the "coming soon" placeholder at `/regions-markets` with the real Regions & Markets page (hero, "Markets We Serve", "Canadian Brands We Carry" with brand imagery, closing CTA with two audience-specific buttons).

**Architecture:** `app/regions-markets/page.tsx` is rewritten as a 4-section static page following the navy → white → cream → navy section rhythm already established on the Home and About pages, reusing the same Tailwind utility patterns (hero, section label, card grid, CTA button). The "Canadian Brands We Carry" cards are a new white "tile" card style that displays brand logos and product photos via `next/image`, using image files already committed to `public/brands/`.

**Tech Stack:** Next.js 16.2.7 (App Router), React 19, Tailwind CSS v4 (`@theme` tokens already defined in `app/globals.css`), `next/image` for local image assets.

**Spec:** `docs/superpowers/specs/2026-06-12-regions-markets-page-design.md`

**Verification approach:** This is a static content/UI change with no data or forms, so verification is manual (per the spec). The task ends with `npm run dev` + specific checks in the browser. The final task runs `npm run lint` and `npm run build` to confirm everything compiles cleanly for production.

---

### Task 1: Regions & Markets page content

**Files:**
- Modify: `app/regions-markets/page.tsx`

Image assets are already present at `public/brands/madegood-logo.png`, `public/brands/madegood-product.png`, `public/brands/ohme-logo.svg`, and `public/brands/ohme-product.png` (committed separately) — no need to source or add any images in this task.

- [ ] **Step 1: Replace `app/regions-markets/page.tsx`**

This fully replaces the current `ComingSoon` placeholder with the real 4-section Regions & Markets page: a navy hero, a white "Markets We Serve" section, a cream "Canadian Brands We Carry" section with brand imagery, and a navy closing CTA with two buttons.

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

- [ ] **Step 2: Verify the Regions & Markets page on desktop**

Run: `npm run dev` (if not already running)

Open `http://localhost:3000/regions-markets`. Check, top to bottom:
- **Hero**: navy background, white "Regions & Markets" heading in serif (Playfair Display), a short red bar beneath it, the subhead "Eight markets. One supply chain.", and the lead paragraph.
- **Markets We Serve**: white background, small red uppercase "Where We Operate" label, "Markets We Serve" heading, an intro paragraph, and a 2-column grid of 2 cards ("GCC" and "Broader MENA"), each with a red left border, a serif sub-heading, and body text listing the countries.
- **Canadian Brands We Carry**: cream (off-white) background, small red uppercase "What We Carry" label, "Canadian Brands We Carry" heading, an intro paragraph, and a 2-column grid of 2 white tile cards. Each card shows, top to bottom: a product photo (MadeGood Crunchy Squares box / OHME Freeze-Dried Strawberries bag), the brand's logo (MadeGood navy wordmark / OHME orange wordmark), and a description paragraph. Below the grid, a red "Explore Our Brands" button.
- Click "Explore Our Brands" → goes to `/brands` (Coming soon). Use the browser back button to return to `/regions-markets`.
- **Closing CTA**: navy background, "Ready to Get Started?" heading, a paragraph, and two red buttons side by side: "I'm a Canadian Brand" and "I'm a GCC Retailer".
- Click "I'm a Canadian Brand" → goes to `/sell-in-gcc` (Coming soon). Go back, then click "I'm a GCC Retailer" → goes to `/source-for-me` (Coming soon). Use the browser back button to return to `/regions-markets`.

- [ ] **Step 3: Verify the Regions & Markets page on mobile width**

Resize the browser to narrower than ~768px (or use dev tools device toolbar). Check:
- The header collapses to the "☰ Menu" toggle.
- The "Markets We Serve" and "Canadian Brands We Carry" grids each become a single column.
- Both brand cards still show their product photo, logo, and description, with the photo a consistent size.
- The closing CTA's two buttons stack vertically.
- All text remains readable with no horizontal scrollbar.

- [ ] **Step 4: Verify the browser tab title**

With `/regions-markets` open, confirm the browser tab title reads "Regions & Markets | True Nord".

- [ ] **Step 5: Commit**

```bash
git add app/regions-markets/page.tsx
git commit -m "feat: build real Regions & Markets page with brand showcase"
```

---

### Task 2: Production build and lint check

**Files:** none (verification only; fix any files flagged by lint/build errors)

- [ ] **Step 1: Run the linter**

Run: `npm run lint`

Expected: no errors. If errors are reported (e.g., unescaped characters in JSX text, unused imports), fix them in the relevant file and re-run until clean.

- [ ] **Step 2: Run a production build**

Run: `npm run build`

Expected: the build completes successfully and lists all 10 routes (`/`, `/about`, `/regions-markets`, `/sourcing-logistics`, `/certifications`, `/brands`, `/source-for-me`, `/sell-in-gcc`, `/privacy-policy`, `/contact`) with no errors. Pay attention to any warnings about the `next/image` usage (e.g., missing `sizes`, unconfigured remote patterns) — there should be none, since all images are local files under `public/brands/`. If errors are reported, fix them and re-run until the build succeeds.

- [ ] **Step 3: Commit any fixes (skip if nothing changed)**

```bash
git add -A
git commit -m "fix: resolve lint/build issues from Regions & Markets page work"
```
