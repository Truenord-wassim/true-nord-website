# Source for Me Page — Design Spec

**Page:** `/source-for-me` (Phase 1, page #7 of 10)
**Audience:** GCC/MENA retailers who want True Nord to source specific Canadian grocery products for them.
**Tagline framing (from project brief):** "Tell us what you want, we find it."

---

## 1. Relationship to the Rest of the Site

`/source-for-me` is already linked from several places, all framed around the "GCC Retailer" audience:

- **Header nav:** "Buy Canadian Products"
- **Footer nav:** "Source for Me"
- **Closing CTAs** on Regions & Markets, Sourcing & Logistics, Certifications, and Brands all link here with the label "I'm a GCC Retailer"

This page is the destination for that audience path — it's where the relationship turns into an actual inbound request. Unlike the prior 6 pages (which are static content pages following the navy → white/cream → navy rhythm), this is a **conversion page**: its primary job is to capture a form submission, not to present more content. So it does not need a closing CTA section of its own — the form *is* the CTA.

It also links **out** to `/privacy-policy` (consent checkbox) — that page is still a "coming soon" placeholder, but the link is added now and will resolve once that page is built (a later Phase 1 task).

---

## 2. Page Structure

Two sections only:

### Section 1: Hero (navy)

Same visual pattern as every other page — navy background, white text, centered, red accent bar.

- **H1:** "Tell Us What You Need. We'll Find It."
- Red accent bar (`h-1 w-16 bg-red`, `aria-hidden="true"`)
- **Subhead:** "Sourcing requests for GCC & MENA retailers"
- **Lead paragraph:** "Looking for a specific Canadian grocery product, brand, or category for your shelves? Fill out the form below and our team will get back to you within 1–2 business days with sourcing options, availability, and next steps."

### Section 2: Form (white)

A centered form (`max-w-2xl`) below the hero. See full field list, layout, and behavior in Sections 3–6 below.

---

## 3. Architecture

Three new files, each with one responsibility:

| File | Type | Responsibility |
|------|------|-----------------|
| `app/source-for-me/page.tsx` | Server Component | Page metadata + hero section + renders `<SourceForMeForm />`. Same shape as every other page's `page.tsx`. |
| `app/source-for-me/SourceForMeForm.tsx` | Client Component (`"use client"`) | Renders the `<form>`, wires it to the server action via `useActionState`, displays inline field errors, the success confirmation, and the general error banner. |
| `app/source-for-me/actions.ts` | Server Action module (`"use server"`) | Validates submitted `FormData` with Zod, sends the two Resend emails (with image attachment if present), returns a `FormState` result. |

### New dependencies

- **`resend`** — official Resend SDK, used in `actions.ts` to send emails.
- **`zod`** — schema validation, used in `actions.ts` to validate form input server-side.

Both need to be added via `npm install resend zod`.

### Shared types

```ts
// app/source-for-me/actions.ts

export type FormState = {
  status: "idle" | "success" | "error";
  errors?: {
    fullName?: string[];
    email?: string[];
    companyName?: string[];
    country?: string[];
    phone?: string[];
    sourcingDetails?: string[];
    productPhoto?: string[];
    consent?: string[];
  };
  message?: string;
};

export const initialFormState: FormState = { status: "idle" };
```

`SourceForMeForm.tsx` uses `useActionState(submitSourcingRequest, initialFormState)`.

---

## 4. Form Fields

All fields live in one `<form>`. Layout: paired fields in a 2-column grid on desktop (`md:grid-cols-2`), single column on mobile — matching the visual-companion "Option B" mockup the user approved.

| Field | Input type | Required | Pairing |
|---|---|---|---|
| Full Name | `text` | Yes | Paired with Email |
| Email | `email` | Yes | Paired with Full Name |
| Company Name | `text` | Yes | Paired with Country |
| Country | `select` (dropdown) | Yes | Paired with Company Name |
| Phone | `tel` | No (optional) | Half-width on its own row (matches the column width of the paired fields above; the other half of the row is empty) |
| What are you looking to source? | `textarea` | Yes | Full width |
| Product Photo | `file` (image only) | No (optional) | Full width |
| Privacy consent | `checkbox` | Yes | Full width, above submit button |

### Country dropdown options

In this exact order:

```ts
export const COUNTRY_OPTIONS = [
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
  "Jordan",
  "Egypt",
  "Other",
] as const;
```

This matches the 8 markets True Nord serves (per the Regions & Markets page) plus an "Other" catch-all. The dropdown's first option is a disabled placeholder: "Select your country". If "Other" is selected, no follow-up free-text field is shown — the value "Other" is simply included as-is in the notification email; the "What are you looking to source?" field is where any extra context would naturally go.

### Validation rules (Zod schema, enforced server-side in `actions.ts`)

- **fullName**: non-empty string (min 1 char). Error: "Please enter your name."
- **email**: valid email format (`z.string().email()`). Error: "Please enter a valid email address."
- **companyName**: non-empty string (min 1 char). Error: "Please enter your company name."
- **country**: must be one of `COUNTRY_OPTIONS`. Error: "Please select a country."
- **phone**: optional string, no format validation (international formats vary too much).
- **sourcingDetails**: string, minimum 10 characters. Error: "Please tell us a bit more about what you're looking for (at least 10 characters)."
- **productPhoto**: optional. If present, must be `image/jpeg`, `image/png`, or `image/webp`, and ≤ 5MB. Errors: "Please upload a JPG, PNG, or WEBP image." / "Image must be smaller than 5MB."
- **consent**: must be `true`. Error: "Please agree to the Privacy Policy to submit this form."

Client-side, the form also uses HTML5 `required`, `type="email"`, and `accept="image/jpeg,image/png,image/webp"` for instant browser-level feedback — but the Zod validation in `actions.ts` is the source of truth (the form must work correctly even with client-side validation bypassed).

### Consent checkbox copy

> I agree to the [Privacy Policy](/privacy-policy) and consent to True Nord storing my information to respond to this request.

The "Privacy Policy" text is a link to `/privacy-policy`.

---

## 5. Submission Flow & UI States

Using `useActionState`, `SourceForMeForm` has three states:

1. **Idle / editing** — the form renders normally. If a previous submit attempt failed validation, each invalid field shows its error message in red text directly below it, and the field retains the user's previously-entered value (Server Actions preserve form state on validation failure since the page doesn't navigate away).

2. **Success** — `state.status === "success"`. The entire `<form>` is replaced with a centered confirmation block:
   > "Thanks — we've received your request and will be in touch within 1–2 business days."

3. **General error** — `state.status === "error"` with a `message` (e.g., Resend send failed, or `RESEND_API_KEY` is missing/invalid). The form remains visible (so the user doesn't lose their input) with a red error banner above the fields:
   > "Something went wrong sending your request. Please try again or email us directly at fouad@true-nord.ca."

The submit button shows a pending state (disabled, label changes to "Sending...") while the action is in flight, using the `pending` value from `useActionState`.

---

## 6. Image Upload Handling

- The `<input type="file" accept="image/jpeg,image/png,image/webp" name="productPhoto">` is optional.
- On submit, the file arrives in the server action as a `File` object via `formData.get("productPhoto")`.
- If no file was selected, `File.size === 0` — treated as "no attachment" (not a validation error).
- If a file is present, `actions.ts` validates its `type` and `size` per the rules in Section 4, then converts it to a `Buffer` (`Buffer.from(await file.arrayBuffer())`) for the Resend attachment.
- The attachment is included **only** on the internal notification email (to Fouad/Mireille) — not on the auto-acknowledgment sent to the submitter.

**Note on validation re-attempts:** if a submission fails validation on some *other* field (e.g., a typo in the email address) after a photo was selected, the browser cannot programmatically restore the file input's selection when the form re-renders — the user will need to re-select their image. This is a standard browser security limitation, not a bug, and doesn't need special handling.

---

## 7. Emails (via Resend)

Both emails are sent from `actions.ts` using the Resend SDK, after validation succeeds.

### Environment variables

- **`RESEND_API_KEY`** — required. Resend API key (set in `.env.local` for local dev, and in Vercel project settings for production).
- **`RESEND_FROM_EMAIL`** — optional, defaults to `onboarding@resend.dev` (Resend's sandbox sender, works without domain verification). Once `true-nord.ca` is verified with Resend (see Section 8 / open item), set this to a real address like `sourcing@true-nord.ca`.

Both emails are sent with ``from: `True Nord <${process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev"}>` ``.

### Email 1: Auto-acknowledgment (to the submitter)

- **To:** the submitted `email`
- **Reply-To:** `fouad@true-nord.ca`
- **Subject:** "We've received your sourcing request — True Nord"
- **Body (plain text / simple HTML, no branded template needed for Phase 1):**

  > Hi {fullName},
  >
  > Thanks for reaching out to True Nord. We've received your sourcing request and a member of our team will review it and get back to you within 1–2 business days.
  >
  > Here's a summary of what you submitted:
  >
  > - Company: {companyName}
  > - Country: {country}
  > - Looking for: {sourcingDetails}
  >
  > If you have any questions in the meantime, just reply to this email.
  >
  > The True Nord Team

### Email 2: Internal notification (to Fouad + Mireille)

- **To:** `fouad@true-nord.ca`, `mireille@true-nord.ca` (hardcoded constants in `actions.ts`, per the project brief — not secrets, no need for env vars)
- **Reply-To:** the submitter's `email`
- **Subject:** "New sourcing request — {companyName} ({country})"
- **Body (plain text / simple HTML):**

  > New sourcing request via the website:
  >
  > - Name: {fullName}
  > - Email: {email}
  > - Company: {companyName}
  > - Country: {country}
  > - Phone: {phone, or "Not provided"}
  > - Looking for: {sourcingDetails}
  > - Product photo: {"Attached below" or "None provided"}
- **Attachment:** product photo, if uploaded (see Section 6).

If the Resend call for either email throws, `actions.ts` returns `{ status: "error", message: "..." }` and the form shows the general error banner (Section 5).

---

## 8. Resend Setup Walkthrough (post-build, for Wassim)

This is a manual setup task that happens **after** the code is built — it does not block development. Steps:

1. Create a free account at resend.com.
2. Generate an API key from the Resend dashboard.
3. Add `RESEND_API_KEY=<your key>` to `.env.local` (already gitignored — won't be committed).
4. Add the same `RESEND_API_KEY` to Vercel's project environment variables (Production + Preview).
5. Submit the form once locally to confirm both emails arrive.

A separate, **non-blocking** open item (already tracked in the project's `decisions/open_items.md`) covers verifying the `true-nord.ca` domain with Resend so emails can send from a real `@true-nord.ca` address instead of the `onboarding@resend.dev` sandbox sender.

**Known limitation until `RESEND_API_KEY` is configured in Vercel:** once this page is merged and deployed, the form will be visible and submittable on the live site, but submissions will fail with the general error banner (Section 5) until the API key is added to Vercel. This is acceptable for now since the site isn't publicly launched yet (domain not yet connected, other pre-launch items still open).

---

## 9. Accessibility

- Every field has a `<label>` associated via `htmlFor`/`id`.
- Required fields are marked with a visual `*` and `aria-required="true"`.
- Field-level error messages are associated with their inputs via `aria-describedby` and rendered with `aria-live="polite"` so screen readers announce them after a failed submit.
- The general error banner and success confirmation are both rendered with `aria-live="polite"`.
- The submit button is disabled (not just visually styled) while `pending` is true, and its accessible label changes to "Sending...".

---

## 10. Out of Scope (Phase 1)

- No database storage of submissions (Supabase is Phase 3) — submissions exist only as emails.
- No CAPTCHA / spam protection — can be added later if spam becomes a problem.
- No file storage (e.g., S3) for uploaded images — the image is attached directly to the notification email and not persisted elsewhere.
- No multi-step / wizard form — everything is on one page, one form.
