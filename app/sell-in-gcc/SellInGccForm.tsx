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
