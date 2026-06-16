import type { MetadataRoute } from "next";

// Tells search engine crawlers they're allowed to index the whole site, and
// points them to the sitemap. Next.js serves this at /robots.txt.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://true-nord.ca/sitemap.xml",
  };
}
