import raw from "./adhkar.json";
import { Locale } from "@/i18n/config";

export interface Zikr {
  id: number;
  /** Short heading such as "دعاء الكرب", when the source has one */
  title?: string;
  text: string;
  count: number;
}

export interface AzkarCategory {
  /** Key from azkar.json, e.g. "morning_azkar" */
  id: string;
  title: Record<Locale, string>;
  featured: boolean;
  items: Zikr[];
}

export const categories = raw as AzkarCategory[];

const byId = new Map(categories.map((c) => [c.id, c]));

export const getCategory = (id: string) => byId.get(id);

/** Looks up a single dhikr by its `${categoryId}:${itemId}` key */
export function getZikr(key: string) {
  const [categoryId, itemId] = key.split(":");
  const category = byId.get(categoryId);
  const zikr = category?.items.find((z) => z.id === Number(itemId));
  return category && zikr ? { category, zikr } : undefined;
}

export const featuredCategories = categories.filter((c) => c.featured);

// Strips harakat so "اذكار" matches "أَذْكَار"
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
