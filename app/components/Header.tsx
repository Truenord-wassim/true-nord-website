"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/about", label: "About Us" },
  { href: "/regions-markets", label: "Regions & Markets" },
  { href: "/sourcing-logistics", label: "Sourcing & Logistics" },
  { href: "/brands", label: "Current Brands" },
  { href: "/source-for-me", label: "Buy Canadian Products" },
  { href: "/sell-in-gcc", label: "I'm a Canadian Brand" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-2xl font-bold text-navy"
        >
          <span className="block h-6 w-1 bg-red" aria-hidden="true" />
          True Nord
        </Link>

        <button
          type="button"
          className="text-sm font-medium text-navy lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
        >
          {menuOpen ? "✕ Close" : "☰ Menu"}
        </button>

        <nav
          id="main-nav"
          className={`${menuOpen ? "flex" : "hidden"} w-full flex-col gap-4 lg:flex lg:w-auto lg:flex-row lg:gap-6`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-navy hover:text-red"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
