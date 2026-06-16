# Privacy Policy Page — Design Spec

**Page:** `/privacy-policy` (Phase 1, page #9 of 10)
**Audience:** Anyone who submits a form on the site (linked from the consent checkbox on Source for Me and Sell in the GCC) or who wants to understand how True Nord handles personal data.

---

## 1. Relationship to the Rest of the Site

`/privacy-policy` is a purely informational page. It is:

- Linked from the consent checkbox on `/source-for-me` and `/sell-in-gcc`
- Linked from the Footer (standard legal link)
- Not linked from the main Header nav

No closing CTA section — this is a legal/compliance page, not a conversion page.

---

## 2. Page Structure

Two sections:

### Section 1: Hero (navy)

Same visual pattern as every other page.

- **H1:** "Privacy Policy"
- Red accent bar (`h-1 w-16 bg-red`, `aria-hidden="true"`)
- **Subhead:** "How True Nord collects, uses, and protects your personal information."
- **"Last updated" line:** "Last updated: June 2026" — shown below the subhead, smaller text (`text-sm text-white/60`)

### Section 2: Content (white)

A single centered container (`max-w-3xl mx-auto px-6 py-16`) with all 11 policy sections flowing top to bottom. No sidebar, no table of contents.

---

## 3. Architecture

Single file. No new dependencies.

| File | Type | Change |
|------|------|--------|
| `app/privacy-policy/page.tsx` | Server Component | Replace ComingSoon placeholder with full page |

No new components, no client components, no Server Actions. Static content only.

---

## 4. Typography & Content Styling

All content lives directly in JSX within `page.tsx`.

| Element | Tag | Tailwind classes |
|---------|-----|-----------------|
| Section heading (§1–§11) | `<h2>` | `mt-10 mb-3 font-serif text-xl font-semibold text-navy` |
| Body paragraph | `<p>` | `mb-4 text-navy/80 leading-relaxed` |
| Unordered list | `<ul>` | `mb-4 list-disc pl-6 space-y-1 text-navy/80` |
| Table (§3 only) | `<table>` | `mb-4 w-full border-collapse text-sm text-navy/80` |
| Table header cell | `<th>` | `border border-navy/20 bg-navy/5 px-4 py-2 text-left font-semibold text-navy` |
| Table body cell | `<td>` | `border border-navy/20 px-4 py-2` |
| Email link | `<a href="mailto:...">` | `font-medium text-red underline hover:text-red-shade` |
| Strong / bold | `<strong>` | inherits, browser default bold |
| Horizontal rule between sections | `<hr>` | `my-8 border-navy/10` |

---

## 5. Full Content

Legal name: **True Nord Inc.**
Privacy/contact email: **info@true-nord.ca**
Website: **www.true-nord.ca**
Last updated: **June 2026**

### §1. Who We Are

True Nord is a Canadian food trading company that sources Canadian grocery products and distributes them to retail partners across the GCC and MENA region. We operate at www.true-nord.ca.

For any questions about this policy, contact us at: info@true-nord.ca

### §2. What Information We Collect

When you use our website, we may collect the following personal information — but only when you choose to provide it through one of our contact forms:

- Full name
- Email address
- Phone number (if provided)
- Company name and country
- The message or request you submit

We do not collect payment information, and we do not require you to create an account to use this website.

We also automatically collect basic technical data when you visit our site, including:

- Your IP address (anonymized)
- Browser type and device type
- Pages visited and time spent on the site (via analytics)

### §3. Why We Collect It

We use your information only for the following purposes:

| Purpose | Basis |
|---------|-------|
| To respond to your inquiry or sourcing request | Your consent (submitting the form) |
| To follow up on a business partnership inquiry | Your consent |
| To improve our website using anonymized analytics | Legitimate business interest |

We do not use your information for advertising, we do not sell it to third parties, and we do not add you to a mailing list without your explicit consent.

### §4. How Long We Keep Your Data

We keep inquiry data for up to 2 years from the date of submission, or until the business relationship concludes, whichever is longer. After that, we delete it.

### §5. Who We Share It With

We do not sell or rent your personal information. We may share it only with:

- **Our internal team** — to process and respond to your inquiry
- **Email delivery service** — to send you an acknowledgment email when you submit a form (e.g. Resend). These services act as processors and do not use your data for their own purposes.

### §6. Your Rights

Depending on your country, you may have the right to:

- **Access** the personal information we hold about you
- **Correct** any information that is inaccurate
- **Request deletion** of your information
- **Withdraw consent** at any time

To exercise any of these rights, email us at: info@true-nord.ca

We will respond within 30 days.

### §7. Cookies

Our website may use cookies for basic analytics (e.g. Google Analytics or Plausible). These are used to understand how visitors use our site — no personal profiles are built.

You can disable cookies in your browser settings at any time.

### §8. International Transfers

True Nord is based in Canada. If you contact us from the GCC, Jordan, Egypt, or elsewhere, your information will be stored on servers located in Canada or within trusted cloud infrastructure (e.g. Vercel) that meets international data protection standards.

### §9. Security

We take reasonable precautions to protect your data, including encrypted connections (HTTPS) and access controls on our systems. No system is 100% secure, and we encourage you not to share sensitive financial or trade information through a website contact form.

### §10. Changes to This Policy

If we update this policy, we will post the revised version on this page with an updated date. We encourage you to review it periodically.

### §11. Contact

For any privacy-related questions:

**True Nord Inc.**
Email: info@true-nord.ca
Website: www.true-nord.ca

---

## 6. SEO Metadata

- **Title:** "Privacy Policy | True Nord" (already set on the placeholder — keep as-is)
- **Description:** "How True Nord collects, uses, and protects your personal information." (already set — keep as-is)

---

## 7. Out of Scope (Phase 1)

- No cookie consent banner / GDPR pop-up
- No downloadable PDF version
- No language toggle (English only, Phase 1)
