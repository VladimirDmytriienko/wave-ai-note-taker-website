/**
 * Central product configuration.
 *
 * Every product fact the website renders — names, URLs, contacts — lives here
 * and ONLY here. Components read from this module; they never hardcode a URL,
 * an email or a store link.
 *
 * Values marked `TODO` are placeholders that must be filled in before the site
 * goes public. Anything that is genuinely unknown is `null` so the UI can hide
 * the corresponding element instead of rendering a broken link.
 */

export interface SocialLink {
  /** Message-catalog key — also the visible label. */
  readonly label: string;
  readonly href: string;
}

/**
 * Public origin of the site, without a trailing slash. Used for canonical
 * URLs, Open Graph images, the sitemap and robots.txt.
 *
 * Set `NEXT_PUBLIC_SITE_URL` in the deployment environment (see `.env.example`).
 * The localhost fallback keeps local development working and makes a missing
 * production value obvious rather than silently shipping someone else's domain.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const site = {
  /** Product name. Brand name — never translated, never passed through `t()`. */
  appName: "Wave",

  websiteUrl: siteUrl,

  /**
   * App Store listing.
   * `status: "coming-soon"` renders the CTA as an unlinked notice; flip it to
   * `"live"` once `url` points at the real listing.
   *
   * TODO: replace with the real App Store URL, e.g.
   * `https://apps.apple.com/app/id0000000000`.
   */
  appStore: {
    url: null as string | null,
    status: "coming-soon" as "coming-soon" | "live",
    /** TODO: numeric Apple app id, used for structured data once published. */
    appleAppId: null as string | null,
  },

  /** TODO: support address, e.g. `support@yourdomain.com`. */
  supportEmail: null as string | null,

  /** TODO: add profiles as they exist. Order here is the order rendered. */
  socialLinks: [] as readonly SocialLink[],

  /** Platform facts, sourced from `app.json` (iOS deployment target 17.0). */
  platform: {
    bundleId: "com.waveai.notetaker",
    minimumOsVersion: "17",
  },
} as const;

export const hasAppStoreLink = (): boolean =>
  site.appStore.status === "live" && site.appStore.url !== null;

/** Absolute URL for a site-relative path. */
export const absoluteUrl = (path = "/"): string =>
  `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
