import raw from "./adhkar.json";
import { Locale } from "@/i18n/config";

export interface Zikr {
  id: number;
  title?: string;
  text: string;
  count: number;
}

export interface AzkarCategory {
  id: string;
  title: Record<Locale, string>;
  featured: boolean;
  resetEachPrayer?: boolean;
  fridayOnly?: boolean;
  items: Zikr[];
}

export const categories = raw as AzkarCategory[];

const byId = new Map(categories.map((c) => [c.id, c]));

export const getCategory = (id: string) => byId.get(id);

export function getZikr(key: string) {
  const [categoryId, itemId] = key.split(":");
  const category = byId.get(categoryId);
  const zikr = category?.items.find((z) => z.id === Number(itemId));
  return category && zikr ? { category, zikr } : undefined;
}

export const featuredCategories = categories.filter((c) => c.featured);

export const isFriday = (date = new Date()) => date.getDay() === 5;

export const dailyCategories = (date = new Date()) =>
  featuredCategories.filter((c) => !c.fridayOnly || isFriday(date));

export const perPrayerCategoryIds = categories
  .filter((c) => c.resetEachPrayer)
  .map((c) => c.id);

const normalize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[ً-ْٰـ]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي");

export function searchCategories(query: string) {
  const q = normalize(query.trim());
  if (!q) return categories;
  return categories.filter(
    (c) =>
      normalize(c.title.ar).includes(q) || normalize(c.title.en).includes(q),
  );
}

export { normalize };
