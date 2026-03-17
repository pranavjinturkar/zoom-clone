const DEFAULT_SITE_URL = "http://localhost:3000";

function normalizeSiteUrl(rawUrl: string | undefined): string {
  if (!rawUrl) {
    return DEFAULT_SITE_URL;
  }

  const normalizedUrl =
    rawUrl.startsWith("http://") || rawUrl.startsWith("https://")
      ? rawUrl
      : `https://${rawUrl}`;

  try {
    return new URL(normalizedUrl).toString().replace(/\/$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
}

const resolvedSiteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_BASE_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL,
);

export const siteConfig = {
  name: "Yoom",
  shortName: "Yoom",
  defaultTitle: "Yoom | Secure video meetings, scheduling, and recordings",
  titleTemplate: "%s | Yoom",
  description:
    "Yoom is a secure video collaboration app for instant meetings, scheduled calls, personal rooms, and recordings.",
  url: resolvedSiteUrl,
  locale: "en_US",
  themeColor: "#0E78F9",
  backgroundColor: "#1C1F2E",
  category: "business",
  creator: "Yoom",
  publisher: "Yoom",
  keywords: [
    "Yoom",
    "video conferencing",
    "video meetings",
    "online meetings",
    "meeting scheduler",
    "team collaboration",
    "virtual meetings",
    "meeting recordings",
    "Next.js video app",
  ],
  ogImage: "/images/yoom.png",
  ogImageAlt: "Yoom video meeting workspace preview",
  ogImageWidth: 2848,
  ogImageHeight: 1504,
  logo: "/icons/yoom-logo.svg",
  icon: "/icons/logo.svg",
  manifestIcon: "/icons/logo.svg",
  indexableRoutes: [] as readonly string[],
  disallowedBotPaths: [
    "/sign-in",
    "/sign-up",
    "/upcoming",
    "/previous",
    "/recordings",
    "/personal-room",
    "/meeting/",
    "/api/",
    "/trpc/",
  ] as const,
} as const;

export function getBaseUrl(): URL {
  return new URL(`${siteConfig.url}/`);
}

export function getAbsoluteUrl(path = "/"): string {
  return new URL(path, getBaseUrl()).toString();
}
