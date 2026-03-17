import type { MetadataRoute } from "next";

import { getAbsoluteUrl, siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/robots.txt",
          "/sitemap.xml",
          "/manifest.webmanifest",
          "/llms.txt",
          "/llms-full.txt",
        ],
        disallow: [...siteConfig.disallowedBotPaths],
      },
    ],
    sitemap: getAbsoluteUrl("/sitemap.xml"),
    host: siteConfig.url,
  };
}
