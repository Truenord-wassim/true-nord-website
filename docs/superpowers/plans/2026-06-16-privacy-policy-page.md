# Privacy Policy Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `/privacy-policy` "coming soon" placeholder with a real static page presenting True Nord's privacy policy in the site's navy-hero + white-content layout.

**Architecture:** Single Server Component — `app/privacy-policy/page.tsx` — with a navy hero and one white content section containing all 11 policy sections as plain JSX. No client code, no new components, no new dependencies.

**Tech Stack:** Next.js 16.2.7 (App Router, Server Component), Tailwind CSS v4 (`@theme` tokens in `app/globals.css`).

**Spec:** `docs/superpowers/specs/2026-06-16-privacy-policy-page-design.md`

---

### Task 1: Build the Privacy Policy page

**Files:**
- Modify: `app/privacy-policy/page.tsx`

- [ ] **Step 1: Replace `app/privacy-policy/page.tsx`**

The existing file is a two-line ComingSoon placeholder. Replace the entire file with:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | True Nord",
  description:
    "How True Nord collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-6 py-24 text-center text-white">
        <h1 className="text-4xl md:text-5xl">Privacy Policy</h1>
        <div className="mx-auto my-5 h-1 w-16 bg-red" aria-hidden="true" />
        <p className="text-lg font-medium text-white/90">
          How True Nord collects, uses, and protects your personal information.
        </p>
        <p className="mt-3 text-sm text-white/60">Last updated: June 2026</p>
      </section>

      {/* Content */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">

          {/* §1 */}
          <h2 className="mt-10 mb-3 font-serif text-xl font-semibold text-navy">
            1. Who We Are
          </h2>
          <p className="mb-4 leading-relaxed text-navy/80">
            True Nord is a Canadian food trading company that sources Canadian
            grocery products and distributes them to retail partners across the
            GCC and MENA region. We operate at www.true-nord.ca.
          </p>
          <p className="mb-4 leading-relaxed text-navy/80">
            For any questions about this policy, contact us at:{" "}
            <a
              href="mailto:info@true-nord.ca"
              className="font-medium text-red underline hover:text-red-shade"
            >
              info@true-nord.ca
            </a>
          </p>
          <hr className="my-8 border-navy/10" />

          {/* §2 */}
          <h2 className="mt-10 mb-3 font-serif text-xl font-semibold text-navy">
            2. What Information We Collect
          </h2>
          <p className="mb-4 leading-relaxed text-navy/80">
            When you use our website, we may collect the following personal
            information — but only when you choose to provide it through one of
            our contact forms:
          </p>
          <ul className="mb-4 list-disc space-y-1 pl-6 text-navy/80">
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number (if provided)</li>
            <li>Company name and country</li>
            <li>The message or request you submit</li>
          </ul>
          <p className="mb-4 leading-relaxed text-navy/80">
            We do not collect payment information, and we do not require you to
            create an account to use this website.
          </p>
          <p className="mb-4 leading-relaxed text-navy/80">
            We also automatically collect basic technical data when you visit
            our site, including:
          </p>
          <ul className="mb-4 list-disc space-y-1 pl-6 text-navy/80">
            <li>Your IP address (anonymized)</li>
            <li>Browser type and device type</li>
            <li>Pages visited and time spent on the site (via analytics)</li>
          </ul>
          <hr className="my-8 border-navy/10" />

          {/* §3 */}
          <h2 className="mt-10 mb-3 font-serif text-xl font-semibold text-navy">
            3. Why We Collect It
          </h2>
          <p className="mb-4 leading-relaxed text-navy/80">
            We use your information only for the following purposes:
          </p>
          <div className="mb-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm text-navy/80">
              <thead>
                <tr>
                  <th className="border border-navy/20 bg-navy/5 px-4 py-2 text-left font-semibold text-navy">
                    Purpose
                  </th>
                  <th className="border border-navy/20 bg-navy/5 px-4 py-2 text-left font-semibold text-navy">
                    Basis
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-navy/20 px-4 py-2">
                    To respond to your inquiry or sourcing request
                  </td>
                  <td className="border border-navy/20 px-4 py-2">
                    Your consent (submitting the form)
                  </td>
                </tr>
                <tr>
                  <td className="border border-navy/20 px-4 py-2">
                    To follow up on a business partnership inquiry
                  </td>
                  <td className="border border-navy/20 px-4 py-2">
                    Your consent
                  </td>
                </tr>
                <tr>
                  <td className="border border-navy/20 px-4 py-2">
                    To improve our website using anonymized analytics
                  </td>
                  <td className="border border-navy/20 px-4 py-2">
                    Legitimate business interest
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mb-4 leading-relaxed text-navy/80">
            We do not use your information for advertising, we do not sell it
            to third parties, and we do not add you to a mailing list without
            your explicit consent.
          </p>
          <hr className="my-8 border-navy/10" />

          {/* §4 */}
          <h2 className="mt-10 mb-3 font-serif text-xl font-semibold text-navy">
            4. How Long We Keep Your Data
          </h2>
          <p className="mb-4 leading-relaxed text-navy/80">
            We keep inquiry data for up to{" "}
            <strong>2 years</strong> from the date of submission, or until the
            business relationship concludes, whichever is longer. After that,
            we delete it.
          </p>
          <hr className="my-8 border-navy/10" />

          {/* §5 */}
          <h2 className="mt-10 mb-3 font-serif text-xl font-semibold text-navy">
            5. Who We Share It With
          </h2>
          <p className="mb-4 leading-relaxed text-navy/80">
            We do not sell or rent your personal information. We may share it
            only with:
          </p>
          <ul className="mb-4 list-disc space-y-1 pl-6 text-navy/80">
            <li>
              <strong>Our internal team</strong> — to process and respond to
              your inquiry
            </li>
            <li>
              <strong>Email delivery service</strong> — to send you an
              acknowledgment email when you submit a form (e.g. Resend). These
              services act as processors and do not use your data for their own
              purposes.
            </li>
          </ul>
          <hr className="my-8 border-navy/10" />

          {/* §6 */}
          <h2 className="mt-10 mb-3 font-serif text-xl font-semibold text-navy">
            6. Your Rights
          </h2>
          <p className="mb-4 leading-relaxed text-navy/80">
            Depending on your country, you may have the right to:
          </p>
          <ul className="mb-4 list-disc space-y-1 pl-6 text-navy/80">
            <li>
              <strong>Access</strong> the personal information we hold about
              you
            </li>
            <li>
              <strong>Correct</strong> any information that is inaccurate
            </li>
            <li>
              <strong>Request deletion</strong> of your information
            </li>
            <li>
              <strong>Withdraw consent</strong> at any time
            </li>
          </ul>
          <p className="mb-4 leading-relaxed text-navy/80">
            To exercise any of these rights, email us at:{" "}
            <a
              href="mailto:info@true-nord.ca"
              className="font-medium text-red underline hover:text-red-shade"
            >
              info@true-nord.ca
            </a>
          </p>
          <p className="mb-4 leading-relaxed text-navy/80">
            We will respond within 30 days.
          </p>
          <hr className="my-8 border-navy/10" />

          {/* §7 */}
          <h2 className="mt-10 mb-3 font-serif text-xl font-semibold text-navy">
            7. Cookies
          </h2>
          <p className="mb-4 leading-relaxed text-navy/80">
            Our website may use cookies for basic analytics (e.g. Google
            Analytics or Plausible). These are used to understand how visitors
            use our site — no personal profiles are built.
          </p>
          <p className="mb-4 leading-relaxed text-navy/80">
            You can disable cookies in your browser settings at any time.
          </p>
          <hr className="my-8 border-navy/10" />

          {/* §8 */}
          <h2 className="mt-10 mb-3 font-serif text-xl font-semibold text-navy">
            8. International Transfers
          </h2>
          <p className="mb-4 leading-relaxed text-navy/80">
            True Nord is based in Canada. If you contact us from the GCC,
            Jordan, Egypt, or elsewhere, your information will be stored on
            servers located in Canada or within trusted cloud infrastructure
            (e.g. Vercel) that meets international data protection standards.
          </p>
          <hr className="my-8 border-navy/10" />

          {/* §9 */}
          <h2 className="mt-10 mb-3 font-serif text-xl font-semibold text-navy">
            9. Security
          </h2>
          <p className="mb-4 leading-relaxed text-navy/80">
            We take reasonable precautions to protect your data, including
            encrypted connections (HTTPS) and access controls on our systems.
            No system is 100% secure, and we encourage you not to share
            sensitive financial or trade information through a website contact
            form.
          </p>
          <hr className="my-8 border-navy/10" />

          {/* §10 */}
          <h2 className="mt-10 mb-3 font-serif text-xl font-semibold text-navy">
            10. Changes to This Policy
          </h2>
          <p className="mb-4 leading-relaxed text-navy/80">
            If we update this policy, we will post the revised version on this
            page with an updated date. We encourage you to review it
            periodically.
          </p>
          <hr className="my-8 border-navy/10" />

          {/* §11 */}
          <h2 className="mt-10 mb-3 font-serif text-xl font-semibold text-navy">
            11. Contact
          </h2>
          <p className="mb-4 leading-relaxed text-navy/80">
            For any privacy-related questions:
          </p>
          <p className="mb-1 leading-relaxed text-navy/80">
            <strong>True Nord Inc.</strong>
          </p>
          <p className="mb-1 leading-relaxed text-navy/80">
            Email:{" "}
            <a
              href="mailto:info@true-nord.ca"
              className="font-medium text-red underline hover:text-red-shade"
            >
              info@true-nord.ca
            </a>
          </p>
          <p className="mb-4 leading-relaxed text-navy/80">
            Website: www.true-nord.ca
          </p>

        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Verify on desktop**

Run: `npm run dev` (if not already running)

Open `http://localhost:3000/privacy-policy`. Verify:

- **Hero**: navy background, white "Privacy Policy" heading (Playfair Display serif), red bar, subhead, "Last updated: June 2026" in small dimmed text below.
- **Content section**: white background, all 11 sections visible with numbered `<h2>` headings, `<hr>` dividers between sections.
- **§3 table**: two-column table with "Purpose" and "Basis" headers, three data rows, light borders.
- **Email links**: `info@true-nord.ca` appears in red underline in §1, §6, and §11. Click one to confirm it opens a mailto: link.
- **§11 Contact**: shows "True Nord Inc." (not "True Nord International Inc."), email link, and website.
- **Browser tab title**: "Privacy Policy | True Nord".

- [ ] **Step 4: Verify on mobile width**

Resize to narrower than ~768px. Check:

- Text is readable, no horizontal overflow.
- The §3 table scrolls horizontally if needed (it's inside `overflow-x-auto`) rather than breaking the layout.
- All section headings, paragraphs, and lists stack naturally.

- [ ] **Step 5: Commit**

```bash
git add app/privacy-policy/page.tsx
git commit -m "feat: build real Privacy Policy page with full policy content"
```

---

### Task 2: Production build and lint check

**Files:** none (verification only)

- [ ] **Step 1: Run the linter**

```bash
npm run lint
```

Expected: no errors. Fix any that appear and re-run.

- [ ] **Step 2: Run a production build**

```bash
npm run build
```

Expected: build completes successfully, all 10 routes listed, no errors. `/privacy-policy` should appear as a static route (`○`).

- [ ] **Step 3: Commit any fixes (skip if nothing changed)**

```bash
git add -A
git commit -m "fix: resolve lint/build issues from Privacy Policy page work"
```
