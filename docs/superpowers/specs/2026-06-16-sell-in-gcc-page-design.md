# Sell in the GCC Page — Design Spec

**Page:** `/sell-in-gcc` (Phase 1, page #8 of 10)
**Audience:** Canadian grocery brands/suppliers who want True Nord to distribute their products into the GCC and MENA markets.
**Tagline framing:** "Get Your Canadian Brand Into the GCC."

---

## 1. Relationship to the Rest of the Site

`/sell-in-gcc` is the destination for the Canadian brand/supplier audience path:

- **Header nav:** "Sell Canadian Products"
- **Footer nav:** "Sell in the GCC"
- **Home page:** "Canadian Brand?" CTA fork routes here
- **Closing CTAs** on Regions & Markets, Sourcing & Logistics, Certifications, and Brands all include a "Sell in the GCC" or "I'm a Canadian Brand" link

This is the mirror of `/source-for-me`: where that page captures GCC retailers asking True Nord to source products, this page captures Canadian brands asking True Nord to distribute them. Like Source for Me, it is a **conversion page** — the form is the CTA, no closing CTA section needed.

It links out to `/privacy-policy` (consent checkbox), which is currently a "coming soon" placeholder. The link is added now and will resolve once that page is built.

---

## 2. Page Structure

Two sections only:

### Section 1: Hero (navy)

Same visual pattern as every other page — navy background, white text, centered, red accent bar.

- **H1:** "Get Your Canadian Brand Into the GCC."
- Red accent bar (`h-1 w-16 bg-red`, `aria-hidden="true"`)
- **Subhead:** "For Canadian grocery brands ready to export"
- **Lead paragraph:** "True Nord handles the full export journey — compliance, logistics, and retailer relationships — so you can focus on making great products. Fill out the form below and our team will get back to you within 1–2 business days."

### Section 2: Form (white)

A centered form (`max-w-2xl`) below the hero. See full field list, layout, and behavior in Sections 3–6 below.

---

## 3. Architecture

Four new files, each with one responsibility. Self-contained in `app/sell-in-gcc/` — no shared code with `app/source-for-me/`.

| File | Type | Responsibility |
|------|------|----------------|
| `app/sell-in-gcc/page.tsx` | Server Component | Page metadata + hero section + renders `<SellInGccForm />` |
| `app/sell-in-gcc/SellInGccForm.tsx` | Client Component (`"use client"`) | Renders the `<form>`, wires it to the server action via `useActionState`, displays inline field errors, success confirmation, and general error banner |
| `app/sell-in-gcc/actions.ts` | Server Action module | File-level `"use server"`, Zod schema, `submitSupplierRequest` Server Action |
| `app/sell-in-gcc/types.ts` | Shared constants/types | `FormState`, `initialFormState` — kept out of `actions.ts` because file-level `"use server"` restricts that file to async-function exports only |

### No new dependencies

`resend` and `zod@3` are already installed (from the Source for Me build). `next.config.ts` already has `experimental.serverActions.bodySizeLimit: "6mb"` — no config changes needed.

### Shared types

```ts
// app/sell-in-gcc/types.ts

export type FormState = {
  status: "idle" | "success" | "error";
  errors?: {
    fullName?: string[];
    email?: string[];
    companyName?: string[];
    website?: string[];
    phone?: string[];
    productDetails?: string[];
    productMaterials?: string[];
    consent?: string[];
  };
  message?: string;
};

export const initialFormState: FormState = { status: "idle" };
```

`SellInGccForm.tsx` uses `useActionState(submitSupplierRequest, initialFormState)`.

---

## 4. Form Fields

All fields in one `<form>`. Layout: paired fields in a 2-column grid on desktop (`md:grid-cols-2`), single column on mobile — same "Option B" pattern as Source for Me.

| Field | Input type | Required | Pairing |
|---|---|---|---|
| Full Name | `text` | Yes | Paired with Email |
| Email | `email` | Yes | Paired with Full Name |
| Brand / Company Name | `text` | Yes | Paired with Website |
| Website | `url` | No | Paired with Brand Name |
| Phone | `tel` | No | Half-width, own row (left column, right empty) |
| Tell us about your products | `textarea` | Yes | Full width |
| Product Materials | `file` | No | Full width |
| Privacy consent | `checkbox` | Yes | Full width, above submit |

### Textarea placeholder

The "Tell us about your products" textarea should include a `placeholder` attribute to guide the response:

> "What do you make, how many SKUs, which markets interest you most?"

### File upload

- `accept="image/jpeg,image/png,image/webp,application/pdf"`
- Optional
- Helper text below the input: "Product catalog, lookbook, or photo — JPG, PNG, WEBP, or PDF, max 5 MB."

### Validation rules (Zod schema, enforced server-side in `actions.ts`)

- **fullName**: non-empty string (min 1 char). Error: "Please enter your name."
- **email**: valid email format (`z.string().email()`). Error: "Please enter a valid email address."
- **companyName**: non-empty string (min 1 char). Error: "Please enter your brand or company name."
- **website**: optional. If present and non-empty, must be a valid URL (`z.string().url()`). Empty string is treated as "not provided" (no error). Error: "Please enter a valid URL (e.g. https://yourbrand.com)."
- **phone**: optional, no format validation.
- **productDetails**: string, minimum 10 characters. Error: "Please tell us a bit more about your products (at least 10 characters)."
- **productMaterials**: optional. If present and non-empty (size > 0), must be `image/jpeg`, `image/png`, `image/webp`, or `application/pdf`, and ≤ 5 MB. Errors: "Please upload a JPG, PNG, WEBP, or PDF file." / "File must be smaller than 5 MB."
- **consent**: must be `true` (checkbox checked). Error: "Please agree to the Privacy Policy to submit this form."

#### Website field — empty string handling

The browser always submits a value for a `<input type="url">` even when empty (an empty string). The Zod schema must handle this:

```ts
website: z.string().refine(
  (val) => val === "" || z.string().url().safeParse(val).success,
  { message: "Please enter a valid URL (e.g. https://yourbrand.com)." }
),
```

This treats an empty string as valid (no URL provided) and only validates non-empty strings as URLs.

### Consent checkbox copy

> I agree to the [Privacy Policy](/privacy-policy) and consent to True Nord storing my information to respond to this request.

---

## 5. Submission Flow & UI States

Using `useActionState`, `SellInGccForm` has three states — identical pattern to `SourceForMeForm`:

1. **Idle / editing** — form renders normally. If a previous submit failed validation, each invalid field shows its error below it, and the field retains the user's previously-entered value.

2. **Success** — `state.status === "success"`. The entire `<form>` is replaced with a centered confirmation:
   > "Thanks — we've received your inquiry and will be in touch within 1–2 business days."

3. **General error** — `state.status === "error"` with a `message`. The form stays visible with a red banner above the fields:
   > "Something went wrong sending your request. Please try again or email us directly at fouad@true-nord.ca."

The submit button shows "Sending..." and is disabled while the action is in flight.

---

## 6. File Upload Handling

Same pattern as Source for Me:

- `<input type="file" accept="image/jpeg,image/png,image/webp,application/pdf" name="productMaterials">` is optional.
- If no file was selected, `File.size === 0` — treated as "no attachment" (not a validation error).
- If a file is present: validate `type` and `size` in Zod, then convert to `Buffer` for the Resend attachment.
- Attachment is included **only** on the internal notification email (to Fouad/Mireille) — not on the auto-acknowledgment to the submitter.
- If the user needs to re-select a file after a validation error on another field, they must re-select it — standard browser security limitation, not a bug.

---

## 7. Emails (via Resend)

Both emails use `from: \`True Nord <${process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev"}>\`` — same env var pattern as Source for Me, no new environment variables needed.

### Email 1: Auto-acknowledgment (to the submitter)

- **To:** the submitted `email`
- **Reply-To:** `fouad@true-nord.ca`
- **Subject:** "We've received your inquiry — True Nord"
- **Body:**

  > Hi {fullName},
  >
  > Thanks for reaching out to True Nord. We've received your inquiry about selling in the GCC and a member of our team will be in touch within 1–2 business days.
  >
  > Here's a summary of what you submitted:
  >
  > - Brand / Company: {companyName}
  > - Website: {website, or "Not provided"}
  > - Products: {productDetails}
  >
  > If you have any questions in the meantime, just reply to this email.
  >
  > The True Nord Team

### Email 2: Internal notification (to Fouad + Mireille)

- **To:** `fouad@true-nord.ca`, `mireille@true-nord.ca` (hardcoded constants in `actions.ts`)
- **Reply-To:** the submitter's `email`
- **Subject:** "New supplier inquiry — {companyName}"
- **Body:**

  > New supplier inquiry via the website:
  >
  > - Name: {fullName}
  > - Email: {email}
  > - Brand / Company: {companyName}
  > - Website: {website, or "Not provided"}
  > - Phone: {phone, or "Not provided"}
  > - Products: {productDetails}
  > - Materials: {"Attached below" or "None provided"}

- **Attachment:** uploaded file, if present.

---

## 8. Accessibility

Same requirements as Source for Me (spec Section 9):

- Every field has a `<label>` associated via `htmlFor`/`id`.
- Required fields marked with a visual `*` (`aria-hidden="true"`) and `aria-required="true"`.
- Field-level error messages associated via `aria-describedby` and rendered with `aria-live="polite"`.
- General error banner and success confirmation rendered with `aria-live="polite"`.
- Submit button is truly `disabled` while `pending` is true, label changes to "Sending...".

---

## 9. Out of Scope (Phase 1)

Same exclusions as Source for Me:
- No database storage (Supabase is Phase 3)
- No CAPTCHA / spam protection
- No file storage (attachment goes directly in email, not persisted)
- No multi-step form
