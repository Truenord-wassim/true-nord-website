# Certifications Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the "coming soon" placeholder at `/certifications` with the real Certifications page (hero, "Certified & Compliant" statement section with pill badges, "Why Certifications Matter" 85% stat section, closing CTA with two audience-specific buttons).

**Architecture:** `app/certifications/page.tsx` is rewritten as a 4-section static page following the navy → white → cream → navy section rhythm already established on the Home, About, Regions & Markets, and Sourcing & Logistics pages, reusing the same Tailwind utility patterns (hero, section label, CTA button). Two new-but-simple visual elements are introduced inline (no new shared components): rounded pill badges for "Halal Certified" / "CFIA Export Certified", and a large stat callout ("85%") using the existing `font-heading` (Playfair Display) utility.

**Tech Stack:** Next.js 16.2.7 (App Router), React 19, Tailwind CSS v4 (`@theme` tokens already defined in `app/globals.css`).

**Spec:** `docs/superpowers/specs/2026-06-15-certifications-page-design.md`

**Verification approach:** This is a static content/UI change with no data or forms, so verification is manual (per the spec). The task ends with `npm run dev` + specific checks in the browser. The final task runs `npm run lint` and `npm run build` to confirm everything compiles cleanly for production.

---

### Task 1: Certifications page content

**Files:**
- Modify: `app/certifications/page.tsx`

- [ ] **Step 1: Replace `app/certifications/page.tsx`**

This fully replaces the current `ComingSoon` placeholder with the real 4-section Certifications page: a navy hero, a white "Certified & Compliant" section with the locked statement and two pill badges, a cream "Why Certifications Matter" section with an "85%" stat callout, and a navy closing CTA with two buttons. The `Metadata` export is unchanged from the current placeholder.

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

- [ ] **Step 2: Verify the Certifications page on desktop**

Run: `npm run dev` (if not already running)

Open `http://localhost:3000/certifications`. Check, top to bottom:
- **Hero**: navy background, white "Certifications" heading in serif (Playfair Display), a short red bar beneath it, the subhead "Certified once. Trusted everywhere.", and the lead paragraph.
- **Certified & Compliant**: white background, small red uppercase "Compliance" label, "Certified & Compliant" heading, a large centered statement ending in "...the foundation for trusted food trade across the GCC and MENA.", two pill-shaped badges side by side reading "Halal Certified" and "CFIA Export Certified", and a smaller paragraph below starting "Beyond these, we prepare and manage...".
- **Why Certifications Matter**: cream (off-white) background, "Why Certifications Matter" heading, a large red "85%" in serif directly below it, a caption "of food products sold in the UAE and Saudi Arabia require halal certification", and a body paragraph below that.
- **Closing CTA**: navy background, "Ready to Move Forward?" heading, a paragraph, and two red buttons side by side: "I'm a Canadian Brand" and "I'm a GCC Retailer".
- Click "I'm a Canadian Brand" → goes to `/sell-in-gcc` (Coming soon). Use the browser back button to return to `/certifications`, then click "I'm a GCC Retailer" → goes to `/source-for-me` (Coming soon). Use the browser back button to return to `/certifications`.

- [ ] **Step 3: Verify the Certifications page on mobile width**

Resize the browser to narrower than ~768px (or use dev tools device toolbar). Check:
- The header collapses to the "☰ Menu" toggle.
- The "Certified & Compliant" section's two pill badges wrap onto their own line(s) without overflowing the screen or causing a horizontal scrollbar.
- The "85%" stat remains centered and fully visible (not clipped).
- The closing CTA's two buttons stack vertically.
- All text remains readable with no horizontal scrollbar.

- [ ] **Step 4: Verify the browser tab title**

With `/certifications` open, confirm the browser tab title reads "Certifications | True Nord".

- [ ] **Step 5: Commit**

```bash
git add app/certifications/page.tsx
git commit -m "feat: build real Certifications page with compliance statement and stat"
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
git commit -m "fix: resolve lint/build issues from Certifications page work"
```
