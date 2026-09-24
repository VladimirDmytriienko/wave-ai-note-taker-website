/**
 * Minimal translation layer.
 *
 * Convention: the message KEY is the English source text, so `en.json` is an
 * identity map and untranslated strings degrade to readable English rather
 * than to an abstract key. Keys are typed, so a typo or a deleted message is a
 * compile error.
 *
 * `getTranslations()` is async on purpose: catalogs are loaded with a dynamic
 * import, so adding locales does not grow the English bundle, and call sites
 * do not have to change when that happens.
 *
 * Server Components await `getTranslations()` directly. Client Components are
 * not given a translator — pass the finished strings down as props, which
 * keeps message catalogs out of the client bundle.
 */
import en from "./messages/en.json";

import { defaultLocale, type Locale } from "./config";

export type Messages = typeof en;
export type MessageKey = keyof Messages;

/** Values substituted into `{placeholder}` slots. */
export type MessageValues = Record<string, string | number>;

export type Translator = (key: MessageKey, values?: MessageValues) => string;

const catalogs: Record<Locale, () => Promise<Messages>> = {
  en: async () => en,
};

const interpolate = (template: string, values?: MessageValues): string => {
  if (!values) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in values ? String(values[name]) : match,
  );
};

export const createTranslator =
  (messages: Messages): Translator =>
  (key, values) =>
    interpolate(messages[key] ?? key, values);

/**
 * Resolve the active locale.
 *
 * With a single enabled language this is a constant. When locale-prefixed
 * routes land, this is the one place that has to read the route param.
 */
export const getLocale = async (): Promise<Locale> => defaultLocale;

export const getTranslations = async (locale?: Locale): Promise<Translator> => {
  const active = locale ?? (await getLocale());
  const messages = await catalogs[active]();
  return createTranslator(messages);
};
