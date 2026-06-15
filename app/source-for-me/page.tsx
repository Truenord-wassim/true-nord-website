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
