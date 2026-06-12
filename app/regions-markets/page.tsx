import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const marketGroups = [
  {
    title: "GCC",
    description:
      "Saudi Arabia, United Arab Emirates, Kuwait, Qatar, Bahrain, and Oman — the core of True Nord's distribution network, and home to some of the fastest-growing grocery and quick-commerce markets in the world.",
  },
  {
    title: "Broader MENA",
    description:
      "Jordan and Egypt extend True Nord's reach beyond the Gulf — two of the region's largest population centers, opening the door to even larger consumer markets for Canadian brands.",
  },
];

const brandCards = [
  {
    name: "MadeGood",
    logoSrc: "/brands/madegood-logo.png",
    logoWidth: 136,
    logoHeight: 40,
    productSrc: "/brands/madegood-product.png",
    productAlt: "MadeGood Organic Crunchy Granola Squares package",
    description:
      "Organic, allergy-friendly snacks — granola bars, cookies, and crackers that are Non-GMO, Gluten-Free, Nut-Free, Vegan, and Kosher. A strong fit for the GCC's growing health-and-allergy-conscious shopper base.",
  },
  {
    name: "OHME",
    logoSrc: "/brands/ohme-logo.svg",
    logoWidth: 123,
    logoHeight: 40,
    productSrc: "/brands/ohme-product.png",
    productAlt: "OHME Freeze-Dried Strawberries package",
    description:
      "Freeze-dried fruit snacks with no preservatives and no added sugar — real fruit, simple ingredients, big crunch. Meets rising Gulf demand for clean, better-for-you snacking.",
  },
];

export const metadata: Metadata = {
  title: "Regions & Markets | True Nord",
  description:
    "True Nord supplies Canadian grocery brands like MadeGood and OHME into eight markets across the GCC, Jordan, and Egypt.",
};

export default function RegionsMarketsPage() {
  return (
    <>
      <section className="bg-navy px-6 py-24 text-center text-white">
        <h1 className="text-4xl md:text-5xl">Regions &amp; Markets</h1>
        <div className="mx-auto my-5 h-1 w-16 bg-red" aria-hidden="true" />
        <p className="mb-5 text-lg font-medium text-white/90">
          Eight markets. One supply chain.
        </p>
        <p className="mx-auto max-w-2xl text-base text-white/85">
          True Nord sources Canadian grocery brands and delivers them into
          eight markets across the GCC, Jordan, and Egypt. Whether
          you&apos;re a Canadian supplier looking for your next export
          market, or a GCC retailer looking for your next addition to shelf,
          True Nord&apos;s reach already covers where you need to be.
        </p>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 text-center text-sm font-semibold uppercase tracking-wide text-red">
            Where We Operate
          </p>
          <h2 className="mb-6 text-center text-3xl">Markets We Serve</h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-base text-navy/80">
            True Nord supplies into all six GCC countries plus two of the
            broader region&apos;s largest grocery markets — eight markets in
            total, each with its own retail landscape and import
            requirements. One relationship with True Nord gives Canadian
            suppliers access to all of them, and gives GCC retailers a single
            point of contact for sourcing across the region.
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            {marketGroups.map((item) => (
              <div key={item.title} className="border-l-4 border-red pl-5">
                <h3 className="mb-2 text-xl">{item.title}</h3>
                <p className="text-sm text-navy/80">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 text-center text-sm font-semibold uppercase tracking-wide text-red">
            What We Carry
          </p>
          <h2 className="mb-6 text-center text-3xl">
            Canadian Brands We Carry
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-base text-navy/80">
            True Nord&apos;s catalog starts with two Canadian brands already
            trusted by health-conscious shoppers — with more being added as
            we grow. Every brand we carry is vetted for GCC retail: clean
            labels, halal-compatible ingredients, and shelf-ready packaging.
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            {brandCards.map((brand) => (
              <div
                key={brand.name}
                className="rounded-lg border border-navy/10 bg-white p-6 text-center"
              >
                <div className="relative mx-auto mb-4 h-40 w-40">
                  <Image
                    src={brand.productSrc}
                    alt={brand.productAlt}
                    fill
                    sizes="160px"
                    className="object-contain"
                  />
                </div>
                <h3 className="mb-3 flex justify-center">
                  <Image
                    src={brand.logoSrc}
                    alt={brand.name}
                    width={brand.logoWidth}
                    height={brand.logoHeight}
                  />
                </h3>
                <p className="text-sm text-navy/80">{brand.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/brands"
              className="inline-block rounded-md bg-red px-6 py-3 text-sm font-semibold text-white hover:bg-red-shade"
            >
              Explore Our Brands
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-navy px-6 py-20 text-center text-white">
        <h2 className="mb-5 text-3xl">Ready to Get Started?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-base text-white/85">
          Whether you&apos;re a Canadian brand ready to enter the GCC, or a
          GCC retailer looking to source from Canada, True Nord&apos;s
          regional reach means you&apos;re already covered. Tell us what
          you&apos;re working on, and we&apos;ll show you how True Nord fits
          in.
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
