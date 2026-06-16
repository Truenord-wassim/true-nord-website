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

const siteDescription =
  "True Nord sources Canadian grocery brands and brings them to GCC and MENA retailers, and helps Canadian brands reach GCC shelves.";

export const metadata: Metadata = {
  // The site's canonical address. Lets Next.js turn relative URLs (like the
  // social-share image) into the full absolute URLs that link previews need.
  metadataBase: new URL("https://true-nord.ca"),
  title: "True Nord | Canadian Grocery Brands for GCC Markets",
  description: siteDescription,
  // Open Graph powers the preview card shown when a link is shared on most
  // platforms (LinkedIn, WhatsApp, Facebook). The preview image itself comes
  // from app/opengraph-image.tsx, which Next.js wires up automatically.
  openGraph: {
    title: "True Nord | Canadian Grocery Brands for GCC Markets",
    description: siteDescription,
    url: "https://true-nord.ca",
    siteName: "True Nord",
    locale: "en_CA",
    type: "website",
  },
  // Twitter/X uses its own tags; "summary_large_image" shows a large preview.
  twitter: {
    card: "summary_large_image",
    title: "True Nord | Canadian Grocery Brands for GCC Markets",
    description: siteDescription,
  },
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
