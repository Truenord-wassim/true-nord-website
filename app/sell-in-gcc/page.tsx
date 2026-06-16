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
