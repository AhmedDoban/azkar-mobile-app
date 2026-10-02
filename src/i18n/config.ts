export type Locale = (typeof locales)[number];

const locales = ["en", "ar"] as const;
export const defaultLocale: Locale = "ar";

export const rtlLocales: readonly Locale[] = ["ar"];

export function isLocale(value: unknown): value is Locale {
  return locales.includes(value as Locale);
}
