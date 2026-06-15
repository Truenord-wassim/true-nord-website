import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Current Brands | True Nord",
  description:
    "Browse the Canadian grocery brands True Nord currently carries for GCC and MENA retailers.",
};

export default function BrandsPage() {
  return (
    <>
      <section className="bg-navy px-6 py-24 text-center text-white">
        <h1 className="text-4xl md:text-5xl">Current Brands</h1>
        <div className="mx-auto my-5 h-1 w-16 bg-red" aria-hidden="true" />
        <p className="mb-5 text-lg font-medium text-white/90">
          Two brands. One growing catalog.
        </p>
        <p className="mx-auto max-w-2xl text-base text-white/85">
          True Nord&apos;s catalog starts with two Canadian brands already
          trusted by health-conscious shoppers — vetted for clean labels,
          halal-compatible ingredients, and shelf-ready packaging for GCC
          retail. For GCC retailers, this is what&apos;s ready to stock
          today. For Canadian brands, it&apos;s the caliber of lineup
          you&apos;d be joining — with more brands added as the catalog
          grows.
        </p>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-12 md:items-start">
          <div className="md:col-span-5">
            <div className="relative mx-auto h-56 w-56 md:h-64 md:w-64">
              <Image
                src="/brands/madegood-product.png"
                alt="MadeGood Organic Crunchy Granola Squares package"
                fill
                sizes="(min-width: 768px) 256px, 224px"
                className="object-contain"
              />
            </div>
            <div className="mt-5 flex justify-center">
              <Image
                src="/brands/madegood-logo.png"
                alt="MadeGood"
                width={136}
                height={40}
              />
            </div>
          </div>
          <div className="md:col-span-7">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-red">
              Granola, Bars &amp; Snacks
            </p>
            <h2 className="mb-3 text-3xl">MadeGood</h2>
            <p className="mb-4 text-base italic text-navy/80">
              “Crafted and packed by proud Canadians” — organic,
              allergy-friendly snacks.
            </p>
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-navy/15 bg-cream px-4 py-1.5 text-sm font-semibold text-navy">
                Certified Organic
              </span>
              <span className="rounded-full border border-navy/15 bg-cream px-4 py-1.5 text-sm font-semibold text-navy">
                Non-GMO
              </span>
              <span className="rounded-full border border-navy/15 bg-cream px-4 py-1.5 text-sm font-semibold text-navy">
                Gluten-Free
              </span>
              <span className="rounded-full border border-navy/15 bg-cream px-4 py-1.5 text-sm font-semibold text-navy">
                Nut-Free
              </span>
              <span className="rounded-full border border-navy/15 bg-cream px-4 py-1.5 text-sm font-semibold text-navy">
                Vegan
              </span>
              <span className="rounded-full border border-navy/15 bg-cream px-4 py-1.5 text-sm font-semibold text-navy">
                Kosher
              </span>
            </div>
            <p className="mb-4 text-sm text-navy/80">
              <span className="font-semibold text-navy">Product line:</span>{" "}
              Granola Bars, Granola Bites, Cookies &amp; Crackers (including
              Star Crackers), Crispy Squares, Crunchy Granola Squares, and
              Morning Bars &amp; Oat Cups.
            </p>
            <p className="mb-5 text-sm text-navy/80">
              A strong fit for the GCC&apos;s growing health-conscious and
              allergy-aware shopper base, with halal-compatible ingredients
              across the range.
            </p>
            <a
              href="https://www.madegoodfoods.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-red hover:text-red-shade"
            >
              Visit madegoodfoods.com ↗
            </a>
          </div>
        </div>
      </section>

      <section className="bg-cream px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-12 md:items-start">
          <div className="md:col-span-5">
            <div className="relative mx-auto h-56 w-56 md:h-64 md:w-64">
              <Image
                src="/brands/ohme-product.png"
                alt="OHME Freeze-Dried Strawberries package"
                fill
                sizes="(min-width: 768px) 256px, 224px"
                className="object-contain"
              />
            </div>
            <div className="mt-5 flex justify-center">
              <Image
                src="/brands/ohme-logo.svg"
                alt="OHME"
                width={123}
                height={40}
              />
            </div>
          </div>
          <div className="md:col-span-7">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-red">
              Freeze-Dried Fruit Snacks
            </p>
            <h2 className="mb-3 text-3xl">OHME</h2>
            <p className="mb-4 text-base italic text-navy/80">
              “Real fruit. Big crunch.” — freeze-dried fruit snacks with no
              preservatives and no added sugar.
            </p>
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-navy/15 bg-white px-4 py-1.5 text-sm font-semibold text-navy">
                Non-GMO
              </span>
              <span className="rounded-full border border-navy/15 bg-white px-4 py-1.5 text-sm font-semibold text-navy">
                Vegan
              </span>
            </div>
            <p className="mb-4 text-sm text-navy/80">
              <span className="font-semibold text-navy">Product line:</span>{" "}
              Freeze-Dried Fruit Snacks (strawberries, blueberries,
              raspberries, mangoes, and figs), Yogurt Crunch, OHME Minis, and
              Yum Packs.
            </p>
            <p className="mb-5 text-sm text-navy/80">
              No preservatives and no added sugar, meeting the Gulf&apos;s
              growing demand for clean, better-for-you snacking.
            </p>
            <a
              href="https://www.ohmefoods.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-red hover:text-red-shade"
            >
              Visit ohmefoods.com ↗
            </a>
          </div>
        </div>
      </section>

      <section className="bg-navy px-6 py-20 text-center text-white">
        <h2 className="mb-5 text-3xl">Ready to Add to the Lineup?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-base text-white/85">
          Whether you&apos;re a GCC retailer ready to bring MadeGood and OHME
          onto your shelves, or a Canadian brand hoping to be the next name
          in True Nord&apos;s catalog, let&apos;s start the conversation.
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
