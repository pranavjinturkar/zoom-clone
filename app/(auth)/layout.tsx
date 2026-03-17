import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    default: "Account Access",
    template: siteConfig.titleTemplate,
  },
  description: "Sign in or create an account to access your Yoom meetings and workspace.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return children;
};

export default AuthLayout;
