# Sell in the GCC Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `/sell-in-gcc` "coming soon" placeholder with a real 2-section conversion page (navy hero + supplier-inquiry form) that validates input with Zod and sends two emails via Resend (an auto-acknowledgment to the submitter, and an internal notification to Fouad + Mireille with an optional product-materials attachment).

**Architecture:** Four files, each with one responsibility:
- `app/sell-in-gcc/types.ts` — `FormState` type and `initialFormState` constant. Kept separate from `actions.ts` because file-level `"use server"` restricts that file to async-function exports only.
- `app/sell-in-gcc/actions.ts` — File-level `"use server"`, a Zod validation schema, and `submitSupplierRequest` Server Action that validates input and sends both Resend emails.
- `app/sell-in-gcc/SellInGccForm.tsx` — Client Component (`"use client"`). Renders the `<form>`, wires it to `submitSupplierRequest` via `useActionState`, shows inline field errors, success confirmation, and general error banner.
- `app/sell-in-gcc/page.tsx` — Server Component. Navy hero (same pattern as every other page) + renders `<SellInGccForm />`.

**Tech Stack:** Next.js 16.2.7 (App Router, React 19 `useActionState` + Server Actions), Tailwind CSS v4 (`@theme` tokens in `app/globals.css`), Zod v3 (already installed), Resend SDK (already installed).

**Spec:** `docs/superpowers/specs/2026-06-16-sell-in-gcc-page-design.md`

---

### Implementation notes (read before starting)

**File-level `"use server"` is REQUIRED in `actions.ts`.** `SellInGccForm.tsx` is a Client Component (`"use client"`). Next.js docs state: "It's not possible to define Server Functions in Client Components. However, you can invoke them in Client Components by importing them from a file that has the 'use server' directive at the top of it." An inline `"use server"` inside `submitSupplierRequest`'s function body only works when the importer is a Server Component — it will cause an HTTP 500 runtime crash for Client Component consumers. The file-level directive restricts `actions.ts` to async-function exports only, which is why `FormState` and `initialFormState` live in the separate `types.ts` file.

**No new dependencies.** `resend` and `zod@3` are already installed from the Source for Me build. `next.config.ts` already has `experimental.serverActions.bodySizeLimit: "6mb"` for the 5 MB file upload limit. No `npm install` and no config changes needed.

**Website field empty-string handling.** `<input type="url">` always submits a value — an empty string when left blank. A standard `z.string().url()` would reject an empty string as an invalid URL. The schema uses `z.string().refine()` to explicitly allow empty strings (user left it blank) while still validating non-empty values as URLs.

**`productMaterials` accepts PDF in addition to images.** Unlike Source for Me's `productPhoto` (images only), this field accepts `image/jpeg`, `image/png`, `image/webp`, and `application/pdf`. The `ALLOWED_FILE_TYPES` constant and `accept` attribute both reflect this.

**Resend is instantiated inside the try block.** `new Resend(...)` throws synchronously if `RESEND_API_KEY` is unset. Instantiating at module scope would crash the entire page on import. Inside the `try` block, a missing API key is caught like any other send failure and produces the spec's general error message — so the page renders and validates correctly even before the key is set up.

**Resend's `emails.send()` does not throw on API errors** — it returns `{ data, error }`. The action checks `.error` on both calls and wraps both in `try/catch` for network-level failures.

---

### Task 1: Feature branch and `types.ts`

**Files:**
- Create: `app/sell-in-gcc/types.ts`

- [ ] **Step 1: Create the feature branch**

```bash
git checkout -b feature/sell-in-gcc-page
```

- [ ] **Step 2: Create `app/sell-in-gcc/types.ts`**

This file holds `FormState` and `initialFormState`. It does NOT export `COUNTRY_OPTIONS` — this form has no country dropdown.

```ts
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

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add app/sell-in-gcc/types.ts
git commit -m "feat: add Sell in GCC types module"
```

---

### Task 2: `actions.ts` — validation and email sending

**Files:**
- Create: `app/sell-in-gcc/actions.ts`

- [ ] **Step 1: Write `app/sell-in-gcc/actions.ts`**

Note the file-level `"use server"` directive on line 1 (after the comment block).

```ts
// File-level "use server" lets SellInGccForm.tsx (a Client Component) call
// submitSupplierRequest. That directive restricts this file to async-function
// exports only, so shared types live in ./types instead.
"use server";

import { Resend } from "resend";
import { z } from "zod";
import { type FormState } from "./types";

const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const INTERNAL_RECIPIENTS = ["fouad@true-nord.ca", "mireille@true-nord.ca"];
const GENERAL_ERROR_MESSAGE =
  "Something went wrong sending your request. Please try again or email us directly at fouad@true-nord.ca.";

const supplierRequestSchema = z.object({
  fullName: z.string().min(1, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  companyName: z.string().min(1, "Please enter your brand or company name."),
  website: z.string().refine(
    (val) => val === "" || z.string().url().safeParse(val).success,
    { message: "Please enter a valid URL (e.g. https://yourbrand.com)." }
  ),
  phone: z.string().optional(),
  productDetails: z
    .string()
    .min(
      10,
      "Please tell us a bit more about your products (at least 10 characters)."
    ),
  productMaterials: z
    .instanceof(File)
    .refine(
      (file) => file.size === 0 || ALLOWED_FILE_TYPES.includes(file.type),
      { message: "Please upload a JPG, PNG, WEBP, or PDF file." }
    )
    .refine((file) => file.size <= MAX_FILE_SIZE_BYTES, {
      message: "File must be smaller than 5 MB.",
    }),
  consent: z.string().refine((value) => value === "on", {
    message: "Please agree to the Privacy Policy to submit this form.",
  }),
});

export async function submitSupplierRequest(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const result = supplierRequestSchema.safeParse({
    fullName: formData.get("fullName") ?? "",
    email: formData.get("email") ?? "",
    companyName: formData.get("companyName") ?? "",
    website: formData.get("website") ?? "",
    phone: formData.get("phone") ?? "",
    productDetails: formData.get("productDetails") ?? "",
    productMaterials: formData.get("productMaterials") ?? new File([], ""),
    consent: formData.get("consent") ?? "",
  });

  if (!result.success) {
    return {
      status: "error",
      errors: result.error.flatten().fieldErrors,
    };
  }

  const {
    fullName,
    email,
    companyName,
    website,
    phone,
    productDetails,
    productMaterials,
  } = result.data;

  const fromAddress = `True Nord <${process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev"}>`;

  const attachments =
    productMaterials.size > 0
      ? [
          {
            filename: productMaterials.name,
            content: Buffer.from(await productMaterials.arrayBuffer()),
          },
        ]
      : undefined;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const ack = await resend.emails.send({
      from: fromAddress,
      to: email,
      replyTo: "fouad@true-nord.ca",
      subject: "We've received your inquiry — True Nord",
      text: `Hi ${fullName},\n\nThanks for reaching out to True Nord. We've received your inquiry about selling in the GCC and a member of our team will be in touch within 1–2 business days.\n\nHere's a summary of what you submitted:\n\n- Brand / Company: ${companyName}\n- Website: ${website || "Not provided"}\n- Products: ${productDetails}\n\nIf you have any questions in the meantime, just reply to this email.\n\nThe True Nord Team`,
    });

    if (ack.error) {
      return { status: "error", message: GENERAL_ERROR_MESSAGE };
    }

    const notify = await resend.emails.send({
      from: fromAddress,
      to: INTERNAL_RECIPIENTS,
      replyTo: email,
      subject: `New supplier inquiry — ${companyName}`,
      text: `New supplier inquiry via the website:\n\n- Name: ${fullName}\n- Email: ${email}\n- Brand / Company: ${companyName}\n- Website: ${website || "Not provided"}\n- Phone: ${phone || "Not provided"}\n- Products: ${productDetails}\n- Materials: ${attachments ? "Attached below" : "None provided"}`,
      attachments,
    });

    if (notify.error) {
      return { status: "error", message: GENERAL_ERROR_MESSAGE };
    }

    return { status: "success" };
  } catch {
    return { status: "error", message: GENERAL_ERROR_MESSAGE };
  }
}
```

- [ ] **Step 2: Type-check the new file**

```bash
npx tsc --noEmit
```

Expected: no errors. (`SellInGccForm.tsx` and the updated `page.tsx` don't exist yet, so this only validates `actions.ts` and `types.ts` plus the rest of the existing project.)

- [ ] **Step 3: Commit**

```bash
git add app/sell-in-gcc/actions.ts
git commit -m "feat: add Sell in GCC server action with Zod validation and Resend emails"
```

---

### Task 3: `SellInGccForm.tsx` — the form component

**Files:**
- Create: `app/sell-in-gcc/SellInGccForm.tsx`

- [ ] **Step 1: Write `app/sell-in-gcc/SellInGccForm.tsx`**

```tsx
"use client";

import Link from "next/link";
import { useActionState } from "react";
import { submitSupplierRequest } from "./actions";
import { initialFormState } from "./types";

const inputClass =
  "w-full rounded-md border border-navy/25 px-3 py-2 text-sm text-navy focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy";
const labelClass = "mb-1 block text-sm font-semibold text-navy";
const errorClass = "mt-1 text-sm text-red";

export default function SellInGccForm() {
  const [state, formAction, pending] = useActionState(
    submitSupplierRequest,
    initialFormState
  );

  if (state.status === "success") {
    return (
      <div
        className="mx-auto max-w-2xl px-6 py-24 text-center"
        aria-live="polite"
      >
        <p className="text-lg font-medium text-navy">
          Thanks — we&apos;ve received your inquiry and will be in touch
          within 1–2 business days.
        </p>
      </div>
    );
  }

  const errors = state.errors ?? {};

  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      {state.status === "error" && state.message && (
        <div
          className="mb-6 rounded-md border border-red bg-red/10 px-4 py-3 text-sm text-red-shade"
          aria-live="polite"
        >
          {state.message}
        </div>
      )}

      <form action={formAction} className="space-y-5">
        {/* Row 1: Full Name + Email */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="fullName" className={labelClass}>
              Full Name{" "}
              <span className="text-red" aria-hidden="true">
                *
              </span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              aria-required="true"
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              className={inputClass}
            />
            {errors.fullName && (
              <p id="fullName-error" className={errorClass} aria-live="polite">
                {errors.fullName[0]}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email{" "}
              <span className="text-red" aria-hidden="true">
                *
              </span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              aria-required="true"
              aria-describedby={errors.email ? "email-error" : undefined}
              className={inputClass}
            />
            {errors.email && (
              <p id="email-error" className={errorClass} aria-live="polite">
                {errors.email[0]}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Brand / Company Name + Website */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="companyName" className={labelClass}>
              Brand / Company Name{" "}
              <span className="text-red" aria-hidden="true">
                *
              </span>
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              required
              aria-required="true"
              aria-describedby={
                errors.companyName ? "companyName-error" : undefined
              }
              className={inputClass}
            />
            {errors.companyName && (
              <p
                id="companyName-error"
                className={errorClass}
                aria-live="polite"
              >
                {errors.companyName[0]}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="website" className={labelClass}>
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              placeholder="https://yourbrand.com"
              aria-describedby={errors.website ? "website-error" : undefined}
              className={inputClass}
            />
            {errors.website && (
              <p id="website-error" className={errorClass} aria-live="polite">
                {errors.website[0]}
              </p>
            )}
          </div>
        </div>

        {/* Row 3: Phone (left column only, right empty) */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={inputClass}
            />
            {errors.phone && (
              <p id="phone-error" className={errorClass} aria-live="polite">
                {errors.phone[0]}
              </p>
            )}
          </div>
        </div>

        {/* Row 4: Tell us about your products (full width) */}
        <div>
          <label htmlFor="productDetails" className={labelClass}>
            Tell us about your products{" "}
            <span className="text-red" aria-hidden="true">
              *
            </span>
          </label>
          <textarea
            id="productDetails"
            name="productDetails"
            required
            aria-required="true"
            rows={5}
            placeholder="What do you make, how many SKUs, which markets interest you most?"
            aria-describedby={
              errors.productDetails ? "productDetails-error" : undefined
            }
            className={inputClass}
          />
          {errors.productDetails && (
            <p
              id="productDetails-error"
              className={errorClass}
              aria-live="polite"
            >
              {errors.productDetails[0]}
            </p>
          )}
        </div>

        {/* Row 5: Product Materials (full width) */}
        <div>
          <label htmlFor="productMaterials" className={labelClass}>
            Product Materials
          </label>
          <input
            type="file"
            id="productMaterials"
            name="productMaterials"
            accept="image/jpeg,image/png,image/webp,application/pdf"
            aria-describedby={
              errors.productMaterials ? "productMaterials-error" : undefined
            }
            className="block w-full text-sm text-navy/70 file:mr-3 file:rounded-md file:border-0 file:bg-navy file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-navy-tint"
          />
          <p className="mt-1 text-xs text-navy/60">
            Product catalog, lookbook, or photo — JPG, PNG, WEBP, or PDF, max 5 MB.
          </p>
          {errors.productMaterials && (
            <p
              id="productMaterials-error"
              className={errorClass}
              aria-live="polite"
            >
              {errors.productMaterials[0]}
            </p>
          )}
        </div>

        {/* Row 6: Consent checkbox (full width, above submit) */}
        <div>
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              required
              aria-required="true"
              aria-describedby={errors.consent ? "consent-error" : undefined}
              className="mt-1"
            />
            <label htmlFor="consent" className="text-sm text-navy/80">
              I agree to the{" "}
              <Link
                href="/privacy-policy"
                className="font-semibold text-red underline hover:text-red-shade"
              >
                Privacy Policy
              </Link>{" "}
              and consent to True Nord storing my information to respond to
              this request.{" "}
              <span className="text-red" aria-hidden="true">
                *
              </span>
            </label>
          </div>
          {errors.consent && (
            <p id="consent-error" className={errorClass} aria-live="polite">
              {errors.consent[0]}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="inline-block rounded-md bg-red px-6 py-3 text-sm font-semibold text-white hover:bg-red-shade disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Sending..." : "Submit Inquiry"}
        </button>
      </form>
    </div>
  );
}
```

- [ ] **Step 2: Type-check and lint the new file**

```bash
npx tsc --noEmit && npx eslint app/sell-in-gcc/SellInGccForm.tsx
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/sell-in-gcc/SellInGccForm.tsx
git commit -m "feat: add Sell in GCC form component with inline validation states"
```

---

### Task 4: `page.tsx` — hero + form, and manual verification

**Files:**
- Modify: `app/sell-in-gcc/page.tsx`

- [ ] **Step 1: Replace `app/sell-in-gcc/page.tsx`**

The `Metadata` export keeps the same values from the existing placeholder. The `ComingSoon` import and usage are removed.

```tsx
import type { Metadata } from "next";
import SellInGccForm from "./SellInGccForm";

export const metadata: Metadata = {
  title: "Sell in the GCC | True Nord",
  description:
    "Canadian grocery brands: tell True Nord about your products and reach GCC and MENA retailers with zero export complexity.",
};

export default function SellInGccPage() {
  return (
    <>
      <section className="bg-navy px-6 py-24 text-center text-white">
        <h1 className="text-4xl md:text-5xl">
          Get Your Canadian Brand Into the GCC.
        </h1>
        <div className="mx-auto my-5 h-1 w-16 bg-red" aria-hidden="true" />
        <p className="mb-5 text-lg font-medium text-white/90">
          For Canadian grocery brands ready to export
        </p>
        <p className="mx-auto max-w-2xl text-base text-white/85">
          True Nord handles the full export journey — compliance, logistics,
          and retailer relationships — so you can focus on making great
          products. Fill out the form below and our team will get back to you
          within 1–2 business days.
        </p>
      </section>

      <SellInGccForm />
    </>
  );
}
```

- [ ] **Step 2: Verify on desktop**

Run: `npm run dev` (if not already running)

Open `http://localhost:3000/sell-in-gcc`. Check, top to bottom:

- **Hero**: navy background, white "Get Your Canadian Brand Into the GCC." heading in serif (Playfair Display), a short red bar beneath it, the subhead "For Canadian grocery brands ready to export", and the lead paragraph starting "True Nord handles the full export journey...".
- **Form section**: white background below the hero, centered with a max width.
- **Field layout**: Full Name + Email side by side (Row 1); Brand / Company Name + Website side by side (Row 2); Phone alone on its own row left column (Row 3, right half empty); "Tell us about your products" textarea with placeholder "What do you make, how many SKUs, which markets interest you most?" (Row 4); "Product Materials" file input with helper text "Product catalog, lookbook, or photo — JPG, PNG, WEBP, or PDF, max 5 MB." (Row 5); privacy-consent checkbox + link; then the red "Submit Inquiry" button.
- **Required markers**: red `*` after Full Name, Email, Brand / Company Name, "Tell us about your products", and at the end of the consent text. Website, Phone, and Product Materials have no `*`.
- **No country dropdown** — there is no country select anywhere on this form.

- [ ] **Step 3: Verify client-side and server-side validation**

1. Click "Submit Inquiry" with every field empty. Expected: the browser blocks submission and highlights the first required field (native HTML5 validation) — no page reload.
2. Fill in Full Name, Email (valid format), Brand / Company Name, type `test` (4 characters) into "Tell us about your products", and check consent. Click "Submit Inquiry". Expected: a red error message reading "Please tell us a bit more about your products (at least 10 characters)." appears directly below the textarea, and all previously-entered values remain.
3. Type an invalid URL (e.g., `notaurl`) into Website. Fill all required fields correctly (10+ chars in textarea), check consent. Click "Submit Inquiry". Expected: a red error message reading "Please enter a valid URL (e.g. https://yourbrand.com)." appears below the Website field.
4. Clear the Website field (or enter a valid URL like `https://example.com`) and submit with all required fields correct (10+ chars in textarea, consent checked). Expected: the button briefly shows "Sending...", then a red banner appears above the form reading "Something went wrong sending your request. Please try again or email us directly at fouad@true-nord.ca." — this is expected because `RESEND_API_KEY` isn't configured yet.

- [ ] **Step 4: Verify on mobile width**

Resize the browser to narrower than ~768px (or use dev tools device toolbar). Check:

- Full Name/Email stack vertically.
- Brand / Company Name/Website stack vertically.
- Phone, the textarea, the file input, and the consent row are all full width.
- No horizontal scrollbar at any point.

- [ ] **Step 5: Verify the browser tab title**

With `/sell-in-gcc` open, confirm the browser tab title reads "Sell in the GCC | True Nord".

- [ ] **Step 6: Commit**

```bash
git add app/sell-in-gcc/page.tsx
git commit -m "feat: build real Sell in GCC page with hero and supplier inquiry form"
```

---

### Task 5: Production build and lint check

**Files:** none (verification only; fix any files flagged by lint/build errors)

- [ ] **Step 1: Run the linter**

```bash
npm run lint
```

Expected: no errors. If errors are reported, fix them in the relevant file and re-run until clean.

- [ ] **Step 2: Run a production build**

```bash
npm run build
```

Expected: the build completes successfully and lists all 10 routes (`/`, `/about`, `/regions-markets`, `/sourcing-logistics`, `/certifications`, `/brands`, `/source-for-me`, `/sell-in-gcc`, `/privacy-policy`, `/contact`) with no errors. The `/sell-in-gcc` route should be listed as dynamic (it contains a Server Action). If errors are reported, fix them and re-run until the build succeeds.

- [ ] **Step 3: Commit any fixes (skip if nothing changed)**

```bash
git add -A
git commit -m "fix: resolve lint/build issues from Sell in GCC page work"
```
