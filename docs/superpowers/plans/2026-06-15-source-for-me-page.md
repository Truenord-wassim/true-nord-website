# Source for Me Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `/source-for-me` "coming soon" placeholder with a real 2-section conversion page (navy hero + sourcing-request form) that validates input with Zod and sends two emails via Resend (an auto-acknowledgment to the submitter, and an internal notification to Fouad + Mireille with an optional product-photo attachment).

**Architecture:** Three files, each with one responsibility:
- `app/source-for-me/actions.ts` — shared types/constants (`FormState`, `initialFormState`, `COUNTRY_OPTIONS`), a Zod validation schema, and the `submitSourcingRequest` Server Action that validates input and sends both Resend emails.
- `app/source-for-me/SourceForMeForm.tsx` — Client Component. Renders the `<form>`, wires it to `submitSourcingRequest` via `useActionState`, shows inline field errors, the success confirmation, and the general error banner. Paired-field layout per the approved "Option B" mockup.
- `app/source-for-me/page.tsx` — Server Component. Navy hero (same pattern as every other page) + renders `<SourceForMeForm />`.

**Tech Stack:** Next.js 16.2.7 (App Router, React 19 `useActionState` + Server Actions), Tailwind CSS v4 (`@theme` tokens already defined in `app/globals.css`), Zod for schema validation, Resend SDK for email.

**Spec:** `docs/superpowers/specs/2026-06-15-source-for-me-page-design.md`

---

### Implementation notes (read before starting)

**Zod version is pinned to v3.** The spec's validation rules are written in v3-style syntax (`z.string().email(...)`, `result.error.flatten().fieldErrors`). Zod's latest major (v4.4.3) ships a backwards-compatible "classic" API but deprecates/changes the exact error-customization parameters this plan relies on. To avoid ambiguity, Task 1 installs `zod@3` (resolves to the latest 3.x, currently `3.25.76`) — confirmed to support every validation rule in the spec.

**`actions.ts` has no file-level `"use server"` directive.** Next.js requires a file with a file-level `"use server"` directive to export *only* async functions — but `actions.ts` also needs to export `COUNTRY_OPTIONS`, `FormState` (a type), and `initialFormState` for the form component to import. Per the Next.js docs (`node_modules/next/dist/docs/01-app/01-getting-started/07-mutating-data.md`), the `"use server"` directive can instead go as the first line *inside* the async function body — this is what Task 2 does. The file is still a normal Server Action module; only the directive placement differs from the spec's literal sketch.

**Resend's `emails.send()` does not throw on API errors** — it returns `{ data, error }`. `actions.ts` checks `.error` on both calls and also wraps both calls in a `try/catch` for network-level failures, so any failure (missing API key, network error, invalid `from` address, etc.) produces the spec's general error message.

**`new Resend(...)` throws synchronously if no API key is available** (`Error: Missing API key`). If it were instantiated at module scope, the entire `/source-for-me` page would crash on import whenever `RESEND_API_KEY` is unset — not the "page renders, only submission fails" behavior the spec describes (Section 8). Task 2 instead instantiates `Resend` *inside* `submitSourcingRequest`, inside the `try` block, so a missing key is caught like any other send failure and produces the general error message.

---

### Task 1: Install dependencies and scaffolding

**Files:**
- Modify: `package.json`, `package-lock.json`
- Create: `.env.example`
- Modify: `.gitignore`

- [ ] **Step 1: Create the feature branch**

```bash
git checkout -b feature/source-for-me-page
```

- [ ] **Step 2: Install dependencies**

```bash
npm install resend zod@3
```

Expected output: npm reports `resend` and `zod` added (zod resolves to a `3.x` version), `package.json` and `package-lock.json` are updated. No vulnerabilities beyond what's already present in the project.

- [ ] **Step 3: Create `.env.example`**

This documents the two environment variables `actions.ts` will read in Task 2, so Wassim knows what to set up later (per spec Section 8).

```
# Resend (https://resend.com) — required for the Source for Me form to send emails.
# Create a free account, generate an API key, and paste it here (and in Vercel's
# project environment variables for production).
RESEND_API_KEY=

# Optional. Defaults to onboarding@resend.dev (Resend's sandbox sender) if unset.
# Once true-nord.ca is verified with Resend, set this to a true-nord.ca address,
# e.g. sourcing@true-nord.ca
RESEND_FROM_EMAIL=
```

- [ ] **Step 4: Allow `.env.example` to be committed**

The repo's `.gitignore` has a blanket `.env*` rule. Add a negation so `.env.example` (which contains no secrets) can be tracked.

In `.gitignore`, find this block:

```
# env files (can opt-in for committing if needed)
.env*
```

Change it to:

```
# env files (can opt-in for committing if needed)
.env*
!.env.example
```

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json .env.example .gitignore
git commit -m "chore: add resend and zod dependencies for Source for Me form"
```

---

### Task 2: `actions.ts` — types, validation, and email sending

**Files:**
- Create: `app/source-for-me/actions.ts`

- [ ] **Step 1: Write `app/source-for-me/actions.ts`**

```ts
import { Resend } from "resend";
import { z } from "zod";

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

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const INTERNAL_RECIPIENTS = ["fouad@true-nord.ca", "mireille@true-nord.ca"];
const GENERAL_ERROR_MESSAGE =
  "Something went wrong sending your request. Please try again or email us directly at fouad@true-nord.ca.";

const sourcingRequestSchema = z.object({
  fullName: z.string().min(1, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  companyName: z.string().min(1, "Please enter your company name."),
  country: z.string().refine(
    (value): value is (typeof COUNTRY_OPTIONS)[number] =>
      (COUNTRY_OPTIONS as readonly string[]).includes(value),
    { message: "Please select a country." }
  ),
  phone: z.string().optional(),
  sourcingDetails: z
    .string()
    .min(
      10,
      "Please tell us a bit more about what you're looking for (at least 10 characters)."
    ),
  productPhoto: z
    .instanceof(File)
    .refine(
      (file) => file.size === 0 || ALLOWED_IMAGE_TYPES.includes(file.type),
      { message: "Please upload a JPG, PNG, or WEBP image." }
    )
    .refine((file) => file.size <= MAX_IMAGE_SIZE_BYTES, {
      message: "Image must be smaller than 5MB.",
    }),
  consent: z.string().refine((value) => value === "on", {
    message: "Please agree to the Privacy Policy to submit this form.",
  }),
});

export async function submitSourcingRequest(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  "use server";

  const result = sourcingRequestSchema.safeParse({
    fullName: formData.get("fullName") ?? "",
    email: formData.get("email") ?? "",
    companyName: formData.get("companyName") ?? "",
    country: formData.get("country") ?? "",
    phone: formData.get("phone") ?? "",
    sourcingDetails: formData.get("sourcingDetails") ?? "",
    productPhoto: formData.get("productPhoto") ?? new File([], ""),
    consent: formData.get("consent") ?? "",
  });

  if (!result.success) {
    return {
      status: "idle",
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { fullName, email, companyName, country, phone, sourcingDetails, productPhoto } =
    result.data;

  const fromAddress = `True Nord <${process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev"}>`;

  const attachments =
    productPhoto.size > 0
      ? [
          {
            filename: productPhoto.name,
            content: Buffer.from(await productPhoto.arrayBuffer()),
          },
        ]
      : undefined;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const ack = await resend.emails.send({
      from: fromAddress,
      to: email,
      replyTo: "fouad@true-nord.ca",
      subject: "We've received your sourcing request — True Nord",
      text: `Hi ${fullName},\n\nThanks for reaching out to True Nord. We've received your sourcing request and a member of our team will review it and get back to you within 1–2 business days.\n\nHere's a summary of what you submitted:\n\n- Company: ${companyName}\n- Country: ${country}\n- Looking for: ${sourcingDetails}\n\nIf you have any questions in the meantime, just reply to this email.\n\nThe True Nord Team`,
    });

    if (ack.error) {
      return { status: "error", message: GENERAL_ERROR_MESSAGE };
    }

    const notify = await resend.emails.send({
      from: fromAddress,
      to: INTERNAL_RECIPIENTS,
      replyTo: email,
      subject: `New sourcing request — ${companyName} (${country})`,
      text: `New sourcing request via the website:\n\n- Name: ${fullName}\n- Email: ${email}\n- Company: ${companyName}\n- Country: ${country}\n- Phone: ${phone || "Not provided"}\n- Looking for: ${sourcingDetails}\n- Product photo: ${attachments ? "Attached below" : "None provided"}`,
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

Expected: no errors. (`SourceForMeForm.tsx` and the updated `page.tsx` don't exist yet, so this only validates `actions.ts` plus the rest of the existing project.)

- [ ] **Step 3: Commit**

```bash
git add app/source-for-me/actions.ts
git commit -m "feat: add Source for Me server action with Zod validation and Resend emails"
```

---

### Task 3: `SourceForMeForm.tsx` — the form component

**Files:**
- Create: `app/source-for-me/SourceForMeForm.tsx`

- [ ] **Step 1: Write `app/source-for-me/SourceForMeForm.tsx`**

```tsx
"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  COUNTRY_OPTIONS,
  initialFormState,
  submitSourcingRequest,
} from "./actions";

const inputClass =
  "w-full rounded-md border border-navy/25 px-3 py-2 text-sm text-navy focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy";
const labelClass = "mb-1 block text-sm font-semibold text-navy";
const errorClass = "mt-1 text-sm text-red";

export default function SourceForMeForm() {
  const [state, formAction, pending] = useActionState(
    submitSourcingRequest,
    initialFormState
  );

  if (state.status === "success") {
    return (
      <div
        className="mx-auto max-w-2xl px-6 py-24 text-center"
        aria-live="polite"
      >
        <p className="text-lg font-medium text-navy">
          Thanks — we&apos;ve received your request and will be in touch
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

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="companyName" className={labelClass}>
              Company Name{" "}
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
              <p id="companyName-error" className={errorClass} aria-live="polite">
                {errors.companyName[0]}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="country" className={labelClass}>
              Country{" "}
              <span className="text-red" aria-hidden="true">
                *
              </span>
            </label>
            <select
              id="country"
              name="country"
              required
              aria-required="true"
              defaultValue=""
              aria-describedby={errors.country ? "country-error" : undefined}
              className={inputClass}
            >
              <option value="" disabled>
                Select your country
              </option>
              {COUNTRY_OPTIONS.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.country && (
              <p id="country-error" className={errorClass} aria-live="polite">
                {errors.country[0]}
              </p>
            )}
          </div>
        </div>

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

        <div>
          <label htmlFor="sourcingDetails" className={labelClass}>
            What are you looking to source?{" "}
            <span className="text-red" aria-hidden="true">
              *
            </span>
          </label>
          <textarea
            id="sourcingDetails"
            name="sourcingDetails"
            required
            aria-required="true"
            rows={5}
            aria-describedby={
              errors.sourcingDetails ? "sourcingDetails-error" : undefined
            }
            className={inputClass}
          />
          {errors.sourcingDetails && (
            <p id="sourcingDetails-error" className={errorClass} aria-live="polite">
              {errors.sourcingDetails[0]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="productPhoto" className={labelClass}>
            Product Photo
          </label>
          <input
            type="file"
            id="productPhoto"
            name="productPhoto"
            accept="image/jpeg,image/png,image/webp"
            aria-describedby={
              errors.productPhoto ? "productPhoto-error" : undefined
            }
            className="block w-full text-sm text-navy/70 file:mr-3 file:rounded-md file:border-0 file:bg-navy file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-navy-tint"
          />
          <p className="mt-1 text-xs text-navy/60">
            JPG, PNG, or WEBP — max 5MB.
          </p>
          {errors.productPhoto && (
            <p id="productPhoto-error" className={errorClass} aria-live="polite">
              {errors.productPhoto[0]}
            </p>
          )}
        </div>

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
          {pending ? "Sending..." : "Send Request"}
        </button>
      </form>
    </div>
  );
}
```

- [ ] **Step 2: Type-check and lint the new file**

```bash
npx tsc --noEmit && npx eslint app/source-for-me/SourceForMeForm.tsx
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/source-for-me/SourceForMeForm.tsx
git commit -m "feat: add Source for Me form component with inline validation states"
```

---

### Task 4: `page.tsx` — hero + form, and manual verification

**Files:**
- Modify: `app/source-for-me/page.tsx`

- [ ] **Step 1: Replace `app/source-for-me/page.tsx`**

The `Metadata` export is unchanged from the current placeholder. The `ComingSoon` import and usage are removed.

```tsx
import type { Metadata } from "next";
import SourceForMeForm from "./SourceForMeForm";

export const metadata: Metadata = {
  title: "Source for Me | True Nord",
  description:
    "Tell True Nord what Canadian grocery products you're looking for, and we'll source it for your market.",
};

export default function SourceForMePage() {
  return (
    <>
      <section className="bg-navy px-6 py-24 text-center text-white">
        <h1 className="text-4xl md:text-5xl">
          Tell Us What You Need. We&apos;ll Find It.
        </h1>
        <div className="mx-auto my-5 h-1 w-16 bg-red" aria-hidden="true" />
        <p className="mb-5 text-lg font-medium text-white/90">
          Sourcing requests for GCC &amp; MENA retailers
        </p>
        <p className="mx-auto max-w-2xl text-base text-white/85">
          Looking for a specific Canadian grocery product, brand, or category
          for your shelves? Fill out the form below and our team will get
          back to you within 1–2 business days with sourcing options,
          availability, and next steps.
        </p>
      </section>

      <SourceForMeForm />
    </>
  );
}
```

- [ ] **Step 2: Verify on desktop**

Run: `npm run dev` (if not already running)

Open `http://localhost:3000/source-for-me`. Check, top to bottom:

- **Hero**: navy background, white "Tell Us What You Need. We'll Find It." heading in serif (Playfair Display), a short red bar beneath it, the subhead "Sourcing requests for GCC & MENA retailers", and the lead paragraph starting "Looking for a specific Canadian grocery product...".
- **Form section**: white background below the hero, centered with a max width.
- **Field layout**: Full Name + Email side by side; Company Name + Country side by side; Phone alone on its own row (left half width, right half of the row empty); "What are you looking to source?" as a full-width textarea; "Product Photo" as a full-width file input with helper text "JPG, PNG, or WEBP — max 5MB."; the privacy-consent checkbox + text; then the red "Send Request" button.
- **Required markers**: a red `*` appears after Full Name, Email, Company Name, Country, "What are you looking to source?", and at the end of the consent text. Phone and Product Photo have no `*`.
- **Country dropdown**: shows "Select your country" as the initial (greyed-out) option, followed by United Arab Emirates, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman, Jordan, Egypt, Other — in that order.

- [ ] **Step 3: Verify client-side and server-side validation**

1. Click "Send Request" with every field empty. Expected: the browser blocks submission and highlights the first required field (native HTML5 validation) — no page reload, no server round-trip.
2. Fill in Full Name, Email (valid format), Company Name, select a Country, and type `test` (4 characters) into "What are you looking to source?". Check the consent checkbox. Click "Send Request". Expected: the page does not navigate; a red error message reading "Please tell us a bit more about what you're looking for (at least 10 characters)." appears directly below the textarea, and all previously-entered values (Full Name, Email, Company Name, Country selection, consent checkbox) remain exactly as entered.
3. Expand "What are you looking to source?" to 10+ characters (e.g., "Looking for organic granola bars for our stores.") and click "Send Request" again. Expected: the submit button briefly shows "Sending...", then a red banner appears above the form reading "Something went wrong sending your request. Please try again or email us directly at fouad@true-nord.ca." — **this is expected** because `RESEND_API_KEY` isn't configured yet (see spec Section 8; this is resolved later when Wassim completes the Resend setup walkthrough, not part of this plan).

- [ ] **Step 4: Verify on mobile width**

Resize the browser to narrower than ~768px (or use dev tools device toolbar). Check:

- Full Name/Email stack vertically (Full Name above Email).
- Company Name/Country stack vertically.
- Phone, the textarea, the file input, and the consent row are all full width.
- No horizontal scrollbar at any point.

- [ ] **Step 5: Verify the browser tab title**

With `/source-for-me` open, confirm the browser tab title reads "Source for Me | True Nord".

- [ ] **Step 6: Commit**

```bash
git add app/source-for-me/page.tsx
git commit -m "feat: build real Source for Me page with hero and sourcing-request form"
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

Expected: the build completes successfully and lists all 10 routes (`/`, `/about`, `/regions-markets`, `/sourcing-logistics`, `/certifications`, `/brands`, `/source-for-me`, `/sell-in-gcc`, `/privacy-policy`, `/contact`) with no errors. The `/source-for-me` route should be listed as dynamic (it contains a Server Action), which is expected and not an error. If errors are reported, fix them and re-run until the build succeeds.

- [ ] **Step 3: Commit any fixes (skip if nothing changed)**

```bash
git add -A
git commit -m "fix: resolve lint/build issues from Source for Me page work"
```
