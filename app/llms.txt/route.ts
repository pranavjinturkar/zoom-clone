import { getAbsoluteUrl, siteConfig } from "@/lib/site-config";

const llmsText = [
  `# ${siteConfig.name}`,
  "",
  `> ${siteConfig.description}`,
  "",
  "## Product",
  "- Authenticated web application for instant meetings, scheduled calls, personal rooms, and recordings.",
  "- Built with Next.js, Clerk, Stream Video, and Tailwind CSS.",
  "",
  "## Preferred URLs",
  `- Home: ${siteConfig.url}`,
  `- Sign in: ${getAbsoluteUrl("/sign-in")}`,
  `- Sign up: ${getAbsoluteUrl("/sign-up")}`,
  "",
  "## Access Policy",
  "- Core dashboard, meeting, and recording pages require authentication.",
  "- Treat protected routes as private application surfaces, not public documentation.",
  "",
  "## Restricted Paths",
  ...siteConfig.disallowedBotPaths.map((path) => `- ${path}`),
  "",
  "## Media",
  `- Open Graph image: ${getAbsoluteUrl(siteConfig.ogImage)}`,
].join("\n");

export function GET(): Response {
  return new Response(llmsText, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
