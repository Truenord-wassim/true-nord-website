import Link from "next/link";

const valueProps = [
  {
    title: "Zero Export Complexity",
    description:
      "You place a standard wholesale order. We handle sourcing, consolidation, import documentation, and logistics from there.",
  },
  {
    title: "Curated Canadian Assortment",
    description:
      "A growing catalog of vetted Canadian grocery brands, ready for GCC shelves.",
  },
  {
    title: "14+ Years of MENA Market Knowledge",
    description:
      "Deep buying experience across GCC retail — we know what sells, and how to get it there.",
  },
  {
    title: "Multi-Market Consolidation",
    description:
      "We aggregate orders across GCC markets into a single shipment, so you can meet minimum order quantities easily.",
  },
];

export default function Home() {
  return (
    <>
      <section className="bg-navy px-6 py-24 text-center text-white">
        <h1 className="text-4xl md:text-5xl">True Direction. Zero Complexity.</h1>
        <div className="mx-auto my-5 h-1 w-16 bg-red" aria-hidden="true" />
        <p className="mb-5 text-lg font-medium text-white/90">
          Simple for You. Powerful for Your Brand.
        </p>
        <p className="mx-auto max-w-2xl text-base text-white/85">
          True Nord sources Canadian grocery brands and brings them to GCC
          retailers — and helps Canadian brands reach GCC shelves — without
          adding a new process to either side&apos;s business. You place a
          standard order. We handle everything else.
        </p>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 text-center text-sm font-semibold uppercase tracking-wide text-red">
            Why True Nord
          </p>
          <h2 className="mb-12 text-center text-3xl">What True Nord Delivers</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {valueProps.map((item) => (
              <div key={item.title} className="border-l-4 border-red pl-5">
                <h3 className="mb-2 text-xl">{item.title}</h3>
                <p className="text-sm text-navy/80">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <p className="mb-2 text-center text-sm font-semibold uppercase tracking-wide text-red">
            Get Started
          </p>
          <h2 className="mb-10 text-center text-2xl">Which One Are You?</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-white p-7 text-center">
              <h3 className="mb-2 text-lg">I&apos;m a Canadian Brand</h3>
              <p className="mb-5 text-sm text-navy/80">
                Looking to get your products onto international shelves
                (Middle East, GCC,...). Tell us about your brand.
              </p>
              <Link
                href="/sell-in-gcc"
                className="inline-block rounded-md bg-red px-6 py-3 text-sm font-semibold text-white hover:bg-red-shade"
              >
                Sell in the GCC
              </Link>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-7 text-center">
              <h3 className="mb-2 text-lg">I&apos;m an International Retailer</h3>
              <p className="mb-5 text-sm text-navy/80">
                Looking to source quality Canadian products for your
                international shelves (Middle East, GCC,...)? Explore what we
                carry.
              </p>
              <Link
                href="/brands"
                className="inline-block rounded-md bg-red px-6 py-3 text-sm font-semibold text-white hover:bg-red-shade"
              >
                View Current Brands
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
