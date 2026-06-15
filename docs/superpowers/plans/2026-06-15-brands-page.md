# Brands Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the "coming soon" placeholder at `/brands` with the real Current Brands page (hero, a full MadeGood profile section, a full OHME profile section, and a closing CTA with two audience-specific buttons).

**Architecture:** `app/brands/page.tsx` is rewritten as a 4-section static page following the navy → white → cream → navy section rhythm already established on the Home, About, Regions & Markets, Sourcing & Logistics, and Certifications pages, reusing the same Tailwind utility patterns (hero, section label, pill badges, CTA button). Each brand profile section introduces one new layout pattern (not used on prior pages): a responsive 12-column grid where a product photo + logo sit in a 5-column left block and all text content sits in a 7-column right block, stacking vertically on mobile. Both brand sections use `next/image` for the existing assets in `public/brands/`.

**Tech Stack:** Next.js 16.2.7 (App Router), React 19, Tailwind CSS v4 (`@theme` tokens already defined in `app/globals.css`).

**Spec:** `docs/superpowers/specs/2026-06-15-brands-page-design.md`

**Verification approach:** This is a static content/UI change with no data or forms, so verification is manual (per the spec). The task ends with `npm run dev` + specific checks in the browser, including following the two outbound brand links. The final task runs `npm run lint` and `npm run build` to confirm everything compiles cleanly for production.

---

### Task 1: Brands page content

**Files:**
- Modify: `app/brands/page.tsx`

- [ ] **Step 1: Replace `app/brands/page.tsx`**

This fully replaces the current `ComingSoon` placeholder with the real 4-section Current Brands page: a navy hero, a white MadeGood profile section, a cream OHME profile section, and a navy closing CTA with two buttons. The `Metadata` export is unchanged from the current placeholder.

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

- [ ] **Step 2: Verify the Brands page on desktop**

Run: `npm run dev` (if not already running)

Open `http://localhost:3000/brands`. Check, top to bottom:
- **Hero**: navy background, white "Current Brands" heading in serif (Playfair Display), a short red bar beneath it, the subhead "Two brands. One growing catalog.", and the lead paragraph.
- **MadeGood section**: white background, small red uppercase label "Granola, Bars & Snacks", a product photo and the MadeGood logo on the left, and on the right: "MadeGood" heading, an italic tagline starting with "Crafted and packed by proud Canadians", six pill-shaped badges (Certified Organic, Non-GMO, Gluten-Free, Nut-Free, Vegan, Kosher), a "Product line:" paragraph, a GCC-fit paragraph, and a red "Visit madegoodfoods.com ↗" link.
- **OHME section**: cream (off-white) background, small red uppercase label "Freeze-Dried Fruit Snacks", a product photo and the OHME logo on the left, and on the right: "OHME" heading, an italic tagline starting with "Real fruit. Big crunch.", two pill-shaped badges (Non-GMO, Vegan) with a white background (visible against the cream section), a "Product line:" paragraph, a GCC-fit paragraph, and a red "Visit ohmefoods.com ↗" link.
- **Closing CTA**: navy background, "Ready to Add to the Lineup?" heading, a paragraph, and two red buttons side by side: "I'm a Canadian Brand" and "I'm a GCC Retailer".
- Click "Visit madegoodfoods.com ↗" → confirm it opens `https://www.madegoodfoods.com` in a new browser tab, then close that tab. Click "Visit ohmefoods.com ↗" → confirm it opens `https://www.ohmefoods.com` in a new browser tab, then close that tab.
- Click "I'm a Canadian Brand" → goes to `/sell-in-gcc` (Coming soon). Use the browser back button to return to `/brands`, then click "I'm a GCC Retailer" → goes to `/source-for-me` (Coming soon). Use the browser back button to return to `/brands`.

- [ ] **Step 3: Verify the Brands page on mobile width**

Resize the browser to narrower than ~768px (or use dev tools device toolbar). Check:
- The header collapses to the "☰ Menu" toggle.
- In both the MadeGood and OHME sections, the product photo and logo stack above the text content (not side by side).
- The certification pills wrap onto their own line(s) without overflowing the screen or causing a horizontal scrollbar.
- The closing CTA's two buttons stack vertically.
- All text remains readable with no horizontal scrollbar.

- [ ] **Step 4: Verify the browser tab title**

With `/brands` open, confirm the browser tab title reads "Current Brands | True Nord".

- [ ] **Step 5: Commit**

```bash
git add app/brands/page.tsx
git commit -m "feat: build real Brands page with MadeGood and OHME profiles"
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
git commit -m "fix: resolve lint/build issues from Brands page work"
```
