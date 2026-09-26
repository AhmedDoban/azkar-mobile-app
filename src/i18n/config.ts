export type Locale = (typeof locales)[number];

export const locales = ["en", "ar"] as const;
export const defaultLocale: Locale = "ar";

export const rtlLocales: readonly Locale[] = ["ar"];

export function isLocale(value: unknown): value is Locale {
  return locales.includes(value as Locale);
}
