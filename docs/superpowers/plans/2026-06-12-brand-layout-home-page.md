# Brand Layout & Home Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the True Nord brand theme (colors + fonts) as a global Tailwind v4 config, build a shared Header/Footer layout with full site navigation (including "coming soon" placeholders for the 9 not-yet-built pages), and build the real Home page (brand intro, value props, audience fork).

**Architecture:** Brand colors and fonts become Tailwind v4 `@theme` tokens in `app/globals.css`. Two Google Fonts (Playfair Display for headings, Inter for body) are loaded via `next/font/google` in `app/layout.tsx` and exposed as CSS variables. `Header` and `Footer` are small components rendered by the root layout around `{children}`. A shared `ComingSoon` component is reused by 9 placeholder pages, each with its own SEO metadata. `app/page.tsx` is rewritten with the real Home page content.

**Tech Stack:** Next.js 16.2.7 (App Router), React 19, Tailwind CSS v4 (`@theme` directive, CSS-first config), `next/font/google`.

**Spec:** `docs/superpowers/specs/2026-06-12-brand-layout-home-design.md`

**Verification approach:** This is a static UI change with no data or forms, so verification is manual (per the spec). Each task ends with `npm run dev` + a specific check in the browser. The final task runs `npm run lint` and `npm run build` to confirm everything compiles cleanly for production.

---

### Task 1: Global brand theme — colors and fonts

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace `app/globals.css`**

Remove the old Geist fonts, the `--background`/`--foreground` tokens, and the dark-mode block. Add the brand color palette as `@theme` tokens, expose `--font-heading` as a Tailwind utility (`font-heading`), and set the page's default text color/font plus a base rule so all `h1`–`h3` use the heading font.

```css
@import "tailwindcss";

@theme {
  --color-navy: #1B2A4A;
  --color-navy-tint: #3A4D78;
  --color-red: #B5312A;
  --color-red-shade: #8C2620;
  --color-cream: #F7F5F2;
}

@theme inline {
  --font-heading: var(--font-heading);
}

body {
  color: var(--color-navy);
  font-family: var(--font-body), sans-serif;
}

h1,
h2,
h3 {
  font-family: var(--font-heading), serif;
  font-weight: 700;
}
```

`--color-navy`, `--color-red`, etc. become Tailwind utilities automatically: `bg-navy`, `text-navy`, `border-navy`, `bg-red`, `hover:bg-red-shade`, `bg-cream`, and so on. `--font-heading` becomes the `font-heading` utility (for non-heading elements like a logo that still need the heading font). `--font-body` and `--font-heading` themselves are set on `<html>` by `next/font/google` in the next step — that's why `body`/`h1`–`h3` can reference `var(--font-body)` / `var(--font-heading)` directly.

- [ ] **Step 2: Replace `app/layout.tsx`**

Swap the Geist/Geist Mono fonts for Playfair Display (headings) and Inter (body), and update the site-wide metadata.

```tsx
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-heading",
  weight: ["700"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "True Nord | Canadian Grocery Brands for GCC Markets",
  description:
    "True Nord sources Canadian grocery brands and brings them to GCC and MENA retailers, and helps Canadian brands reach GCC shelves.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Verify the dev server compiles and both fonts load**

Run: `npm run dev`

Open `http://localhost:3000` in a browser. Check:
- The terminal shows no errors and the page loads without a red error overlay.
- Right-click the page → "Inspect" → in the Elements panel, select the `<html ...>` tag at the top. Its `class` attribute should contain two different generated font classes (each looks like `__variable_xxxxxx`) — one for Playfair Display, one for Inter. This confirms both Google Fonts downloaded and are wired up correctly.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: apply True Nord brand colors and fonts as global theme"
```

---

### Task 2: Header component with navigation

**Files:**
- Create: `app/components/Header.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create `app/components/Header.tsx`**

A sticky header with the "True Nord" wordmark (Playfair Display + red accent bar, linking home) and the 7-link main navigation. Below the `lg` breakpoint (1024px), the nav collapses behind a "☰ Menu" toggle button. This must be a client component because it uses `useState` for the mobile menu.

```tsx
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
```

- [ ] **Step 2: Render the header in `app/layout.tsx`**

Replace the full file with:

```tsx
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const playfairDisplay = Playfair_Display({
  variable: "--font-heading",
  weight: ["700"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "True Nord | Canadian Grocery Brands for GCC Markets",
  description:
    "True Nord sources Canadian grocery brands and brings them to GCC and MENA retailers, and helps Canadian brands reach GCC shelves.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify the header renders and the mobile menu works**

Run: `npm run dev` (if not already running)

Open `http://localhost:3000`. Check:
- A white header with a bottom border appears at the top, showing the "True Nord" wordmark (serif font, with a small red bar to its left) and 7 nav links in a row.
- Hovering a nav link turns it red.
- Resize the browser window to narrower than ~1024px (or open dev tools device toolbar at a phone width). The 7 links should disappear and a "☰ Menu" button should appear instead.
- Click "☰ Menu" — the nav links should appear in a column below the header, and the button should now read "✕ Close". Click it again to hide the links.

- [ ] **Step 4: Commit**

```bash
git add app/components/Header.tsx app/layout.tsx
git commit -m "feat: add site header with main navigation"
```

---

### Task 3: Footer component with navigation

**Files:**
- Create: `app/components/Footer.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create `app/components/Footer.tsx`**

A navy footer with the wordmark (white version), tagline, a 9-link sitemap-style nav, and a copyright line.

```tsx
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
```

- [ ] **Step 2: Render the footer in `app/layout.tsx`**

Replace the full file with (this also wraps `{children}` in a `<main>` that grows to fill space, so the footer sits at the bottom even on short pages):

```tsx
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const playfairDisplay = Playfair_Display({
  variable: "--font-heading",
  weight: ["700"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "True Nord | Canadian Grocery Brands for GCC Markets",
  description:
    "True Nord sources Canadian grocery brands and brings them to GCC and MENA retailers, and helps Canadian brands reach GCC shelves.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify the footer renders**

Run: `npm run dev` (if not already running)

Open `http://localhost:3000` and scroll to the bottom. Check:
- A navy section appears with a white "True Nord" wordmark (serif, with a red bar), the tagline "True Direction. Zero Complexity.", a row of 9 links, and a "© 2026 True Nord. All rights reserved." line.
- Hovering a footer link underlines it and brightens it slightly.

- [ ] **Step 4: Commit**

```bash
git add app/components/Footer.tsx app/layout.tsx
git commit -m "feat: add site footer with sitemap navigation"
```

---

### Task 4: ComingSoon component and 9 placeholder pages

**Files:**
- Create: `app/components/ComingSoon.tsx`
- Create: `app/about/page.tsx`
- Create: `app/regions-markets/page.tsx`
- Create: `app/sourcing-logistics/page.tsx`
- Create: `app/certifications/page.tsx`
- Create: `app/brands/page.tsx`
- Create: `app/source-for-me/page.tsx`
- Create: `app/sell-in-gcc/page.tsx`
- Create: `app/privacy-policy/page.tsx`
- Create: `app/contact/page.tsx`

- [ ] **Step 1: Create `app/components/ComingSoon.tsx`**

```tsx
export default function ComingSoon({ title }: { title: string }) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-3xl">{title}</h1>
      <p className="mt-4 text-base text-navy/70">This page is coming soon.</p>
    </div>
  );
}
```

- [ ] **Step 2: Create `app/about/page.tsx`**

```tsx
import type { Metadata } from "next";
import ComingSoon from "../components/ComingSoon";

export const metadata: Metadata = {
  title: "About Us | True Nord",
  description:
    "Learn about True Nord, a Canadian grocery trading company with 15+ years of MENA market experience connecting Canadian brands with GCC and MENA retailers.",
};

export default function AboutPage() {
  return <ComingSoon title="About Us" />;
}
```

- [ ] **Step 3: Create `app/regions-markets/page.tsx`**

```tsx
import type { Metadata } from "next";
import ComingSoon from "../components/ComingSoon";

export const metadata: Metadata = {
  title: "Regions & Markets | True Nord",
  description:
    "The GCC and MENA regions True Nord serves, and the Canadian grocery brands available to retailers in each market.",
};

export default function RegionsMarketsPage() {
  return <ComingSoon title="Regions & Markets" />;
}
```

- [ ] **Step 4: Create `app/sourcing-logistics/page.tsx`**

```tsx
import type { Metadata } from "next";
import ComingSoon from "../components/ComingSoon";

export const metadata: Metadata = {
  title: "Sourcing & Logistics | True Nord",
  description:
    "How True Nord sources, prepares, exports, and delivers Canadian grocery products to GCC and MENA retailers.",
};

export default function SourcingLogisticsPage() {
  return <ComingSoon title="Sourcing & Logistics" />;
}
```

- [ ] **Step 5: Create `app/certifications/page.tsx`**

```tsx
import type { Metadata } from "next";
import ComingSoon from "../components/ComingSoon";

export const metadata: Metadata = {
  title: "Certifications | True Nord",
  description:
    "True Nord holds the certifications required for food import into GCC and MENA markets, including Halal and CFIA export certification.",
};

export default function CertificationsPage() {
  return <ComingSoon title="Certifications" />;
}
```

- [ ] **Step 6: Create `app/brands/page.tsx`**

```tsx
import type { Metadata } from "next";
import ComingSoon from "../components/ComingSoon";

export const metadata: Metadata = {
  title: "Current Brands | True Nord",
  description:
    "Browse the Canadian grocery brands True Nord currently carries for GCC and MENA retailers.",
};

export default function BrandsPage() {
  return <ComingSoon title="Current Brands" />;
}
```

- [ ] **Step 7: Create `app/source-for-me/page.tsx`**

```tsx
import type { Metadata } from "next";
import ComingSoon from "../components/ComingSoon";

export const metadata: Metadata = {
  title: "Source for Me | True Nord",
  description:
    "Tell True Nord what Canadian grocery products you're looking for, and we'll source it for your market.",
};

export default function SourceForMePage() {
  return <ComingSoon title="Source for Me" />;
}
```

- [ ] **Step 8: Create `app/sell-in-gcc/page.tsx`**

```tsx
import type { Metadata } from "next";
import ComingSoon from "../components/ComingSoon";

export const metadata: Metadata = {
  title: "Sell in the GCC | True Nord",
  description:
    "Canadian grocery brands: tell True Nord about your products and reach GCC and MENA retailers with zero export complexity.",
};

export default function SellInGccPage() {
  return <ComingSoon title="Sell in the GCC" />;
}
```

- [ ] **Step 9: Create `app/privacy-policy/page.tsx`**

```tsx
import type { Metadata } from "next";
import ComingSoon from "../components/ComingSoon";

export const metadata: Metadata = {
  title: "Privacy Policy | True Nord",
  description: "How True Nord collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return <ComingSoon title="Privacy Policy" />;
}
```

- [ ] **Step 10: Create `app/contact/page.tsx`**

```tsx
import type { Metadata } from "next";
import ComingSoon from "../components/ComingSoon";

export const metadata: Metadata = {
  title: "Contact | True Nord",
  description: "Get in touch with True Nord — contact details, location, and a message form.",
};

export default function ContactPage() {
  return <ComingSoon title="Contact" />;
}
```

- [ ] **Step 11: Verify every nav link resolves with the right title**

Run: `npm run dev` (if not already running)

Open `http://localhost:3000`. For each of the 7 header links and 9 footer links:
- Click it.
- Confirm the page shows a centered heading matching the link's page name and the text "This page is coming soon."
- Confirm the browser tab title matches that page (e.g., `/about` → tab shows "About Us | True Nord", `/sell-in-gcc` → "Sell in the GCC | True Nord").

Note: the header's "Buy Canadian Products" link and the footer's "Source for Me" link both point to `/source-for-me` (tab title "Source for Me | True Nord"); the header's "I'm a Canadian Brand" link and the footer's "Sell in the GCC" link both point to `/sell-in-gcc` (tab title "Sell in the GCC | True Nord"). This is expected — both labels are listed in the Site Map table in the spec as pointing to the same routes.

- [ ] **Step 12: Commit**

```bash
git add app/components/ComingSoon.tsx app/about app/regions-markets app/sourcing-logistics app/certifications app/brands app/source-for-me app/sell-in-gcc app/privacy-policy app/contact
git commit -m "feat: add coming-soon placeholder pages for remaining routes"
```

---

### Task 5: Home page content

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx`**

Three sections: a navy hero introducing True Nord, a white "What True Nord Delivers" value-prop grid, and a cream "Which One Are You?" audience fork. This fully replaces the default Next.js starter content (including its `next/image` usage).

```tsx
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
    title: "15+ Years of MENA Market Knowledge",
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
```

- [ ] **Step 2: Verify the Home page on desktop**

Run: `npm run dev` (if not already running)

Open `http://localhost:3000`. Check, top to bottom:
- **Hero**: navy background, white "True Direction. Zero Complexity." heading in serif (Playfair Display), a short red bar beneath it, the subhead "Simple for You. Powerful for Your Brand.", and the lead paragraph.
- **What True Nord Delivers**: white background, small red uppercase "Why True Nord" label, "What True Nord Delivers" heading, and a 2x2 grid of 4 cards, each with a red left border, a serif sub-heading, and body text.
- **Which One Are You?**: cream (off-white) background, small red uppercase "Get Started" label, "Which One Are You?" heading, and 2 white cards side by side ("I'm a Canadian Brand" / "I'm an International Retailer"), each with a red button.
- Click "Sell in the GCC" → goes to `/sell-in-gcc` (Coming soon). Click "View Current Brands" → goes to `/brands` (Coming soon). Use the browser back button to return to `/` between checks.

- [ ] **Step 3: Verify the Home page on mobile width**

Resize the browser to narrower than ~768px (or use dev tools device toolbar). Check:
- The header collapses to the "☰ Menu" toggle (from Task 2).
- The 4-card value-prop grid becomes a single column.
- The 2-card audience-fork grid becomes a single column.
- All text remains readable with no horizontal scrollbar.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: build real home page with hero, value props, and audience fork"
```

---

### Task 6: Production build and lint check

**Files:** none (verification only; fix any files flagged by lint/build errors)

- [ ] **Step 1: Run the linter**

Run: `npm run lint`

Expected: no errors. If errors are reported, fix them in the relevant file (e.g., unused imports, unescaped characters in JSX text) and re-run until clean.

- [ ] **Step 2: Run a production build**

Run: `npm run build`

Expected: the build completes successfully and lists all 10 routes (`/`, `/about`, `/regions-markets`, `/sourcing-logistics`, `/certifications`, `/brands`, `/source-for-me`, `/sell-in-gcc`, `/privacy-policy`, `/contact`) with no errors. If errors are reported, fix them and re-run until the build succeeds.

- [ ] **Step 3: Commit any fixes (skip if nothing changed)**

```bash
git add -A
git commit -m "fix: resolve lint/build issues from brand layout and home page work"
```

---

## Summary of new routes after this plan

| Route | Page |
|---|---|
| `/` | Home (real content) |
| `/about` | Coming soon |
| `/regions-markets` | Coming soon |
| `/sourcing-logistics` | Coming soon |
| `/certifications` | Coming soon |
| `/brands` | Coming soon |
| `/source-for-me` | Coming soon |
| `/sell-in-gcc` | Coming soon |
| `/privacy-policy` | Coming soon |
| `/contact` | Coming soon |
