import type { Metadata } from "next";
import Link from "next/link";

const expertiseCards = [
  {
    title: "14+ Years Inside GCC Grocery Retail",
    description:
      "Senior buying and category management experience across the UAE, Saudi Arabia, Kuwait, and Egypt — working directly with the retailers and distributors who decide which products make it onto Gulf shelves, and what it takes for a new brand to succeed there.",
  },
  {
    title: "Grocery E-Commerce & Quick-Commerce at Scale",
    description:
      "Hands-on experience building and scaling online grocery and quick-commerce operations — the fastest-growing channel in GCC retail — including launching distribution and fulfillment infrastructure across multiple markets.",
  },
  {
    title: "Certified Supply Chain & Project Management Expertise",
    description:
      "Professional certifications in supply chain management (APICS CSCP) and project management (PMP) — the same disciplines applied to sourcing, consolidation, customs documentation, and logistics for every True Nord shipment.",
  },
  {
    title: "Built for Both Sides of the Trade",
    description:
      "Experience sitting on both sides of the table — sourcing and buying for GCC retailers, and helping suppliers understand what it takes to get listed — is why True Nord can speak credibly to Canadian brands and GCC retailers alike.",
  },
];

export const metadata: Metadata = {
  title: "About Us | True Nord",
  description:
    "True Nord is a Canadian grocery trading company founded by a team with 14+ years of MENA retail and e-commerce experience, connecting Canadian brands with GCC and MENA retailers.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy px-6 py-24 text-center text-white">
        <h1 className="text-4xl md:text-5xl">About True Nord</h1>
        <div className="mx-auto my-5 h-1 w-16 bg-red" aria-hidden="true" />
        <p className="mb-5 text-lg font-medium text-white/90">
          Two markets. One partner.
        </p>
        <p className="mx-auto max-w-2xl text-base text-white/85">
          True Nord connects Canadian grocery brands with retailers across the
          GCC and MENA — not as a broker standing between two markets, but as
          an extension of each side&apos;s own business. To Canadian
          suppliers, we&apos;re simply another customer placing a standard
          order. To GCC retailers, we&apos;re your Canadian sourcing team,
          already on the ground and ready to go.
        </p>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <p className="mb-2 text-center text-sm font-semibold uppercase tracking-wide text-red">
            How We Started
          </p>
          <h2 className="mb-8 text-center text-3xl">Our Story</h2>
          <div className="space-y-4 text-base text-navy/80">
            <p>
              True Nord was founded by a team with deep roots in MENA grocery
              retail and e-commerce — people who have spent their careers
              inside the buying offices, distribution centers, and category
              teams that decide what ends up on Gulf grocery shelves.
            </p>
            <p>
              From that vantage point, we kept seeing the same gap, from both
              directions. Canadian brands wanted to reach Gulf consumers, but
              exporting internationally meant new customs paperwork, freight
              logistics, and minimum order quantities that didn&apos;t fit a
              first-time market — friction that made an otherwise great
              product too risky to pursue. At the same time, GCC retailers
              wanted access to quality Canadian products, but had no North
              American business entity, no existing supplier relationships,
              and no easy way to consolidate small orders into something that
              cleared a container.
            </p>
            <p>
              True Nord exists to close that gap on both sides at once. For
              Canadian suppliers, we become a normal domestic customer — you
              fulfill a standard wholesale order, and we handle sourcing,
              consolidation, documentation, and freight from there. For GCC
              retailers, we become your Canadian sourcing arm — curating
              brands, meeting minimum order quantities by combining orders
              across markets, and managing the import process end to end.
              It&apos;s the idea behind our tagline: True Direction. Zero
              Complexity.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 text-center text-sm font-semibold uppercase tracking-wide text-red">
            Track Record
          </p>
          <h2 className="mb-6 text-center text-3xl">Our Expertise</h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-base text-navy/80">
            True Nord&apos;s founding team has spent over 14 years working
            inside GCC grocery retail and e-commerce — not as outside
            consultants, but in the buying, supply chain, and operations roles
            that run it day to day. That hands-on experience shapes how we
            operate.
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            {expertiseCards.map((item) => (
              <div key={item.title} className="border-l-4 border-red pl-5">
                <h3 className="mb-2 text-xl">{item.title}</h3>
                <p className="text-sm text-navy/80">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy px-6 py-20 text-center text-white">
        <h2 className="mb-5 text-3xl">Want to Work With True Nord?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-base text-white/85">
          Whether you&apos;re a Canadian brand looking to reach GCC shelves, or
          a GCC retailer looking to source Canadian products, we&apos;d love to
          hear from you. Get in touch and tell us what you&apos;re working on —
          we&apos;ll let you know how True Nord fits in.
        </p>
        <Link
          href="/contact"
          className="inline-block rounded-md bg-red px-6 py-3 text-sm font-semibold text-white hover:bg-red-shade"
        >
          Contact Us
        </Link>
      </section>
    </>
  );
}
