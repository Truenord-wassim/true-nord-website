import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "About Us" },
  { href: "/regions-markets", label: "Regions & Markets" },
  { href: "/sourcing-logistics", label: "Sourcing & Logistics" },
  { href: "/certifications", label: "Certifications" },
  { href: "/brands", label: "Current Brands" },
  { href: "/source-for-me", label: "Source for Me" },
  { href: "/sell-in-gcc", label: "Sell in the GCC" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-navy px-6 py-12 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-xl font-bold"
        >
          <span className="block h-5 w-1 bg-red" aria-hidden="true" />
          True Nord
        </Link>

        <p className="text-sm text-white/80">True Direction. Zero Complexity.</p>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/85 hover:text-white hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="border-t border-white/15 pt-4 text-xs text-white/70">
          © 2026 True Nord. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
