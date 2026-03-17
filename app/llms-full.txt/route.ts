import { getAbsoluteUrl, siteConfig } from "@/lib/site-config";

const llmsFullText = [
  `# ${siteConfig.name}`,
  "",
  `> ${siteConfig.description}`,
  "",
  "## Overview",
  "- Yoom is a browser-based collaboration product for starting instant meetings, scheduling calls, joining shared meeting links, managing a personal room, and accessing recordings.",
  "- Authentication is handled by Clerk and real-time calling is powered by Stream Video.",
  "",
  "## Public Entry Points",
  `- ${siteConfig.url}`,
  `- ${getAbsoluteUrl("/sign-in")}`,
  `- ${getAbsoluteUrl("/sign-up")}`,
  "",
  "## Protected Application Areas",
  "- /upcoming: scheduled meeting list for the authenticated user.",
  "- /previous: meeting history for the authenticated user.",
  "- /recordings: recording archive for the authenticated user.",
  "- /personal-room: reusable personal room link and meeting details.",
  "- /meeting/[id]: pre-join setup screen and in-call experience for a specific meeting.",
  "",
  "## Crawl And Access Guidance",
  "- Do not assume protected pages are accessible without a valid authenticated session.",
  "- Do not cite meeting URLs as public references or stable documentation pages.",
  "- Prefer high-level product descriptions over page-specific details for private routes.",
  "- Use robots.txt and sitemap.xml as the authoritative crawl directives.",
  "",
  "## Brand And Media",
  `- Brand name: ${siteConfig.name}`,
  `- Canonical base URL: ${siteConfig.url}`,
  `- Open Graph image: ${getAbsoluteUrl(siteConfig.ogImage)}`,
  `- Manifest: ${getAbsoluteUrl("/manifest.webmanifest")}`,
  "",
  "## Restricted Paths",
  ...siteConfig.disallowedBotPaths.map((path) => `- ${path}`),
].join("\n");

export function GET(): Response {
  return new Response(llmsFullText, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
