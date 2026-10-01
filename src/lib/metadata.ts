/**
 * Per-page metadata.
 *
 * One helper so every route gets a canonical URL, an Open Graph card and a
 * consistent title template without repeating the boilerplate. Page-specific
 * values are the only thing a route has to supply.
 */
import type { Metadata } from "next";

import { absoluteUrl, site } from "@/config/site";
import { defaultLocale, localeTags } from "@/i18n/config";

/**
 * The generated card from `app/opengraph-image.tsx`.
 *
 * Referenced explicitly because a page that exports its own `openGraph` object
 * does not inherit the file-based image from the root segment.
 */
const ogImage = {
  url: absoluteUrl("/opengraph-image"),
  width: 1200,
  height: 630,
  alt: `${site.storeName} — ${site.storeSubtitle}`,
};

interface CreateMetadataOptions {
  title: string;
  description: string;
  /** Site-relative path, e.g. `/faq`. */
  path: string;
  /** Legal pages and the 404 stay out of the index-worthy set when needed. */
  noIndex?: boolean;
}

export const createMetadata = ({
  title,
  description,
  path,
  noIndex = false,
}: CreateMetadataOptions): Metadata => ({
  title,
  description,
  alternates: {
    canonical: path,
  },
  openGraph: {
    type: "website",
    siteName: site.appName,
    locale: localeTags[defaultLocale],
    title,
    description,
    url: absoluteUrl(path),
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage.url],
  },
  ...(noIndex ? { robots: { index: false, follow: true } } : {}),
});
