/**
 * Locale configuration.
 *
 * Only English is enabled today, so no locale segment appears in the URL and
 * no language switcher is rendered. Adding a language is meant to be a small,
 * local change:
 *   1. add `src/i18n/messages/<locale>.json` (same keys as `en.json`);
 *   2. add `src/content/<locale>/` with the FAQ and legal content;
 *   3. list the locale in `locales` below;
 *   4. move the routes under `src/app/[locale]/` and resolve `getLocale()`
 *      from the route param instead of the constant default.
 */

export const locales = ["en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** BCP 47 tags for `<html lang>` and hreflang, keyed by locale. */
export const localeTags: Record<Locale, string> = {
  en: "en",
};

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);
