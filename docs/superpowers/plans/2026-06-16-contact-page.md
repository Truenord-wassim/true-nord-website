# Contact Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `/contact` "coming soon" placeholder with a real page — navy hero, a 3-field contact form with Resend email sending, and a contact details panel — in a two-column layout.

**Architecture:** 4-file module matching the Source for Me and Sell in the GCC pattern: `types.ts` (shared FormState), `actions.ts` (file-level `"use server"`, Zod, Resend), `ContactForm.tsx` (`"use client"`, `useActionState`), `page.tsx` (Server Component, hero + two-column layout). No file upload. No new dependencies.

**Tech Stack:** Next.js 16.2.7 (App Router), React 19 (`useActionState`), Tailwind CSS v4, Zod v3, Resend SDK.

---

### Task 1: Feature branch + types.ts + actions.ts

**Files:**
- Create: `app/contact/types.ts`
- Create: `app/contact/actions.ts`

- [ ] **Step 1: Create the feature branch**

```bash
git checkout -b feature/contact-page
```

- [ ] **Step 2: Create `app/contact/types.ts`**

```ts
export type FormState = {
  status: "idle" | "success" | "error";
  errors?: {
    fullName?: string[];
    email?: string[];
    message?: string[];
    consent?: string[];
  };
  message?: string;
};

export const initialFormState: FormState = { status: "idle" };
```

- [ ] **Step 3: Create `app/contact/actions.ts`**

```ts
// File-level "use server" lets ContactForm.tsx (a Client Component) call
// submitContactMessage. That directive restricts this file to async-function
// exports only, so shared types live in ./types instead.
"use server";

import { Resend } from "resend";
import { z } from "zod";
import { type FormState } from "./types";

const INTERNAL_RECIPIENTS = ["fouad@true-nord.ca", "mireille@true-nord.ca"];
const GENERAL_ERROR_MESSAGE =
  "Something went wrong. Please try again or email us directly at info@true-nord.ca.";

const contactSchema = z.object({
  fullName: z.string().min(1, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  message: z
    .string()
    .min(10, "Please tell us a bit more (at least 10 characters)."),
  consent: z.string().refine((value) => value === "on", {
    message: "Please agree to the Privacy Policy to submit.",
  }),
});

export async function submitContactMessage(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const result = contactSchema.safeParse({
    fullName: formData.get("fullName") ?? "",
    email: formData.get("email") ?? "",
    message: formData.get("message") ?? "",
    consent: formData.get("consent") ?? "",
  });

  if (!result.success) {
    return {
      status: "error",
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { fullName, email, message } = result.data;

  const fromAddress = `True Nord <${process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev"}>`;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const ack = await resend.emails.send({
      from: fromAddress,
      to: email,
      replyTo: "fouad@true-nord.ca",
      subject: "Thanks for reaching out — True Nord",
      text: `Hi ${fullName},\n\nThanks for reaching out to True Nord. We've received your message and a member of our team will be in touch within 1–2 business days.\n\nIf you have any questions in the meantime, feel free to reply to this email.\n\nThe True Nord Team`,
    });

    if (ack.error) {
      return { status: "error", message: GENERAL_ERROR_MESSAGE };
    }

    const notify = await resend.emails.send({
      from: fromAddress,
      to: INTERNAL_RECIPIENTS,
      replyTo: email,
      subject: `New contact message — ${fullName}`,
      text: `New contact message via the website:\n\n- Name: ${fullName}\n- Email: ${email}\n\nMessage:\n${message}`,
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

- [ ] **Step 4: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add app/contact/types.ts app/contact/actions.ts
git commit -m "feat: add Contact page types and server action"
```

---

### Task 2: ContactForm.tsx — client form component

**Files:**
- Create: `app/contact/ContactForm.tsx`

- [ ] **Step 1: Create `app/contact/ContactForm.tsx`**

```tsx
"use client";

import Link from "next/link";
import { useActionState } from "react";
import { submitContactMessage } from "./actions";
import { initialFormState } from "./types";

const inputClass =
  "w-full rounded-md border border-navy/25 px-3 py-2 text-sm text-navy focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy";
const labelClass = "mb-1 block text-sm font-semibold text-navy";
const errorClass = "mt-1 text-sm text-red";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactMessage,
    initialFormState
  );

  if (state.status === "success") {
    return (
      <div aria-live="polite">
        <p className="text-base font-medium text-navy">
          Thanks — we&apos;ll be in touch within 1–2 business days.
        </p>
      </div>
    );
  }

  const errors = state.errors ?? {};

  return (
    <div>
      {state.status === "error" && state.message && (
        <div
          className="mb-6 rounded-md border border-red bg-red/10 px-4 py-3 text-sm text-red-shade"
          aria-live="polite"
        >
          {state.message}
        </div>
      )}

      <form action={formAction} className="space-y-5">
        {/* Row 1: Full Name + Email side by side */}
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

        {/* Message textarea — full width */}
        <div>
          <label htmlFor="message" className={labelClass}>
            Message{" "}
            <span className="text-red" aria-hidden="true">
              *
            </span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            aria-required="true"
            rows={6}
            placeholder="Tell us what you're working on or what you're looking for."
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`${inputClass} resize-none`}
          />
          {errors.message && (
            <p id="message-error" className={errorClass} aria-live="polite">
              {errors.message[0]}
            </p>
          )}
        </div>

        {/* Consent checkbox */}
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
              and consent to True Nord storing my information to respond to this
              request.{" "}
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
          {pending ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/contact/ContactForm.tsx
git commit -m "feat: add ContactForm client component"
```

---

### Task 3: page.tsx — hero + two-column layout + contact details

**Files:**
- Modify: `app/contact/page.tsx`

- [ ] **Step 1: Replace `app/contact/page.tsx`**

The existing file renders `<ComingSoon title="Contact" />`. Replace it entirely with:

```tsx
import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact | True Nord",
  description:
    "Get in touch with True Nord — contact details, location, and a message form.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-6 py-24 text-center text-white">
        <h1 className="text-4xl md:text-5xl">Get in Touch</h1>
        <div className="mx-auto my-5 h-1 w-16 bg-red" aria-hidden="true" />
        <p className="text-lg font-medium text-white/90">
          Whether you&apos;re a Canadian supplier or a GCC retailer, we&apos;d
          love to hear from you.
        </p>
      </section>

      {/* Two-column content */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-12 md:flex-row">

            {/* Left column: contact form */}
            <div className="flex-[3]">
              <h2 className="mb-6 font-heading text-2xl font-semibold text-navy">
                Send us a message
              </h2>
              <ContactForm />
            </div>

            {/* Right column: contact details */}
            <div className="flex-[2]">
              <h2 className="mb-6 font-heading text-2xl font-semibold text-navy">
                Contact details
              </h2>
              <ul className="space-y-6">

                {/* Email */}
                <li>
                  <p className="text-xs font-semibold uppercase tracking-wide text-navy/50">
                    Email
                  </p>
                  <div className="mt-0.5 space-y-0.5">
                    <a
                      href="mailto:info@true-nord.ca"
                      className="block text-red underline hover:text-red-shade"
                    >
                      info@true-nord.ca
                    </a>
                    <a
                      href="mailto:fouad@true-nord.ca"
                      className="block text-red underline hover:text-red-shade"
                    >
                      fouad@true-nord.ca
                    </a>
                  </div>
                </li>

                {/* Phone */}
                <li>
                  <p className="text-xs font-semibold uppercase tracking-wide text-navy/50">
                    Phone
                  </p>
                  <a
                    href="tel:+16475220891"
                    className="mt-0.5 block text-red underline hover:text-red-shade"
                  >
                    +1 647 522 0891
                  </a>
                </li>

                {/* Address */}
                <li>
                  <p className="text-xs font-semibold uppercase tracking-wide text-navy/50">
                    Address
                  </p>
                  <address className="mt-0.5 not-italic text-navy">
                    Unit C18, 724 Caledonia Rd
                    <br />
                    North York, ON, Canada
                    <br />
                    M6B 3X7
                  </address>
                </li>

                {/* LinkedIn — placeholder link, replace href="#" with real URL once available */}
                <li>
                  <p className="text-xs font-semibold uppercase tracking-wide text-navy/50">
                    LinkedIn
                  </p>
                  {/* TODO: replace href="#" with the True Nord LinkedIn company page URL once available */}
                  <a
                    href="#"
                    className="mt-0.5 block text-red underline hover:text-red-shade"
                  >
                    true-nord
                  </a>
                </li>

              </ul>
            </div>

          </div>
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

Run `npm run dev` (if not already running). Open `http://localhost:3000/contact`. Verify:

- **Hero**: navy background, white "Get in Touch" heading, red accent bar, subhead.
- **Two columns**: "Send us a message" form on the left, "Contact details" panel on the right — both visible side by side on desktop.
- **Form**: Full Name + Email side by side, Message textarea below, consent checkbox, "Send Message" button.
- **Contact details**: Email row with two red links (`info@true-nord.ca` / `fouad@true-nord.ca`), Phone row (`+1 647 522 0891`), Address block (three lines), LinkedIn row (shows "true-nord" linked to `#`).
- **Browser tab**: "Contact | True Nord".

- [ ] **Step 4: Verify on mobile width**

Resize browser to under 768px. Confirm:
- The two columns stack vertically: form first, contact details below.
- No horizontal overflow.

- [ ] **Step 5: Commit**

```bash
git add app/contact/page.tsx
git commit -m "feat: build real Contact page with form and contact details"
```

---

### Task 4: Production build and lint check

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

Expected: build completes successfully. `/contact` should appear as a static route (`○`). All 10 routes listed with no errors.

- [ ] **Step 3: Commit any fixes (skip if nothing changed)**

```bash
git add -A
git commit -m "fix: resolve lint/build issues from Contact page work"
```
