import type { MetadataRoute } from "next";

// The site's canonical address. Search engines and link previews need the
// full, absolute URL — not a relative path.
const BASE_URL = "https://true-nord.ca";

// Lists every public page so search engines can discover and index them all.
// Next.js serves this automatically at https://true-nord.ca/sitemap.xml.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "", // homepage
    "/about",
    "/regions-markets",
    "/sourcing-logistics",
    "/certifications",
    "/brands",
    "/source-for-me",
    "/sell-in-gcc",
    "/contact",
    "/privacy-policy",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    // The homepage is the most important page, so it gets the top priority.
    priority: route === "" ? 1 : 0.8,
  }));
}
