import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { site, siteUrl } from "@/config/site";
import { getTranslations } from "@/i18n";
import { defaultLocale, localeTags } from "@/i18n/config";

import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

const title = `${site.appName} — voice notes that never leave your iPhone`;
const description =
  "Wave is a voice notes app for iPhone. It records, transcribes and searches your notes on your device — no account, nothing uploaded.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    // Inner pages read "FAQ — Wave"; the home page keeps the full sentence.
    template: `%s — ${site.appName}`,
  },
  description,
  applicationName: site.appName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.appName,
    locale: localeTags[defaultLocale],
    url: siteUrl,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#060608",
  colorScheme: "dark",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const t = await getTranslations();

  return (
    <html lang={localeTags[defaultLocale]} className={inter.variable}>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-ink-inverse"
        >
          {t("Skip to main content")}
        </a>

        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
