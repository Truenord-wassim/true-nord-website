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
