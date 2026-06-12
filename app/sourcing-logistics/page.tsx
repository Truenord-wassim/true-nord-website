import type { Metadata } from "next";
import Link from "next/link";

const processSteps = [
  {
    number: 1,
    title: "Source",
    description:
      "We curate and vet Canadian grocery brands — building relationships with manufacturers like MadeGood and OHME to create a trusted, GCC-ready catalog.",
  },
  {
    number: 2,
    title: "Prepare",
    description:
      "Orders are consolidated across all eight GCC and MENA markets to meet minimum order quantities, while we prepare the certifications and documentation each market requires.",
  },
  {
    number: 3,
    title: "Export",
    description:
      "Products are picked up from the supplier, cleared through customs, and shipped from Canada — freight and logistics handled door to door.",
  },
  {
    number: 4,
    title: "Launch",
    description:
      "Shipments arrive at the retailer's warehouse, ready for shelf — completing the journey from Canadian producer to GCC consumer.",
  },
];

const audienceCards = [
  {
    title: "For Canadian Brands",
    description:
      "One partner curates your fit for the GCC market, handles preparation and documentation, and gets your product onto shelves — without you setting up local entities, certifications, or freight relationships yourself.",
  },
  {
    title: "For GCC Retailers",
    description:
      "One source for vetted Canadian products, consolidated into orders that meet your minimums, fully cleared and delivered — no need to manage multiple Canadian suppliers or cross-border logistics yourself.",
  },
];

export const metadata: Metadata = {
  title: "Sourcing & Logistics | True Nord",
  description:
    "How True Nord sources, prepares, exports, and delivers Canadian grocery products to GCC and MENA retailers.",
};

export default function SourcingLogisticsPage() {
  return (
    <>
      <section className="bg-navy px-6 py-24 text-center text-white">
        <h1 className="text-4xl md:text-5xl">Sourcing &amp; Logistics</h1>
        <div className="mx-auto my-5 h-1 w-16 bg-red" aria-hidden="true" />
        <p className="mb-5 text-lg font-medium text-white/90">
          One process. Zero complexity.
        </p>
        <p className="mx-auto max-w-2xl text-base text-white/85">
          Whether you&apos;re a Canadian brand wondering how your product
          reaches Gulf shelves, or a GCC retailer wondering how a sourcing
          partner actually works — here&apos;s the process. Four stages,
          fully managed by True Nord, from the moment we take on a product to
          the moment it&apos;s on shelf.
        </p>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 text-center text-sm font-semibold uppercase tracking-wide text-red">
            How It Works
          </p>
          <h2 className="mb-6 text-center text-3xl">From Source to Shelf</h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-base text-navy/80">
            Getting a Canadian grocery product onto GCC shelves means
            curation, consolidation, customs, and logistics — usually a maze
            of new relationships and paperwork for anyone entering the market
            for the first time. True Nord runs all four stages as one
            continuous pipeline.
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            {processSteps.map((step) => (
              <div key={step.title} className="border-l-4 border-red pl-5">
                <span className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white">
                  {step.number}
                </span>
                <h3 className="mb-2 text-xl">{step.title}</h3>
                <p className="text-sm text-navy/80">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl">
            What This Means for You
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {audienceCards.map((card) => (
              <div key={card.title} className="border-l-4 border-red pl-5">
                <h3 className="mb-2 text-xl">{card.title}</h3>
                <p className="text-sm text-navy/80">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy px-6 py-20 text-center text-white">
        <h2 className="mb-5 text-3xl">Ready to Start the Conversation?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-base text-white/85">
          Ready to add Canadian products to your shelves, or get your
          Canadian brand into the GCC? Tell us what you&apos;re working on,
          and we&apos;ll show you how True Nord&apos;s sourcing and logistics
          process fits in.
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
