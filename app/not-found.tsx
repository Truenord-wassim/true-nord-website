import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | True Nord",
  description:
    "The page you're looking for doesn't exist or has moved. Return to the True Nord homepage.",
};

// Next.js renders this whenever a visitor hits a URL that doesn't exist.
// It sits inside the root layout, so the site header and footer stay in place.
export default function NotFound() {
  return (
    <section className="bg-navy px-6 py-28 text-center text-white">
      <p className="text-5xl font-semibold md:text-6xl">404</p>
      <div className="mx-auto my-5 h-1 w-16 bg-red" aria-hidden="true" />
      <h1 className="mb-5 text-3xl md:text-4xl">Page Not Found</h1>
      <p className="mx-auto mb-8 max-w-xl text-base text-white/85">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
        Let&apos;s get you back on track.
      </p>
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href="/"
          className="inline-block rounded-md bg-red px-6 py-3 text-sm font-semibold text-white hover:bg-red-shade"
        >
          Back to Home
        </Link>
        <Link
          href="/contact"
          className="text-sm font-semibold text-white/85 underline hover:text-white"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}
