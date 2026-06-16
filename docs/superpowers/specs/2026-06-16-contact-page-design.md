# Contact Page — Design Spec

**Page:** `/contact` (Phase 1, page #10 of 10)
**Audience:** Canadian suppliers curious about exporting + GCC retailers looking to source. Also anyone who wants to reach True Nord directly.

---

## 1. Relationship to the Rest of the Site

`/contact` is linked from:
- The main Header nav ("Contact")
- The Footer sitemap
- Closing CTAs on About Us and other pages

It is the last remaining "coming soon" placeholder. No new dependencies — Resend and Zod are already installed.

---

## 2. Page Structure

Two sections: navy hero + white two-column content.

### Section 1: Hero (navy)

Same visual pattern as every other page.

- **H1:** "Get in Touch"
- Red accent bar (`h-1 w-16 bg-red`, `aria-hidden="true"`)
- **Subhead:** "Whether you're a Canadian supplier or a GCC retailer, we'd love to hear from you."

### Section 2: Content (white, two-column)

`max-w-5xl mx-auto px-6 py-16` container with two columns:

| Column | Width | Content |
|--------|-------|---------|
| Left — form | `flex-[3]` | "Send us a message" form |
| Right — details | `flex-[2]` | "Contact details" panel |

On mobile (`< md`): right column stacks below the form.

---

## 3. Architecture

4-file module — same pattern as Source for Me and Sell in the GCC.

| File | Type | Role |
|------|------|------|
| `app/contact/types.ts` | Shared types | `FormState`, `initialFormState` |
| `app/contact/actions.ts` | Server Action | Zod validation + Resend sending |
| `app/contact/ContactForm.tsx` | Client Component | `useActionState` form UI |
| `app/contact/page.tsx` | Server Component | Hero + two-column layout |

**Why 4 files:** File-level `"use server"` in `actions.ts` restricts it to async-function exports only. `types.ts` holds the shared `FormState` type so the Client Component can import it without violating that constraint.

---

## 4. Form Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `fullName` | text input | yes | `z.string().min(1, "Please enter your name.")` |
| `email` | email input | yes | `z.string().email("Please enter a valid email address.")` |
| `message` | textarea | yes | `z.string().min(10, "Please tell us a bit more (at least 10 characters).")` |
| `consent` | checkbox | yes | `z.string().refine(v => v === "on", "Please agree to the Privacy Policy to submit.")` |

No file upload. No phone field. No country dropdown.

**Message textarea placeholder:** "Tell us what you're working on or what you're looking for."

**Submit button label:** "Send Message"

**Success banner:** "Thanks — we'll be in touch within 1–2 business days."

**Error fallback:** "Something went wrong. Please try again or email us directly at info@true-nord.ca."

---

## 5. Resend Emails

Both emails sent inside a single `try` block (same improved pattern as Sell in the GCC — no `await` outside the try).

| Email | To | Subject |
|-------|----|---------|
| Auto-ack | submitter's email | `"Thanks for reaching out — True Nord"` |
| Internal notification | `fouad@true-nord.ca`, `mireille@true-nord.ca` | `"New contact message — ${fullName}"` |

Auto-ack body: plain confirmation that the message was received, team will be in touch within 1–2 business days.

Internal body: name, email, and message body.

No attachment. No `bodySizeLimit` change needed.

---

## 6. Contact Details Panel (right column)

Displayed as a list of labeled rows, each with an icon placeholder, label, and value.

| Label | Value | Link |
|-------|-------|------|
| Email | info@true-nord.ca | `mailto:info@true-nord.ca` |
| Email | fouad@true-nord.ca | `mailto:fouad@true-nord.ca` |
| Phone | +1 647 522 0891 | `tel:+16475220891` |
| Address | Unit C18, 724 Caledonia Rd, North York, ON, Canada, M6B 3X7 | none (plain text) |
| LinkedIn | true-nord (placeholder) | `href="#"` — **replace with real URL once available** |

The LinkedIn row is included with `href="#"` so adding the real URL later is a one-line code change. A code comment marks the placeholder clearly.

---

## 7. Styling

Follows existing site patterns exactly.

| Element | Tailwind classes |
|---------|-----------------|
| Hero section | `bg-navy px-6 py-24 text-center text-white` |
| H1 | `text-4xl md:text-5xl` |
| Red bar | `mx-auto my-5 h-1 w-16 bg-red` |
| Subhead | `text-lg font-medium text-white/90` |
| Content section | `px-6 py-16` |
| Content container | `mx-auto max-w-5xl` |
| Two-column wrapper | `flex flex-col md:flex-row gap-12` |
| Left column | `flex-[3]` |
| Right column | `flex-[2]` |
| Section label | `mb-6 font-heading text-2xl font-semibold text-navy` |
| Form input/select | `w-full rounded border border-navy/20 px-3 py-2 text-navy focus:outline-none focus:ring-2 focus:ring-red/40` |
| Textarea | same as input + `resize-none` |
| Submit button | `rounded bg-red px-6 py-3 font-semibold text-white hover:bg-red-shade disabled:opacity-50` |
| Success banner | `rounded bg-green-50 p-4 text-green-800` |
| Error banner | `rounded bg-red/10 p-4 text-red` |
| Contact detail label | `text-xs font-semibold uppercase tracking-wide text-navy/50` |
| Contact detail value | `mt-0.5 text-navy` |
| Contact links (email/phone/LinkedIn) | `text-red hover:text-red-shade underline` |

---

## 8. SEO Metadata

- **Title:** "Contact | True Nord" (already set on placeholder — keep as-is)
- **Description:** "Get in touch with True Nord — contact details, location, and a message form." (already set — keep as-is)

---

## 9. Out of Scope (Phase 1)

- No map embed
- No office hours
- No phone field on the form (phone is in the contact details panel, not collected)
- LinkedIn URL — placeholder only; real URL added in a later commit once the company page is created
